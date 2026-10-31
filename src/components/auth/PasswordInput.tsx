"use client";

import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

interface PasswordInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  invalid?: boolean;
}

export default function PasswordInput({
  id,
  value,
  onChange,
  placeholder = "Enter your password",
  autoComplete = "current-password",
  invalid = false,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={visible ? "text" : "password"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`input w-full pr-12 ${invalid ? "input-error" : ""}`}
      />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-base-content/60 hover:text-base-content"
      >
        {visible ? (
          <LuEyeOff className="h-5 w-5" />
        ) : (
          <LuEye className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
