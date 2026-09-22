import { productDocuments } from "@/lib/utils";
import React from "react";
import SpcGridCard from "./spcGridCard";
import { Reference } from "@/lib/redux/apiTypes";

type SpcGridProps = { references: Reference[] };

const SpcGrid: React.FC<SpcGridProps> = ({ references }) => {
  return (
    <div className=" flex  gap-4 flex-wrap">
      {references.map((document, index) => (
        <SpcGridCard key={index} item={document} />
      ))}
    </div>
  );
};

export default SpcGrid;
