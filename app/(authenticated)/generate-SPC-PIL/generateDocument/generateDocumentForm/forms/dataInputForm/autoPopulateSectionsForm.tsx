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
      type: "group",
      required: false,
      children: [],
      matched: false,
    };

    setFieldValue("sections", [...values.sections, newSection]);
  };

  return (
    <div>
      {values.sections.map((section: any, index: number) => (
        <FromSectionRenderer
          key={section.id}
          section={section}
          path={`sections.${index}`}
        />
      ))}

      <button
        type="button"
        onClick={handleAddRootSection}
        className="mt-4 text-blue-600"
      >
        + Add New Section
      </button>
    </div>
  );
}
