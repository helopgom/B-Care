import React, { useState, useEffect } from "react";
import "./myAccount.css";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const MyAccount = () => {
  const [userData, setUserData] = useState({});
  const [preferences, setPreferences] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch("/api/user");
        const userData = await userResponse.json();
        setUserData(userData);

        const prefsResponse = await fetch("/api/preferences");
        const preferences = await prefsResponse.json();
        setPreferences(preferences);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleEditPersonalData = () => {
    navigate("/editPersonalData");
  };

  const handleEditPreferences = () => {
    navigate("/editPreferences");
  };

  return (
    <div className="my-account-container">
      <div className="card-container">
        <Card
          title="MIS DATOS"
          content={userData}
          onIconClick={handleEditPersonalData}
        />
        <Card
          title="PREFERENCIAS"
          content={preferences}
          onIconClick={handleEditPreferences}
        />
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
