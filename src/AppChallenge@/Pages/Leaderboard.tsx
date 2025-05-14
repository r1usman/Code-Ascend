import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

// Mock leaderboard data
const globalLeaderboard = Array(100).fill(0).map((_, i) => ({
  id: `user${i+1}`,
  username: i === 0 ? 'AlgoMaster' : i === 1 ? 'CodeNinja' : i === 2 ? 'ByteWizard' : `user${i+1}`,
  avatarUrl: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
  rank: i + 1,
  previousRank: i + 1 + (Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0) * (Math.random() > 0.5 ? 1 : -1),
  rating: 3000 - (i * 15) + Math.floor(Math.random() * 10),
  challengesSolved: 150 - i + Math.floor(Math.random() * 10),
  winRate: Math.floor(80 - (i * 0.5) + Math.random() * 5)
}))

const Leaderboard = () => {
  const [timeFilter, setTimeFilter] = useState('all-time')
  const [page, setPage] = useState(1)
  const pageSize = 10
  
  const displayLeaderboard = globalLeaderboard.slice((page - 1) * pageSize, page * pageSize)
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Global Leaderboard</h1>
          <p className="text-gray-400 mt-1">See how you rank among the top coders</p>
        </div>
        <div>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="input py-1 px-3 text-sm"
          >
            <option value="all-time">All Time</option>
            <option value="this-month">This Month</option>
            <option value="this-week">This Week</option>
            <option value="today">Today</option>
          </select>
        </div>
      </div>

      {/* Current User Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-dark-800 rounded-lg border border-dark-700 p-5">
          <p className="text-gray-400 mb-1 text-sm">Your Rank</p>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-white">#156</span>
            <span className="ml-2 text-xs text-success-500 flex items-center">
              <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
              +5
            </span>
          </div>
        </div>
        <div className="bg-dark-800 rounded-lg border border-dark-700 p-5">
          <p className="text-gray-400 mb-1 text-sm">Your Rating</p>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-primary-500">1,850</span>
            <span className="ml-2 text-xs text-success-500 flex items-center">
              <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
              +12
            </span>
          </div>
        </div>
        <div className="bg-dark-800 rounded-lg border border-dark-700 p-5">
          <p className="text-gray-400 mb-1 text-sm">Challenges Solved</p>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-white">48</span>
            <span className="ml-2 text-xs text-gray-400">/ 120</span>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden">
        <div className="px-4 py-3 bg-dark-700 grid grid-cols-12 gap-2 text-xs font-medium text-gray-400">
          <div className="col-span-1">Rank</div>
          <div className="col-span-5">User</div>
          <div className="col-span-2 text-right">Rating</div>
          <div className="col-span-2 text-right">Solved</div>
          <div className="col-span-2 text-right">Win Rate</div>
        </div>
        <div>
          {displayLeaderboard.map((user, index) => (
            <motion.div
              key={user.id}
              whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.3)' }}
              className={`px-4 py-3 grid grid-cols-12 gap-2 items-center border-b border-dark-700 ${
                user.id === 'user1' ? 'bg-primary-900/20' : ''
              }`}
            >
              <div className="col-span-1 flex items-center">
                <span className={`font-medium ${
                  user.rank <= 3 ? 'text-primary-500' : 'text-gray-400'
                }`}>
                  #{user.rank}
                </span>
                {user.previousRank > user.rank ? (
                  <span className="ml-1 text-xs text-success-500">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </span>
                ) : user.previousRank < user.rank ? (
                  <span className="ml-1 text-xs text-error-500">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                ) : null}
              </div>
              <div className="col-span-5 flex items-center">
                <img src={user.avatarUrl} alt={user.username} className="h-8 w-8 rounded-full mr-3" />
                <Link 
                  to={`/profile/${user.id}`} 
                  className="text-white hover:text-primary-400 font-medium transition-colors"
                >
                  {user.username}
                </Link>
                {user.rank <= 3 && (
                  <span className="ml-2">
                    {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                  </span>
                )}
              </div>
              <div className="col-span-2 text-right font-medium text-primary-500">{user.rating}</div>
              <div className="col-span-2 text-right text-white">{user.challengesSolved}</div>
              <div className="col-span-2 text-right">
                <span className={`font-medium ${
                  user.winRate >= 70 ? 'text-success-500' : 
                  user.winRate >= 50 ? 'text-warning-500' : 
                  'text-error-500'
                }`}>
                  {user.winRate}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="p-4 bg-dark-700 border-t border-dark-600 flex justify-between items-center">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`btn-ghost py-1 px-3 text-sm ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Previous
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, Math.ceil(globalLeaderboard.length / pageSize)) }, (_, i) => {
              const pageNum = i + 1
              return (
                <button
                  key={i}
                  onClick={() => setPage(pageNum)}
                  className={`h-8 w-8 rounded-md flex items-center justify-center text-sm ${
                    page === pageNum
                      ? 'bg-primary-500 text-white'
                      : 'hover:bg-dark-600 text-gray-400'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
            {Math.ceil(globalLeaderboard.length / pageSize) > 5 && (
              <>
                <span className="text-gray-500">...</span>
                <button
                  onClick={() => setPage(Math.ceil(globalLeaderboard.length / pageSize))}
                  className="h-8 w-8 rounded-md flex items-center justify-center text-sm hover:bg-dark-600 text-gray-400"
                >
                  {Math.ceil(globalLeaderboard.length / pageSize)}
                </button>
              </>
            )}
          </div>
          <button
            disabled={page === Math.ceil(globalLeaderboard.length / pageSize)}
            onClick={() => setPage(page + 1)}
            className={`btn-ghost py-1 px-3 text-sm ${
              page === Math.ceil(globalLeaderboard.length / pageSize) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard