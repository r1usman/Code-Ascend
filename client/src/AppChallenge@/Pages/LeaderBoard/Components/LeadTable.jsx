import React from 'react'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'

const LeadTable = ({displayLeaderboard , page , setPage , pageSize, globalLeaderboard}) => {
  return (
     <div className=" rounded-[8px] border border-border_Col overflow-hidden">
        <div className="px-4 py-3 bg-dark-bg-secondary1 grid grid-cols-12 gap-2 text-xs font-medium text-gray-400">
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
              
              className={`px-4 py-3 bg-dark-bg-secondary3 grid grid-cols-12 gap-2 items-center border-b border-border_Col ${user.id === 'user1' ? 'bg-primary-900/20' : ''
                }`}
            >
              <div className="col-span-1 flex items-center">
                <span >
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
                <span className={`font-medium ${user.winRate >= 70 ? 'text-success-500' :
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
                  className={`h-8 w-8 rounded-[6px] flex items-center justify-center text-sm ${page === pageNum
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
                  className="h-8 w-8 rounded-[6px] flex items-center justify-center text-sm hover:bg-dark-600 text-gray-400"
                >
                  {Math.ceil(globalLeaderboard.length / pageSize)}
                </button>
              </>
            )}
          </div>
          <button
            disabled={page === Math.ceil(globalLeaderboard.length / pageSize)}
            onClick={() => setPage(page + 1)}
            className={`btn-ghost py-1 px-3 text-sm ${page === Math.ceil(globalLeaderboard.length / pageSize) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            Next
          </button>
        </div>
      </div>
  )
}

export default LeadTable