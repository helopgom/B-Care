import React, { useState } from "react";
import "./editPreferences.css";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";

const EditPreferences = () => {
  const [selectedTopics, setSelectedTopics] = useState(["Viajes", "Deportes"]);
  const [newTopic, setNewTopic] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleAddTopic = () => {
    if (newTopic.trim() !== "" && !selectedTopics.includes(newTopic)) {
      setSelectedTopics([...selectedTopics, newTopic]);
      setNewTopic(""); // Limpia el campo de entrada después de añadir
    }
  };

  const handleRemoveTopic = (topic) => {
    setSelectedTopics(selectedTopics.filter((t) => t !== topic));
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar las preferencias a través del CRUD
    console.log("Temáticas guardadas:", selectedTopics);

    // Mostrar el popup de éxito
    setShowPopup(true);

    // Ocultar el popup después de 3 segundos
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const handleCancel = () => {
    // Volver a la página anterior
    window.history.back();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Evita que el formulario se envíe si es un <form>
      handleAddTopic();
    }
  };

  return (
    <div className="edit-preferences-page">
      <div className="edit-preferences-container">
        <h2>Editar Preferencias</h2>
        <div className="form-group">
          <label>Temáticas Escogidas</label>
          <div className="selected-topics">
            {selectedTopics.map((topic, index) => (
              <div key={index} className="topic-item">
                {topic}
                <button
                  className="remove-topic-button"
                  onClick={() => handleRemoveTopic(topic)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Añade Temáticas</label>
          <input
            type="text"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            onKeyDown={handleKeyDown} // Captura la tecla "Enter"
            placeholder="Escriba un tema del que te guste hablar"
          />
        </div>
        <div className="save-button">
          <Button
            text="Guardar"
            backgroundColor="var(--black)"
            textColor="var(--white)"
            borderColor="var(--blue)"
            onClick={handleSave}
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
          <p>¡Datos guardados con éxito!</p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default EditPreferences;
