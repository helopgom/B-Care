import React, { useState, useEffect } from "react";
import "./myAccount.css";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import UseApi from "../../services/useApi";
import { USER_DETAIL } from "../../config/urls";

const MyAccount = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const {
    data: userProfile,
    loading: userLoading,
    error: userError,
  } = UseApi({
    apiEndpoint: USER_DETAIL,
    method: "GET",
  });

  const handleEditPersonalData = () => {
    navigate("/editPersonalData");
  };

  const handleEditPreferences = () => {
    navigate("/editPreferences");
  };
  if (userLoading) {
    return <p>Loading...</p>;
  }

  if (userError) {
    return <p>Error: {userError}</p>;
  }

  return (
    <div className="my-account-container">
      <div className="card-container">
        <Card
          title="MIS DATOS"
          children={
            <>
              <p>Nombre: {userProfile?.first_name}</p>
              <p>Fecha nacimiento: {userProfile?.birth_date}</p>
              <p>Teléfono: {userProfile?.phone}</p>
            </>
          }
          onIconClick={handleEditPersonalData}
        />
        {/* <Card
          title="PREFERENCIAS"
          content={preferences}
          onIconClick={handleEditPreferences}
        /> */}
      </div>
      <div className="back-button">
        <Button
          text="VOLVER"
          backgroundColor="var(--white)"
          textColor="var(--black)"
          borderColor="var(--black)"
          onClick={handleBack}
        />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default MyAccount;
