import React, { useState, useEffect } from "react";
import "./editPersonalData.css";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import UseApi from "../../services/useApi";
import { USER_DETAIL } from "../../config/urls";

const EditPersonalData = () => {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const {
    data: userProfile,
    loading: userLoading,
    error: userError,
  } = UseApi({
    apiEndpoint: USER_DETAIL,
    method: "GET",
  });
  useEffect(() => {
    if (userProfile) {
      setName(userProfile.first_name || "");
      const formattedBirthDate = userProfile.birth_date
        .split("-")
        .reverse()
        .join("-");
      setBirthDate(formattedBirthDate || "");
      setPhone(userProfile.phone || "");
    }
  }, [userProfile]);

  const handleSave = async () => {
    try {
      const response = await axios.put(
        USER_UPDATE,
        {
          first_name: name,
          birth_date: birthDate.split("-").reverse().join("-"),
          phone: phone,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Datos guardados:", response.data);

      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
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
