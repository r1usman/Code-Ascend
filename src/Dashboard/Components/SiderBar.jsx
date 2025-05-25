import React, { useContext } from 'react';
import { navItems } from '../DashboardAssests/index';
import { setting } from '../DashboardAssests/index';
import { UserContext } from '../../GlobalContextApi/User.jsx';
import { useNavigate } from 'react-router-dom';
const SideBar = ({ activeMenu }) => {
  const {User ,setUser, clearUser} = useContext(UserContext)

  const navigate = useNavigate();
  const handleClick = (route) => {
    console.log(route);

    if (route === '/Logout') {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/');
  };

  return (
    <>
      <div className=" sticky left-0 top-[75px] z-20 h-[calc(100vh-61px)] w-64 bg-dark-bg-secondary4  py-10  font-poppins text-white">
        <div className="mt-2 space-y-3 overflow-auto  px-2">
          {navItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleClick(item.to)}
              className={`flex w-full cursor-pointer items-center gap-4 px-5 py-3 text-[15px]
                                ${
                                  activeMenu === item.label
                                    ? 'border-r-4 border-orange-600 bg-gradient-to-r from-orange-200/40 to-orange-400/50 text-white'
                                    : ''
                                }`}
            >
              <div className="text-xl ">{<item.Icon />}</div>
              <div>{item.label}</div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0">
          <div>
            {setting.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick(item.to)}
                className={`flex w-full cursor-pointer items-center gap-4 px-5 py-2 text-[15px]
                                ${
                                  activeMenu === item.label
                                    ? 'text-task_primary border-task_primary border-r-4 bg-gradient-to-r from-blue-50/40 to-blue-100/50'
                                    : ''
                                }`}
              >
                <div className="text-xl ">{<item.Icon />}</div>
                <div>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
