import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../../services/useApi";
import { USER_REGISTER } from "../../../config/urls";
import FormateForm from "../form/FormateForm";
import "./signup.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    birth_date: "",
    username: "",
    password: "",
  });

  const [isTyping, setIsTyping] = useState({
    first_name: false,
    last_name: false,
    email: false,
    phone: false,
    birth_date: false,
    username: false,
    password: false,
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { request } = useApi({
    apiEndpoint: USER_REGISTER,
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
    setMessage("");
    try {
      const response = await request(formData);
      if (response.status === 201) {
        setMessage("User created successfully.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setMessage("Error occurred during registration.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form bg-primary p-8 rounded-lg shadow-lg">
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group space-y-6">
            <FormateForm
              label="First Name"
              id="first_name"
              name="first_name"
              placeholder="Juan"
              pattern="^[A-Z][a-z]*$"
              required={true}
              hint="Name must start with an uppercase letter."
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
              label="Phone"
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              pattern="^\+?[1-9]\d{1,14}$"
              required={true}
              minLength={9}
              maxLength={15}
              hint="Please enter a valid phone."
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              showHint={isTyping.phone}
            />

            <FormateForm
              label="Birth Date"
              id="birth-date"
              name="birth_date"
              type="date"
              required={true}
              placeholder="Enter your birth date yyyy-mm-dd"
              hint="Please enter a valid birth date."
              value={formData.birth_date}
              onChange={handleChange}
              onBlur={handleBlur}
              showHint={isTyping.birth_date}
            />

            <FormateForm
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="********"
              pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
              required={true}
              hint="Must be at least 8 characters, include one uppercase letter, one number, and one special character."
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              showHint={isTyping.password}
            />
          </div>

          <div className="form-actions mt-6 flex items-center justify-end gap-x-6">
            <button type="submit" className="submit-btn">
              Create User
            </button>
          </div>
        </form>

        <p className="login-link mt-10 text-center text-sm">
          You already have an account?{" "}
          <a href="/login" className="text-secondary hover:text-yellow-500">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
