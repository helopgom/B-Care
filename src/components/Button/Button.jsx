import React from "react";
import "./Button.css";

const Button = ({ text, backgroundColor, textColor, borderColor, url }) => {
  return (
    <button
      className="custom-button"
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
        borderColor: borderColor || "transparent",
      }}
      onClick={() => (window.location.href = url)}
    >
      {text}
    </button>
  );
};

export default Button;
