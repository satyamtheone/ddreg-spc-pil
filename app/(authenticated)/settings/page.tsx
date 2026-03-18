"use client"
import DynamicTab from "@/components/common/DynamicTab";
import PageHeader from "@/components/common/pageHeader";
import { useState } from "react";
import GeneralTabComponent from "./generalTabComponent";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("General");
  // const { user, isLoading } = useAuth();
  const activeChild = (tab:string) => {
    switch (tab) {
      case "General":
        return <GeneralTabComponent/>;
      case "Security":
        return  <>Security</>;
         case "User":
        return  <>User</>;
         case "Roles":
        return  <>Roles & Permissions</>;
      default:
        return  <>hisdf</>;
    }
  };
  const handleSetActiveTabs = (value:string) => {
    setActiveTab(value);
  };
  return  (
  <div className="flex flex-col gap-6"><PageHeader title="Settings" subTitle="Tuesday, January 13, 2026" />
    <DynamicTab
          tabs={[
            { label: "General", value: "General" },
            { label: "Security", value: "Security" },
            { label: "User", value: "User" },
            { label: "Roles & Permissions", value: "Roles" },
          ]}
          setActiveTab={handleSetActiveTabs}
          activeTab={activeTab}
        />
        <div className="spcCard rounded-[10px] ">{activeChild(activeTab)}</div></div>)
};

export default Setting;
