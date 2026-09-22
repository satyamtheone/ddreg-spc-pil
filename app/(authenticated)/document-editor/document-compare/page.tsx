"use client";

import { useState } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer-continued";
import mammoth from "mammoth";

export default function DocxCompare() {
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const extractTextFromDocx = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();

    const result = await mammoth.extractRawText({
      arrayBuffer,
    });

    return result.value;
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "old" | "new",
  ) => {
    try {
      setError("");
      setLoading(true);

      const file = e.target.files?.[0];

      if (!file) return;

      if (
        file.type !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setError("Please upload a valid .docx file");
        return;
      }

      const text = await extractTextFromDocx(file);

      if (type === "old") {
        setOldText(text);
      } else {
        setNewText(text);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to parse DOCX file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-6 space-y-6">
      <h1 className="text-2xl font-bold">DOCX Compare Viewer</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <label className="block mb-2 font-medium">Upload Old DOCX</label>

          <input
            type="file"
            accept=".docx"
            onChange={(e) => handleFileChange(e, "old")}
            className="w-full"
          />
        </div>

        <div className="border rounded-lg p-4">
          <label className="block mb-2 font-medium">Upload New DOCX</label>

          <input
            type="file"
            accept=".docx"
            onChange={(e) => handleFileChange(e, "new")}
            className="w-full"
          />
        </div>
      </div>

      {loading && (
        <div className="text-sm text-gray-500">Processing documents...</div>
      )}

      {error && <div className="text-red-500 text-sm">{error}</div>}

      {oldText && newText && (
        <div className="border rounded-xl overflow-hidden">
          <ReactDiffViewer
            oldValue={oldText}
            newValue={newText}
            splitView={true}
            compareMethod={DiffMethod.SENTENCES}
            leftTitle="Old Document"
            rightTitle="New Document"
            showDiffOnly={false}
            styles={{
              variables: {
                dark: {
                  diffViewerBackground: "#1e1e1e",
                  diffViewerColor: "#ffffff",
                  addedBackground: "#033a16",
                  removedBackground: "#4a0f0f",
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
