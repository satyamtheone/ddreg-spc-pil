import { IoCreateOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiRead } from "react-icons/ci";
import { GrUpdate } from "react-icons/gr";
import { GrUserAdmin } from "react-icons/gr";
import { Assignments, CountryType, Option, Task } from "./redux/apiTypes";
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
    case "Authorised":
      return {
        border: "border-green-500",
        hover: "hover:bg-green-500 hover:text-white",
        bg: "bg-green-500 text-white",
        text: "text-green-500",
        icon: <IoCreateOutline size={size} />,
      };
    case "MAJOR":
      return {
        border: "bg-sky-600 text-white border-sky-600",
        hover: "hover:bg-sky-600 hover:text-white",
      };
    case "HOTFIX":
      return {
        border: "bg-teal-400 text-white border-teal-400",
        hover: "hover:bg-teal-400 hover:text-white",
      };
    case "MINOR":
      return {
        border: "bg-cyan-500 text-white border-cyan-500",
        hover: "hover:bg-cyan-500 hover:text-white",
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

export const getCountryOptions = (data: CountryType[]): FormikOptonType[] => {
  return data.map((country) => ({
    label: country.name,
    value: country.code,
  }));
};

export const getCountryLabel = (data: CountryType[]): FormikOptonType[] => {
  return data.map((country) => ({
    label: country.name,
    value: country.code,
  }));
};

export const getAllDocumentOptions = (
  data: CountryType[],
): FormikOptonType[] => {
  return data.flatMap((country) =>
    country.documents.map((doc) => ({
      label: doc.name,
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

export type Section = {
  id: string;
  title: string;
  content: string;
  type: string;
  required: boolean;
  children?: Section[];
};

export type SectionWithNumber = Section & {
  number: string;
  children?: SectionWithNumber[];
};

export const addSectionNumbers = (
  sections: Section[],
  parentNumber = "",
): SectionWithNumber[] => {
  return sections.map((section, index) => {
    const number = parentNumber
      ? `${parentNumber}.${index + 1}`
      : `${index + 1}`;

    return {
      ...section,
      number,
      children: section.children
        ? addSectionNumbers(section.children, number)
        : [],
    };
  });
};

export const mapToFormikOptions = <
  T extends Record<string, any>,
  K1 extends keyof T,
  K2 extends keyof T,
>(
  data: T[],
  labelKey: K1,
  valueKey: K2,
): FormikOptonType[] => {
  return data.map((item) => ({
    label: String(item[labelKey]),
    value: item[valueKey] as string | number,
  }));
};

export type ParamsType = {
  page: number;
  [key: string]: string | number;
};

export const updateParam = (
  key: string,
  value: string | number,
  setParams: React.Dispatch<React.SetStateAction<ParamsType>>,
) => {
  setParams((prev: ParamsType) => {
    if (key === "page") {
      return {
        ...prev,
        page: Number(value),
      };
    }

    return {
      ...prev,
      [key]: value,
      page: 1,
    };
  });
};

export const isBG = (user: Assignments, task: Task) =>
  (task.status === "UNDER_REVIEW" &&
    user.user.businessRoleId.permissions.some((p) => p.type === "EDITOR")) ||
  (task.status === "UNDER_APPROVAL" &&
    user.user.businessRoleId.permissions.some(
      (p) => p.type === "EDITOR" || p.type === "REVIEWER",
    ));