import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";

type TemplatecardProps = {};

const Templatecard: React.FC<TemplatecardProps> = (props) => {
  return (
    <div className="spcBNS p-4 bg-white rounded-[10px] w-110 flex- flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="p-3 spcBNS max-w-min rounded-lg bg-gradient">
          <IoDocumentTextOutline size={24} />
        </div>
        <div>Latest</div>
      </div>
      <div className="text-xl font-medium">UK SPC Template</div>
      <div className="text-base font-normal text-zinc-800">
        Standard UK SPC template compliant with MHRA guidelines{" "}
      </div>
    </div>
  );
};

export default Templatecard;
