import * as Yup from "yup";

export const step1Schema = Yup.object({
  slectedDocument: Yup.boolean()
    .oneOf([true], "You must select a document")
    .required("Required"),
});

export const step2Schema = Yup.object({
  countryCode: Yup.string().required("Required"),
  templateId: Yup.string().required("Required"),
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
    brandName: Yup.string().required("Brand name is required"),
    strength: Yup.string().required("Strength is required"),
    dosageForm: Yup.string().required("Dosage form is required"),
    manufacturer: Yup.string().required("Manufacturer is required"),
    shelfLife: Yup.string().required("Shelf life is required"),
    storagePrecautions: Yup.string().required("Storage precautions required"),
    MAHAddress: Yup.string().required("MAH Address is required"),
    packagingDetails: Yup.string().required("Packaging details required"),
  }),
});