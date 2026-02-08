"use client";

import { useState } from "react";

interface CopyableTextProps {
  text: string;
  label?: string;
  truncate?: boolean;
  maxLength?: number;
  className?: string;
}

export function CopyableText({
  text,
  label,
  truncate = false,
  maxLength = 8,
  className = "",
}: CopyableTextProps) {
  const [copied, setCopied] = useState(false);

  const displayText = truncate && text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <code
        onClick={handleCopy}
        className="flex-1 px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded text-xs font-mono text-zinc-300 hover:bg-zinc-700/50 cursor-pointer transition-colors break-all"
      >
        {displayText}
      </code>
      <button
        onClick={handleCopy}
        className="p-2 rounded bg-zinc-800 hover:bg-zinc-700 transition-colors"
        title="Copy to clipboard"
      >
        {copied ? "✓" : "📋"}
      </button>
    </div>
  );
}
