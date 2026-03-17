import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

function FormikAwareDragNDrop({ field, form }) {
  const [preview, setPreview] = useState(null);

  // 🔹 Handle initial value (URL or File)
  useEffect(() => {
    if (!field.value) {
      setPreview(null);
      return;
    }

    // If value is a string (existing image URL)
    if (typeof field.value === "string") {
      setPreview(field.value);
    }

    // If value is a File (new upload)
    if (field.value instanceof File) {
      const objectUrl = URL.createObjectURL(field.value);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [field.value]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      form.setFieldValue(field.name, file);
    },
    [form, field.name]
  );

  const removeImage = () => {
    form.setFieldValue(field.name, null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop,
  });

  return (
    <div className="w-full">
      {/* DROPZONE */}
      {!preview && (
        <div
          {...getRootProps()}
          className={`
            w-full border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
            transition-all duration-300
            ${
              isDragActive
                ? "border-blue-500 bg-blue-50 scale-[1.02]"
                : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
            }
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2 text-gray-600">
            <div className="text-4xl">📤</div>
            <p className="font-medium">
              {isDragActive
                ? "Drop your logo here..."
                : "Drag & drop your logo"}
            </p>
            <p className="text-sm text-gray-400">
              or click to browse
            </p>
          </div>
        </div>
      )}

      {/* PREVIEW */}
      {preview && (
        <div className=" w-full flex justify-center items-center group animate-fadeIn">
          <div className=" relative w-40 h-40  p-1 flex justify-center rounded-[10px] border border-slate-200 items-center bg-white shadow-md">
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover rounded-[10px] transition-transform duration-300 hover:scale-105"
          />
            <button
            type="button"
            onClick={removeImage}
            className="
              absolute -top-2 -right-6
              bg-red-500 text-white rounded-full
              w-7 h-7 flex items-center justify-center
              text-sm shadow-lg
              hover:bg-red-600 transition-all
              cursor-pointer
            "
          >
            ✕
          </button>
          </div>

        
        </div>
      )}
    </div>
  );
}

export default FormikAwareDragNDrop;
