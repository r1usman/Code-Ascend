import React from 'react'
import {sidebarItems} from "../Assests/index"
import { Link, NavLink, useNavigate , } from 'react-router-dom';
import { LogOut } from 'lucide-react';
const CollabSideBar = () => {
    console.log(sidebarItems);
    const activeMenu = "none";
    console.log(sidebarItems);
    
    // const navigate = useNavigate();

    // const handleClick = (path)=>{
    //     navigate(path)
    // }
    
  return (
    <>
    <div className=" w-64  bg-dark-bg-secondary3 min-h-screen py-28 sticky top-[75px] left-0  text-white border-gray-200/50 font-poppins z-20 ">            
                  

       <div className='flex flex-col justify-between  h-[85vh] '>
          <div className='space-y-3'>
            {sidebarItems.map((item, index) => (
            

                  <NavLink
                  key={index}
                  to={item.path}
                  className={({ isActive }) => `flex items-center gap-4 w-full text-[15px] py-3 px-5 cursor-pointer
                      ${isActive 
                      ? "text-white bg-gradient-to-r from-orange-200/40 to-orange-400/50 border-r-4 border-orange-600" 
                      : " "}`}
                  >
                  <div className='text-xl'>{<item.icon />}</div>
                  <div>{item.name}</div>
                  </NavLink>

            ))}
          </div>


          <div className='mb-4'>
               <NavLink
                  to={"/logout"}
                  className={({ isActive }) => `flex items-center gap-4 w-full text-[15px] py-3 px-5 cursor-pointer hover:bg-[#ff6666] transition-all ease-in duration-150
                      ${isActive 
                      ? "text-white bg-gradient-to-r from-orange-200/40 to-orange-400/50 border-r-4 border-orange-600" 
                      : " "}`}
                  >
                  <div className='text-xl'>{<LogOut />}</div>
                  <div>Logout</div>
                </NavLink>
          </div>
       </div>

                    
    </div>
    </>
  )
}

export default CollabSideBar