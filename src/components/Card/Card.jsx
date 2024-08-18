import React from "react";
import "./Card.css";

const Card = ({ title, content, iconUrl }) => {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <div className="card-content">
        {Object.values(content).map((value, index) => (
          <p key={index} className="card-item">
            {value}
          </p>
        ))}
      </div>
      <a href={iconUrl} className="card-icon-link">
        <img
          src="public/assets/edit.svg"
          alt="Edit Icon"
          className="card-icon"
        />
      </a>
    </div>
  );
};

export default Card;
