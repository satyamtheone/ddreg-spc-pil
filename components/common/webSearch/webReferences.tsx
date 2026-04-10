import React from "react";
import DynamicButton from "../DynamicButton";
import { FaEye } from "react-icons/fa";
import DocumentViewer from "./documentViewer";
import MiniChip from "../miniChip";
import { ReferencesFromWeb } from "@/lib/redux/apiTypes";
import { useDrawer } from "@/components/hooks/DrawerProvider";

type WebReferencesProps = {
  references: ReferencesFromWeb[];
};

const WebReferences: React.FC<WebReferencesProps> = ({ references }) => {
  const { openDrawer } = useDrawer();
  return (
    <div className=" max-h-100 overflow-auto">
      {references.length > 0 ? (
        <>
          {references?.map((reference, index) => (
            <div
              className="spcBNS px-4 py-2 w-full capitalize text-zinc-800 bg-white rounded-[6px]  my-2"
              key={index}
            >
              <div className="grid grid-cols-6 gap-x-2 items-center animate-dialog-slide-down">
                <div className="flex flex-col gap-1 ">
                  <div className="font-semibold text-gradient">Name</div>
                  <div className="text-sm">{reference.name}</div>
                </div>
                <div className="flex flex-col gap-1 ">
                  <div className="font-semibold text-gradient">Region</div>
                  <div className="text-sm">{reference.region}</div>
                </div>
                <div className="flex flex-col gap-1 ">
                  <div className="font-semibold text-gradient">
                    Last Updated
                  </div>
                  <div className="text-sm">
                    {reference.lastUpdated || "Recently"}
                  </div>
                </div>
                <div
                  className="flex flex-col gap-1 tooltip tooltip-info tooltip-left "
                  data-tip={reference.activeSubstance}
                >
                  <div className="font-semibold text-gradient">
                    Active Substance
                  </div>
                  <div className="text-sm truncate ">
                    {reference.activeSubstance}
                  </div>
                </div>
                <div className="flex flex-col gap-1 ">
                  <div className="font-semibold text-gradient">Status</div>
                  <div className="text-sm">
                    <MiniChip
                      status={reference.status || "Approved"}
                      size="small"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1  ">
                  {reference.documents.map((document, index) => (
                    <div className="min-w-max flex gap-2" key={index}>
                      <DynamicButton
                        text="View Document"
                        variant="card"
                        size="slim"
                        className="px-2"
                        icon={<FaEye />}
                        onClick={() =>
                          openDrawer({
                            title: "View Reference File",
                            children: <DocumentViewer url={document.url} />,
                          })
                        }
                      />
                      {/* <DynamicButton
                        text="Add Document"
                        variant="card"
                        size="slim"
                        className="px-2"
                        icon={<CiSquarePlus />}
                        onClick={() => {}}
                      /> */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="text-black">No results </div>
      )}
    </div>
  );
};

export default WebReferences;
