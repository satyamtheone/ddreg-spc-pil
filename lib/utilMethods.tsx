import { IoCreateOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiRead } from "react-icons/ci";
import { GrUpdate } from "react-icons/gr";
import { GrUserAdmin } from "react-icons/gr";
import { Assignments, CountryType, Option, Task } from "./redux/apiTypes";
import { FormikOptonType } from "@/components/FormikComponents/FormikSelect";
import JSZip from "jszip";

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

export async function modifyDocxStyles(buffer: ArrayBuffer) {
  const zip = await JSZip.loadAsync(buffer);

  const stylesFile = zip.file("word/styles.xml");

  if (stylesFile) {
    let stylesXml = await stylesFile.async("text");

    // Underline Heading2
    stylesXml = stylesXml.replace(
      /(<w:style[^>]*w:styleId="Heading2"[\s\S]*?<w:rPr>)([\s\S]*?)(<\/w:rPr>)/,
      `$1<w:u w:val="single"/>$3`,
    );

    stylesXml = stylesXml.replace(
      /<w:style[^>]*w:styleId="Heading1Char"[\s\S]*?<\/w:style>/,
      (styleBlock) => {
        if (styleBlock.includes("<w:caps")) return styleBlock;

        if (styleBlock.includes("<w:rPr>")) {
          return styleBlock.replace(/<w:rPr>/, `<w:rPr><w:caps w:val="true"/>`);
        }

        return styleBlock.replace(
          /<\/w:style>/,
          `<w:rPr><w:caps w:val="true"/></w:rPr></w:style>`,
        );
      },
    );

    stylesXml = stylesXml.replace(
      /(<w:style[^>]*w:styleId="Heading2"[\s\S]*?<w:pPr>)([\s\S]*?)(<\/w:pPr>)/,
      `$1<w:spacing w:before="100" w:after="100"/>$3`,
    );

    zip.file("word/styles.xml", stylesXml);
  }

  const docFile = zip.file("word/document.xml");

  if (docFile) {
    let docXml = await docFile.async("text");

    docXml = docXml.replace(/IBRANCE/g, "LOL");

    // Replace or insert page margins
    if (docXml.includes("<w:pgMar")) {
      // replace existing margins
      docXml = docXml.replace(
        /<w:pgMar[^>]*\/>/,
        `<w:pgMar w:top="144" w:right="144" w:bottom="144" w:left="144"/>`,
      );
    } else {
      // insert inside sectPr
      docXml = docXml.replace(
        /(<w:sectPr[^>]*>)/,
        `$1<w:pgMar w:top="144" w:right="144" w:bottom="144" w:left="144"/>`,
      );
    }

    zip.file("word/document.xml", docXml);
  }
  return await zip.generateAsync({ type: "arraybuffer" });
}

export async function mergeFooter(
  originalBuffer: ArrayBuffer,
  savedBuffer: ArrayBuffer,
) {
  const originalZip = await JSZip.loadAsync(originalBuffer);
  const newZip = await JSZip.loadAsync(savedBuffer);

  // Copy all footer files
  const footerFiles = Object.keys(originalZip.files).filter((f) =>
    f.startsWith("word/footer"),
  );

  for (const fileName of footerFiles) {
    const content = await originalZip.file(fileName)?.async("uint8array");
    if (content) {
      newZip.file(fileName, content);
    }
  }

  // Copy relationships
  const rels = await originalZip
    .file("word/_rels/document.xml.rels")
    ?.async("text");

  if (rels) {
    newZip.file("word/_rels/document.xml.rels", rels);
  }

  // Ensure footerReference exists
  const docFile = newZip.file("word/document.xml");

  if (docFile) {
    let docXml = await docFile.async("text");

    if (!docXml.includes("footerReference")) {
      docXml = docXml.replace(
        /<w:sectPr[^>]*>/,
        `$&<w:footerReference r:id="rId1" w:type="default"/>`,
      );
    }

    newZip.file("word/document.xml", docXml);
  }

  return await newZip.generateAsync({ type: "arraybuffer" });
}

export async function normalizeDocx(buffer: ArrayBuffer) {
  const zip = await JSZip.loadAsync(buffer);

  const docFile = zip.file("word/document.xml");
  if (!docFile) return buffer;

  let docXml = await docFile.async("text");

  // =========================
  // 1. FIX SPLIT TEXT (SAFE JOIN)
  // =========================
  // Only join text nodes, KEEP structure intact
  docXml = docXml.replace(
    /(<w:t[^>]*>[^<]*)<\/w:t>\s*<\/w:r>\s*<w:r[^>]*>\s*<w:t[^>]*>([^<]*)<\/w:t>/g,
    (_, part1, part2) => {
      return `<w:t>${part1.replace(/<w:t[^>]*>/, "")}${part2}</w:t></w:r><w:r><w:t>`;
    },
  );

  // =========================
  // 2. ENSURE xml:space PRESERVE
  // =========================
  docXml = docXml.replace(/<w:t>(.*?)<\/w:t>/g, (match, text) => {
    if (/^\s|\s$/.test(text)) {
      return `<w:t xml:space="preserve">${text}</w:t>`;
    }
    return match;
  });

  // =========================
  // 3. REMOVE PROOF ERRORS
  // =========================
  docXml = docXml.replace(/<w:proofErr[^>]*\/>/g, "");

  // =========================
  // 4. DO NOT TOUCH w:r / w:p STRUCTURE
  // =========================

  zip.file("word/document.xml", docXml);

  return await zip.generateAsync({ type: "arraybuffer" });
}