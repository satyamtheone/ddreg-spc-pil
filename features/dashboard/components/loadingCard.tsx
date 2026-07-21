"use client";
import React from "react";

type LoadingCardProps = {
  title: string;
  description: string;
  isLoading: boolean;
};

const LoadingCard: React.FC<LoadingCardProps> = ({
  isLoading,
  title,
  description,
}) => {
  return (
    <div className="p-4 h-full">
      <p className="text-lg font-medium text-theme-secondary">{title}</p>
      {description && (
        <p className="text-sm text-theme-secondary mt-0.5">{description}</p>
      )}
      {isLoading ? (
        <div className="mt-4 flex items-center justify-center h-40 text-sm gap-4">
          <span className="loading loading-xl loading-spinner text-cyan-500"></span>
          <span>Loading...</span>
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-center h-40 text-gray-400 text-sm">
          No data available
        </div>
      )}
    </div>
  );
};

export default LoadingCard;
