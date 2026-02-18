"use client";
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length: number;
  value: string;
  setValue: (value: string) => void;
  onChange: (value: string) => void;
  onComplete: (value: string) => void;
  disabled?: boolean;
  containerClassName?: string;
  inputClassName?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length,
  value,
  setValue,
  onChange,
  onComplete,
  disabled = false,
  containerClassName,
  inputClassName,
}) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (value.length === length) {
      onComplete(value);
    }
  }, [value, length, onComplete]);

  useEffect(() => {
    if (!disabled) {
      inputsRef.current[0]?.focus();
    }
  }, [disabled]);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = e.target.value.replace(/\D/g, "");
    if (newValue.length > 1) {
      const digits = newValue.split("");
      const newOtp = value.split("");
      digits.forEach((digit, i) => {
        if (index + i < length) {
          newOtp[index + i] = digit;
        }
      });
      const updatedOtp = newOtp.join("").slice(0, length);
      setValue(updatedOtp);
      onChange(updatedOtp);
      if (updatedOtp.length === length) {
        onComplete(updatedOtp);
      }
      if (index + digits.length < length) {
        inputsRef.current[index + digits.length]?.focus();
      }
    } else {
      const newOtp = value.split("");
      newOtp[index] = newValue;
      const updatedOtp = newOtp.join("");
      setValue(updatedOtp);
      onChange(updatedOtp);

      if (newValue && index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      if (value[index]) {
        const newOtp = value.split("");
        newOtp[index] = "";
        const updatedOtp = newOtp.join("");
        setValue(updatedOtp);
        onChange(updatedOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").replace(/\D/g, "");
    const newOtp = value.split("");
    let currentIndex = newOtp.findIndex(
      (char, i) => !char || i === newOtp.length - 1,
    );
    if (currentIndex === -1) currentIndex = 0;

    pastedData.split("").forEach((char, i) => {
      if (currentIndex + i < length) {
        newOtp[currentIndex + i] = char;
      }
    });

    const updatedOtp = newOtp.join("").slice(0, length);
    setValue(updatedOtp);
    onChange(updatedOtp);
    if (updatedOtp.length === length) {
      onComplete(updatedOtp);
    }

    const lastFilledIndex = Math.min(
      currentIndex + pastedData.length,
      length - 1,
    );
    inputsRef.current[lastFilledIndex]?.focus();
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2",
        containerClassName,
      )}
      onPaste={handlePaste}
    >
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          disabled={disabled}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          ref={(ref) => {
            inputsRef.current[index] = ref;
          }}
          className={cn(
            "w-14 h-12 text-center text-2xl border-2 border-gray-300 rounded-md focus:border-[#17bdd3] focus:outline-none focus:ring-1 focus:ring-[#17BDD3] disabled:opacity-50 disabled:cursor-not-allowed transition-all",
            inputClassName,
          )}
        />
      ))}
    </div>
  );
};

export default OTPInput;
