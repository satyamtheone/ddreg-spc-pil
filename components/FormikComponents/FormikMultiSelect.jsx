"use client";
import { useField, useFormikContext } from "formik";
import React, { useEffect } from "react";

const FormikMultiSelect = ({ label, options = [], ...props }) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();

  const selected = field.value || [];

  // Normalize initial values (object[] → string[])
  useEffect(() => {
    if (selected.length && typeof selected[0] === "object") {
      const ids = selected.map((item) => item.value);
      setFieldValue(field.name, ids);
    }
  }, []);

  const selectedIds =
    typeof selected[0] === "object" ? selected.map((i) => i.value) : selected;

  const selectedOptions = options.filter((o) => selectedIds.includes(o.value));

  const handleChange = (e) => {
    const value = e.target.value;
    if (!value) return;

    if (!selectedIds.includes(value)) {
      setFieldValue(field.name, [...selectedIds, value]);
    }

    e.target.value = "";
  };

  const removeItem = (value) => {
    const updated = selectedIds.filter((id) => id !== value);
    setFieldValue(field.name, updated);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-zinc-800 capitalize">{label}</label>

      <div className="flex flex-row-reverse justify-end w-full gap-6">
        {selectedOptions.length > 0 && (
          <div className="flex flex-wrap bg-white gap-2 w-2/3 min-w-40 border border-gray-200 shadow-md rounded-md p-2 min-h-10.5">
            {selectedOptions.map((item) => (
              <span
                key={item.value}
                className="flex items-center gap-2 bg-primary text-sm text-white px-2 py-1 rounded animate-dialog-slide-in"
              >
                <span>{item.label}</span>

                <button
                  type="button"
                  className="rounded-md p-1 font-bold cursor-pointer text-xs"
                  onClick={() => removeItem(item.value)}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}

        <select
          onChange={handleChange}
          className="select md:select-xl w-1/3 shadow-sm text-sm"
        >
          <option value="">Choose {label}</option>

          {options
            .filter((o) => !selectedIds.includes(o.value))
            .map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
        </select>
      </div>

      {meta.touched && meta.error && (
        <small className="text-red-500">{meta.error}</small>
      )}
    </div>
  );
};

export default FormikMultiSelect;
