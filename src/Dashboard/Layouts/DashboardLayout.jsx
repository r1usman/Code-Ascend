import React from 'react';
// import { UserContext } from '../../ContextApi/User';
// import SideBar from './Components/SideBar';
import { NavBar } from '../Components/NavBar';
import SideBar from '../Components/Siderbar';
import RightSideBar from '../Components/RightSideBar';

const DashboardLayout = ({ children, activeMenu, changeShow }) => {
//   const { User } = useContext(UserContext);

  const User = true

  return (
    <>
      <div>

        
        <NavBar />
        {User && (
          <>
            <div className="fixed top-0 left-0 w-64 h-screen z-20">
              <SideBar activeMenu={activeMenu}   />
            </div>

            <div className="ml-64 px-5 pt-4">{children}</div>

            <div className="fixed top-0 right-0 w-80 h-screen z-20">
              <div className='w-full h-screen bg-white'>
                  <RightSideBar changeShow = {changeShow}/>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DashboardLayout;
