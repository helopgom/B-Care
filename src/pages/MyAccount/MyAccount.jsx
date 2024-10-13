import React, { useEffect, useState } from "react";
import "./myaccount.css";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import useApi from "../../services/useApi";
import { userProfileEndpoint } from "../../config/urls";
import Logout from "../../components/LogOut/Logout";

const MyAccount = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("");
  const { request, data, error, loading } = useApi({
    apiEndpoint: userProfileEndpoint,
    method: "GET",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await request();
        const userProfileData = response?.data?.[0];
        if (userProfileData) {
          console.log(JSON.stringify(userProfileData));
          setUserProfile(userProfileData);
          localStorage.setItem("name", userProfileData.name);
        } else {
          console.error("No user profile data found.");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUserProfile();
  }, [request]);

  const handleBack = () => {
    navigate("/home");
  };

  const handleEditPersonalData = () => {
    navigate("/editPersonalData");
  };

  const handleEditPreferences = () => {
    navigate("/editPreferences");
  };
  const handleLogoutClick = () => {
    setShowLogout(true);
  };
  const handleLogoutSuccess = () => {
    console.log("Sesión cerrada exitosamente");
    navigate("/", {
      state: { logoutMessage: "Has cerrado sesión exitosamente." },
    });
  };

  const handleLogoutError = (errorMessage) => {
    navigate("/home", { state: { logoutError: errorMessage } });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!userProfile) {
    return <p>No user profile found</p>;
  }

  const { name, birth_date, phone, preferences } = userProfile;

  const preferencesArray = preferences ? preferences.split(", ") : [];

  const maxPreferencesToShow = 2;
  const displayedPreferences = preferencesArray.slice(0, maxPreferencesToShow);
  const remainingPreferences = preferencesArray.length - maxPreferencesToShow;

  return (
    <div className="my-account-container">
      <div className="card-container">
        <Card title="MIS DATOS" onIconClick={handleEditPersonalData}>
          <p>Nombre: {name}</p>
          <p>Fecha nacimiento: {birth_date}</p>
          <p>Teléfono: {phone}</p>
        </Card>

        <Card title="PREFERENCIAS" onIconClick={handleEditPreferences}>
          {preferencesArray.length > 0 ? (
            <>
              {displayedPreferences.map((pref, index) => (
                <p key={index}>{pref}</p>
              ))}
              {remainingPreferences > 0 && (
                <p>y {remainingPreferences} más...</p>
              )}
            </>
          ) : (
            <p>No hay preferencias disponibles</p>
          )}
        </Card>
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
      <div className="logout-button">
        <Button
          text="Cerrar Sesión"
          backgroundColor="var(--white)"
          textColor="var(--black)"
          borderColor="var(--pink)"
          onClick={handleLogoutClick}
        />
      </div>

      {showLogout && (
        <Logout
          onLogoutSuccess={handleLogoutSuccess}
          onLogoutError={handleLogoutError}
        />
      )}
      {logoutMessage && <PopUp message={logoutMessage} onClose={closePopUp} />}
    </div>
  );
};

export default MyAccount;
