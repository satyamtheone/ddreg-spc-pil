"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useDownloadPdf = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const download = async (url, filename) => {
    const toastId = toast.loading("Downloading...");
    setIsDownloading(true);

    try {
      const response = await axios.get(url, {
        responseType: "blob",
      });

      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(blobUrl);

      toast.success("Downloaded Successfully.", { id: toastId });
    } catch (error) {
      toast.error("Download failed.", { id: toastId });
    } finally {
      setIsDownloading(false);
    }
  };

  return { download, isDownloading };
};
