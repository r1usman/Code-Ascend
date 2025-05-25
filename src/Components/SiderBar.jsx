import React from 'react';
import { navItems } from "./index";
import { setting } from "./index";
import { useNavigate } from 'react-router-dom';
import { IterationCcw, Menu } from 'lucide-react';

const SideBar = ({ activeMenu, shrink, setshrink }) => {
  const navigate = useNavigate();

  const handleClick = (route, label) => {
    if (route === "/Logout") {
      // localStorage.clear();
      // clearUser();
      navigate("/");
      return;
    }

    navigate(route);
  };

  return (
    <div className="w-full bg-dark-bg-secondary4 text-white  h-[calc(100vh-61px)] py-10 sticky top-[75px] left-0  border-r-2   border-r-text_primary font-poppins z-20">
      <div className="mb-4 px-5 flex justify-end cursor-pointer" onClick={setshrink}>
        <Menu />
      </div>

      {/* Navigation Items */}
      <div className="space-y-2 ">
        {navItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item.to, item.label)}
            className={`flex items-center gap-4 w-full text-[15px] py-3 px-5 cursor-pointer transition-colors duration-200 `}
          >
            <div className={`text-xl ${activeMenu == item.label ? "text-text_primary":""}`}>{<item.Icon />}</div>
            {!shrink && <div>{item.label}</div>}
          </div>
        ))}
      </div>

      {/* Settings and Logout */}
      <div className="absolute bottom-0 space-y-3 w-full mb-5">
        {setting.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item.to, item.label)}
            className={`flex items-center w-full text-[15px] py-2 px-5 cursor-pointer transition-colors duration-200 `}
          >
            <div className="text-xl">{<item.Icon />}</div>
            {!shrink && <div>{item.label}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
