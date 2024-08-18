import React from "react";
import "./Card.css";

const Card = ({ title, content, onIconClick }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-content">
        {Object.values(content).map((value, index) => (
          <p key={index}>{value}</p>
        ))}
      </div>
      <button className="edit-icon-button" onClick={onIconClick}>
        <img src="public/assets/edit.svg" alt="Editar" className="edit-icon" />
      </button>
    </div>
  );
};

export default Card;
