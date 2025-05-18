import React from "react";



const Card = ({
  title,
  icon,
  className = "",
  children,
}) => {
  return (
    <div
      className={`bg-dark-bg-secondary2 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-dark-gray-border transition-all hover:shadow-xl hover:border-border_Col ${className}`}
    >
      {(title || icon) && (
        <div className="flex items-center gap-2 mb-3">
          {icon && <div className="text-text_primary">{icon}</div>}
          {title && (
            <h3 className="text-dark-text-color font-robert-medium">{title}</h3>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
