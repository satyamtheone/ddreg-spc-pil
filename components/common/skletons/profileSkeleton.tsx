import React from "react";

const ProfileSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="skeleton h-48  spcBNS "></div>
      <div className="skeleton h-26  spcBNS"></div>
    </div>
  );
};

export default ProfileSkeleton;
