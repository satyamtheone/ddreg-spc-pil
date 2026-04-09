import React from "react";

type LoadingComponentProps = {};

const LoadingComponent: React.FC<LoadingComponentProps> = (props) => {
  return (
    <div className="flex items-center w-full justify-center  p-4">
      <div className="flex flex-col w-full items-center gap-10 skeleton rounded-3xl ">
        <div className="h-100 w-full border-2 flex justify-center items-center rounded-3xl border-dashed bg-sky-600/10">
          <div className="flex-col gap-4 w-full flex items-center justify-center">
            <div className="w-24 h-24 border-6 border-transparent text-sky-600 text-4xl animate-spin flex items-center justify-center border-t-sky-600 rounded-full">
              <div className="w-18 h-18 border-8 border-transparent text-teal-500 text-2xl animate-spin flex items-center justify-center border-t-teal-500 rounded-full"></div>
            </div>
            <div className="skeleton skeleton-text text-lg">Generating...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;
