import React, { useState } from "react";
import "./editPreferences.css";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const EditPreferences = () => {
  const [selectedTopics, setSelectedTopics] = useState(["Viajes", "Deportes"]); // Temáticas ya seleccionadas
  const [newTopic, setNewTopic] = useState("");
  const navigate = useNavigate();

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
    navigate("/myaccount"); // Navegar de vuelta a "MyAccount" después de guardar
  };

  const handleCancel = () => {
    navigate("/myaccount"); // Navegar de vuelta a "MyAccount" si se cancela
  };

  return (
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
          placeholder="Escriba un tema del que te guste hablar"
        />
        <button className="add-topic-button" onClick={handleAddTopic}>
          Añadir
        </button>
      </div>
      <div className="button-group">
        <Button
          text="Guardar"
          backgroundColor="var(--blue)"
          textColor="var(--white)"
          borderColor="var(--blue)"
          onClick={handleSave}
        />
        <Button
          text="Cancelar"
          backgroundColor="var(--red)"
          textColor="var(--white)"
          borderColor="var(--red)"
          onClick={handleCancel}
        />
      </div>
      <Footer />
    </div>
  );
};

export default EditPreferences;
