import React, { useState } from "react";
import "./editPersonalData.css";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const EditPersonalData = () => {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    // Aquí iría la lógica para guardar los datos a través del CRUD
    console.log("Datos guardados:", { name, birthDate, phone });
    navigate("/myaccount"); // Navegar de vuelta a "MyAccount" después de guardar
  };

  const handleCancel = () => {
    navigate("/myaccount"); // Navegar de vuelta a "MyAccount" si se cancela
  };

  return (
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
        <div className="button-group">
          <button type="button" onClick={handleSave}>
            Guardar
          </button>
          <button type="button" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default EditPersonalData;
