import React from "react";
import "./Button.css";

const Button = ({ text, color, url }) => {
  return (
    <button
      className="custom-button"
      style={{ backgroundColor: color }}
      onClick={() => (window.location.href = url)}
    >
      {text}
    </button>
  );
};

export default Button;
