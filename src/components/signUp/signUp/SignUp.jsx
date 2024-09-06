import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../../services/useApi";
import { BASE_URL, USER_REGISTER } from "../../../config/urls";
import FormateForm from "../form/FormateForm";
import "./signup.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birth_date: "",
    username: "",
    password: "",
  });

  const [isTyping, setIsTyping] = useState({
    name: false,
    email: false,
    phone: false,
    birth_date: false,
    username: false,
    password: false,
  });

  const { request, loading, error } = useApi({
    apiEndpoint: `${BASE_URL}register/`,
    method: "POST",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setIsTyping({
      ...isTyping,
      [name]: true,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setIsTyping({
      ...isTyping,
      [name]: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convertir la fecha a formato yyyy-mm-dd usando Date
    const formattedBirthDate = new Date(formData.birth_date)
      .toISOString()
      .split("T")[0];

    const requestData = {
      ...formData,
      birth_date: formattedBirthDate, // Aplicar el formato correcto
    };

    try {
      await request(requestData); // Enviar los datos corregidos
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
    }
  };

  const renderError = () => {
    if (!error) return null;
    if (typeof error === "object") {
      return (
        <ul style={{ color: "red" }}>
          {Object.entries(error).map(([key, value]) => (
            <li key={key}>{`${key}: ${value}`}</li>
          ))}
        </ul>
      );
    }
    return <p style={{ color: "red" }}>{error}</p>;
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <FormateForm
              label="Nombre"
              id="first_name"
              name="first_name"
              placeholder="Juan"
              pattern="^[A-Z][a-z]*$"
              required={true}
              hint="El nombre debe empezar por una letra mayúscula."
              value={formData.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              showHint={isTyping.first_name}
            />

            <FormateForm
              label="Username"
              id="username"
              name="username"
              placeholder="juan"
              minLength={3}
              pattern="\w{3,16}"
              required={true}
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              showHint={isTyping.username}
            />

            <FormateForm
              label="Teléfono"
              id="phone"
              name="phone"
              type="tel"
              placeholder="Escriba su número de móvil"
              pattern="^\+?[1-9]\d{1,14}$"
              required={true}
              minLength={9}
              maxLength={15}
              hint="Por favor, añada un número válido"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              showHint={isTyping.phone}
            />

            <FormateForm
              label="Fecha de nacimiento"
              id="birth-date"
              name="birth_date"
              type="date"
              required={true}
              placeholder="Añade tu fecha en formato yyyy-mm-dd"
              hint="Por favor añade una fecha válida."
              value={formData.birth_date}
              onChange={handleChange}
              onBlur={handleBlur}
              showHint={isTyping.birth_date}
            />

            <FormateForm
              label="Contraseña"
              id="password"
              name="password"
              type="password"
              placeholder="********"
              pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
              required={true}
              hint="Debe tener al menos 8 caracteres, una mayúscula, un número, y un caracter especial."
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              showHint={isTyping.password}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              CREAR USUARIO
            </button>
          </div>
        </form>

        <p className="login-link ">
          Ya tienes una cuenta?{" "}
          <a href="/login" className="text-secondary">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
