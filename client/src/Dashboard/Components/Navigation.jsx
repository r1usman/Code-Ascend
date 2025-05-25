import { Bell, Code2, Moon, Sun } from 'lucide-react'
import React from 'react'


const Navigation = ({isDarkMode}) => {
  return (
    <header
        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Code2 className="h-8 w-8 text-blue-600" />
              <span
                className={`ml-2 text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                CodeAscend
              </span>
            </div>
            <nav className="flex items-center space-x-4">
              <button
                className={`p-2 ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-blue-600'
                } transition-colors`}
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? (
                  <Sun className="h-6 w-6" />
                ) : (
                  <Moon className="h-6 w-6" />
                )}
              </button>
              <button className="relative p-2 text-gray-600 hover:text-blue-600">
                <Bell
                  className={`h-6 w-6 ${
                    isDarkMode
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                />
                <span className="absolute right-0 top-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32"
                alt="Profile"
                className="h-8 w-8 cursor-pointer rounded-full"
              />
            </nav>
          </div>
        </div>
      </header>
  )
}

export default Navigation