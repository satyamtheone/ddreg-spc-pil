import MultistepDocumentForm from "./generateDocumentForm/multistepDocumentForm";
import PageHeader from "@/components/common/pageHeader";

export const metadata = {
  title: "Generate SPC-PIL",
};

export default function Page() {
  return (
    <div>
      <PageHeader
        title="Generate SPC/PIL"
        subTitle="Customize the document with your product information"
      />
      <div className="flex  flex-col gap-4 spcBNS bg-white rounded-[10px] p-4">
        <MultistepDocumentForm />
      </div>
    </div>
  );
}
