import React, { useState, useEffect } from "react";
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

  const apiKey =
    "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"; // Reemplaza con tu API Key de OpenAI
  const endpoint = "https://api.openai.com/v1/chat/completions";

  async function enviarTexto(texto) {
    const data = {
      model: "gpt-3.5-turbo", // Cambia a gpt-3.5-turbo si no tienes acceso a gpt-4
      messages: [{ role: "user", content: texto }],
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`, // Asegúrate de que la API Key se está interpolando correctamente
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        // Manejo de errores HTTP
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.error.message}`);
      }

      const result = await response.json();
      if (result && result.choices && result.choices.length > 0) {
        return result.choices[0].message.content;
      } else {
        throw new Error("No se encontraron respuestas en la API");
      }
    } catch (error) {
      console.error(error.message);
      throw error;
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
      enviarTexto(spokenText)
        .then((response) => setResponseText(response))
        .catch((err) => console.error(err));
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
