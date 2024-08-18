import React from "react";
import "./Button.css";

const Button = ({
  text,
  backgroundColor,
  textColor,
  borderColor,
  url,
  onClick,
}) => {
  return (
    <button
      className="custom-button"
      style={{ backgroundColor, color: textColor, borderColor }}
      onClick={onClick ? onClick : () => (window.location.href = url)}
    >
      {text}
    </button>
  );
};

export default Button;
