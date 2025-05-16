import React, { useState } from 'react';
import { NavBar } from '../../Dashboard/Components/NavBar';
import SideBar from '../../Components/SiderBar';
import CodeingEnvironment from '../CodeingEnvironment.jsx';

const EditorLayout = ({ activeMenu }) => {
  const User = true;
  const [shrink, setshrink] = useState(true);

  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden bg-dark-bg-secondary1">
        <NavBar />

        {User && (
          <div className="flex flex-1    overflow-hidden">
        
            <div
              className={`${
                shrink ? 'w-16' : 'w-64'
              } h-full transition-all duration-300 ease-in-out`}
            >
              <SideBar
                activeMenu={"Editor"}
                shrink={shrink}

                setshrink={() => setshrink((prev) => !prev)}
              />
            </div>

           
            <div className="flex-1 overflow-auto px-5 pt-4 bg-dark-bg-secondary3">
              <CodeingEnvironment />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditorLayout;
