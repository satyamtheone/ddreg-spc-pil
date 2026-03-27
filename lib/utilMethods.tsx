import { IoCreateOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiRead } from "react-icons/ci";
import { GrUpdate } from "react-icons/gr";
import { GrUserAdmin } from "react-icons/gr";
import { CountryType, Option } from "./redux/apiTypes";
import { FormikOptonType } from "@/components/FormikComponents/FormikSelect";

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
    case "In Process":
      return {
        border: "border-amber-400",
        hover: "hover:bg-amber-400 hover:text-white",
        bg: "bg-amber-400 text-white",
        text: "text-amber-400",
        icon: <GrUpdate size={size} />,
      };

    case "APPROVER":
    case "Latest":
    case "Approved":
      return {
        border: "border-green-500",
        hover: "hover:bg-green-500 hover:text-white",
        bg: "bg-green-500 text-white",
        text: "text-green-500",
        icon: <IoCreateOutline size={size} />,
      };
    default:
      return {
        border: "border-zinc-500",
        hover: "hover:bg-zinc-500 hover:text-white",
        text: "text-zinc-500",
        bg: "bg-zinc-500 text-white",
        icon: <GrUserAdmin size={size} />,
      };
  }
};

export const formatedDate = (dateString: string): string => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const getCountryOptions = (data: CountryType[]): Option[] => {
  return data.map((country) => ({
    option: country.name,
    value: country.code,
  }));
};

export const getCountryLabel = (data: CountryType[]): FormikOptonType[] => {
  return data.map((country) => ({
    label: country.name,
    value: country.code,
  }));
};

export const getAllDocumentOptions = (data: CountryType[]): Option[] => {
  return data.flatMap((country) =>
    country.documents.map((doc) => ({
      option: doc.name,
      value: doc.name,
    })),
  );
};
export const getDocumentOptions = (
  data: CountryType[],
  countryCode: string,
): FormikOptonType[] => {
  const country = data.find((c) => c.code === countryCode);

  if (!country) return [];

  return country.documents.map((doc) => ({
    label: doc.name,
    value: doc.name,
  }));
};