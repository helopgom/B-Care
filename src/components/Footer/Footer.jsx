import React from "react";
import "./footer.css";
import Button from "../Button/Button";

const Footer = () => {
  const handleEmergencyClick = () => {
    window.location.href = "tel:112";
  };

  return (
    <div className="footer-container">
      <hr id="separator" />
      <div id="emergency">
        <Button
          text="EMERGENCIA"
          backgroundColor="var(--lightRed)"
          textColor="var(--white)"
          borderColor="var(--red)"
          onClick={handleEmergencyClick}
        />
      </div>
    </div>
  );
};

export default Footer;
