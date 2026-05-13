import MiniChip from "@/components/common/miniChip";
import { useGetDocumentVersionsQuery } from "@/lib/redux/slices/documentApi";
import { formatedDate } from "@/lib/utilMethods";
import React from "react";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

import { IoDocumentTextOutline } from "react-icons/io5";
import { useNavigation } from "@/components/hooks/useNavigation";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import DynamicButton from "@/components/common/DynamicButton";
import { PlusSquare } from "lucide-react";
import CreateTaskDrawer from "../workflow-management/tasks/createTaskDrawer";
import { useAuth } from "@/lib/AuthProvider";
import { useDrawer } from "@/components/hooks/DrawerProvider";

type DocumentTableRowProps = {
  document: {
    title: string;
    country: string;
    type?: string;
    currentVersion: {
      versionId: string;
      id: string;
      versionNumber: string;
      status: string;
      reference?: {
        schemaMeta?: {
          type?: string;
        };
        type?: {
          country?: {
            code?: string;
          };
        };
      };
    };
    currentVersionId?: string;
    createdAt: string;
    createdBy: {
      id?: string;
      fName?: string;
      lName?: string;
      email?: string;
    };
    id: string;
    referenceFile?: string;
  };
  index: number;
  isParent?: boolean;
  reference?: {
    referenceFile: {
      key: string;
    };
  };
};

const DocumentTableRow: React.FC<DocumentTableRowProps> = ({
  document,
  index,
  isParent,
}) => {
  const { goTo } = useNavigation();
  const { isUser } = useAuth();
  const { openDrawer } = useDrawer();
  const [showVersions, setShowVersions] = React.useState(false);
  const query = useGetDocumentVersionsQuery(
    { docId: document.id },
    { skip: !showVersions },
  );
  const data = useQueryErrorHandler(query, "Get Versions");
  return (
    <div
      className={` rounded-xl transition-all  ${showVersions ? "border border-sky-600 shadow-xl scale-3d scale-101" : "shadow-md border  px-4 border-gray-300"} ${index % 2 === 0 ? "bg-purple-50" : ""} `}
    >
      <div className={` grid grid-cols-12   animate-dialog-slide-down   `}>
        <div className="flex gap-2 items-start border-r p-4 col-span-3">
          <div className="bg-gradient p-1 h-10 w-10 rounded-md shadow-md text-white">
            <IoDocumentTextOutline strokeWidth={1} size={30} />
          </div>
          <div>
            <div className="text-sm text-gray-400">Product Name</div>
            <div>{document?.title}</div>
          </div>
        </div>
        <div className="flex gap-2 items-start border-r p-4 col-span-2">
          <div>
            <div className="text-sm text-gray-400">Country</div>
            <div>{document?.country}</div>
          </div>
        </div>
        <div className="flex gap-2 items-start border-r p-4 col-span-1">
          <div>
            <div className="text-sm text-gray-400">Type</div>
            <div>
              <MiniChip
                status={
                  document?.currentVersion?.reference?.schemaMeta?.type || ""
                }
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-start border-r p-4 col-span-1">
          <div>
            <div className="text-sm text-gray-400">Version</div>
            <div>{document?.currentVersion?.versionNumber}</div>
          </div>
        </div>
        <div className="flex gap-2 items-start border-r p-4 col-span-1">
          <div>
            <div className="text-sm text-gray-400">Last Modified</div>
            <div>{formatedDate(document?.createdAt)}</div>
          </div>
        </div>
        <div className="flex gap-2 items-start overflow-hidden border-r p-4 col-span-1">
          <div>
            <div className="text-sm text-gray-400">Author</div>
            <div className=" wrap-break-word">
              {" "}
              {document?.createdBy?.fName} {document?.createdBy?.lName}
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-start p-4 col-span-1  border-r">
          <div>
            <div className="text-sm text-gray-400">Status</div>
            <div>
              <MiniChip status={document?.currentVersion?.status} />
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-start p-4 col-span-2">
          <div>
            <div className="text-sm text-gray-400">Actions</div>
            <div className="flex gap-2 text-teal-900  flex-wrap">
              {!isParent && (
                <div className="flex gap-2 items-center">
                  {!isUser && (
                    <div className="min-w-max">
                      <DynamicButton
                        text="Create Task"
                        variant="submit"
                        className="px-2"
                        size="slim"
                        icon={<PlusSquare />}
                        onClick={() =>
                          openDrawer({
                            title: "Create Task",
                            width: "w-2/3",
                            children: (
                              <CreateTaskDrawer
                                fromRepo
                                countryCode={
                                  document?.currentVersion.reference?.type
                                    ?.country?.code
                                }
                                documentType={
                                  document?.currentVersion?.reference
                                    ?.schemaMeta?.type
                                }
                                documentId={document?.currentVersion?.id}
                                versionId={document?.currentVersion?.versionId}
                              />
                            ),
                          })
                        }
                      />
                    </div>
                  )}
                </div>
              )}

              {isParent && (
                <div
                  className="custom-button-hover-classes p-2 bg-gradient  border"
                  onClick={() => setShowVersions(!showVersions)}
                >
                  {showVersions ? (
                    <MdKeyboardDoubleArrowUp size={20} />
                  ) : (
                    <MdKeyboardDoubleArrowDown size={20} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showVersions && (
        <div className=" bg-white rounded-b-[10px] border-t py-4 px-2 animate-dialog-slide-down flex flex-col gap-4">
          {query.isLoading || query.isFetching ? (
            <div className="flex flex-col gap-4 mt-4">
              <div className="skeleton h-20"></div>
              <div className="skeleton h-20"></div>
            </div>
          ) : (
            <>
              {data?.data.versions
                .filter((version) => version.id !== document.id)
                .map((version, i) => (
                  <DocumentTableRow
                    document={{
                      country: version?.reference?.type?.country?.name,
                      createdAt: version?.createdAt,
                      createdBy: {
                        fName: version?.createdBy?.fName,
                        lName: version?.createdBy?.lName,
                      },
                      currentVersion: {
                        id: document.id,
                        versionId: version.id,
                        versionNumber: version?.versionNumber,
                        status: version?.status,
                        reference: {
                          schemaMeta: {
                            type: version?.reference?.schemaMeta?.type,
                          },
                          type: {
                            country: {
                              code: version.reference.type.country.code,
                            },
                          },
                        },
                      },
                      id: version?.id,
                      title: version?.reference?.title,
                      referenceFile: version?.reference?.referenceFile?.key,
                    }}
                    index={i}
                    key={i}
                  />
                ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentTableRow;
