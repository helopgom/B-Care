import React from "react";
import "./card.css";

const Card = ({ title, children, onIconClick }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-content">{children}</div>
      <button className="edit-icon-button" onClick={onIconClick}>
        <img src="public/assets/edit.svg" alt="Editar" className="edit-icon" />
      </button>
    </div>
  );
};

export default Card;
