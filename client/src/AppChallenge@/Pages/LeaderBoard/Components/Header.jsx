import React from 'react'

const Header = ({timeFilter , setTimeFilter}) => {
  return (
    <div className=" flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Global Leaderboard</h1>
          <p className="text-gray-400 mt-1">See how you rank among the top coders</p>
        </div>
        <div>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className=" py-2 px-3 text-sm  border border-border_Col rounded-[6px] bg-dark-bg-secondary3 focus:outline-none focus:ring-0 "
          >
            <option value="all-time">All Time</option>
            <option value="this-month">This Month</option>
            <option value="this-week">This Week</option>
            <option value="today">Today</option>
          </select>
          
        </div>
      </div>
  )
}

export default Header