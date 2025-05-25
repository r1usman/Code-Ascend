import { Bell, Moon, Sun } from 'lucide-react'
import React from 'react'
import def from "../Assests/Default.jpg"



const ChallengeNavBar = () => {
  return (
     <div className='sticky top-0 z-40 bg-dark-bg-secondary4 border-b border-text_primary text-white font-poppins  font-medium px-4 py-5  '> 
      <div className='flex items-center justify-between w-full'>
        <h1 className='text-2xl '>Code Ascend</h1>
        
        <nav className="flex items-center space-x-4">
            
              <button className="relative p-2 text-gray-600 hover:text-blue-600">
                <Bell
                  className={`h-6 w-6`}
                />
                <span className="absolute right-0 top-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <img
                src={def}
                alt="Profile"
                className="h-8 w-8 cursor-pointer rounded-full"
              />
            </nav>

      </div>
    </div>
  )
}

export default ChallengeNavBar