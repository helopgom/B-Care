import React from "react";
import "./buttonWithIcon.css";

const ButtonWithIcon = ({ isRecording, onClick }) => {
  return (
    <div className="button-with-icon-container">
      <button onClick={onClick} className="icon-button">
        <div
          className={`icon-container ${
            isRecording ? "talking" : "not-talking"
          }`}
        >
          <img
            src="public/assets/microphoneIcon.svg"
            alt="icon"
            className="icon-image"
          />
          {isRecording && (
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
