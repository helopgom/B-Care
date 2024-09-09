import React, { useState } from "react";
import "./home.css";
import InteractiveText from "../../components/InteractiveText/InteractiveText";
import Button from "../../components/Button/Button";
import ButtonWithIcon from "../../components/ButtonWithIcon/ButtonWithIcon";
import UseApi from "../../services/useApi";
import { userProfileEndpoint } from "../../config/urls";
import axios from "axios";

const Home = () => {
  const [isTalking, setIsTalking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const {
    data: userProfile,
    loading: userLoading,
    error: userError,
  } = UseApi({
    apiEndpoint: userProfileEndpoint,
    method: "GET",
  });

  // Función para enviar texto al backend (Django)
  async function sendText(text) {
    try {
      const response = await axios.request({
        method: "post",
        url: "http://127.0.0.1:8000/api/v1/conversation/",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        data: JSON.stringify({ user_text: text }),
      });

      speechSynthesis(response.data.response);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  function speechSynthesis(text) {
    const SpeechSynthesis =
      window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance;

    if (!SpeechSynthesis) {
      console.error("API de generación de voz no soportada en este navegador.");
      return;
    }
    const synthesis = new SpeechSynthesis(text);
    synthesis.lang = "es-ES";
    synthesis.voice = window.speechSynthesis.getVoices()[0];
    window.speechSynthesis.speak(synthesis);
  }

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
    setIsRecording(true);
    setIsTalking(true);

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      sendText(spokenText); // Enviar texto al backend
    };

    recognition.onspeechend = () => {
      recognition.stop();
      setIsRecording(false); // Detener la indicación de que está hablando
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setIsRecording(false); // Detener en caso de error
    };
  }

  const handleFinish = () => setIsTalking(false);

  if (userLoading) {
    return <p>Loading...</p>;
  }

  if (userError) {
    return <p>Error: {userError}</p>;
  }

  const IsNotTalking = () => (
    <div className="button-container">
      <Button
        text="MI CUENTA"
        backgroundColor="var(--white)"
        textColor="var(--black)"
        borderColor="var(--black)"
        link="/MyAccount"
      />
    </div>
  );
  const IsTalking = () => (
    <div className="finish-button-container">
      <Button
        text="FINALIZAR"
        backgroundColor="var(--black)"
        textColor="var(--white)"
        borderColor="var(--black)"
        link="#"
        onClick={handleFinish}
      />
    </div>
  );

  return (
    <div className="home-container">
      <InteractiveText name={userProfile?.first_name} isTalking={isTalking} />
      <ButtonWithIcon isRecording={isRecording} onClick={startRecognition} />

      {isTalking ? <IsTalking /> : <IsNotTalking />}
    </div>
  );
};

export default Home;
