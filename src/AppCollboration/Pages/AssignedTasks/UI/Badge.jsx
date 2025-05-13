import React from 'react';

const Badge = ({ children, color = 'indigo' }) => {
  const colorStyles = {
    indigo: 'bg-indigo-100 text-indigo-800',
    emerald: 'bg-emerald-100 text-emerald-800',
    amber: 'bg-amber-100 text-amber-800',
    sky: 'bg-sky-100 text-sky-800',
    rose: 'bg-rose-100 text-rose-800'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${colorStyles[color]}`}>
      {children}
    </span>
  );
};

export default Badge;
