"use client";
import PageHeader from "@/components/common/pageHeader";
import TemplateStatsCard from "./templateStatsCard";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoEarthSharp } from "react-icons/io5";
import { IoIosTrendingUp } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import Templates from "./templates";
import DynamicButton from "@/components/common/DynamicButton";
import { RiUploadCloud2Line } from "react-icons/ri";
import { useDrawer } from "@/components/hooks/DrawerProvider";
import UploadTemplateFrom from "./uploadTemplateFrom";
import { useGetCountriesQuery } from "@/lib/redux/slices/templateApi";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import { getAllDocumentOptions, getCountryOptions } from "@/lib/utilMethods";

export default function TemplateLibrary() {
  const query = useGetCountriesQuery();
  const data = useQueryErrorHandler(query, "Get Countries");
  const options = getCountryOptions(data?.data || []);
  const allTypesOptions = getAllDocumentOptions(data?.data || []);

  const { openDrawer } = useDrawer();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Template Library"
          subTitle="Regulatory-compliant document templates"
        />
        <div>
          <DynamicButton
            variant="submit"
            text="Upload Template"
            icon={<RiUploadCloud2Line size={24} />}
            onClick={() =>
              openDrawer({
                title: "Update Template",
                children: <UploadTemplateFrom />,
              })
            }
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 ">
        <TemplateStatsCard
          bg="bg-sky-600"
          icon={<IoDocumentTextOutline size={34} />}
          stats={8}
          title="Total Templates"
        />
        <TemplateStatsCard
          bg="bg-cyan-600"
          icon={<IoEarthSharp size={34} />}
          stats={4}
          title="Countries"
        />
        <TemplateStatsCard
          bg="bg-teal-500"
          icon={<IoIosTrendingUp size={34} />}
          stats={6}
          title="Documents Created"
        />
        <TemplateStatsCard
          bg="bg-sky-900"
          icon={<FaRegStar size={34} />}
          stats={4.5}
          title="Avg Rating"
        />
      </div>
      <Templates
        options={options}
        types={allTypesOptions}
        isLoading={query.isLoading || query.isFetching}
      />
    </div>
  );
}
