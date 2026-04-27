"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { DocxEditorRef } from "@eigenpal/docx-js-editor";
import "@eigenpal/docx-js-editor/styles.css";

// 🔥 dynamic import (VERY IMPORTANT for Next.js)
const DocxEditor = dynamic(
  () => import("@eigenpal/docx-js-editor").then((mod) => mod.DocxEditor),
  { ssr: false },
);

export default function DocxEditorWrapper() {
  const editorRef = useRef<DocxEditorRef>(null);
  const [fileBuffer, setFileBuffer] = useState<ArrayBuffer | null>(null);

  // 📥 Upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".docx")) {
      alert("Please upload a .docx file");
      return;
    }

    const buffer = await file.arrayBuffer();

    // 🔥 set buffer → loads into editor
    setFileBuffer(buffer);
  };

  // 💾 Save handler
  const handleSave = async () => {
    const buffer = await editorRef.current?.save();

    if (buffer) {
      // example: download locally
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "edited.docx";
      a.click();
      URL.revokeObjectURL(url);

      // OR send to API
      // await fetch("/api/save", { method: "POST", body: buffer });
    }
  };

  return (
    <div className="p-4 space-y-4 text">
      {/* Upload */}
      <input
        type="file"
        accept=".docx"
        onChange={handleFileUpload}
        className="border p-2"
      />

      {/* Save */}
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save DOCX
      </button>

      {/* Editor */}
      {fileBuffer && (
        <div className="border rounded h-[80vh]">
          <DocxEditor ref={editorRef} documentBuffer={fileBuffer} />
        </div>
      )}
    </div>
  );
}
