import React from "react";

const FormInput = ({
  label,
  name,
  type = "text",
  register,
  validation = {},
  error,
  disabled = false,
  placeholder = "",
  defaultValue = "",
  options = [],
}) => {
  const baseClass = `bg-surface-bg border border-slate-700 rounded-xl px-3 py-3 w-full disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-300">
          {label}
        </label>
      )}

      {type === "select" ? (
        <select
          id={name}
          {...register(name, validation)}
          defaultValue={defaultValue}
          disabled={disabled}
          className={baseClass}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={name}
          {...register(name, validation)}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          className={`${baseClass} min-h-[120px] resize-none`}
        />
      ) : (
        <input
          id={name}
          type={type}
          {...register(name, validation)}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          className={baseClass}
        />
      )}

      {error && <p className="text-red-400 text-sm ">{error.message}</p>}
    </div>
  );
};

export default FormInput;
