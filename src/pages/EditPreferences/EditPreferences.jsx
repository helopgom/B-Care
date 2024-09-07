import React, { useState, useEffect } from "react";
import "./editPreferences.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import useApi from "../../services/useApi";
import { userProfileEndpoint, USER_UPDATE } from "../../config/urls";
import axios from "axios";

const EditPreferences = () => {
  const [newTopic, setNewTopic] = useState("");
  const [preferences, setPreferences] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

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
        const userProfileData = response.data[0];
        setUserProfile(userProfileData);
        setUserId(userProfileData.id);
        setPreferences(
          userProfileData.preferences
            ? userProfileData.preferences.split(", ")
            : []
        );
      } catch (err) {
        console.error("Error al obtener los datos del usuario:", err);
        setError("Error al obtener los datos del usuario.");
      }
    };

    fetchUserProfile();
  }, [request]);

  const handleAddTopic = async () => {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    if (newTopic.trim() === "") {
      setError("El tema no puede estar vacío.");
      return;
    }

    if (preferences.includes(newTopic.trim())) {
      setError("Este tema ya está en tus preferencias.");
      return;
    }

    try {
      const updatedPreferences = [...preferences, newTopic.trim()].join(", ");

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      const url = `${USER_UPDATE}${userId}/`;

      await axios.patch(url, { preferences: updatedPreferences }, config);

      setPreferences(updatedPreferences.split(", "));
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      setNewTopic("");
      setError(null);
      console.log("Preferencia guardada con éxito");
    } catch (err) {
      console.error(
        "Error al guardar la preferencia:",
        err.response?.data || err.message
      );
      setError(err.response?.data || "Error al guardar la preferencia.");
    }
  };

  const handleRemoveTopic = async (topic) => {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    try {
      const updatedPreferencesArray = preferences.filter(
        (pref) => pref !== topic
      );

      const updatedPreferences =
        updatedPreferencesArray.length > 0
          ? updatedPreferencesArray.join(", ")
          : null;

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      const url = `${USER_UPDATE}${userId}/`;

      await axios.patch(url, { preferences: updatedPreferences }, config);

      setPreferences(
        updatedPreferencesArray.length > 0 ? updatedPreferencesArray : []
      );
      console.log("Preferencia eliminada con éxito");
    } catch (err) {
      console.error(
        "Error al eliminar la preferencia:",
        err.response?.data || err.message
      );
      setError(err.response?.data || "Error al eliminar la preferencia.");
    }
  };

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
        <div className="preferences-list">
          <h3>Tus Preferencias</h3>
          {preferences.length > 0 ? (
            <ul className="preferences">
              {preferences.map((topic, index) => (
                <li key={index}>
                  {topic}{" "}
                  <button
                    onClick={() => handleRemoveTopic(topic)}
                    className="remove-btn"
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="preferences">No tienes preferencias guardadas.</p>
          )}
        </div>
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
