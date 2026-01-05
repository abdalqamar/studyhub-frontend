import React from "react";

const Input = ({ type, name, disabled, value, onChange, placeholder }) => {
  return (
    <input
      type={type}
      name={name}
      disabled={disabled}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="bg-surface-bg border border-slate-700 rounded-lg px-3 py-2 w-full disabled:opacity-60"
    />
  );
};

export default Input;
