"use client";
import React, { useState } from "react";
import DynamicButton from "../DynamicButton";

type Props = {
  url: string;
};

const DocumentViewer = ({ url }: Props) => {
  const [loading, setLoading] = useState(true);

  const proxyUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
    url,
  )}&embedded=true`;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "document.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full h-full flex flex-col gap-2">
      {loading && (
        <div className="flex items-center justify-center skeleton h-full"></div>
      )}
      <iframe
        src={proxyUrl}
        width="100%"
        height="100%"
        className={`border rounded ${loading ? "hidden" : "block"} mt-2`}
        onLoad={() => setLoading(false)}
      />
      <div className="flex justify-end">
        <DynamicButton
          isSubmitting={loading}
          text="Download This Document"
          variant="submit"
          onClick={handleDownload}
        />
      </div>
    </div>
  );
};

export default DocumentViewer;
