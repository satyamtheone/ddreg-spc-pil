"use client";

import { Field, FieldProps } from "formik";
import { Switch } from "@/components/ui/switch";
import React from "react";

interface FormikToggleProps {
  label?: string;
  name: string;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

const FormikToggle: React.FC<FormikToggleProps> = ({
  label,
  name,
  disabled,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-3">
      {label && <label className="text-zinc-800 capitalize">{label}</label>}

      <Field name={name}>
        {({ field, form }: FieldProps) => (
          <Switch
            checked={field.value}
            disabled={disabled}
            className="
           data-[state=unchecked]:bg-gray-300
           data-[state=checked]:bg-linear-to-r
          data-[state=checked]:from-sky-600
          data-[state=checked]:to-teal-500 "
            onCheckedChange={(checked) => {
              form.setFieldValue(name, checked);
              onChange?.(checked);
            }}
          />
        )}
      </Field>
    </div>
  );
};

export default FormikToggle;
