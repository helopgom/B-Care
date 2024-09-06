import React, { useState } from "react";
import "./editPreferences.css";
import Button from "../../components/Button/Button";
import useApi from "../../services/useApi"; // Asegúrate de usar "useApi" en lugar de "UseApi"
import { USER_UPDATE, userProfileEndpoint } from "../../config/urls";
import axios from "axios";

const EditPreferences = () => {
  const [newTopic, setNewTopic] = useState(""); // Nombre de la preferencia
  const [showPopup, setShowPopup] = useState(false);

  // Cargar datos del perfil del usuario
  const {
    data: userProfile,
    loading,
    error,
  } = useApi({
    apiEndpoint: userProfileEndpoint,
    method: "GET",
  });

  const handleAddTopic = async () => {
    if (newTopic.trim() !== "") {
      try {
        const token = localStorage.getItem("token");

        console.log("Datos a enviar:", { preferences: [newTopic] });

        const response = await axios.put(
          USER_UPDATE,
          { preferences: [newTopic] },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        console.log("Preferencia guardada:", response.data);

        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      } catch (error) {
        console.error("Error al guardar la preferencia:", error);
      }

      setNewTopic(""); // Limpiar el campo de entrada
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Evita que el formulario se envíe
      handleAddTopic();
    }
  };

  const handleCancel = () => {
    window.history.back(); // Navegar hacia atrás
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error al cargar los datos del usuario: {error}</p>;
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
            onKeyDown={handleKeyDown} // Captura la tecla "Enter"
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
