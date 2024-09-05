import React from "react";
import { Link } from "react-router-dom";

const FormateForm = ({
  label,
  id,
  name,
  type = "text",
  placeholder = "",
  pattern = "",
  minLength = 0,
  required = false,
  hint = "",
  value,
  className,
  onChange,
  onBlur,
  showHint,
}) => {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          pattern={pattern}
          minLength={minLength}
          placeholder={placeholder}
          aria-label="Sign up for a new account"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {showHint && hint && <p>{hint}</p>}
      </div>
    </div>
  );
};

export default FormateForm;
