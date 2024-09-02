import React, { useState, useEffect } from "react";
import "./home.css";
import InteractiveText from "../../components/InteractiveText/InteractiveText";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import ButtonWithIcon from "../../components/ButtonWithIcon/ButtonWithIcon";
import UseApi from "../../services/useApi";
import { USER_DETAIL } from "../../config/urls";

const Home = () => {
  const [isTalking, setIsTalking] = useState(false);

  const {
    data: userProfile,
    loading: userLoading,
    error: userError,
  } = UseApi({
    apiEndpoint: USER_DETAIL,
    method: "GET",
  });

  const handleFinish = () => {
    setIsTalking(false);
  };

  if (userLoading) {
    return <p>Loading...</p>;
  }

  if (userError) {
    return <p>Error: {userError}</p>;
  }

  return (
    <div className="home-container">
      <InteractiveText name={userProfile?.first_name} isTalking={isTalking} />
      <ButtonWithIcon isTalking={isTalking} setIsTalking={setIsTalking} />

      {!isTalking && (
        <div className="button-container">
          <Button
            text="MI CUENTA"
            backgroundColor="var(--white)"
            textColor="var(--black)"
            borderColor="var(--black)"
            link="/MyAccount"
          />
        </div>
      )}

      {isTalking && (
        <div className="finish-button-container">
          <Button
            text="FINALIZAR"
            backgroundColor="var(--black)"
            textColor="var(--white)"
            borderColor="var(--black)"
            link="#"
            onClick={handleFinish}
          />
        </div>
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
