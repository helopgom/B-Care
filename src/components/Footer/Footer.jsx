import "./footer.css";
import Button from "../Button/Button";

const Footer = () => {
  const handleEmergencyClick = () => {
    window.location.href = "tel:112";
  };

  return (
    <div className="footer">
      <Button
        text="EMERGENCIA"
        backgroundColor="var(--lightRed)"
        textColor="var(--white)"
        borderColor="var(--red)"
        onClick={handleEmergencyClick}
      />
    </div>
  );
};

export default Footer;
