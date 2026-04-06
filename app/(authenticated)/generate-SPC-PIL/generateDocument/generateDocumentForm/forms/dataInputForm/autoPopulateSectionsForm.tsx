import { useFormikContext } from "formik";
import FromSectionRenderer from "./fromSectionRenderer";

export default function AutoPopulateSectionsForm() {
  const { values, setFieldValue } = useFormikContext<any>();

  const handleAddRootSection = () => {
    const nextIndex = values.sections.length + 1;

    const newSection = {
      id: `${nextIndex}`,
      title: "",
      content: "",
      type: "text",
      required: false,
      children: [],
      matched: false,
    };
    setFieldValue("sections", [...values.sections, newSection]);
  };

  return (
    <div>
      <div>
        {values.sections.map((section: any, index: number) => (
          <FromSectionRenderer
            key={section.id}
            section={section}
            path={`sections.${index}`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddRootSection}
        className="mt-4 text-gradient"
      >
        + Add New Section
      </button>
    </div>
  );
}
