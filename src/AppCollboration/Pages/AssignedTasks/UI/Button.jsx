import React from 'react';

const   Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '' 
}) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantStyles = {
    primary: "bg-text_primary text-white hover:bg-text_primary hover:opacity-50 focus:ring-text_primary-500",
    secondary: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500"
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
