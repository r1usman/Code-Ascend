import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [User, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await axios.get(
          'http://localhost:3000/api/auth/profile',
          {
            withCredentials: true,
          }
        );
        setUser(result.data.user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const updateUser = (user, token) => {
    console.log('I am here');

    setUser(user);
    localStorage.setItem('token', token);
  };

  const clearUser = () => {
    console.log('IN here');
    setUser(null);
    localStorage.removeItem('token');
  };
  return (
    <UserContext.Provider
      value={{ updateUser, clearUser, User, loading, setUser, setLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
export default UserProvider;
