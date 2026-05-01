import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

export type CustomText = {
  text: string;
};

export type ParagraphElement = {
  type: "paragraph";
  children: CustomText[];
};

export type CustomElement = ParagraphElement;

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
