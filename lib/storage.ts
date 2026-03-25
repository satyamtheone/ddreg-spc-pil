const KEY = "multi-step-form";

export const saveForm = (data: any) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};

export const loadForm = () => {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
};
export interface StepFormData {
  referenceName?: string;
  templateName?: string;
  fillData?: string;
  generateTemplate?: string;
}

export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
) {
  let timer: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
