import { SectionWithNumber } from "@/lib/utilMethods";

type SectionItemProps = {
  section: SectionWithNumber;
  level?: number;
};

const SectionItem = ({ section, level = 0 }: SectionItemProps) => {
  return (
    <div style={{ marginLeft: level * 24 }}>
      <div className="font-bold text-base flex gap-2 mb-2">
        <span>{section.number}</span>
        <span>{section.title}</span>
      </div>
      {section.children?.map((child: SectionWithNumber) => (
        <SectionItem key={child.id} section={child} level={level + 1} />
      ))}
    </div>
  );
};
export default SectionItem;
