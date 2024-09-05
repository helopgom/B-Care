import "./interactiveText.css";
import React, { useState, useEffect } from "react";
import useApi from "../../services/useApi";
import { userProfileEndpoint } from "../../config/urls";

function InteractiveText({ isTalking }) {
  const [name, setName] = useState("");
  const { request, data, error, loading } = useApi({
    apiEndpoint: userProfileEndpoint,
    method: "GET",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await request();
        const userName = response.data[0].name;
        setName(userName);
        localStorage.setItem("name", userName);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUserProfile();
  }, [request]);

  return (
    <div className="text-container">
      {isTalking ? (
        <p>Hablando...</p>
      ) : loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error al cargar el perfil del usuario.</p>
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
