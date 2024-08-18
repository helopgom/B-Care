import React from "react";
import "./footer.css";
import Button from "../Button/Button";

const Footer = () => {
  return (
    <div className="footer-container">
      <hr id="separator" />
      <div id="emergency">
        <Button
          text="EMERGENCIA"
          backgroundColor="var(--lightRed)"
          textColor="var(--white)"
          borderColor="var(--red)"
          url="#"
        />
      </div>
    </div>
  );
};

export default Footer;
