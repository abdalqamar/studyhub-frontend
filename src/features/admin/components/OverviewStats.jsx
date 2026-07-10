import { BookOpen, Users, IndianRupee, UserCheck } from "lucide-react";
import { clipCardStyle } from "@/shared/ui/clipCardStyle";

// literal classes only — Tailwind JIT can't resolve template-string class names
const ACCENTS = {
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
};

const OverviewStats = ({ stats }) => {
  const cards = [
    {
      icon: BookOpen,
      label: "Total Courses",
      value: stats?.totalCourses || 0,
      target: 20,
      accent: "gold",
    },
    {
      icon: Users,
      label: "Total Students",
      value: stats?.totalStudents || 0,
      target: 100,
      accent: "teal",
    },
    {
      icon: IndianRupee,
      label: "Total Revenue",
      value: stats?.totalRevenue || 0,
      target: 50000,
      accent: "gold",
      isRevenue: true,
    },
    {
      icon: UserCheck,
      label: "Instructors",
      value: stats?.totalInstructors || 0,
      target: 10,
      accent: "blue",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
      {cards.map((card, i) => {
        const Icon = card.icon;
        const a = ACCENTS[card.accent];
        const progress = Math.min(
          Math.round((card.value / card.target) * 100),
          100
        );

        return (
          <div
            key={i}
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
              <Icon size={20} strokeWidth={2} />
            </div>

            <div className="font-mono text-[28px] font-bold tabular-nums tracking-tight">
              {card.isRevenue
                ? `₹${card.value.toLocaleString("en-IN")}`
                : card.value}
            </div>
            <div className="text-[12.5px] text-text-2 mt-1">{card.label}</div>

            <div className="flex justify-between font-mono text-[10.5px] text-text-3 mt-3.5 mb-1.5">
              <span>Progress</span>
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
      })}
    </div>
  );
};

export default OverviewStats;
