import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/,
      "Must Contain 6 Characters, One Uppercase, One Number and One Special Case Character",
    ),
});

export const generalFormScheme = Yup.object()
  .shape({
    country: Yup.string().nullable(),
    language: Yup.string().nullable(),
    timeZone: Yup.string().nullable(),
  })
  .test("at-least-one", "At least one field must be updated", (value) => {
    return !!(value?.country || value?.language || value?.timeZone);
  });
