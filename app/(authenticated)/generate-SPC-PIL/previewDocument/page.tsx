"use client";
import React, { useEffect, useState } from "react";
import { GoChecklist } from "react-icons/go";
import DocumentPreviewNavigator from "./documentPreviewNavigator";
import { CreateDocumentResponse } from "@/lib/redux/apiTypes";

type PageProps = {};

const Page: React.FC<PageProps> = (props) => {
  const [generatedDocument, setGeneratedDocument] =
    useState<CreateDocumentResponse>();

  useEffect(() => {
    const storedDocument = sessionStorage.getItem("generatedDocument");

    if (storedDocument) {
      setGeneratedDocument(JSON.parse(storedDocument));
    }
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <div className="px-4 py-1 rounded-lg shadow-md  border-emerald-500 border flex gap-2 items-center bg-emerald-50">
        <div className="flex justify-center items-center h-14 w-14 bg-emerald-100 rounded-[10px]">
          <GoChecklist className="text-green-600" strokeWidth={1} size={36} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-zinc-800 ">Document Generated Successfully</div>
          <div className="text-zinc-800 text-sm">
            DDREg Plus 200 mg - Germany SPC
          </div>
        </div>
      </div>
      <div className="p-4 spcBNS  rounded-[10px] bg-white">
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-semibold">Document Preview</div>
          <div>Review the generated content</div>
        </div>

        <div className="h-15 bg-purple-50 rounded-t-[10px] border"></div>
        <DocumentPreviewNavigator
          sections={generatedDocument?.data.version.sections || []}
        />
      </div>
    </div>
  );
};

export default Page;
