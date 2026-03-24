"use client";
import DynamicTab from "@/components/common/DynamicTab";
import SelectForFilter from "@/components/common/selectForFilter";
import SearchForm from "@/components/FormikComponents/SearchForm";
import React, { useState } from "react";
import Templatecard from "./templateCard";

type TemplatesProps = {};

const Templates: React.FC<TemplatesProps> = (props) => {
  const [activeTab, setActiveTab] = useState("All");
  // const { user, isLoading } = useAuth();
  const activeChild = (tab: string) => {
    switch (tab) {
      case "General":
        return <>hi</>;
      case "Security":
        return <>hiujkm</>;
      case "User":
        return <>hi</>;
      case "Roles":
        return <>hi</>;
      default:
        return <>hisdf</>;
    }
  };
  const handleSetActiveTabs = (value: string) => {
    setActiveTab(value);
  };
  const handleSearch = (value: string) => {
    console.log(value);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="spcBNS p-4 bg-white rounded-[10px] flex gap-4 items-center flex-wrap">
        <DynamicTab
          tabs={[
            { label: "All", value: "All" },
            { label: "SPC", value: "SPC" },
            { label: "PIL", value: "PIL" },
            { label: "Latest", value: "Latest" },
          ]}
          setActiveTab={handleSetActiveTabs}
          activeTab={activeTab}
        />
        <div className="min-w-130">
          <SearchForm onSearchChange={handleSearch} />
        </div>
        <SelectForFilter
          handlesearchTitle={(value: string) => console.log(value)}
          optionTitle="Filter by"
          options={[
            { value: "Country", option: "Country" },
            { value: "email", option: "Email" },
            { value: "role", option: "Role" },
          ]}
        />
        <SelectForFilter
          handlesearchTitle={(value: string) => console.log(value)}
          optionTitle="Filter by"
          options={[
            { value: "type", option: "Type" },
            { value: "email", option: "Email" },
            { value: "role", option: "Role" },
          ]}
        />
      </div>
      <div className="">{activeChild(activeTab)}</div>
      <div className="flex gap-6 flex-wrap">
        <Templatecard />
        <Templatecard />
        <Templatecard />
        <Templatecard />
        <Templatecard />
        <Templatecard />
        <Templatecard />
      </div>
    </div>
  );
};

export default Templates;
