import React from "react";
import "./interactiveText.css";

const InteractiveText = ({ name, isTalking }) => {
  return (
    <div className="text-container">
      {isTalking ? (
        <p>Hablando...</p>
      ) : (
        <>
          <p>¡Hola, {name}!</p>
          <p>¿Cómo estás?</p>
          <p>¿Te apetece hablar?</p>
        </>
      )}
    </div>
  );
};

export default InteractiveText;
