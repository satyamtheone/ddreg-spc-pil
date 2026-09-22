import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { SlCloudUpload } from "react-icons/sl";
import { useField, useFormikContext } from "formik";
import { useDownloadPdf } from "../hooks/useDownloadPdf";
import MiniButton from "../miniButton";
import image from "@/public/pdfSvg.svg";
import Image from "next/image";

function FormikPdfInput({ name, label }) {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const { download, isDownloading } = useDownloadPdf();

  const value = field.value;

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFieldValue(name, e.dataTransfer.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileChange = (e) => {
    const file = e.currentTarget.files?.[0] || null;
    setFieldValue(name, file);
  };

  const clearFile = () => {
    setFieldValue(name, null);
    const input = document.getElementById(name);
    if (input) input.value = null;
  };

  const fileName =
    value instanceof File ? value.name : value?.Location ? name + ".pdf" : "";

  return (
    <div className="mb-3 flex flex-col gap-2 w-full relative">
      {label && <label>{label}</label>}

      {value && (
        <span
          className="absolute -right-2 top-4 h-10 w-10 cursor-pointer rounded-full border border-gray-200 bg-white shadow flex items-center justify-center text-gray-500"
          onClick={clearFile}
        >
          <AiFillCloseCircle size={30} className="text-red-500" />
        </span>
      )}

      <label
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        htmlFor={name}
        role="button"
        className="flex cursor-pointer shadow-md flex-column justify-center items-center text-center position-relative border p-4 w-full border-gray-300 rounded-md"
      >
        <input
          id={name}
          name={name}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="flex flex-col justify-center items-center capitalize">
          <div className="mb-2">
            {value ? (
              <Image src={image} alt="PDF" width={32} height={36} />
            ) : (
              <SlCloudUpload size={42} color="#C4C7D1" />
            )}
          </div>

          <div>
            {!value ? (
              <p>
                Click to upload{" "}
                <span className="text-gray-400 font-medium">
                  or drag and drop
                </span>
              </p>
            ) : (
              <p>{fileName}</p>
            )}
          </div>
        </div>
      </label>

      {value?.Location && (
        <div className="absolute -bottom-4 -left-2 shadow-2xl">
          <MiniButton
            title={isDownloading ? "Downloading" : "download"}
            onClick={() => download(value.Location, name + ".pdf")}
            disabled={isDownloading}
          />
        </div>
      )}

      {meta.touched && meta.error && (
        <div className="text-danger mt-1 text-red-500 text-sm">
          {meta.error}
        </div>
      )}
    </div>
  );
}

export default FormikPdfInput;
