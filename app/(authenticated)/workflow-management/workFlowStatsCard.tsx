import React, { JSX } from "react";
import { LuGitBranchPlus } from "react-icons/lu";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

type Variant = "sky" | "amber" | "emerald" | "indigo";

type WorkFlowStatsCardProps = {
  title: string;
  statValue: number;
  subtitle: string;
  variant?: Variant;
};

export const variantStyles: Record<
  Variant,
  { bg: string; border: string; iconBg: string; icon: JSX.Element }
> = {
  sky: {
    bg: "bg-sky-600/11",
    border: "border-sky-600",
    iconBg: "text-sky-800",
    icon: <LuGitBranchPlus size={34} className="text-sky-900" />,
  },
  amber: {
    bg: "bg-amber-400/11",
    border: "border-amber-400",
    iconBg: "text-amber-600",
    icon: <FaArrowTrendUp size={34} className="text-amber-600" />,
  },
  emerald: {
    bg: "bg-emerald-500/11",
    border: "border-emerald-500",
    iconBg: "text-emerald-600",
    icon: <FaRegCheckCircle size={34} className="text-emerald-600" />,
  },
  indigo: {
    bg: "bg-indigo-500/11",
    border: "border-indigo-500",
    iconBg: "text-indigo-600",
    icon: <FaUsers size={34} className="text-indigo-600" />,
  },
};

const WorkFlowStatsCard: React.FC<WorkFlowStatsCardProps> = ({
  title,
  statValue,
  subtitle,
  variant = "sky",
}) => {
  const styles = variantStyles[variant];

  return (
    <div
      className={`flex justify-between items-center text-zinc-800 p-4 h-30 w-full border rounded-[7px] ${styles.border} ${styles.bg}`}
    >
      <div>
        <div className="text-4xl font-medium">{statValue}</div>
        <div className="font-semibold">{title}</div>
        <div>{subtitle}</div>
      </div>

      <div
        className={`h-[70px] w-[70px] flex justify-center items-center border rounded-[7px] p-4 ${styles.border} ${styles.bg}`}
      >
        {styles.icon}
      </div>
    </div>
  );
};

export default WorkFlowStatsCard;
