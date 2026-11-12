"use client";
import React, { useState } from "react";

// Shows the first `maxChars` characters of a long text with a "Zobraziť viac" button, and the whole
// text (with "Zobraziť menej") once it is expanded. Short texts are shown as they are.
const ExpandableText = ({
  text,
  maxChars = 100,
  className = "",
}: {
  text?: string;
  maxChars?: number;
  className?: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  const value = text ?? "";
  const isLong = value.length > maxChars;

  return (
    <p className={`${className} break-words`}>
      {expanded || !isLong ? value : value.substring(0, maxChars) + "..."}
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          className="ml-1 text-secondary-color font-semibold hover:underline cursor-pointer text-sm"
        >
          {expanded ? "Zobraziť menej" : "Zobraziť viac"}
        </button>
      )}
    </p>
  );
};

export default ExpandableText;
