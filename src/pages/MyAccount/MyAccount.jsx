import React, { useState, useEffect } from "react";
import "./myAccount.css";
import Card from "../../components/Card/Card"; // Asegúrate de tener un componente Card
import Button from "../../components/Button/Button"; // El componente Button para el botón de volver

const MyAccount = () => {
  const [userData, setUserData] = useState({});
  const [preferences, setPreferences] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulación de llamadas a la API
        const userResponse = await fetch("/api/user"); // Reemplaza con tu URL de API
        const userData = await userResponse.json();
        setUserData(userData);

        const prefsResponse = await fetch("/api/preferences"); // Reemplaza con tu URL de API
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
    window.history.back(); // Volver a la página anterior en el historial
  };

  if (loading) {
    return <p>Loading...</p>; // Mostrar un mensaje de carga mientras se obtienen los datos
  }

  return (
    <div className="my-account-container">
      <div className="card-container">
        <Card title="Mis Datos" content={userData} />
        <Card title="Preferencias" content={preferences} />
      </div>
      <Button
        text="Volver"
        backgroundColor="var(--blue)" // Ajusta el color según sea necesario
        textColor="var(--white)"
        borderColor="var(--blue)"
        onClick={handleBack}
      />
    </div>
  );
};

export default MyAccount;
