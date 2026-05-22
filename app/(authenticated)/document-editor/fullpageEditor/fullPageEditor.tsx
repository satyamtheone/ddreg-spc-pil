"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import {
  useGetDocumentBufferMutation,
  useSaveDocxToS3Mutation,
} from "@/lib/redux/slices/documentApi";
import DynamicButton from "@/components/common/DynamicButton";
import { FaExpand, FaCompress, FaSave } from "react-icons/fa";
import { useAuth } from "@/lib/AuthProvider";
import { FullPageEditorSearchParams } from "./page";
import toast from "react-hot-toast";
import { useNavigation } from "@/components/hooks/useNavigation";

declare global {
  interface Window {
    DocsAPI: any;
  }
}

export default function EditorPage({
  params,
}: {
  params: FullPageEditorSearchParams;
}) {
  const [saveDocxToS3, { isLoading: isSaveLoading, error, status }] =
    useSaveDocxToS3Mutation();
  const editorRef = useRef<any>(null);
  const { user } = useAuth();
  const amazonBucketname = process.env.NEXT_PUBLIC_AWS_URL;
  const { updateQueryParams } = useNavigation();
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

  useEffect(() => {
    const loadDocument = async () => {
      try {
        const url = params.documentBufferUrl;
        if (!url) return;
        const newUrl =
          url.endsWith(".pdf") && !url.includes(`https:`)
            ? `${amazonBucketname}/${url}`
            : url;
        if (newUrl.endsWith(".docx")) {
          setFilePath(`${amazonBucketname}/${url}`);
          return;
        }
        const res = await getDocumentBuffer({
          document_url: newUrl,
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
    const isEditor = params.role === "EDITOR";
    const isReviewer = params.role === "REVIEWER";
    const isApprover = params.role === "APPROVER";
    const isOnlyView = params.role === "VIEWER";
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
        const documentKey = data?.payload?.document?.key;
        editorRef.current = new window.DocsAPI.DocEditor("placeholder", {
          document: {
            fileType: "docx",
            key: documentKey,
            title: "document.docx",
            url: `https://labelling.ddregpharma.com/api/cache/${encodeURIComponent(
              filePath,
            )}`,
          },

          editorConfig: {
            mode: isApprover || isOnlyView ? "view" : "edit",
            user: {
              id: user?.id,
              name: `${user?.fName} ${user?.lName}`,
            },
            customization: {
              autosave: !isReviewer,
              forcesave: true,
              comments: true,
              trackChanges: true,
            },
          },

          events: {
            onAppReady: () => {
              setIsEditorReady(true);
            },
            onDownloadAs: async function (event: any) {
              const versionId = params.versionId;
              try {
                const fileUrl = event?.data;
                if (!fileUrl?.url) {
                  console.error("No file URL received");
                  return;
                }
                const res = await saveDocxToS3({
                  versionId: versionId || "",
                  body: {
                    description: "",
                    document_url: fileUrl?.url,
                    region: params?.region || "",
                    type: params?.type || "",
                  },
                });
                updateQueryParams({
                  documentBufferUrl:
                    res.data?.data?.documentVersionFile?.key || "",
                });
                toast.success("File is saved Successfully");
              } catch (err) {
                console.error("Download failed:", err);
                toast.error("Failed to save file");
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
  }, [filePath, isScriptLoaded, params, user]);

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
      id="editor-container"
      className={`w-full flex flex-col ${
        isFullscreen ? "h-screen" : "h-[85vh]"
      }`}
    >
      <Script
        src="https://spl.ddregpharma.com/web-apps/apps/api/documents/api.js"
        strategy="afterInteractive"
        onLoad={() => setIsScriptLoaded(true)}
      />

      {/* Toolbar */}
      <div className="flex justify-end gap-3 mb-3 shrink-0">
        {params.role === "VIEWER" ? (
          ""
        ) : (
          <div className="min-w-max">
            <DynamicButton
              variant="submit"
              size="slim"
              icon={<FaSave />}
              text={`${isSaveLoading ? "Saving..." : "Save this File"}`}
              className="px-4 capitalize"
              onClick={handleSave}
              isSubmitting={!isEditorReady || isLoading || isSaveLoading}
            />
          </div>
        )}

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

      {/* Editor */}
      <div
        id="placeholder"
        className="flex-1 w-full rounded-xl overflow-hidden"
      />
    </div>
  );
}
