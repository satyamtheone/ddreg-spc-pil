import { IoCreateOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiRead } from "react-icons/ci";
import { GrUpdate } from "react-icons/gr";
import { GrUserAdmin } from "react-icons/gr";
import {
  Assignments,
  CountryType,
  GetTaskResponse,
  Option,
  Task,
} from "./redux/apiTypes";
import { FormikOptonType } from "@/components/FormikComponents/FormikSelect";
import JSZip from "jszip";


export const getErrorMessage = (error: any) => {
  return (
    error?.data?.message ||
    error?.error ||
    error?.message ||
    "Something went wrong"
  );
};
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
    case "ASSIGNED":
      return {
        border: "bg-sky-600 text-white border-sky-600",
        hover: "hover:bg-sky-600 hover:text-white",
      };
    case "HOTFIX":
    case "CREATED":
      return {
        border: "bg-teal-400 text-white border-teal-400",
        hover: "hover:bg-teal-400 hover:text-white",
      };
    case "UNDER_APPROVAL":
      return {
        border: "bg-teal-600 text-white border-teal-600",
        hover: "hover:bg-teal-600 hover:text-white",
      };
    case "MINOR":
    case "APPROVED":
      return {
        border: "bg-cyan-500 text-white border-cyan-500",
        hover: "hover:bg-cyan-500 hover:text-white",
      };
    case "UNDER_EDITING":
      return {
        border: "bg-cyan-700 text-white border-cyan-700",
        hover: "hover:bg-cyan-700 hover:text-white",
      };

    case "IN_PROCESS":
    case "UNDER_REVIEW":
      return {
        border: "bg-amber-600 text-white border-amber-600",
        hover: "hover:bg-amber-600 hover:text-white",
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

export const mapTasksToUserOptions = (
  response?: GetTaskResponse,
): FormikOptonType[] => {
  if (!response?.data) return [];

  const seen = new Set<string>();

  return response.data.flatMap((task) =>
    task.assignments.reduce<FormikOptonType[]>((acc, a) => {
      if (!seen.has(a.user.id)) {
        seen.add(a.user.id);
        acc.push({
          label: `${a.user.fName} ${a.user.lName}`,
          value: a.user.id,
        });
      }
      return acc;
    }, []),
  );
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

const W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

function parseXml(xml: string) {
  return new DOMParser().parseFromString(xml, "application/xml");
}

function serializeXml(doc: Document) {
  return new XMLSerializer().serializeToString(doc);
}

function getOrCreate(parent: Element, tag: string) {
  let el = parent.getElementsByTagNameNS(W_NS, tag)[0];
  if (!el) {
    el = parent.ownerDocument.createElementNS(W_NS, `w:${tag}`);
    parent.appendChild(el);
  }
  return el;
}

export async function applyGlobalDocxFormatting(buffer: ArrayBuffer) {
  const zip = await JSZip.loadAsync(buffer);

  // =========================
  // 1. document.xml
  // =========================
  const docFile = zip.file("word/document.xml");

  if (docFile) {
    const xml = await docFile.async("text");
    const doc = parseXml(xml);

    const sectPr = doc.getElementsByTagNameNS(W_NS, "sectPr")[0];

    if (sectPr) {
      // ✅ PAGE SIZE
      let pgSz = sectPr.getElementsByTagNameNS(W_NS, "pgSz")[0];
      if (!pgSz) {
        pgSz = doc.createElementNS(W_NS, "w:pgSz");
        sectPr.appendChild(pgSz);
      }
      pgSz.setAttribute("w:w", "12240");
      pgSz.setAttribute("w:h", "15840");

      // ✅ MARGINS (1 inch)
      let pgMar = sectPr.getElementsByTagNameNS(W_NS, "pgMar")[0];
      if (!pgMar) {
        pgMar = doc.createElementNS(W_NS, "w:pgMar");
        sectPr.appendChild(pgMar);
      }

      pgMar.setAttribute("w:top", "1440");
      pgMar.setAttribute("w:right", "1440");
      pgMar.setAttribute("w:bottom", "1440");
      pgMar.setAttribute("w:left", "1440");
    }

    // ✅ PARAGRAPH FORMATTING (SAFE)
    const paragraphs = doc.getElementsByTagNameNS(W_NS, "p");

    for (let i = 0; i < paragraphs.length; i++) {
      const p = paragraphs[i];

      let pPr = p.getElementsByTagNameNS(W_NS, "pPr")[0];
      if (!pPr) {
        pPr = doc.createElementNS(W_NS, "w:pPr");
        p.insertBefore(pPr, p.firstChild);
      }

      // Alignment (only if missing)
      let jc = pPr.getElementsByTagNameNS(W_NS, "jc")[0];
      if (!jc) {
        jc = doc.createElementNS(W_NS, "w:jc");
        jc.setAttribute("w:val", "left");
        pPr.appendChild(jc);
      }

      // First line indent (only if missing)
      let ind = pPr.getElementsByTagNameNS(W_NS, "ind")[0];
      if (!ind) {
        ind = doc.createElementNS(W_NS, "w:ind");
        ind.setAttribute("w:firstLine", "567"); // ~1cm
        pPr.appendChild(ind);
      }
    }

    zip.file("word/document.xml", serializeXml(doc));
  }

  // =========================
  // 2. styles.xml
  // =========================
  const stylesFile = zip.file("word/styles.xml");

  if (stylesFile) {
    const xml = await stylesFile.async("text");
    const doc = parseXml(xml);

    const docDefaults = doc.getElementsByTagNameNS(W_NS, "docDefaults")[0];

    if (docDefaults) {
      let rPrDefault = doc.getElementsByTagNameNS(W_NS, "rPrDefault")[0];

      if (!rPrDefault) {
        rPrDefault = doc.createElementNS(W_NS, "w:rPrDefault");
        docDefaults.appendChild(rPrDefault);
      }

      let rPr = rPrDefault.getElementsByTagNameNS(W_NS, "rPr")[0];

      if (!rPr) {
        rPr = doc.createElementNS(W_NS, "w:rPr");
        rPrDefault.appendChild(rPr);
      }

      // Font
      let fonts = rPr.getElementsByTagNameNS(W_NS, "rFonts")[0];
      if (!fonts) {
        fonts = doc.createElementNS(W_NS, "w:rFonts");
        rPr.appendChild(fonts);
      }
      fonts.setAttribute("w:ascii", "Calibri");
      fonts.setAttribute("w:hAnsi", "Calibri");

      // Size (11pt = 22 half-points)
      let sz = rPr.getElementsByTagNameNS(W_NS, "sz")[0];
      if (!sz) {
        sz = doc.createElementNS(W_NS, "w:sz");
        rPr.appendChild(sz);
      }
      sz.setAttribute("w:val", "22");
    }

    zip.file("word/styles.xml", serializeXml(doc));
  }

  // =========================
  // 3. footer.xml (SAFE CREATE)
  // =========================
  if (!zip.file("word/footer1.xml")) {
    const footerXml = `
      <w:ftr xmlns:w="${W_NS}">
        <w:p>
          <w:pPr>
            <w:jc w:val="right"/>
          </w:pPr>
          <w:r><w:t>Brand Name </w:t></w:r>
          <w:fldSimple w:instr="PAGE"/>
        </w:p>
      </w:ftr>
    `;
    zip.file("word/footer1.xml", footerXml);
  }

  return await zip.generateAsync({ type: "arraybuffer" });
}