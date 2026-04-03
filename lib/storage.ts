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
  stepReference?: {
    isSlectedDocument?: boolean;
    slectedReferenceId: string;
    countryCode?: string;
    countryName?: string;
    referenceName?: string;
    activeIngredient?: string;
    type?: string;
  };
  stepTemplate?: {
    templateId: string;
    templateName?: string;
  };
  fillData?: {
    basicInformation: {
      brandName: string;
      strength: string;
      dosageForm: string;
      manufacturer: string;
      shelfLife: string;
      storagePrecautions: string;
      MAHAddress: string;
      packagingDetails: string;
    };
    clinicalInformation: {};
  };
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
