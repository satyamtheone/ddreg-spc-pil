"use client";
import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { DocxEditorRef } from "@eigenpal/docx-js-editor";
import "@eigenpal/docx-js-editor/styles.css";
import JSZip from "jszip";
import { useGetDocumentBufferMutation } from "@/lib/redux/slices/documentApi";
import DynamicButton from "@/components/common/DynamicButton";
import { applyGlobalDocxFormatting } from "@/lib/utilMethods";
import { SpcSearchParamss } from "./page";

const DocxEditor = dynamic(
  () => import("@eigenpal/docx-js-editor").then((mod) => mod.DocxEditor),
  { ssr: false },
);

export default function FullPageEditor({
  params,
}: {
  params: SpcSearchParamss;
}) {
  const editorRef = useRef<DocxEditorRef>(null);

  const [loading, setLoading] = useState(false);

  const [fileBuffer, setFileBuffer] = useState<ArrayBuffer | null>(null);
  const [originalBuffer, setOriginalBuffer] = useState<ArrayBuffer | null>(
    null,
  );
  const [fileName, setFileName] = useState("document.docx");

  const [getDocumentBuffer, { isLoading }] = useGetDocumentBufferMutation();

  const loadDocx = async (buffer: ArrayBuffer, name?: string) => {
    setOriginalBuffer(buffer);
    setFileBuffer(buffer);
    if (name) setFileName(name);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".docx")) {
      alert("Please upload a .docx file");
      return;
    }

    const buffer = await file.arrayBuffer();

    await loadDocx(buffer, file.name);
  };

  const loadFromUrl = async (url: string) => {
    setLoading(true);
    try {
      const blob = await getDocumentBuffer({
        document_url: url,
      }).unwrap();

      const buffer = await blob.arrayBuffer();

      // const formatted = await applyGlobalDocxFormatting(buffer);

      await loadDocx(buffer, "converted.docx");
      setLoading(false);
    } catch (err) {
      console.error("Failed to load document:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const url = params.documentBufferUrl;
    if (url) {
      loadFromUrl(url);
    }
  }, [params]);

  const handleSave = async () => {
    const savedBuffer = await editorRef.current?.save();

    if (!savedBuffer || !originalBuffer) return;

    const originalZip = await JSZip.loadAsync(originalBuffer);
    const newZip = await JSZip.loadAsync(savedBuffer);

    // copy footers
    const footerFiles = Object.keys(originalZip.files).filter((f) =>
      f.startsWith("word/footer"),
    );

    for (const fileName of footerFiles) {
      const content = await originalZip.file(fileName)?.async("uint8array");
      if (content) newZip.file(fileName, content);
    }

    // copy relationships
    const rels = await originalZip
      .file("word/_rels/document.xml.rels")
      ?.async("text");

    if (rels) {
      newZip.file("word/_rels/document.xml.rels", rels);
    }

    // ensure footer reference
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

    const finalBuffer = await newZip.generateAsync({
      type: "arraybuffer",
    });

    const blob = new Blob([finalBuffer], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 h-full">
      {isLoading || loading ? (
        <div className="h-[78vh] spcBNS skeleton flex justify-center items-center">
          Loading.....
        </div>
      ) : (
        <>
          <div className="flex items-center justify-end">
            {/* <input
              type="file"
              accept=".docx"
              className="file-input  file-input-lg file-input-ghost  bg-white spcBNS rounded-xl min-w-max"
              onChange={handleFileUpload}
            /> */}
            <div>
              <DynamicButton
                text="Save DOCX"
                variant="submit"
                onClick={handleSave}
              />
            </div>
          </div>

          {fileBuffer && (
            <div className="h-[78vh] spcBNS rounded-4xl overflow-hidden">
              <DocxEditor
                key={fileBuffer.byteLength}
                ref={editorRef}
                documentBuffer={fileBuffer}
                className="rounded-4xl"
                style={{ borderRadius: "10px" }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
