import React, { useState } from "react";
import "./editPersonalData.css";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const EditPersonalData = () => {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    console.log("Datos guardados:", { name, birthDate, phone });
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const handleCancel = () => {
    navigate("/myaccount");
  };

  return (
    <div className="edit-personal-data-page">
      <div className="edit-personal-data-content">
        <div className="edit-personal-data-container">
          <h2>Editar Datos Personales</h2>
          <form>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Fecha de Nacimiento</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
          </form>
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

export default EditPersonalData;
