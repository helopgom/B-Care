import React, { useState, useEffect } from "react";
import "./editPersonalData.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import useApi from "../../services/useApi";
import { userProfileEndpoint } from "../../config/urls";
import axios from "axios";

const EditPersonalData = () => {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
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
        setName(userProfileData.name || "");
        setBirthDate(userProfileData.birth_date || "");
        setPhone(userProfileData.phone || "");
      } catch (err) {
        console.error("Error al obtener los datos del usuario:", err);
        setError("Error al obtener los datos del usuario.");
      }
    };

    fetchUserProfile();
  }, [request]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    const requestData = {};

    if (name !== userProfile.name) {
      requestData.name = name;
    }
    if (birthDate !== userProfile.birth_date) {
      requestData.birth_date = new Date(birthDate).toISOString().split("T")[0];
    }
    if (phone !== userProfile.phone) {
      requestData.phone = phone;
    }

    if (Object.keys(requestData).length === 0) {
      console.log("No se han realizado cambios.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      const url = `${userProfileEndpoint}${userId}/`;

      await axios.patch(url, requestData, config);
      setShowPopup(true);
      console.log("User updated successfully!");
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
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
    <div className="edit-personal-data-page">
      <div className="edit-personal-data-container">
        <h2>Editar Datos Personales</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name-input">Nombre</label>
            <input
              id="name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Fecha de Nacimiento</label>
            <input
              type="date"
              className="date"
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
          <div className="save-button-personal-data">
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
      <div className="cancel-button-personal-data">
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
    </div>
  );
};

export default EditPersonalData;
