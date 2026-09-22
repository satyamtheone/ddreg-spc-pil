import React, { useCallback, useEffect, useState } from "react";
import { useField, useFormikContext } from "formik";
import { FaFilePdf, FaFileWord, FaEye } from "react-icons/fa";
import { RxUpload } from "react-icons/rx";

type Props = {
  name: string;
};

const FormikAwareDocumentUploader: React.FC<Props> = ({ name }) => {
  const { setFieldValue } = useFormikContext<any>();
  const [field, meta] = useField(name);

  const [fileName, setFileName] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"pdf" | "word" | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!field.value) {
      setFileName(null);
      setFileType(null);
      setPreviewUrl(null);
      setProgress(0);
      return;
    }

    if (field.value instanceof File) {
      setFileName(field.value.name.replace(/\s/g, "_"));

      if (field.value.type.includes("pdf")) {
        setFileType("pdf");
      } else {
        setFileType("word");
      }

      const url = URL.createObjectURL(field.value);
      setPreviewUrl(url);
    }

    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [field.value]);

  

  // simulate progress for large files
  const simulateProgress = () => {
    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return prev + 8;
      });
    }, 120);
  };

  const handleFile = (file: File) => {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowed.includes(file.type)) return;

    simulateProgress();
    setFieldValue(name, file);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setFieldValue(name, null);
    setFileName(null);
    setFileType(null);
    setPreviewUrl(null);
    setProgress(0);
  };

  return (
    <div
      className={`group relative  w-full flex flex-col gap-4 border-2 rounded-lg items-center ${
        fileName
          ? "border-gradient spcBNS"
          : "border-dashed hover:border-sky-600"
      }`}
    >
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={` flex items-center  z-50  text-center hover:spcBNS cursor-pointer hover:border-sky-600  relative`}
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          className="hidden"
          id={name}
        />

        <label
          htmlFor={name}
          className="cursor-pointer h-full w-full flex items-center min-h-50 min-w-70 justify-center"
        >
          {fileName ? (
            <div className=" flex flex-col items-center gap-3 p-4 w-full">
              {/* Icon */}
              {fileType === "pdf" ? (
                <FaFilePdf size={50} className="text-red-500" />
              ) : (
                <FaFileWord size={50} className="text-blue-500" />
              )}

              {/* File name */}
              <p className="text-sm font-semibold break-all text-center">
                {fileName}
              </p>

              {/* Progress bar */}
              {loading && (
                <div className="w-full bg-gray-200 rounded h-2">
                  <div
                    className="bg-gradient h-2 rounded transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}

              {/* PDF preview */}
              {!loading && previewUrl && (
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm bg-gradient text-white px-3 py-1 rounded hover:opacity-90"
                >
                  <FaEye />
                  {fileType === "pdf" ? "Preview PDF" : "Open Document"}
                </a>
              )}
            </div>
          ) : (
            <div className=" w-full mb-4 h-full flex flex-col gap-5  items-center pt-10 px-4 justify-between group-hover:text-teal-800 ">
              <div className="border z-0 p-2 rounded-lg bg-gradient">
                <RxUpload size={40} />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-zinc-800">
                  Drag and drop or click to upload
                </p>
                <p className="text-sm text-neutral-400">
                  Supported Documents: Word(.docx), PDF(.pdf)
                </p>
              </div>
            </div>
          )}
        </label>
      </div>

      {meta.touched && meta.error && (
        <p className="text-red-500 text-sm">{meta.error}</p>
      )}

      {fileName && !loading && (
        <button
          type="button"
          onClick={handleRemove}
          className="absolute -top-2 cursor-pointer -right-2 bg-red-500/85 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-700"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default FormikAwareDocumentUploader;
