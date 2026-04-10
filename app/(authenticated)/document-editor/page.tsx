"use client";
import { useState } from "react";
import PageHeader from "@/components/common/pageHeader";

export default function DocumentEditor() {
  const [content, setContent] = useState<string>(``);

  const handleSubmit = () => {
    console.log("Submitted HTML Content:");
    console.log(content);

    const response = {
      body: content,
      length: content.length,
      timestamp: new Date().toISOString(),
    };
    console.log("Mock API Response:", response);
  };

  return (
    <div>
      <PageHeader title="Settings" subTitle="Tuesday, January 13, 2026" />
      {/* <h1 className="text-2xl font-bold">Jodit Editor Example</h1>

      <JoditEditorField value={content} onChange={setContent} />

      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-blue-600 text-white rounded"
      >
        Submit
      </button> */}
    </div>
  );
}
