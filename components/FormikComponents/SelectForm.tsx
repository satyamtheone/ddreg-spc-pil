"use client";
import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import FormikSelect, { FormikOptonType } from "./FormikSelect";

type SelectFormProps = {
  name: string;
  label?: string;
  options: FormikOptonType[];
  value?: string | number; // value from parent
  onChange?: (value: string | number) => void; // send to parent
  disabled?: boolean;
  isLoading?: boolean;
  labelText?: string;
  isGhost?: boolean;
};

const SelectForm: React.FC<SelectFormProps> = ({
  name,
  label,
  options,
  value,
  onChange,
  disabled,
  isLoading,
  labelText,
  isGhost,
}) => {
  return (
    <Formik
      enableReinitialize // 👈 important for syncing with parent
      initialValues={{
        [name]: value ?? "",
      }}
      onSubmit={() => {}}
    >
      {({ values, setFieldValue }) => {
        // 👇 Sync to parent when value changes
        useEffect(() => {
          if (values[name] !== undefined) {
            onChange?.(values[name]);
          }
        }, [values[name]]);

        return (
          <Form className="text-black min-w-70 cursor-pointer animate-dialog-slide-down">
            <FormikSelect
              isGhost={isGhost}
              name={name}
              label={label}
              labelText={labelText}
              options={options}
              disabled={disabled}
              isLoading={isLoading}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const val = e.target.value;
                setFieldValue(name, val);
                onChange?.(val);
              }}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default SelectForm;
