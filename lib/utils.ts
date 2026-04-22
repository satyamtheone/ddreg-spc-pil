"use";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AiOutlineFolderView, AiOutlineHome } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdDashboard, MdOutlineDashboard, MdPreview } from "react-icons/md";
import { BiGitCompare } from "react-icons/bi";
import { TbTemplate } from "react-icons/tb";
import { HiDocumentAdd, HiOutlineDocumentText } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import { MdOutlineNotifications } from "react-icons/md";
import { LuWorkflow } from "react-icons/lu";
import { RiAiGenerateText, RiFolderOpenLine } from "react-icons/ri";
import { FaFolderOpen, FaRegUser } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { IconType } from "react-icons";

export type NavLinkItem = {
  icon: IconType;
  title: string;
  link: string;
  isAllowed?: boolean;
  children?: NavLinkItem[];
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleVisibility = (
  type: "password" | "text",
  setType: React.Dispatch<React.SetStateAction<"password" | "text">>,
): void => {
  if (type === "password") {
    setType("text");
    setTimeout(() => {
      setType("password");
    }, 1000);
  } else {
    setType("password");
  }
};

export const getCookie = (name: string) =>
  document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];

export const countries = [
  { value: "AT", label: "Austria" },
  { value: "BE", label: "Belgium" },
  { value: "BG", label: "Bulgaria" },
  { value: "HR", label: "Croatia" },
  { value: "CY", label: "Cyprus" },
  { value: "CZ", label: "Czech Republic" },
  { value: "DK", label: "Denmark" },
  { value: "EE", label: "Estonia" },
  { value: "FI", label: "Finland" },
  { value: "FR", label: "France" },
  { value: "DE", label: "Germany" },
  { value: "GR", label: "Greece" },
  { value: "HU", label: "Hungary" },
  { value: "IE", label: "Ireland" },
  { value: "IN", label: "India" },
  { value: "IT", label: "Italy" },
  { value: "LV", label: "Latvia" },
  { value: "LT", label: "Lithuania" },
  { value: "LU", label: "Luxembourg" },
  { value: "MT", label: "Malta" },
  { value: "NL", label: "Netherlands" },
  { value: "PL", label: "Poland" },
  { value: "PT", label: "Portugal" },
  { value: "RO", label: "Romania" },
  { value: "SK", label: "Slovakia" },
  { value: "SI", label: "Slovenia" },
  { value: "ES", label: "Spain" },
  { value: "SE", label: "Sweden" },
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "SA", label: "Saudi Arabia" },
  { value: "AU", label: "Australia" },
];

