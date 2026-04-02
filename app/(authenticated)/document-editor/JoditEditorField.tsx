"use client";
import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

type Props = {
  value: string;
  onChange: (content: string) => void;
};

export default function JoditEditorField({ value, onChange }: Props) {
  const toolbarRef = useRef<HTMLDivElement>(null);

  const config = useMemo(
    () => ({
      readonly: false,
      height: 800,
      toolbarSticky: false,
      toolbarAdaptive: false,

      buttons: [
        "undo",
        "redo",
        "|",

        "paragraph",
        "font",
        "fontsize",
        "|",

        "bold",
        "italic",
        "underline",
        "|",

        "subscript",
        "superscript",
        "|",
        "brush",
        "eraser",
        "|",
        "lineHeight",
        "|",
        "align",
        "|",
        "ul",
        "ol",
        "outdent",
        "indent",
        "|",
        "table",
        "link",
        "|",
        "hr",
        "image",
      ],

      controls: {
        paragraph: {
          list: {
            p: "Paragraph",
            h1: "Heading 1",
            h2: "Heading 2",
            h3: "Heading 3",
            h4: "Heading 4",
            blockquote: "Quote",
          },
        },

        ul: {
          list: {
            disc: "Bullet",
          },
        },
        ol: {
          list: {
            decimal: "Numbered",
          },
        },
      },

      buttonsMD: [],
      buttonsSM: [],
      buttonsXS: [],

      events: {
        afterInit: (editor: any) => {
          if (toolbarRef.current) {
            const toolbar = editor.toolbar.container;
            toolbarRef.current.appendChild(toolbar);
          }
        },
      },
    }),
    [],
  );
  return (
    <div className="space-y-4 spcBNS p-4 bg-white rounded-[10px]">
      <div
        ref={toolbarRef}
        className="sticky top-0 z-50 bg-white p-2 spcBNS rounded-[10px]"
      />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2 spcBNS rounded-[10px]"></div>
        <div className="overflow-hidden spcBNS rounded-[10px] col-span-8">
          <JoditEditor
            value={value}
            config={config}
            onBlur={(content: string) => onChange(content)}
          />
        </div>
        <div className="col-span-2 spcBNS rounded-[10px]"></div>
      </div>
    </div>
  );
}
