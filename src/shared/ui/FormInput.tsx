import { Eye, EyeOff, Lock } from "lucide-react";
import {
  UseFormRegister,
  FieldValues,
  Path,
  RegisterOptions,
  FieldError,
} from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
}

interface FormInputProps<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  type?: string;
  register: UseFormRegister<T>;
  validation?: RegisterOptions<T>;
  error?: FieldError;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
  options?: SelectOption[];
  showPasswordToggle?: boolean;
  isPasswordVisible?: boolean;
  onPasswordToggle?: () => void;
}

const FormInput = <T extends FieldValues>({
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
  showPasswordToggle = false,
  isPasswordVisible = false,
  onPasswordToggle,
}: FormInputProps<T>) => {
  const isPasswordField = type === "password";
  const inputType =
    isPasswordField && showPasswordToggle
      ? isPasswordVisible
        ? "text"
        : "password"
      : type;

  const baseClass = `bg-surface-2 border border-border-strong rounded-xl px-3 py-3 w-full text-text-1 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition ${
    isPasswordField ? "pl-11" : ""
  } ${isPasswordField && showPasswordToggle ? "pr-11" : ""}`;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-text-2">
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
        <div className="relative">
          {isPasswordField && (
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-3 pointer-events-none" />
          )}

          <input
            id={name}
            type={inputType}
            {...register(name, validation)}
            placeholder={placeholder}
            defaultValue={defaultValue}
            disabled={disabled}
            className={baseClass}
          />

          {isPasswordField && showPasswordToggle && (
            <button
              type="button"
              onClick={onPasswordToggle}
              disabled={disabled}
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-3 hover:text-text-1 transition-colors disabled:opacity-60"
            >
              {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
      )}

      {error && <p className="text-danger text-sm">{error.message}</p>}
    </div>
  );
};

export default FormInput;
