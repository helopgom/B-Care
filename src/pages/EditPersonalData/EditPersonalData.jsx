import React, { useState, useEffect } from "react";
import "./editPersonalData.css";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import UseApi from "../../services/useApi";
import { USER_DETAIL, USER_UPDATE } from "../../config/urls";
import axios from "axios";

const EditPersonalData = () => {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [initialData, setInitialData] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Usar UseApi para obtener los datos iniciales del usuario
  const { data: userProfile, error: userError } = UseApi({
    apiEndpoint: USER_DETAIL,
    method: "GET",
  });

  useEffect(() => {
    if (userProfile) {
      setInitialData(userProfile);
      setName(userProfile.first_name || "");
      const formattedBirthDate = userProfile.birth_date
        .split("-")
        .reverse()
        .join("-");
      setBirthDate(formattedBirthDate || "");
      setPhone(userProfile.phone || "");
    } else if (userError) {
      console.error("Error al obtener los datos del usuario:", userError);
      setError("Error al obtener los datos del usuario.");
    }
  }, [userProfile, userError]);

  const handleSave = async () => {
    const updatedData = {};

    if (name !== initialData.first_name) {
      updatedData.first_name = name;
    }

    // Convertir la fecha al formato YYYY-MM-DD antes de enviarla al backend
    const [day, month, year] = birthDate.split("-");
    const formattedBirthDate = `${year}-${month}-${day}`;
    if (formattedBirthDate !== initialData.birth_date) {
      updatedData.birth_date = formattedBirthDate;
    }

    if (phone !== initialData.phone) {
      updatedData.phone = phone;
    }

    if (Object.keys(updatedData).length === 0) {
      setError("No has realizado ningún cambio.");
      return;
    }

    try {
      const token = "4c5f705bfaf12b5892c5f50222d06615390369aa"; // Usa el token hardcodeado
      const response = await axios.put(USER_UPDATE, updatedData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log("Datos guardados:", response.data);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/myaccount");
      }, 3000);
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      if (error.response && error.response.data) {
        setError(
          `Error al actualizar los datos: ${JSON.stringify(
            error.response.data
          )}`
        );
      } else {
        setError("Error al actualizar los datos. Inténtalo de nuevo.");
      }
    }
  };

  const handleCancel = () => {
    navigate("/myaccount");
  };

  return (
    <div className="edit-personal-data-page">
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
          {error && <p className="error">{error}</p>}
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

      {showPopup && (
        <div className="popup">
          <p>¡Datos guardados con éxito!</p>
        </div>
      )}
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default EditPersonalData;
