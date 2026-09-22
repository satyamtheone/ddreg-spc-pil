import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  subTitle?: string;
  bg?: string;
  size?: string;
};

const ProfileTabCard = ({
  icon,
  title,
  subTitle,
  bg,
  size,
}: Props) => {
  return (
    <div
      className={`${
        size || "md:h-23 h-18 md:p-4 p-2"
      } capitalize rounded-md shadow-md border animate-fadeIn border-slate-300 min-w-max flex items-center justify-around gap-4`}
    >
      <div
        className={`md:h-11 h-8 w-8 md:w-11 shadow-md flex items-center justify-center text-white rounded-md ${
          bg || "bg-primary"
        }`}
      >
        {icon}
      </div>

      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-base font-normal">{subTitle}</div>
      </div>
    </div>
  );
};

export default ProfileTabCard;