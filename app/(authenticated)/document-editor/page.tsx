"use client";

import { useState } from "react";
import JoditEditorField from "./JoditEditorField";

export default function DocumentEditor() {
  const [content, setContent] = useState<string>(`
    <h2>Hello from Prefilled Content</h2>
    <p>This content is coming from API or DB.</p>
    <ul>
      <li>Edit this text</li>
      <li>Add new content</li>
      <li>Click submit</li>
    </ul>
  `);

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
      <h1 className="text-2xl font-bold">Jodit Editor Example</h1>

      <JoditEditorField value={content} onChange={setContent} />

      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-blue-600 text-white rounded"
      >
        Submit
      </button>
    </div>
  );
}
