"use client";
import React, { useEffect, useState } from "react";
import { GoChecklist } from "react-icons/go";
import DocumentPreviewNavigator from "./documentPreviewNavigator";
import { CreateDocumentResponse } from "@/lib/redux/apiTypes";
import { IoDocumentTextOutline } from "react-icons/io5";
import DynamicButton from "@/components/common/DynamicButton";
import { formatedDate } from "@/lib/utilMethods";
import noDataSvg from "../../../../public/noData.svg";
import Image from "next/image";
import { useNavigation } from "@/components/hooks/useNavigation";
import { useGetReferenceByIdQuery } from "@/lib/redux/slices/templateApi";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import { SpcSearchParams } from "./page";
type NavigatorPageProps = {
  params?: SpcSearchParams;
};
const NavigatorPage: React.FC<NavigatorPageProps> = ({ params }) => {
  const referenceId = params ? params.referenceId : "";
  const query = useGetReferenceByIdQuery(referenceId || "");
  const data = useQueryErrorHandler(query, "Get Reference By Id");
  const { goTo } = useNavigation();
  const [generatedDocument, setGeneratedDocument] =
    useState<CreateDocumentResponse>();

  useEffect(() => {
    const storedDocument = sessionStorage.getItem("generatedDocument");

    if (storedDocument && !referenceId) {
      setGeneratedDocument(JSON.parse(storedDocument));
    }
  }, []);
  return (
    <>
      {query.isLoading || query.isFetching ? (
        <div className="h-150 spcBNS skeleton"></div>
      ) : (
        <>
          {generatedDocument || data?.data ? (
            <div className="flex flex-col gap-4 animate-dialog-slide-down">
              {generatedDocument && (
                <div className="px-4 py-1 rounded-lg  justify-between shadow-md  border-emerald-500 border flex gap-2 items-center bg-emerald-50">
                  <div className="flex gap-2 items-center">
                    <div className="flex justify-center items-center h-8 w-8 bg-emerald-100 rounded-[10px]">
                      <GoChecklist
                        className="text-green-600"
                        strokeWidth={1}
                        size={20}
                      />
                    </div>
                    <div className="flex flex-col text-zinc-800 ">
                      <div className=" font-semibold">
                        Document Generated Successfully
                      </div>
                      <div className="text-sm">
                        {generatedDocument?.data.document.title ||
                          data?.data?.title}
                         - 
                        {generatedDocument?.data.document.country ||
                          data?.data?.type?.country?.name}
                         <strong>{data?.data?.type?.name}</strong>
                      </div>
                    </div>
                  </div>
                  <div>
                    <DynamicButton
                      text="Go To your Repository "
                      size="slim"
                      variant="submit"
                      className="px-2"
                      onClick={() => goTo("/document-repository")}
                    />
                  </div>
                </div>
              )}
              <div className="p-4 spcBNS  rounded-[10px] bg-white">
                <div className="flex flex-col text-gradient mb-2">
                  <div className="text-lg font-bold">Document Preview</div>
                  <div>Review the generated content</div>
                </div>

                <div className="h-12 px-2 bg-purple-50 rounded-t-[10px] border">
                  <div className="flex h-full w-full items-center">
                    <div className="p-2 pl-0 text-teal-500">
                      <IoDocumentTextOutline size={26} />
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="font-medium text-gradient">
                        {generatedDocument?.data?.document?.title ||
                          data?.data?.title}
                      </div>
                      <div className="flex w-full justify-between">
                        <div className="text-sm text-gray-500 font-normal">
                          Document Type:{" "}
                          {generatedDocument?.data?.version?.changeType ||
                            data?.data?.type?.name}
                        </div>
                        <div className="text-sm text-gray-500 font-normal">
                          Country:{" "}
                          {generatedDocument?.data?.document?.country ||
                            data?.data?.type?.country?.name}
                        </div>
                        <div className="text-sm text-gray-500 font-normal">
                          Version:{" "}
                          {generatedDocument?.data?.version?.versionNumber ||
                            data?.data?.version}
                        </div>
                        <div className="text-sm text-gray-500 font-normal">
                          Modified Date:{" "}
                          {formatedDate(
                            generatedDocument?.data?.version?.createdAt ||
                              data?.data?.createdAt ||
                              "",
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <DocumentPreviewNavigator
                  sections={
                    generatedDocument?.data.version.sections ||
                    data?.data.sections ||
                    []
                  }
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center  h-full">
              <div className="flex flex-col gap-4 justify-center mt-20 items-center">
                <div>
                  <Image
                    src={noDataSvg}
                    alt="No data"
                    height={150}
                    width={150}
                  />
                </div>
                <div className="text-gradient text-xl font-bold">
                  No Preview Available
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default NavigatorPage;
