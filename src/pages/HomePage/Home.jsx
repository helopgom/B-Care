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

  // Función para iniciar el reconocimiento de voz
  const startRecognition = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "es-ES";
    recognition.onresult = (event) => {
      const userText = event.results[0][0].transcript;
      setConversationText(userText); // Almacenar el texto hablado
      console.log("Texto capturado:", userText);
      sendTextToBackend(userText); // Enviar el texto al backend
    };
    recognition.start();
  };

  // Función para enviar el texto al backend
  const sendTextToBackend = (text) => {
    fetch("http://localhost:8000/api/v1/conversation/conversation/", {
      // Ajusta el endpoint según tu configuración de Django
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_text: text }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponseText(data.response); // Almacenar la respuesta de la IA
      })
      .catch((error) => {
        console.error("Error al enviar el texto al backend:", error);
      });
  };

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
          <p>Respuesta de la IA: {responseText}</p>{" "}
          {/* Mostrar la respuesta de la IA */}
        </div>
      )}
    </div>
  );
};

export default Home;
