"use client";
import React, { useState } from "react";
import DynamicButton from "../DynamicButton";
import { ReferencesFromWeb } from "@/lib/redux/apiTypes";
import { useDrawer } from "@/components/hooks/DrawerProvider";
import AddRefenceForm from "@/app/(authenticated)/generate-SPC-PIL/references/addRefenceForm";
import { BsCheck2Circle } from "react-icons/bs";
import { IoIosCloudDownload } from "react-icons/io";

type Props = {
  url: string;
  documentName: string;
  reference: ReferencesFromWeb;
};

const DocumentViewer = ({ url, reference }: Props) => {
  const [loading, setLoading] = useState(true);
  const { closeDrawer, openDrawer } = useDrawer();

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

  const handleSelectDocument = ({
    reference,
    url,
  }: {
    reference: ReferencesFromWeb;
    url: string;
  }) => {
    closeDrawer();
    openDrawer({
      title: "Select This Reference",
      children: (
        <AddRefenceForm reference={reference} url={url} formType="web" />
      ),
    });
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
        className={`border rounded ${loading ? "hidden" : "block"} mt-2 pb-8`}
        onLoad={() => setLoading(false)}
      />
      <div className="absolute left-0 right-0 bg-white border-t border-gray-300  bottom-0">
        <div className="flex justify-end gap-4 py-2">
          <div>
            <DynamicButton
              isSubmitting={loading}
              text="Download This Document"
              variant="outline"
              size="slim"
              onClick={handleDownload}
              className="px-2"
              icon={<IoIosCloudDownload size={20} className="text-teal-500" />}
            />
          </div>
          <div>
            <DynamicButton
              isSubmitting={loading}
              text="Select this Document"
              variant="submit"
              size="slim"
              onClick={() => handleSelectDocument({ reference, url })}
              className="px-2"
              icon={<BsCheck2Circle size={20} />}
              iconPosition="right"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
