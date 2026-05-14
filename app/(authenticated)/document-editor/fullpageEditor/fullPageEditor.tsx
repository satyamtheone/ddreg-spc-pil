"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useGetDocumentBufferMutation } from "@/lib/redux/slices/documentApi";
import { SpcSearchParamss } from "./page";
import DynamicButton from "@/components/common/DynamicButton";
import { FaFileWord } from "react-icons/fa6";
import { FaExpand, FaCompress } from "react-icons/fa";

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

  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const elem = document.getElementById("editor-container");

    if (!document.fullscreenElement) {
      elem?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

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

  useEffect(() => {
    const initEditor = async () => {
      try {
        if (!filePath || !window.DocsAPI) {
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
              setIsEditorReady(true);
            },
            onDownloadAs: function (event: any) {
              try {
                const fileUrl = event?.data;
                if (!fileUrl) {
                  console.error("No file URL received");
                  return;
                }
                console.log(fileUrl.url);
                window.open(fileUrl.url, "_blank");
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
  }, [filePath, isScriptLoaded, params]);

  // Download edited document
  const handleSave = () => {
    console.log("trigg");
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
      id="editor-container"
      style={{
        height: isFullscreen ? "100vh" : "85vh",
        width: "100%",
      }}
    >
      <Script
        src="https://spl.ddregpharma.com/web-apps/apps/api/documents/api.js"
        strategy="afterInteractive"
        onLoad={() => setIsScriptLoaded(true)}
      />

      <div className="flex justify-end gap-3 mb-4">
        <div className="min-w-max">
          <DynamicButton
            variant="submit"
            size="slim"
            icon={<FaFileWord />}
            text="Download Docx"
            className="px-4 capitalize"
            onClick={handleSave}
            isSubmitting={!isEditorReady || isLoading}
          />
        </div>

        <div className="min-w-max">
          <DynamicButton
            variant="submit"
            size="slim"
            icon={isFullscreen ? <FaCompress /> : <FaExpand />}
            text={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            className="px-4 capitalize"
            onClick={toggleFullscreen}
          />
        </div>
      </div>

      <div
        id="placeholder"
        style={{
          height: isFullscreen ? "calc(100vh - 80px)" : "90vh",
          width: "100%",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      />
    </div>
  );
}
