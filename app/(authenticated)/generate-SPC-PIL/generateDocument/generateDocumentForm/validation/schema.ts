import * as Yup from "yup";

export const step1Schema = Yup.object({
  slectedDocument: Yup.boolean()
    .oneOf([true], "You must select a document")
    .required("Required"),
});

export const step2Schema = Yup.object({
  templateId: Yup.string().required("Required"),
});

export const step3Schema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
});

export const step4Schema = Yup.object({
  findText: Yup.string().required(),
  replaceText: Yup.string().required(),
});
