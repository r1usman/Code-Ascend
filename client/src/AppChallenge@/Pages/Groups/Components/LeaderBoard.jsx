import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'

const LeaderBoard = ({group , activeTab}) => {
  return (
    <div>
        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Group Leaderboard</h2>
            
            <div className="bg-dark-800 rounded-[8px] overflow-hidden border border-dark-700">
              <div className="px-4 py-3 bg-dark-700 text-sm font-medium text-gray-400 grid grid-cols-12 gap-4">
                <div className="col-span-1">#</div>
                <div className="col-span-5">Member</div>
                <div className="col-span-2">Completed</div>
                <div className="col-span-2">Avg. Time</div>
                <div className="col-span-2 text-right">Points</div>
              </div>
              <div className="divide-y divide-dark-700">
                {group.members.slice(0, 10).sort(() => Math.random() - 0.5).map((member, index) => (
                  <motion.div
                    key={member.id}
                    whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.3)' }}
                    className="px-4 py-3 grid grid-cols-12 gap-4 items-center"
                  >
                    <div className="col-span-1 font-medium text-gray-500">{index + 1}</div>
                    <div className="col-span-5 flex items-center">
                      <img
                        src={member.avatarUrl}
                        alt={member.username}
                        className="h-8 w-8 rounded-full mr-3"
                      />
                      <div>
                        <Link 
                          to={`/profile/${member.id}`} 
                          className="text-white hover:text-primary-400 font-medium transition-colors"
                        >
                          {member.username}
                        </Link>
                      </div>
                    </div>
                    <div className="col-span-2 text-gray-400">
                      {Math.floor(Math.random() * group.challenges.length) + 1} / {group.challenges.length}
                    </div>
                    <div className="col-span-2 text-gray-400">
                      {Math.floor(Math.random() * 15) + 5}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}
                    </div>
                    <div className="col-span-2 text-right font-medium text-primary-400">
                      {(10 - index) * 100 + Math.floor(Math.random() * 50)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default LeaderBoard