"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useGetDocumentBufferMutation } from "@/lib/redux/slices/documentApi";
import { SpcSearchParamss } from "./page";

declare global {
  interface Window {
    DocsAPI: any;
  }
}

export default function EditorPage({ params }: { params: SpcSearchParamss }) {
  const editorRef = useRef<any>(null);

  const [filePath, setFilePath] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const [isEditorReady, setIsEditorReady] = useState(false);
  const [getDocumentBuffer, { isLoading }] = useGetDocumentBufferMutation();

  // Load converted document URL
  useEffect(() => {
    const loadDocument = async () => {
      try {
        const url = params.documentBufferUrl;

        if (!url) return;

        const res = await getDocumentBuffer({
          document_url: url,
          response_type: "url",
        }).unwrap();

        setFilePath(res.url);
      } catch (err) {
        console.error("Failed to load document:", err);
      }
    };

    loadDocument();
  }, [params.documentBufferUrl, getDocumentBuffer]);

  // Initialize ONLYOFFICE editor
  useEffect(() => {
    const initEditor = async () => {
      try {
        if (!filePath || !isScriptLoaded || !window.DocsAPI) {
          return;
        }

        // destroy existing editor
        if (editorRef.current?.destroyEditor) {
          editorRef.current.destroyEditor();

          editorRef.current = null;
        }

        const tokenRes = await fetch(
          `https://labelling.ddregpharma.com/api/convert/token?file=${encodeURIComponent(
            filePath,
          )}`,
        );

        const data = await tokenRes.json();

        // stable key
        const documentKey = filePath.replace(/[^a-zA-Z0-9]/g, "_");

        editorRef.current = new window.DocsAPI.DocEditor("placeholder", {
          document: {
            fileType: "docx",
            key: documentKey,
            title: "document.docx",
            url: `https://labelling.ddregpharma.com/api/cache/${encodeURIComponent(
              filePath,
            )}`,
          },
          documentType: "word",
          editorConfig: {
            mode: "edit",
          },

          events: {
            onAppReady: () => {
              console.log("ONLYOFFICE Ready");
              setIsEditorReady(true);
            },
            onDownloadAs: function (event: any) {
              try {
                console.log("Download Event:", event);
                const fileUrl = event?.data;
                console.log("Download Event:----->", event?.data.url);
                if (!fileUrl) {
                  console.error("No file URL received");
                  return;
                }
                window.open(fileUrl, "_blank");
              } catch (err) {
                console.error("Download failed:", err);
              }
            },
          },

          token: data.token,
        });
      } catch (err) {
        console.error("ONLYOFFICE init error:", err);
      }
    };

    initEditor();

    return () => {
      if (editorRef.current?.destroyEditor) {
        editorRef.current.destroyEditor();

        editorRef.current = null;
      }
    };
  }, [filePath, isScriptLoaded]);

  // Download edited document
  const handleSave = () => {
    try {
      if (!editorRef.current) {
        console.error("Editor not initialized");
        return;
      }

      editorRef.current.downloadAs("docx");
    } catch (err) {
      console.error("Save operation failed:", err);
    }
  };

  return (
    <div
      style={{
        height: "85vh",
        width: "100%",
      }}
    >
      <Script
        src="https://spl.ddregpharma.com/web-apps/apps/api/documents/api.js"
        strategy="afterInteractive"
        onLoad={() => setIsScriptLoaded(true)}
      />

      <div className="flex justify-end mb-4">
        <button
          onClick={handleSave}
          disabled={!isEditorReady || isLoading}
          className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
        >
          Save DOCX
        </button>
      </div>

      <div
        id="placeholder"
        style={{
          height: "90vh",
          width: "100%",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      />
    </div>
  );
}
