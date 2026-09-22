import * as Yup from "yup";

export const step1Schema = Yup.object({
  slectedDocument: Yup.boolean()
    .oneOf([true], "You must select a document")
    .required("Required"),
});

export const step2Schema = (templateId?: string) =>
  Yup.object({
    countryCode: Yup.string().required("Required"),
    templateId: Yup.string().when([], {
      is: () => !!templateId,
      then: (schema) => schema.required("Required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

export const step4Schema = Yup.object({
  findText: Yup.string().required(),
  replaceText: Yup.string().required(),
});

const sectionSchema: Yup.Schema<any> = Yup.object({
  id: Yup.string().required("Section id is required"),
  title: Yup.string().required("Title is required"),
  children: Yup.array().of(Yup.lazy(() => sectionSchema)),
});

export const step3Schema = Yup.object({
  sections: Yup.array()
    .of(sectionSchema)
    .min(1, "At least one section is required"),
  basicInformation: Yup.object({
    brandName: Yup.string().optional(),
    strength: Yup.string().optional(),
    dosageForm: Yup.string().optional(),
    manufacturer: Yup.string().optional(),
    shelfLife: Yup.string().optional(),
    storagePrecautions: Yup.string().optional(),
    MAHAddress: Yup.string().optional(),
    packagingDetails: Yup.string().optional(),
  }),
});