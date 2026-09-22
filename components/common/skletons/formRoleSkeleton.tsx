import React from "react";

const FormRoleSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-10 skeleton"></div>
      <div className="h-10 skeleton"></div>
      <div className="h-10 skeleton"></div>
    </div>
  );
};

export default FormRoleSkeleton;
