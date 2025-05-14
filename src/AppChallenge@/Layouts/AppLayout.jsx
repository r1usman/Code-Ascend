import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import ChallengeNavBar from '../Components/ChallengeNavBar'
import Sidebar from '../Components/Sidebar'
import {AuthProvider} from "../ContextApi/AuthContext.jsx"
import {ChallengesProvider} from "../ContextApi/ChallengesContext.jsx"


const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (

    <AuthProvider>
      <ChallengesProvider>
        <div className="min-h-screen flex flex-col">
      <ChallengeNavBar />
      <div className="flex flex-1 overflow-hidden">
        


        <div className="fixed top-0 left-0 w-64 z-20 h-screen">
          <Sidebar />
          
        </div>
        <div className="ml-64 px-5 pt-4 text-white bg-dark-bg-secondary2 min-h-screen w-full"><Outlet/></div>

        {/* Main content */}
        {/* <main className="flex-1 overflow-y-auto bg-dark-900 p-4 md:p-6">
          <div className="container mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main> */}
      </div>
        </div>
      </ChallengesProvider>
    </AuthProvider>
    
  )
}

export default AppLayout
