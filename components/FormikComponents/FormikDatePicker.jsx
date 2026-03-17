"use client";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { FiCalendar } from "react-icons/fi";
import { format } from "date-fns";
import { FaCircleXmark } from "react-icons/fa6";
import { useField, useFormikContext } from "formik";
import FormikInput from "./FormikInput";

const FormikDatePicker = ({
  name,
  placeholder = "dd-mm-yyyy",
  label,
  disabled,
}) => {
  const [open, setOpen] = useState(false);

  const [field] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const selectedDate = field.value ? new Date(field.value) : undefined;

  return (
    <div className="relative min-w-44">
      <div
        onMouseDown={(e) => {
          e.preventDefault();
          if (!disabled) setOpen(true);
        }}
        className="cursor-pointer"
      >
        <FormikInput
          placeholder={placeholder}
          disabled={disabled}
          name={name}
          label={label}
          sideIcon={<FiCalendar className="h-5 w-5 text-gray-500" />}
          containerMargin="mb-0"
          readOnly
        />
      </div>

      {open && (
        <div className="absolute -left-4 z-50 animate-dialog-slide-down">
          <div className="relative rounded-xl bg-white p-4 border border-gray-200 shadow-2xl">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (!date) return;

                const formatted = format(date, "yyyy-MM-dd");

                setFieldValue(name, formatted);
                setFieldTouched(name, true);

                setOpen(false);
              }}
              classNames={{
                table: "border-separate border-spacing-1",
                caption: "text-center font-semibold text-xs",
                day: "h-4 w-4 rounded-md hover:bg-cyan-100 text-center text-xs",
                day_selected: "bg-cyan-600 text-white rounded-none",
                nav_button: "hover:bg-gray-100 rounded-md m-2",
                chevron: "text-gray-400",
                selected: "bg-primary shadow-md text-white",
                day_button: "px-2 p-1",
                today: "text-black font-bold",
              }}
            />

            <div className="mt-2 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setFieldValue(name, "", true);
                  setOpen(false);
                }}
                className="flex-1 rounded-sm border px-4 py-1 text-sm"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 bg-primary rounded-sm border px-4 py-1 text-white text-sm font-semibold"
              >
                Close
              </button>
            </div>

            <div
              className="absolute -top-4 -right-4 bg-white cursor-pointer flex shadow-md justify-center items-center h-10 w-10 rounded-full"
              onClick={() => setOpen(false)}
            >
              <FaCircleXmark className="h-7 w-7 text-red-500" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormikDatePicker;
