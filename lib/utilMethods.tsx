import { IoCreateOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiRead } from "react-icons/ci";
import { GrUpdate } from "react-icons/gr";
import { GrUserAdmin } from "react-icons/gr";

export const crudOperationChipColors = ({
  variant,
  size,
}: {
  variant: string;
  size?: string;
}) => {
  switch (variant) {
    case "EDITOR":
    case "Archived":
      return {
        border: "border-cyan-500",
        hover: "hover:bg-cyan-500  hover:text-white",
        bg: "bg-cyan-500 text-white",
        text: "text-cyan-500",
        icon: <CiRead size={size} />,
      };
    case "delete":
      return {
        border: "border-red-500",
        hover: "hover:bg-red-500 hover:text-white",
        bg: "bg-red-500 text-white",
        text: "text-red-500",
        icon: <RiDeleteBin6Line size={size} />,
      };
    case "REVIEWER":
      return {
        border: "border-amber-400",
        hover: "hover:bg-amber-400 hover:text-white",
        bg: "bg-amber-400 text-white",
        text: "text-amber-400",
        icon: <GrUpdate size={size} />,
      };

    case "APPROVER":
    case "Latest":
      return {
        border: "border-green-500",
        hover: "hover:bg-green-500 hover:text-white",
        bg: "bg-green-500 text-white",
        text: "text-green-500",
        icon: <IoCreateOutline size={size} />,
      };
    default:
      return {
        border: "border-gray-500",
        hover: "hover:bg-gray-500 hover:text-white",
        text: "text-gray-500",
        bg: "bg-gray-500 text-white",
        icon: <GrUserAdmin size={size} />,
      };
  }
};