export const languages = [
  { label: "English", value: "en" },
  { label: "Hindi", value: "hi" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Chinese (Simplified)", value: "zh-CN" },
  { label: "Chinese (Traditional)", value: "zh-TW" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Arabic", value: "ar" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Italian", value: "it" },
  { label: "Dutch", value: "nl" },
  { label: "Turkish", value: "tr" },
  { label: "Polish", value: "pl" },
  { label: "Swedish", value: "sv" },
  { label: "Danish", value: "da" },
  { label: "Finnish", value: "fi" },
  { label: "Norwegian", value: "no" },
  { label: "Thai", value: "th" },
  { label: "Vietnamese", value: "vi" },
  { label: "Indonesian", value: "id" },
  { label: "Malay", value: "ms" },
  { label: "Bengali", value: "bn" },
  { label: "Punjabi", value: "pa" },
  { label: "Gujarati", value: "gu" },
  { label: "Marathi", value: "mr" },
  { label: "Tamil", value: "ta" },
  { label: "Telugu", value: "te" },
  { label: "Kannada", value: "kn" },
  { label: "Malayalam", value: "ml" },
  { label: "Urdu", value: "ur" },
];

export const timeZones = [
  { label: "(UTC-12:00) Baker Island", value: "Etc/GMT+12" },
  { label: "(UTC-11:00) Niue", value: "Pacific/Niue" },
  { label: "(UTC-10:00) Hawaii", value: "Pacific/Honolulu" },
  { label: "(UTC-09:00) Alaska", value: "America/Anchorage" },
  {
    label: "(UTC-08:00) Pacific Time (US & Canada)",
    value: "America/Los_Angeles",
  },
  { label: "(UTC-07:00) Mountain Time (US & Canada)", value: "America/Denver" },
  { label: "(UTC-06:00) Central Time (US & Canada)", value: "America/Chicago" },
  {
    label: "(UTC-05:00) Eastern Time (US & Canada)",
    value: "America/New_York",
  },
  { label: "(UTC-04:00) Atlantic Time (Canada)", value: "America/Halifax" },
  {
    label: "(UTC-03:00) Buenos Aires",
    value: "America/Argentina/Buenos_Aires",
  },
  { label: "(UTC-02:00) South Georgia", value: "Atlantic/South_Georgia" },
  { label: "(UTC-01:00) Azores", value: "Atlantic/Azores" },

  { label: "(UTC+00:00) UTC / London", value: "Europe/London" },
  { label: "(UTC+01:00) Berlin, Paris", value: "Europe/Berlin" },
  { label: "(UTC+02:00) Cairo", value: "Africa/Cairo" },
  { label: "(UTC+03:00) Moscow", value: "Europe/Moscow" },
  { label: "(UTC+03:30) Tehran", value: "Asia/Tehran" },
  { label: "(UTC+04:00) Dubai", value: "Asia/Dubai" },
  { label: "(UTC+04:30) Kabul", value: "Asia/Kabul" },
  { label: "(UTC+05:00) Karachi", value: "Asia/Karachi" },
  { label: "(UTC+05:30) India Standard Time (IST)", value: "Asia/Kolkata" },
  { label: "(UTC+05:45) Nepal", value: "Asia/Kathmandu" },
  { label: "(UTC+06:00) Dhaka", value: "Asia/Dhaka" },
  { label: "(UTC+06:30) Yangon", value: "Asia/Yangon" },
  { label: "(UTC+07:00) Bangkok", value: "Asia/Bangkok" },
  { label: "(UTC+08:00) Singapore", value: "Asia/Singapore" },
  { label: "(UTC+09:00) Tokyo", value: "Asia/Tokyo" },
  { label: "(UTC+09:30) Adelaide", value: "Australia/Adelaide" },
  { label: "(UTC+10:00) Sydney", value: "Australia/Sydney" },
  { label: "(UTC+11:00) Solomon Islands", value: "Pacific/Guadalcanal" },
  { label: "(UTC+12:00) Auckland", value: "Pacific/Auckland" },
  { label: "(UTC+13:00) Tonga", value: "Pacific/Tongatapu" },
  { label: "(UTC+14:00) Kiritimati", value: "Pacific/Kiritimati" },
];

export const UserManagementColumns = [
  { name: "First Name", key: "firstName" },
  { name: "Last Name", key: "lastName" },
  { name: "Email", key: "email" },
  { name: "Role", key: "role" },
  { name: "Business Role", key: "businessRole" },
];

export const RolesManagementColumns = [
  { name: "Role", key: "role" },
  { name: "Description", key: "description" },
  { name: "Permissions", key: "permissions" },
];
export type ProductStatus = "Draft" | "In Process" | "Latest" | "Approved";

export type ProductDocument = {
  productName: string;
  activeIngredient: string;
  country: string;
  type: "SPC" | "PIL";
  version: number;
  lastModified: string;
  status: ProductStatus[];
};

export const SpcTableColumns = [
  { name: "Product Name", key: "Product Name" },
  { name: "Active Ingredient ", key: "Active Ingredient" },
  { name: "Country", key: "Country" },
  { name: "Type", key: "Type" },
  { name: "Version ", key: "Version" },
  { name: "Last Modified", key: "Last Modified" },
  { name: "Status", key: "Status" },
];

export const productDocuments: ProductDocument[] = [
  {
    productName: "Aspirin Plus 100mg",
    activeIngredient: "Acetylsalicylic Acid",
    country: "United Kingdom",
    type: "SPC",
    version: 3.1,
    lastModified: "2026-01-10",
    status: ["Latest", "Approved"],
  },
  {
    productName: "Paracetamol Plus 500mg",
    activeIngredient: "Paracetamol",
    country: "Germany",
    type: "SPC",
    version: 2.4,
    lastModified: "2025-12-10",
    status: ["In Process"],
  },
  {
    productName: "Ibuprofen Max 400mg",
    activeIngredient: "Ibuprofen",
    country: "France",
    type: "SPC",
    version: 4.0,
    lastModified: "2025-10-20",
    status: ["Draft"],
  },
  {
    productName: "Metformin XR 1000mg",
    activeIngredient: "Metformin Hydrochloride",
    country: "United Kingdom",
    type: "SPC",
    version: 1.0,
    lastModified: "2025-09-18",
    status: ["Latest"],
  },
  {
    productName: "Lisinopril 10mg",
    activeIngredient: "Lisinopril",
    country: "Germany",
    type: "PIL",
    version: 3.1,
    lastModified: "2025-08-25",
    status: ["In Process"],
  },
  {
    productName: "Aspirin Plus 100mg",
    activeIngredient: "Acetylsalicylic Acid",
    country: "Italy",
    type: "SPC",
    version: 2.0,
    lastModified: "2026-01-10",
    status: ["Approved"],
  },
  {
    productName: "Aspirin Plus 100mg",
    activeIngredient: "Acetylsalicylic Acid",
    country: "Germany",
    type: "SPC",
    version: 2.0,
    lastModified: "2026-01-10",
    status: ["Draft"],
  },
  {
    productName: "Aspirin Plus 100mg",
    activeIngredient: "Acetylsalicylic Acid",
    country: "United Kingdom",
    type: "SPC",
    version: 2.0,
    lastModified: "2026-01-10",
    status: ["In Process"],
  },
  {
    productName: "Aspirin Plus 100mg",
    activeIngredient: "Acetylsalicylic Acid",
    country: "Germany",
    type: "SPC",
    version: 2.0,
    lastModified: "2026-01-10",
    status: ["Latest"],
  },
  {
    productName: "Aspirin Plus 100mg",
    activeIngredient: "Acetylsalicylic Acid",
    country: "United Kingdom",
    type: "SPC",
    version: 2.0,
    lastModified: "2026-01-10",
    status: ["Draft"],
  },
];

export const NavData: NavLinkItem[] = [
  {
    title: "Dashboard",
    icon: MdDashboard,
    link: "/dashboard",
  },
  {
    title: "Generate SPC/PIL",
    icon: HiDocumentAdd,
    link: "/generate-SPC-PIL",
    children: [
      {
        title: "Generate Document",
        icon: RiAiGenerateText,
        link: "/generate-SPC-PIL/generateDocument",
      },
    ],
  },
  {
    title: "Document Editor",
    icon: FiEdit,
    link: "/document-editor",
  },
  {
    title: "Workflow Management",
    icon: LuWorkflow,
    link: "/workflow-management",
  },
  {
    title: "Document Repository",
    icon: FaFolderOpen,
    link: "/document-repository",
    children: [
      {
        title: "Preview Document",
        icon: MdPreview,
        link: "/document-repository/previewDocument",
      },
    ],
  },
  {
    title: "Template Library",
    icon: TbTemplate,
    link: "/template-library",
  },
  {
    title: "Regulatory Intelligence",
    icon: AiOutlineHome,
    link: "/regulatory-intelligence",
  },
  {
    title: "Compare Documents",
    icon: BiGitCompare,
    link: "/compare-documents",
  },
  {
    title: "Audit & Version History",
    icon: MdHistory,
    link: "/audit-version-history",
  },
  {
    title: "Notification Center",
    icon: MdOutlineNotifications,
    link: "/notification-center",
  },
  {
    title: "Settings",
    icon: FiSettings,
    link: "/settings",
  },
  {
    title: "Account",
    icon: FaRegUser,
    link: "/account",
  },
];
