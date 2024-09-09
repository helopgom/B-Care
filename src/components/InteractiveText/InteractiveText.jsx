import "./interactiveText.css";
import React, { useState, useEffect } from "react";
import useApi from "../../services/useApi";
import { userProfileEndpoint } from "../../config/urls";

function InteractiveText({ isTalking }) {
  const [name, setName] = useState("");
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [hasTalked, setHasTalked] = useState(false);

  const { request, loading, error } = useApi({
    apiEndpoint: userProfileEndpoint,
    method: "GET",
  });

  const fetchUserProfile = async () => {
    try {
      const response = await request();
      if (response && response.data && response.data.length > 0) {
        const userName = response.data[0].name;
        setName(userName);
        localStorage.setItem("name", userName);
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (isTalking) {
      setHasTalked(true);
    }

    if (!isTalking && hasTalked) {
      setShowFinalMessage(true);
    }
  }, [isTalking, hasTalked]);

  return (
    <div className="text-container">
      {isTalking ? (
        <p>Hablando...</p>
      ) : loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error al cargar el perfil del usuario.</p>
      ) : showFinalMessage ? (
        <p>¿Te apetece hablar de otra cosa?</p>
      ) : (
        <>
          {name && <p>¡Hola, {name}!</p>}
          <p>¿Cómo estás?</p>
          <p>¿Te apetece hablar?</p>
        </>
      )}
    </div>
  );
}

export default InteractiveText;
