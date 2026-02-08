"use client";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Spinner({ size = "md", className = "" }: SpinnerProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className={`inline-block animate-spin ${sizes[size]} ${className}`}>
      <div className="w-full h-full border-2 border-indigo-400/30 border-t-indigo-400 rounded-full"></div>
    </div>
  );
}
