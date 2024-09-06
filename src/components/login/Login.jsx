import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import useApi from "../../services/useApi";
import { USER_LOGIN } from "../../config/urls";
import "./login.css";
import Button from "../Button/Button";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { request, loading, error } = useApi({
    apiEndpoint: USER_LOGIN,
    method: "POST",
  });

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
      navigate("/");
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

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-header">
          <h2 className="Welcome">Welcome!</h2>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="label">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              aria-label="Enter your username"
              className="input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              aria-label="Enter your password"
              className="input"
            />
          </div>

          {renderError()}

          <div>
            <button
              type="submit"
              className="submit-button"
              aria-label="Sign in to your account"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <p className="signup-text">
          NUEVOS CLIENTES
          <Link
            to="/register"
            className="signup-link"
            aria-label="Sign up for a new account"
          >
            Registra
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
