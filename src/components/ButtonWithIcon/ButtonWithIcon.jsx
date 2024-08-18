import React, { useState } from "react";
import InteractiveText from "../InteractiveText/InteractiveText";
import "./buttonWithIcon.css";

const ButtonWithIcon = ({ name }) => {
  const [isTalking, setIsTalking] = useState(false);

  const handleClick = () => {
    setIsTalking(!isTalking);
  };

  return (
    <div className="button-with-icon-container">
      <button onClick={handleClick} className="icon-button">
        <div className={`icon-container ${isTalking ? "talking" : ""}`}>
          <img
            src={
              isTalking
                ? "public/assets/microphone.svg"
                : "public/assets/microphone.svg"
            }
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
