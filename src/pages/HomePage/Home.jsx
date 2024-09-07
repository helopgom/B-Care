import React, { useState } from "react";
import "./home.css";
import InteractiveText from "../../components/InteractiveText/InteractiveText";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import ButtonWithIcon from "../../components/ButtonWithIcon/ButtonWithIcon";
import UseApi from "../../services/useApi";
import { userProfileEndpoint } from "../../config/urls";

const Home = () => {
  const [isTalking, setIsTalking] = useState(false);
  const [conversationText, setConversationText] = useState(""); // Para almacenar el texto de la conversación
  const [responseText, setResponseText] = useState(""); // Para almacenar la respuesta de la IA

  const {
    data: userProfile,
    loading: userLoading,
    error: userError,
  } = UseApi({
    apiEndpoint: userProfileEndpoint,
    method: "GET",
  });

  // Función para enviar texto al backend (Django)
  async function enviarTexto(texto) {
    try {
      const response = await fetch("http://127.0.0.1:8000/conversation/", {
        // URL corregida
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_text: texto }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.error}`);
      }

      const result = await response.json();
      setResponseText(result.response);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  // Función para iniciar el reconocimiento de voz
  function startRecognition() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error(
        "API de reconocimiento de voz no soportada en este navegador."
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "es-ES"; // Puedes ajustar el idioma
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setConversationText(spokenText);
      enviarTexto(spokenText); // Enviar texto al backend
    };

    recognition.onspeechend = () => {
      recognition.stop();
      setIsTalking(false); // Detener la indicación de que está hablando
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setIsTalking(false); // Detener en caso de error
    };
  }

  const handleStartTalking = () => {
    setIsTalking(true);
    startRecognition(); // Iniciar reconocimiento de voz
  };

  const handleFinish = () => {
    setIsTalking(false);
  };

  if (userLoading) {
    return <p>Loading...</p>;
  }

  if (userError) {
    return <p>Error: {userError}</p>;
  }

  return (
    <div className="home-container">
      <InteractiveText name={userProfile?.first_name} isTalking={isTalking} />
      <ButtonWithIcon isTalking={isTalking} setIsTalking={handleStartTalking} />

      {!isTalking && (
        <div className="button-container">
          <Button
            text="MI CUENTA"
            backgroundColor="var(--white)"
            textColor="var(--black)"
            borderColor="var(--black)"
            link="/MyAccount"
          />
        </div>
      )}

      {isTalking && (
        <div className="finish-button-container">
          <Button
            text="FINALIZAR"
            backgroundColor="var(--black)"
            textColor="var(--white)"
            borderColor="var(--black)"
            link="#"
            onClick={handleFinish}
          />
          <p>Texto hablado: {conversationText}</p>
          <p>Respuesta de la IA: {responseText}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
