import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { UserMinusIcon } from 'lucide-react'
const Member = ({group , isAdmin , currentUserId}) => {
  return (
     <div className=" rounded-[8px] overflow-hidden border border-dark-700">
              <div className="px-4 py-3 bg-dark-700 text-sm font-medium text-gray-400 grid grid-cols-12 gap-4">
                <div className="col-span-6">Member</div>
                <div className="col-span-2">Role</div>
                <div className="col-span-2">Challenges</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
              <div className="divide-y divide-dark-700">
                {group.members.slice(0, 10).map(member => (
                  <motion.div
                    key={member.id}
                    whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.3)' }}
                    className="px-4 py-3 grid grid-cols-12 gap-4 items-center"
                  >
                    <div className="col-span-6 flex items-center">
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
                        <p className="text-xs text-gray-500">Member since Aug 2023</p>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span className={`badge ${
                        member.role === 'admin' ? 'badge-secondary' : 'bg-dark-700 text-gray-300'
                      }`}>
                        {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                      </span>
                    </div>
                    <div className="col-span-2 text-gray-400">
                      {Math.floor(Math.random() * group.challenges.length) + 1} / {group.challenges.length}
                    </div>
                    <div className="col-span-2 text-right">
                      {isAdmin && member.id !== currentUserId && (
                        <button className="text-gray-400 hover:text-error-500 transition-colors">
                          <UserMinusIcon className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              {group.members.length > 10 && (
                <div className="p-4 text-center border-t border-dark-700">
                  <button className="text-primary-400 hover:text-primary-300 text-sm">
                    View All Members
                  </button>
                </div>
              )}
            </div>
  )
}

export default Member