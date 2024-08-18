import React, { useState, useEffect } from "react";
import "./home.css";
import InteractiveText from "../../components/InteractiveText/InteractiveText";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import ButtonWithIcon from "../../components/ButtonWithIcon/ButtonWithIcon";

const Home = () => {
  const [name, setName] = useState("");
  const [isTalking, setIsTalking] = useState(false);

  useEffect(() => {
    const fetchName = async () => {
      const fetchedName = "Juan"; // Simulación de obtención de nombre
      setName(fetchedName);
    };

    fetchName();
  }, []);

  const handleFinish = () => {
    setIsTalking(false); // Finaliza el estado de "Hablando"
  };

  return (
    <div className="home-container">
      <InteractiveText name={name} isTalking={isTalking} />
      <ButtonWithIcon isTalking={isTalking} setIsTalking={setIsTalking} />
      {/* Renderizar condicionalmente el botón "MI CUENTA" */}
      {!isTalking && (
        <div className="button-container">
          <Button
            text="MI CUENTA"
            backgroundColor="var(--white)"
            textColor="var(--black)"
            borderColor="var(--black)"
            url="#"
          />
        </div>
      )}
      {/* Renderizar condicionalmente el botón "Finalizar" */}
      {isTalking && (
        <div className="finish-button-container">
          <Button
            text="FINALIZAR"
            backgroundColor="var(--black)" // Ajusta el color según sea necesario
            textColor="var(--white)"
            borderColor="var(--black)"
            url="#"
            onClick={handleFinish}
          />
        </div>
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
