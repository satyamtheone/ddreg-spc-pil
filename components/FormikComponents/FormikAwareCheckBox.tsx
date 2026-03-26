import React from "react";
import { useField } from "formik";

interface FormikCheckboxProps {
  name: string;
  label?: string;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const FormikAwareCheckBox: React.FC<FormikCheckboxProps> = ({
  label,
  onChange,
  className = "",
  ...props
}) => {
  const [field, meta, helpers] = useField({ ...props, type: "checkbox" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    helpers.setValue(checked);

    if (onChange) {
      onChange(checked);
    }
  };

  return (
    <div className={`form-control ${className}`}>
      <label className="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          className="checkbox bg-teal-200 rounded-sm checked:bg-[linear-gradient(270deg,#06b6d4,#3b82f6)]  checked:text-white"
          checked={field.value}
          onChange={handleChange}
          name={field.name}
        />
        <span className="label-text">{label}</span>
      </label>

      {meta.touched && meta.error && (
        <p className="text-error text-sm mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default FormikAwareCheckBox;
