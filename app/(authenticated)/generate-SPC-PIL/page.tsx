import { SearchDocument } from "@/components/common/SearchDocument";
import GenerateSpc from "./references/generateSpc";

export const metadata = {
  title: "Generate SPC-PIL",
};

export default function GenerateSPCPIL() {
  return (
    <div className="flex  flex-col gap-4">
      <SearchDocument />
      <GenerateSpc />
    </div>
  );
}
