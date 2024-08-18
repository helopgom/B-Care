import React from "react";
import "./buttonWithIcon.css";

const ButtonWithIcon = ({ isTalking, setIsTalking }) => {
  const handleClick = () => {
    setIsTalking(!isTalking); // Cambia el estado cuando se hace click
  };

  return (
    <div className="button-with-icon-container">
      <button onClick={handleClick} className="icon-button">
        <div
          className={`icon-container ${isTalking ? "talking" : "not-talking"}`}
        >
          <img
            src="public/assets/microphoneIcon.svg"
            alt="icon"
            className="icon-image"
          />
          {isTalking && (
            <>
              <div className="circle circle1"></div>
              <div className="circle circle2"></div>
              <div className="circle circle3"></div>
            </>
          )}
        </div>
      </button>
    </div>
  );
};

export default ButtonWithIcon;
