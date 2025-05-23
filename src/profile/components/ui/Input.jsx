import React, { InputHTMLAttributes } from "react";
import { AlertCircle } from "lucide-react";

export const Input = ({ label, id, error, className = "", ...props }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          className={`
            w-full px-4 py-2 bg-gray-700 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200
            ${error ? "border-red-500" : "border-gray-600"}
            ${className}
          `}
          {...props}
        />
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-red-500 text-sm mt-1">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
