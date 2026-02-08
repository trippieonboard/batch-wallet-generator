"use client";

import { useState } from "react";

interface ToggleProps {
  label?: string;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
  className?: string;
}

export function Toggle({ label, defaultValue = false, onChange, className = "" }: ToggleProps) {
  const [isOn, setIsOn] = useState(defaultValue);

  const handleToggle = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onChange?.(newValue);
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        isOn ? "bg-indigo-600" : "bg-zinc-700"
      } ${className}`}
      role="switch"
      aria-checked={isOn}
    >
      <div
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
          isOn ? "translate-x-6" : ""
        }`}
      />
      {label && <span className="ml-3 text-sm">{label}</span>}
    </button>
  );
}
