import React from "react";

export function Input({ type = "text", placeholder, value, onChange, accept, className = "" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      accept={accept}
      className={`w-full p-2 border rounded ${className}`}
    />
  );
}
