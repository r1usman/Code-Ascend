import React, { ReactNode } from 'react';

const FormSection = ({ title, description, children }) => {
  return (
    <div className="rounded-lg bg-gray-800 p-5 shadow-lg transition-all duration-200 hover:shadow-xl">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-gray-400">{description}</p>
        )}
      </div>

      <div>{children}</div>
    </div>
  );
};

export default FormSection;
