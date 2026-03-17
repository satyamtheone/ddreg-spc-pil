import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleVisibility = (
  type: "password" | "text",
  setType: React.Dispatch<React.SetStateAction<"password" | "text">>
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


