import { createContext, useContext, useState } from 'react';

// Use PascalCase for context name
export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [isStudent, setIsStudent] = useState(true);
  const toggleView = () => {
    setIsStudent((prev) => !prev);
  };

  return (
    <RoleContext.Provider value={{ isStudent, toggleView }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
