import "./interactiveText.css";
import React, { useState, useEffect } from "react";
import UseApi from "../../services/useApi";
import { USER_DETAIL } from "../../config/urls";

function InteractiveText({ name, isTalking }) {
  return (
    <div className="text-container">
      {isTalking ? (
        <p>Hablando...</p>
      ) : (
        <>
          {name && <p>¡Hola, {name}!</p>}
          <p>¿Cómo estás?</p>
          <p>¿Te apetece hablar?</p>
        </>
      )}
    </div>
  );
}

export default InteractiveText;
