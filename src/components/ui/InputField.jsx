// import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";

// const InputField = ({
//   label,
//   type = "text",
//   name,
//   value,
//   onChange,
//   placeholder,
//   icon: IconComponent,
//   error,
//   required = false,
//   disabled = false,
//   showPasswordToggle = false,
//   onPasswordToggle,
//   isPasswordVisible = false,
//   helpText,
//   className = "",
// }) => {
//   const getIconComponent = () => {
//     if (IconComponent) return IconComponent;

//     switch (type) {
//       case "email":
//         return Mail;
//       case "password":
//         return Lock;
//       case "tel":
//         return Phone;
//       case "text":
//         return User;
//       default:
//         return null;
//     }
//   };

//   const Icon = getIconComponent();
//   const inputType =
//     showPasswordToggle && type === "password"
//       ? isPasswordVisible
//         ? "text"
//         : "password"
//       : type;

//   return (
//     <div className={`space-y-2 ${className}`}>
//       {/* Label */}
//       {label && (
//         <label className="block text-xs sm:text-sm font-semibold text-slate-300">
//           {label}
//           {required && <span className="text-red-400 ml-1">*</span>}
//         </label>
//       )}

//       {/* Input Wrapper */}
//       <div className="relative group">
//         {/* Icon */}
//         {Icon && (
//           <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition pointer-events-none" />
//         )}

//         {/* Input */}
//         <input
//           type={inputType}
//           name={name}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           required={required}
//           disabled={disabled}
//           className={`w-full py-3 rounded-xl border transition-all duration-200 focus:outline-none
//             ${Icon ? "pl-12 pr-4" : "px-4"}
//             ${showPasswordToggle ? "pr-12" : ""}
//             ${
//               error
//                 ? "border-red-500/50 bg-red-500/10 text-slate-50 focus:border-red-500/75 focus:ring-2 focus:ring-red-500/20"
//                 : "border-slate-800/50 bg-slate-900/30 text-slate-50 placeholder-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
//             }
//             ${disabled ? "opacity-50 cursor-not-allowed bg-slate-900/20" : ""}
//             ${className}`}
//         />

//         {/* Password Toggle */}
//         {showPasswordToggle && type === "password" && (
//           <button
//             type="button"
//             onClick={onPasswordToggle}
//             className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
//             tabIndex="-1"
//           >
//             {isPasswordVisible ? (
//               <EyeOff className="w-5 h-5" />
//             ) : (
//               <Eye className="w-5 h-5" />
//             )}
//           </button>
//         )}
//       </div>

//       {/* Error Message */}
//       {error && <p className="text-xs text-red-400 font-medium">{error}</p>}

//       {/* Help Text */}
//       {helpText && !error && (
//         <p className="text-xs text-slate-400">{helpText}</p>
//       )}
//     </div>
//   );
// };

// export default InputField;

import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
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
}) => {
  const getIconComponent = () => {
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
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-xs sm:text-sm font-semibold text-slate-300">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}

      <div className="relative group">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition pointer-events-none" />
        )}

        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          {...rest}
          className={`w-full py-3 rounded-xl border transition-all duration-200 focus:outline-none
            ${Icon ? "pl-12 pr-4" : "px-4"}
            ${showPasswordToggle ? "pr-12" : ""}
            ${
              error
                ? "border-red-500/50 bg-red-500/10 text-slate-50 focus:border-red-500/75 focus:ring-2 focus:ring-red-500/20"
                : "border-slate-800/50 bg-slate-900/30 text-slate-50 placeholder-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
            }
            ${disabled ? "opacity-50 cursor-not-allowed bg-slate-900/20" : ""}
            ${className}`}
        />

        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            onClick={onPasswordToggle}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
            tabIndex="-1"
          >
            {isPasswordVisible ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {error && <p className="text-xs text-red-400 font-medium">{error}</p>}

      {helpText && !error && (
        <p className="text-xs text-slate-400">{helpText}</p>
      )}
    </div>
  );
};

export default InputField;
