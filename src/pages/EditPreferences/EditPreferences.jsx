import React, { useState, useEffect } from "react";
import "./editPreferences.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import useApi from "../../services/useApi";
import { userProfileEndpoint, USER_UPDATE } from "../../config/urls";
import axios from "axios";

const EditPreferences = () => {
  const [newTopic, setNewTopic] = useState(""); // Nueva preferencia
  const [preferences, setPreferences] = useState([]); // Lista de preferencias
  const [userId, setUserId] = useState(null); // Estado para almacenar el ID del usuario
  const [userProfile, setUserProfile] = useState(null); // Para manejar el perfil completo
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // Usar el hook useApi para obtener el perfil del usuario
  const {
    request,
    data,
    loading,
    error: userError,
  } = useApi({
    apiEndpoint: userProfileEndpoint,
    method: "GET",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await request();
        const userProfileData = response.data[0]; // Obtener el primer objeto del array
        setUserProfile(userProfileData);
        setUserId(userProfileData.id); // Guardar el ID del usuario en el estado
        setPreferences(
          userProfileData.preferences
            ? userProfileData.preferences.split(", ")
            : []
        ); // Dividir las preferencias si vienen en string
      } catch (err) {
        console.error("Error al obtener los datos del usuario:", err);
        setError("Error al obtener los datos del usuario.");
      }
    };

    fetchUserProfile();
  }, [request]);

  // Función para agregar una nueva preferencia
  const handleAddTopic = async () => {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    if (newTopic.trim() === "") return;

    try {
      // Concatenar preferencias como un string separado por comas
      const updatedPreferences = [...preferences, newTopic].join(", ");

      console.log("Datos a enviar: ", { preferences: updatedPreferences });

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      const url = `${USER_UPDATE}${userId}/`; // URL dinámica para actualizar las preferencias del usuario

      // Realizar la solicitud PATCH enviando las preferencias como un string concatenado
      await axios.patch(url, { preferences: updatedPreferences }, config);

      setPreferences(updatedPreferences.split(", ")); // Actualizar las preferencias en el estado local como un array
      setShowPopup(true); // Mostrar popup de éxito
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      setNewTopic(""); // Limpiar el campo de entrada
      console.log("Preferencia guardada con éxito");
    } catch (err) {
      console.error(
        "Error al guardar la preferencia:",
        err.response?.data || err.message
      );
      setError(err.response?.data || "Error al guardar la preferencia.");
    }
  };

  // Función para eliminar una preferencia
  const handleRemoveTopic = async (topic) => {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    try {
      // Eliminar la preferencia y concatenar las preferencias restantes en un string
      const updatedPreferences = preferences
        .filter((pref) => pref !== topic)
        .join(", ");

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      const url = `${USER_UPDATE}${userId}/`; // URL dinámica para actualizar las preferencias del usuario

      // Realizar la solicitud PATCH enviando las preferencias como un string concatenado
      await axios.patch(url, { preferences: updatedPreferences }, config);

      setPreferences(updatedPreferences.split(", ")); // Actualizar preferencias en el estado local
      console.log("Preferencia eliminada con éxito");
    } catch (err) {
      console.error(
        "Error al eliminar la preferencia:",
        err.response?.data || err.message
      );
      setError(err.response?.data || "Error al eliminar la preferencia.");
    }
  };

  // Manejar la tecla Enter para añadir una preferencia
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTopic();
    }
  };

  const handleCancel = () => {
    navigate("/myaccount");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (userError) {
    return <p>Error al cargar los datos: {userError}</p>;
  }

  return (
    <div className="edit-preferences-page">
      <div className="edit-preferences-container">
        <h2>Editar Preferencias</h2>
        <div className="form-group">
          <label>Añade Temática</label>
          <input
            type="text"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escriba un tema del que te guste hablar"
            style={{ maxWidth: "100%" }}
          />
        </div>
        <div className="save-button">
          <Button
            text="Guardar"
            backgroundColor="var(--black)"
            textColor="var(--white)"
            borderColor="var(--blue)"
            onClick={handleAddTopic}
          />
        </div>

        {/* Lista de preferencias actuales */}
        <div className="preferences-list">
          <h3>Tus Preferencias</h3>
          <ul>
            {preferences.map((topic, index) => (
              <li key={index}>
                {topic}{" "}
                <button
                  onClick={() => handleRemoveTopic(topic)}
                  className="remove-btn"
                >
                  eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>

        {error && (
          <p className="error">
            {typeof error === "object" ? JSON.stringify(error) : error}
          </p>
        )}
      </div>

      <div className="cancel-button">
        <Button
          text="Cancelar"
          backgroundColor="var(--white)"
          textColor="var(--black)"
          borderColor="var(--black)"
          onClick={handleCancel}
        />
      </div>

      {showPopup && (
        <div className="popup">
          <p>¡Preferencia guardada con éxito!</p>
        </div>
      )}
    </div>
  );
};

export default EditPreferences;
