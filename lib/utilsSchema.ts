import * as Yup from "yup";
export const passwordRules = Yup.string()
  .required("Password Is Required")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/,
    "Must Contain 6 Characters, One Uppercase, One Number and One Special Case Character",
  );
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

export const updatePasswordValidationSchema = Yup.object({
  password: passwordRules,
  newPassword: passwordRules.notOneOf(
    [Yup.ref("password")],
    "New password should be different",
  ),
  confirmPassword: passwordRules
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .notOneOf([Yup.ref("password")], "New password should be different"),
});

export const createRoleValidationSchema = Yup.object({
  roleName: Yup.string().trim().required("Role name is required"),
  description: Yup.string().trim().required("Description is required"),
  permissions: Yup.object().test(
    "at-least-one",
    "At least one permission is required",
    (value) => {
      return value && Object.values(value).some(Boolean);
    },
  ),
});