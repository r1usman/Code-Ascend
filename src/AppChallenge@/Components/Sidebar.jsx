import { NavLink, useLocation } from 'react-router-dom'
import { HomeIcon, PuzzlePieceIcon, UsersIcon, TrophyIcon, UserIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline'
import { LayoutDashboard } from 'lucide-react'

const navItems = [
  { name: 'Home', to: '/dashboard', icon: HomeIcon },
  { name: 'Dashboard', to: '/appchallenge@/dashboard', icon: LayoutDashboard},
  { name: 'Challenges', to: '/appchallenge@/problemlist', icon: PuzzlePieceIcon },
  { name: '1 vs 1', to: '/appchallenge@/1v1', icon: ArrowsRightLeftIcon },
  { name: 'Groups', to: '/appchallenge@/groups', icon: UsersIcon },
  { name: 'Leaderboard', to: '/appchallenge@/leaderboard', icon: TrophyIcon },
  { name: 'Profile', to: '/appchallenge@/profile', icon: UserIcon },
]

const Sidebar = ({ closeSidebar }) => {
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className=" w-64  bg-dark-bg-secondary4 min-h-screen py-16 sticky top-[75px] left-0  text-white border-gray-200/50 font-poppins z-20 ">            
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
            
              key={item.name}
              to={item.to}
              onClick={closeSidebar}
               className={({ isActive }) => `flex items-center gap-2  w-full text-[15px] py-3 px-5 cursor-pointer
                      ${isActive 
                      ? "text-white bg-gradient-to-r from-orange-200/40 to-orange-400/50 border-r-4 border-orange-600" 
                      : " "}`}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 w-1 h-full bg-primary-500 rounded-r" />
                  )}
                  <item.icon
                    className={`${
                      isActive ? 'text-primary-400' : 'text-gray-400 group-hover:text-gray-300'
                    } mr-3 flex-shrink-0 h-6 w-6`}
                    aria-hidden="true"
                  />
                  {item.name}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-dark-700">
        <div className="rounded-lg bg-dark-700 p-3">
          <div className="flex items-center">
            <div className="text-accent-500">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Quick Challenge</p>
              <p className="text-xs text-gray-400">5 min coding sprint</p>
            </div>
          </div>
          <NavLink 
            to="/challenges"
            onClick={closeSidebar}
            className="mt-3 block text-center rounded-md bg-accent-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-accent-600 transition-colors"
          >
            Start Now
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
