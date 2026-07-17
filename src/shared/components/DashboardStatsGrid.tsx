import { clipCardStyle } from "@/shared/ui/clipCardStyle";
import { LucideIcon } from "lucide-react";

interface AccentConfig {
  iconBg: string;
  iconText: string;
  bar: string;
  corner: string;
}

const ACCENTS: Record<string, AccentConfig> = {
  gold: {
    iconBg: "bg-gold-soft",
    iconText: "text-gold",
    bar: "bg-gold",
    corner: "bg-gold-soft",
  },
  teal: {
    iconBg: "bg-teal-soft",
    iconText: "text-teal",
    bar: "bg-teal",
    corner: "bg-teal-soft",
  },
  blue: {
    iconBg: "bg-accent-blue-soft",
    iconText: "text-accent-blue",
    bar: "bg-accent-blue",
    corner: "bg-accent-blue-soft",
  },
  green: {
    iconBg: "bg-green-500/10",
    iconText: "text-green-400",
    bar: "bg-green-500",
    corner: "bg-green-500/10",
  },
  yellow: {
    iconBg: "bg-yellow-500/10",
    iconText: "text-yellow-400",
    bar: "bg-yellow-500",
    corner: "bg-yellow-500/10",
  },
  red: {
    iconBg: "bg-danger-soft",
    iconText: "text-danger",
    bar: "bg-danger",
    corner: "bg-danger-soft",
  },
  purple: {
    iconBg: "bg-purple-500/10",
    iconText: "text-purple-400",
    bar: "bg-purple-500",
    corner: "bg-purple-500/10",
  },
  slate: {
    iconBg: "bg-surface-2",
    iconText: "text-text-2",
    bar: "bg-text-3",
    corner: "bg-surface-2",
  },
};

export type AccentColor = keyof typeof ACCENTS;

interface StatsCardProps {
  value: number | string;
  label: string;
  color?: AccentColor;
  icon?: LucideIcon;
  total?: number;
}

const StatsCard = ({
  value,
  label,
  color = "gold",
  icon: Icon,
  total = 0,
}: StatsCardProps) => {
  const a = ACCENTS[color] ?? ACCENTS.gold;

  const numericValue = typeof value === "number" ? value : Number(value) || 0;

  const progress =
    total > 0 ? Math.min(Math.round((numericValue / total) * 100), 100) : 0;

  return (
    <div
      className="relative bg-surface border border-border p-5"
      style={clipCardStyle}
    >
      <span
        aria-hidden="true"
        className={`absolute top-0 right-0 w-4 h-4 pointer-events-none ${a.corner}`}
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
      />

      <div
        className={`w-10 h-10 rounded-[10px] flex items-center justify-center mb-[18px] ${a.iconBg} ${a.iconText}`}
      >
        {Icon && <Icon size={20} strokeWidth={2} />}
      </div>

      <div className="font-mono text-[28px] font-bold tabular-nums tracking-tight">
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      <div className="text-[12.5px] text-text-2 mt-1">{label}</div>

      <div className="flex justify-between font-mono text-[10.5px] text-text-3 mt-3.5 mb-1.5">
        <span>Share of total</span>
        <span>{progress}%</span>
      </div>
      <div className="h-[5px] rounded-full bg-surface-2 overflow-hidden">
        <div
          className={`h-full rounded-full ${a.bar}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

interface Stat {
  value: number | string;
  label: string;
  color?: AccentColor;
  icon?: LucideIcon;
}

interface StatsGridProps {
  stats: Stat[];
}

const StatsGrid = ({ stats }: StatsGridProps) => {
  const total =
    typeof stats?.[0]?.value === "number"
      ? stats[0].value
      : Number(stats?.[0]?.value) || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px] mb-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} total={total} />
      ))}
    </div>
  );
};

export default StatsGrid;
