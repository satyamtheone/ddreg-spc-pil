import React, { useCallback, useEffect, useState } from "react";
import { useField, useFormikContext } from "formik";
import { SlCloudUpload } from "react-icons/sl";

type Props = {
  name: string;
  label?: string;
};

const FormikImageUpload: React.FC<Props> = ({ name, label }) => {
  const { setFieldValue } = useFormikContext<any>();
  const [field, meta] = useField(name);

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!field.value) {
      setPreview(null);
      return;
    }

    if (typeof field.value === "string") {
      setPreview(field.value);
    }

    if (field.value instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(field.value);
    }
  }, [field.value]);

  // Handle file selection
  const handleFile = (file: File) => {
    setFieldValue(name, file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Drag & Drop
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFile(file);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFieldValue(name, null);
    setPreview(null);
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center ">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={`group border-2 flex h-full  items-center ${preview ? "spcBNS" : "border-dashed"}  rounded-lg text-center hover:spcBNS cursor-pointer hover:border-sky-600 transition relative`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          id={name}
        />

        <label
          htmlFor={name}
          className="cursor-pointer h-full w-full flex items-center min-h-50 min-w-70"
        >
          {preview ? (
            <div className="relative h-full w-full  flex justify-center items-center animate-dialog-slide-down">
              <img
                src={preview}
                alt="Preview"
                className="mx-auto h-40 object-contain rounded"
              />

              {/* ❌ Close Icon */}
              <button
                type="button"
                onClick={handleRemove}
                className="absolute -top-8 -right-4 bg-red-500/85 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-700 cursor-pointer"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="animate-fadeIn w-full h-full flex flex-col gap-5 text-lg items-center pt-10 px-4 justify-between group-hover:text-teal-800 font-semibold">
              <div>
                <SlCloudUpload size={40} />
              </div>
              <p>Drag & drop image here or click to upload</p>
            </div>
          )}
        </label>
      </div>

      {meta.touched && meta.error && (
        <p className="text-red-500 text-sm mt-2">{meta.error}</p>
      )}
    </div>
  );
};

export default FormikImageUpload;
