import React, { useContext, useEffect } from 'react';
import { NavBar } from '../Components/NavBar';
import SideBar from '../Components/SiderBar';
import RightSideBar from '../Components/RightSideBar';
import { RightBarContextApi } from '../ContextApi/DisplayContextApi';
import { useLocation } from 'react-router-dom';

const DashboardLayout = ({ children, activeMenu, changeShow }) => {
  const User = true; 
  const { DisplayRightBar, setDisplayRightBar ,isAdmin } = useContext(RightBarContextApi);
  useEffect(()=>{
    if(isAdmin == true )
    {
      setDisplayRightBar(true)
    }

  },[isAdmin])
  
  

 

  return (
    <div>
      <NavBar />
      {User && (
        <>
          <div className="fixed top-0 left-0 w-64 h-screen z-20">
            <SideBar activeMenu={activeMenu} />
          </div>

          <div className="ml-64 px-5 pt-4 bg-dark-bg-secondary2">{children}</div>

          {DisplayRightBar && (
            <div className="fixed top-0 right-0 w-80 h-screen z-20">
              <div className="w-full h-screen bg-white">
                <RightSideBar changeShow={changeShow} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardLayout;
