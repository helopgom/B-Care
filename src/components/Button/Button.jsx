import React from "react";
import "./Button.css";

const Button = ({
  text,
  backgroundColor,
  textColor,
  borderColor,
  link,
  onClick,
}) => {
  return (
    <button
      className="custom-button"
      style={{ backgroundColor, color: textColor, borderColor }}
      onClick={onClick ? onClick : () => (window.location.href = link)}
    >
      {text}
    </button>
  );
};

export default Button;
