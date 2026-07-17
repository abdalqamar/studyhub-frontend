interface StrengthMeta {
  label: string;
  color: string;
  text: string;
}

const strengthMeta: StrengthMeta[] = [
  { label: "Weak", color: "bg-red-400", text: "text-red-400" },
  { label: "Fair", color: "bg-amber-400", text: "text-amber-400" },
  { label: "Good", color: "bg-indigo-400", text: "text-indigo-400" },
  { label: "Strong", color: "bg-emerald-400", text: "text-emerald-400" },
];

const PasswordStrengthMeter = ({
  password,
  strength,
}: {
  password: string;
  strength: number;
}) => {
  if (!password) return null;
  const meta = strengthMeta[Math.min(strength, 3)];
  return (
    <div className="mt-2.5 flex items-center gap-2">
      <div className="flex gap-1 flex-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${i < strength ? meta.color : "bg-slate-700/50"}`}
          />
        ))}
      </div>
      <span className={`font-['JetBrains_Mono'] text-[10px] ${meta.text}`}>
        {meta.label}
      </span>
    </div>
  );
};

export const calcPasswordStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
  return strength;
};

export default PasswordStrengthMeter;
