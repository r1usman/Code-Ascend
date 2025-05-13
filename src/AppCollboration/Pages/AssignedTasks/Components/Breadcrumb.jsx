import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  
  
  const pathSegments = location.pathname.split('/').filter(segment => segment);
  console.log(pathSegments);
  

  // Create breadcrumb links dynamically
  const generateBreadcrumbs = () => {
    return pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
      console.log(path);
      

      return (
        <span key={index} className="flex items-center">
          <button
            onClick={() => navigate(path)}
            className="text-text_primary"
          >
            {segment.charAt(0).toUpperCase() + segment.slice(1)}
          </button>
          {index < pathSegments.length - 1 && <span className="mx-2">/</span>}
        </span>
      );
    });
  };
  console.log(pathSegments);
  

  return (
    <div className="flex items-center space-x-2 mb-6 text-gray-600">
      <button onClick={() => navigate('/dashboard')} className="text-text_primary">
        Home
      </button>
      {pathSegments.length > 0 && <span className="mx-2">/</span>}
      {generateBreadcrumbs()}
    </div>
  );
};

export default Breadcrumb;
