import React, { useContext } from 'react'
import {navItems} from "../DashboardAssests/index"
import {setting} from "../DashboardAssests/index"
// import { UserContext } from '../../ContextApi/User';
import { useNavigate } from 'react-router-dom';
const SideBar = ({activeMenu}) => {
    // const {User , clearUser} = useContext(UserContext)
    
    const navigate = useNavigate();
    const handleClick =(route)=>{
       
        console.log(route);
        
        if(route==="/Logout")
        
        {

            handleLogout();
            return
        }
       navigate(route)

    }

    const handleLogout = ()=>{
        // localStorage.clear();
        // clearUser();
        navigate("/")

    }
    
  return (

    <>
        <div className=" w-64 h-[calc(100vh-61px)] bg-dark-bg-secondary4 py-10 sticky top-[75px] left-0  text-white  font-poppins z-20">            
            <div className='mt-2 px-2  space-y-3'>
                {
                    navItems.map((item, index)=>(
                        <div
                            key={index}
                            onClick={()=>handleClick(item.to)}
                            className={`flex items-center gap-4 w-full text-[15px] py-3 px-5 cursor-pointer
                                ${activeMenu === item.label 
                                ? "text-white bg-gradient-to-r from-orange-200/40 to-orange-400/50 border-r-4 border-orange-600" 
                                : ""}`}
                            >
                            <div className='text-xl '>{<item.Icon />}</div>
                            <div>{item.label}</div>
                        </div>

                    ))
                }
            </div>
            <div className='absolute bottom-0'>
                <div>
                    {
                        setting.map((item,index)=>(
                            <div
                            key={index}
                            onClick={()=>handleClick(item.to)}
                            className={`flex items-center gap-4 w-full text-[15px] py-2 px-5 cursor-pointer
                                ${activeMenu === item.label 
                                ? "text-task_primary bg-gradient-to-r from-blue-50/40 to-blue-100/50 border-r-4 border-task_primary" 
                                : ""}`}
                            >
                            <div className='text-xl '>{<item.Icon />}</div>
                            <div>{item.label}</div>
                        </div>
                        ))
                    }
                </div>

            </div>
        </div>



    </>
  )
}

export default SideBar