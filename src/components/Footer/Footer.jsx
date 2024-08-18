import React, { useState, useEffect } from "react";
import "./footer.css";
import Button from "../Button/Button";

const Footer = () => {
  return (
    <div>
      <hr id="separator"></hr>
      <Button id="emergency" text="EMERGENCIA" color="#D54E5D" />
    </div>
  );
};

export default Footer;
