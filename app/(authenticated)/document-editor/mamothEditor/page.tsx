"use client";

import dynamic from "next/dynamic";
import React from "react";

// ✅ Avoid SSR issues
const DocumentEditor = dynamic(
  () =>
    import("@onlyoffice/document-editor-react").then(
      (mod) => mod.DocumentEditor,
    ),
  { ssr: false },
);

export default function OnlyOfficeEditor() {
  const onDocumentReady = () => {
    console.log("Document is ready");
  };

  const onLoadComponentError = (
    errorCode: number,
    errorDescription: string,
  ) => {
    console.error("ONLYOFFICE Error:", errorCode, errorDescription);
  };

  return (
    <div style={{ height: "100vh" }}>
      <DocumentEditor
        id="docxEditor"
        documentServerUrl="http://localhost:8080" // 🔥 your docker server
        config={{
          document: {
            fileType: "docx",
            key: "unique-key-123", // 🔥 must change per document
            title: "Demo.docx",
            url: "https://static.onlyoffice.com/assets/docs/samples/demo.docx", // ✅ test file
          },
          documentType: "word",
          editorConfig: {
            mode: "edit",
            lang: "en",
            user: {
              id: "user-1",
              name: "Satyam",
            },
            callbackUrl: "http://localhost:3000/api/save", // 🔥 needed later
          },
        }}
        events_onDocumentReady={onDocumentReady}
        onLoadComponentError={onLoadComponentError}
      />
    </div>
  );
}
