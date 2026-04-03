import React from "react";

type SelectedDocumentDetailsChipProps = {
  title?: string;
  subtitleOne?: string;
  subtitleTwo?: string;
};

const SelectedDocumentDetailsChip: React.FC<
  SelectedDocumentDetailsChipProps
> = ({ title, subtitleOne, subtitleTwo }) => {
  return (
    <div className="p-4 rounded-[10px]  shadow-md shadow-cyan-100 border-cyan-500 border flex flex-col gap-2 bg-sky-50 animate-dialog-slide-down">
      {title && (
        <div className="text-sm text-neutral-400 capitalize">{title}</div>
      )}{" "}
      {subtitleOne && <div className="capitalize ">{subtitleOne}</div>}
      {subtitleTwo && (
        <div className="text-sm capitalize text-sky-700">{subtitleTwo}</div>
      )}
    </div>
  );
};

export default SelectedDocumentDetailsChip;
