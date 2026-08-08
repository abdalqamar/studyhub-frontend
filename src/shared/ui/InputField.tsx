import { forwardRef, InputHTMLAttributes } from "react";
import { Mail, Lock, User, Phone, Eye, EyeOff, LucideIcon } from "lucide-react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
  error?: string;
  helpText?: string;
  showPasswordToggle?: boolean;
  onPasswordToggle?: () => void;
  isPasswordVisible?: boolean;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      type = "text",
      placeholder,
      icon: IconComponent,
      error,
      required = false,
      disabled = false,
      showPasswordToggle = false,
      onPasswordToggle,
      isPasswordVisible = false,
      helpText,
      className = "",
      ...rest
    },
    ref
  ) => {
    const getIconComponent = (): LucideIcon | null => {
      if (IconComponent) return IconComponent;

      switch (type) {
        case "email":
          return Mail;
        case "password":
          return Lock;
        case "tel":
          return Phone;
        case "text":
          return User;
        default:
          return null;
      }
    };

    const Icon = getIconComponent();
    const inputType =
      showPasswordToggle && type === "password"
        ? isPasswordVisible
          ? "text"
          : "password"
        : type;

    return (
      <div className={`space-y-1.5 ${className}`}>
        {label && (
          <label className="block text-xs font-semibold text-text-2">
            {label}
            {required && <span className="text-danger ml-1">*</span>}
          </label>
        )}

        <div className="relative group">
          {Icon && (
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-3 group-focus-within:text-gold transition pointer-events-none" />
          )}

          <input
            ref={ref}
            type={inputType}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            {...rest}
            className={`w-full py-2.5 text-sm rounded-lg border transition-all duration-200 focus:outline-none
              ${Icon ? "pl-9 pr-3" : "px-3"}
              ${showPasswordToggle ? "pr-10" : ""}
              ${
                error
                  ? "border-danger/50 bg-danger-soft text-text-1 focus:border-danger/75 focus:ring-2 focus:ring-danger/20"
                  : "border-border bg-surface-2 text-text-1 placeholder-text-3 focus:border-gold/50 focus:ring-2 focus:ring-gold/20"
              }
              ${disabled ? "opacity-50 cursor-not-allowed bg-surface-2/50" : ""}
            `}
          />

          {showPasswordToggle && type === "password" && (
            <button
              type="button"
              onClick={onPasswordToggle}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-3 hover:text-text-2 transition"
              tabIndex={-1}
            >
              {isPasswordVisible ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {error && <p className="text-xs text-danger font-medium">{error}</p>}
        {helpText && !error && (
          <p className="text-xs text-text-2">{helpText}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
