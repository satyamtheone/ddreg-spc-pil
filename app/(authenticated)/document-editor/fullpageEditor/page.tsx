"use client";
import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import type { DocxEditorRef } from "@eigenpal/docx-js-editor";
import "@eigenpal/docx-js-editor/styles.css";
import JSZip from "jszip";
import { useGetDocumentBufferMutation } from "@/lib/redux/slices/documentApi";

const DocxEditor = dynamic(
  () => import("@eigenpal/docx-js-editor").then((mod) => mod.DocxEditor),
  { ssr: false },
);

export default function DocumentEditor() {
  const editorRef = useRef<DocxEditorRef>(null);

  const [fileBuffer, setFileBuffer] = useState<ArrayBuffer | null>(null);
  const [originalBuffer, setOriginalBuffer] = useState<ArrayBuffer | null>(
    null,
  );
  const [fileName, setFileName] = useState("document.docx");

  const [getDocumentBuffer, { isLoading }] = useGetDocumentBufferMutation();
  const searchParams = useSearchParams();

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
    // const normal = await normalizeDocx(buffer);
    await loadDocx(buffer, file.name);
  };

  const loadFromUrl = async (url: string) => {
    try {
      const blob = await getDocumentBuffer({
        document_url: url,
      }).unwrap();

      const buffer = await blob.arrayBuffer();

      await loadDocx(buffer, "converted.docx");
    } catch (err) {
      console.error("Failed to load document:", err);
    }
  };

  useEffect(() => {
    const url = searchParams.get("documentBufferUrl");

    if (url) {
      loadFromUrl(url);
    }
  }, [searchParams]);

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
    <div className="p-4 space-y-4">
      <input type="file" accept=".docx" onChange={handleFileUpload} />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save DOCX
      </button>

      {fileBuffer && !isLoading && (
        <div className="h-[80vh] border border-gray-300 rounded">
          <DocxEditor
            key={fileBuffer.byteLength}
            ref={editorRef}
            documentBuffer={fileBuffer}
            
          />
        </div>
      )}
    </div>
  );
}
