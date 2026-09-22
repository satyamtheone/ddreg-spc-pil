"use client"
import DynamicTab from "@/components/common/DynamicTab";
import PageHeader from "@/components/common/pageHeader";
import { useState } from "react";
import GeneralTabComponent from "./general/generalTabComponent";
import SecorityTabComponent from "./security/secorityTabComponent";
import UserTabComponent from "./user/userTabComponent";
import RoleTabComponent from "./roles/roleTabComponent";
import { useAuth } from "@/lib/AuthProvider";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("General");
  const { isUser } = useAuth();
  const VisibleTabs = isUser
    ? [
        { label: "General", value: "General" },
        { label: "Security", value: "Security" },
      ]
    : [
        { label: "General", value: "General" },
        { label: "Security", value: "Security" },
        { label: "Roles & Permissions", value: "Roles" },
        { label: "User", value: "User" },
      ];
  const activeChild = (tab: string) => {
    switch (tab) {
      case "General":
        return <GeneralTabComponent />;
      case "Security":
        return <SecorityTabComponent />;
      case "User":
        return <UserTabComponent />;
      case "Roles":
        return <RoleTabComponent />;
      default:
        return <>hisdf</>;
    }
  };
  const handleSetActiveTabs = (value: string) => {
    setActiveTab(value);
  };
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Settings" subTitle="Tuesday, January 13, 2026" />
      <DynamicTab
        tabs={VisibleTabs}
        setActiveTab={handleSetActiveTabs}
        activeTab={activeTab}
      />
      <div className="spcCard rounded-[10px] ">{activeChild(activeTab)}</div>
    </div>
  );
};

export default Setting;
