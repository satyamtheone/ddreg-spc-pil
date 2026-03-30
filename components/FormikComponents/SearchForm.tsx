"use client";
import * as Yup from "yup";
import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { FcSearch } from "react-icons/fc";
import FormikInput from "./FormikInput";

type SearchFormValues = {
  search: string;
};

type SearchFormProps = {
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
  isLoading?: boolean;
};

const SearchFormSchema = Yup.object({
  search: Yup.string(),
});

function SearchForm({
  onSearchChange,
  onSearchSubmit,
  isLoading,
}: SearchFormProps) {
  const initialValues: SearchFormValues = {
    search: "",
  };

  const handleSubmit = (
    values: SearchFormValues,
    actions: FormikHelpers<SearchFormValues>,
  ) => {
    onSearchSubmit?.(values.search);
    actions.setSubmitting(false);
  };

  return (
    <Formik<SearchFormValues>
      initialValues={initialValues}
      validationSchema={SearchFormSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => {
        React.useEffect(() => {
          onSearchChange?.(values.search);
        }, [values.search]);

        return (
          <Form className="w-full animate-dialog-slide-down">
            <FormikInput
              disabled={isLoading}
              autoFocus
              name="search"
              type="text"
              placeholder="Search"
              className="ring-cyan-600 border border-cyan-600"
              sideIcon={<FcSearch className="h-6 w-6" />}
              iconPosition="left"
              containerMargin="mb-0"
            />
          </Form>
        );
      }}
    </Formik>
  );
}

export default SearchForm;
