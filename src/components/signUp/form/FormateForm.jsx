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
      <label
        htmlFor={id}
        className={`block text-sm font-medium leading-6 ${className}`}
      >
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
          className="px-3 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-primary focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          aria-label="Sign up for a new account"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {showHint && hint && (
          <p className="text-sm leading-6 text-white">{hint}</p>
        )}
      </div>
    </div>
  );
};

export default FormateForm;
