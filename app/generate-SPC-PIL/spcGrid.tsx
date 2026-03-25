import { productDocuments } from "@/lib/utils";
import React from "react";
import SpcGridCard from "./spcGridCard";

type SpcGridProps = {};

const SpcGrid: React.FC<SpcGridProps> = (props) => {
  return (
    <div className=" flex  gap-6 flex-wrap">
      {productDocuments.map((document, index) => (
        <SpcGridCard key={index} item={document} />
      ))}
    </div>
  );
};

export default SpcGrid;
