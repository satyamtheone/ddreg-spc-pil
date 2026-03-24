import PageHeader from "@/components/common/pageHeader";
import TemplateStatsCard from "./templateStatsCard";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoEarthSharp } from "react-icons/io5";
import { IoIosTrendingUp } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import Templates from "./templates";

export default function TemplateLibrary() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Template Library"
        subTitle="Regulatory-compliant document templates"
      />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 ">
        <TemplateStatsCard
          bg="bg-sky-600"
          icon={<IoDocumentTextOutline size={34} />}
          stats="24"
          title="Total Templates"
        />
        <TemplateStatsCard
          bg="bg-cyan-600"
          icon={<IoEarthSharp size={34} />}
          stats="8"
          title="Countries"
        />
        <TemplateStatsCard
          bg="bg-teal-500"
          icon={<IoIosTrendingUp size={34} />}
          stats="892"
          title="Documents Created"
        />
        <TemplateStatsCard
          bg="bg-sky-900"
          icon={<FaRegStar size={34} />}
          stats="4.5"
          title="Avg Rating"
        />
      </div>
      <Templates />
    </div>
  );
}
