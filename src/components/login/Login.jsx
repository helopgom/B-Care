import { useNavigate, useLocation, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import useApi from "../../services/useApi";
import { USER_LOGIN } from "../../config/urls";
import "./login.css";
import PopUp from "../PopUp/Popup";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const { request, loading, error } = useApi({
    apiEndpoint: USER_LOGIN,
    method: "POST",
  });
  const [logoutMessage, setLogoutMessage] = useState("");

  useEffect(() => {
    if (location.state?.logoutMessage) {
      setLogoutMessage(location.state.logoutMessage);
      navigate(location.pathname, { replace: true, state: {} });

      setTimeout(() => {
        setLogoutMessage("");
      }, 5000);
    }
  }, [location.state]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await request(formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", formData.username);
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const renderError = () => {
    if (!error) return null;
    if (typeof error === "object") {
      return (
        <ul>
          {Object.entries(error).map(([key, value]) => (
            <li key={key}>{`${key}: ${value}`}</li>
          ))}
        </ul>
      );
    }
    return <p>{error}</p>;
  };
  const handleRegister = (event) => {
    event.preventDefault();
    navigate("/register");
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-header">
          <img className="logo" src="public/assets/Logo.png" />
          <h3 className="b-care">B-CARE</h3>
          <p className="text-logo">Enjoyables conversations!</p>
        </div>
        {logoutMessage && (
          <PopUp message={logoutMessage} onClose={() => setLogoutMessage("")} />
        )}

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="label">
              Usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              aria-label="Ingresa tu usuario"
              className="input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="label">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              aria-label="Ingresa tu contraseña"
              className="input"
            />
          </div>

          {renderError()}

          <div>
            <button
              type="submit"
              className="submit-button"
              aria-label="Inicia sesión"
            >
              {loading ? "Iniciado sesión..." : "INICIAR SESIÓN"}
            </button>
          </div>
        </form>

        <p className="signup-text">NUEVOS CLIENTES</p>
        <p className="signup-low-text">
          Si todavía no estás registrado, crea una cuenta con nosotros
        </p>
        <button
          type="submit"
          className="new-account-button"
          aria-label="Crea tu nueva cuenta"
          onClick={handleRegister}
        >
          CREAR CUENTA
        </button>
      </div>
    </div>
  );
};

export default Login;
