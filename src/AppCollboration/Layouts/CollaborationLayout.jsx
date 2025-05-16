import React from 'react';
// import { UserContext } from '../../ContextApi/User';
// import SideBar from './Components/SideBar';
import { NavBar } from '../../Dashboard/Components/NavBar';
import CollabSideBar from '../Components/CollabSideBar';
import { Outlet } from 'react-router-dom';
import CollabNavBar from '../Components/CollabNavBar';
import { CollabProvider } from '../ContextApi/CollabContextApi';


const CollaborationLayout = ({ children }) => {
//   const { User } = useContext(UserContext);

  const User = true

  return (
    <>
      <CollabProvider>
        <div className='bg-dark-bg-secondary1'>

        
          <CollabNavBar/>
          {User && (
            <>
              <div className="fixed top-0 left-0 w-64 z-20 h-screen ">
                <CollabSideBar />
              </div>

              <div className="ml-64 px-5 pt-4 text-white"><Outlet/></div>

      
            </>
          )}
        </div>
      </CollabProvider>
      
    </>
  );
};

export default CollaborationLayout;
