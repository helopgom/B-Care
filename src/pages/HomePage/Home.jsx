import React, { useState, useEffect } from "react";
import "./home.css";
import InteractiveText from "../../components/InteractiveText/InteractiveText";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import ButtonWithIcon from "../../components/ButtonWithIcon/ButtonWithIcon";

const Home = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    // Aquí hacer llamada al CRUD para tener el nombre dinámico.
    // Mientras se simula que se obtiene el nombre "Juan" de la base de datos.
    const fetchName = async () => {
      // Simulando una llamada a la base de datos
      const fetchedName = "Juan"; // Esto lo obtendrás de tu CRUD
      setName(fetchedName);
    };

    fetchName();
  }, []);

  return (
    <div className="Home">
      <InteractiveText name={name} />
      <ButtonWithIcon />
      <Button text="MI CUENTA" color="" url="" />
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
