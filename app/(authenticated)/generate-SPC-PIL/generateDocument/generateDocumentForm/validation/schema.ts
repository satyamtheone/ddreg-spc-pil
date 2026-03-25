import * as Yup from "yup";

export const step1Schema = Yup.object({
  referenceName: Yup.string().required("Required"),
});

export const step2Schema = Yup.object({
  templateName: Yup.string().required("Required"),
});

export const step3Schema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
});

export const step4Schema = Yup.object({
  findText: Yup.string().required(),
  replaceText: Yup.string().required(),
});
