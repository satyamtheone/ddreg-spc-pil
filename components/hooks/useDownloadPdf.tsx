"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const amazonBucketname = "https://devtest-ddreg.s3.ap-south-1.amazonaws.com";

type DownloadFn = (url: string, filename: string) => Promise<void>;

export const useDownloadPdf = () => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const download: DownloadFn = async (url, filename) => {
    const toastId = toast.loading("Downloading...");
    setIsDownloading(true);

    try {
      const fullUrl = `${amazonBucketname}/${url}`;

      const response = await axios.get(fullUrl, {
        responseType: "blob",
      });

      const blobUrl = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", filename);

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      toast.success("Downloaded Successfully.", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Download failed.", { id: toastId });
    } finally {
      setIsDownloading(false);
    }
  };

  return { download, isDownloading };
};
