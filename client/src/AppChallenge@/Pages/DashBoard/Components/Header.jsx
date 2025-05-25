import { Link } from 'react-router-dom'
import React from 'react'

const Header = ({user}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back, {user?.name || user?.username}!</h1>
          <p className="text-gray-400 mt-1">Ready for today's coding challenge?</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            to="/challenges/create"
            className="Btn1"
          >
            Create Challenge
          </Link>
        </div>
      </div>
  )
}

export default Header