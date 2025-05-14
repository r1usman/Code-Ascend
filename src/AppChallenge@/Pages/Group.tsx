import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PlusIcon, PencilIcon, UserPlusIcon, UserMinusIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

// Mock group data (would be fetched from the server in a real app)
const mockGroup = {
  id: 'group1',
  name: 'Frontend Masters',
  description: 'A group for frontend developers focused on UI/UX and modern web frameworks',
  createdAt: new Date('2023-08-15'),
  createdBy: {
    id: 'user1',
    username: 'codemaster'
  },
  members: Array(24).fill(0).map((_, i) => ({
    id: `user${i+1}`,
    username: `user${i+1}`,
    avatarUrl: `https://i.pravatar.cc/150?img=${i+1}`,
    role: i === 0 ? 'admin' : 'member'
  })),
  challenges: Array(5).fill(0).map((_, i) => ({
    id: `challenge${i+1}`,
    title: `Frontend Challenge ${i+1}`,
    difficulty: i % 3 === 0 ? 'Easy' : i % 3 === 1 ? 'Medium' : 'Hard',
    createdAt: new Date(Date.now() - (i * 86400000)), // One day earlier for each challenge
    dueDate: new Date(Date.now() + ((7 - i) * 86400000)), // 7 days from now, minus i days
    submissions: Math.floor(Math.random() * 20) + 5
  }))
}

const Group = () => {
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState('challenges')
  const [showCreateChallenge, setShowCreateChallenge] = useState(false)
  
  // In a real app, we would fetch the group data based on the id
  const group = mockGroup
  
  if (!group) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-white">Group not found</h2>
        <p className="text-gray-400 mt-2">The group you're looking for doesn't exist or has been removed.</p>
        <Link to="/groups" className="btn-primary mt-6">
          Back to Groups
        </Link>
      </div>
    )
  }

  // Check if the current user is an admin
  const currentUserId = 'user1' // In a real app, this would come from auth context
  const isAdmin = group.members.some(member => member.id === currentUserId && member.role === 'admin')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-dark-800 rounded-lg overflow-hidden border border-dark-700">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">{group.name}</h1>
              <p className="text-gray-400 mt-1">{group.description}</p>
            </div>
            {isAdmin && (
              <button className="btn-ghost flex items-center">
                <PencilIcon className="h-4 w-4 mr-1" />
                Edit Group
              </button>
            )}
          </div>
          
          <div className="flex items-center mt-4 text-sm text-gray-400">
            <span>Created by {group.createdBy.username}</span>
            <span className="mx-2">•</span>
            <span>{group.members.length} members</span>
            <span className="mx-2">•</span>
            <span>{group.challenges.length} challenges</span>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-t border-dark-700">
          <button
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'challenges'
                ? 'border-primary-500 text-white'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('challenges')}
          >
            Challenges
          </button>
          <button
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'members'
                ? 'border-primary-500 text-white'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('members')}
          >
            Members
          </button>
          <button
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'leaderboard'
                ? 'border-primary-500 text-white'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('leaderboard')}
          >
            Leaderboard
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {/* Challenges Tab */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Group Challenges</h2>
              {isAdmin && (
                <button
                  onClick={() => setShowCreateChallenge(true)}
                  className="btn-primary flex items-center"
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Add Challenge
                </button>
              )}
            </div>
            
            {group.challenges.length === 0 ? (
              <div className="text-center py-12 bg-dark-800 rounded-lg border border-dark-700">
                <div className="text-gray-500 mb-4">
                  <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">No challenges yet</h3>
                <p className="text-gray-400 mt-1">This group doesn't have any challenges yet.</p>
                {isAdmin && (
                  <button
                    onClick={() => setShowCreateChallenge(true)}
                    className="btn-primary mt-4"
                  >
                    Create First Challenge
                  </button>
                )}
              </div>
            ) : (
              <div className="bg-dark-800 rounded-lg overflow-hidden border border-dark-700">
                <div className="px-4 py-3 bg-dark-700 text-sm font-medium text-gray-400 grid grid-cols-12 gap-4">
                  <div className="col-span-6">Challenge</div>
                  <div className="col-span-2">Difficulty</div>
                  <div className="col-span-2">Due Date</div>
                  <div className="col-span-2 text-right">Submissions</div>
                </div>
                <div className="divide-y divide-dark-700">
                  {group.challenges.map(challenge => (
                    <motion.div
                      key={challenge.id}
                      whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.3)' }}
                      className="px-4 py-3 grid grid-cols-12 gap-4 items-center"
                    >
                      <div className="col-span-6">
                        <Link 
                          to={`/challenges/${challenge.id}`} 
                          className="text-white hover:text-primary-400 font-medium transition-colors"
                        >
                          {challenge.title}
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">
                          Added {new Date(challenge.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <span className={`badge ${
                          challenge.difficulty === 'Easy' ? 'badge-success' :
                          challenge.difficulty === 'Medium' ? 'badge-warning' :
                          'badge-error'
                        }`}>
                          {challenge.difficulty}
                        </span>
                      </div>
                      <div className="col-span-2 text-sm text-gray-400">
                        {new Date(challenge.dueDate).toLocaleDateString()}
                      </div>
                      <div className="col-span-2 text-right">
                        <span className="text-white font-medium">{challenge.submissions}</span>
                        <span className="text-gray-400 text-sm"> / {group.members.length}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Group Members</h2>
              {isAdmin && (
                <button className="btn-primary flex items-center">
                  <UserPlusIcon className="h-4 w-4 mr-1" />
                  Invite Members
                </button>
              )}
            </div>
            
            <div className="bg-dark-800 rounded-lg overflow-hidden border border-dark-700">
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
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Group Leaderboard</h2>
            
            <div className="bg-dark-800 rounded-lg overflow-hidden border border-dark-700">
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

      {/* Create Challenge Modal */}
      {showCreateChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-800 rounded-lg max-w-lg w-full p-6 border border-dark-700"
          >
            <h3 className="text-xl font-bold text-white mb-4">Add Challenge to Group</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="challengeType" className="block text-sm font-medium text-gray-400 mb-1">
                  Challenge Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-dark-700 border-2 border-primary-500 p-4 rounded-lg text-center">
                    <svg className="h-6 w-6 mx-auto text-primary-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="text-white font-medium">Create New</p>
                    <p className="text-xs text-gray-400 mt-1">Create a custom challenge</p>
                  </button>
                  <button className="bg-dark-700 hover:border-primary-500 border-2 border-dark-700 p-4 rounded-lg text-center">
                    <svg className="h-6 w-6 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <p className="text-white font-medium">Use Existing</p>
                    <p className="text-xs text-gray-400 mt-1">Choose from public challenges</p>
                  </button>
                </div>
              </div>
              
              <div>
                <label htmlFor="challengeName" className="block text-sm font-medium text-gray-400 mb-1">
                  Challenge Name
                </label>
                <input
                  type="text"
                  id="challengeName"
                  className="input w-full"
                  placeholder="Enter challenge name"
                />
              </div>
              
              <div>
                <label htmlFor="challengeDescription" className="block text-sm font-medium text-gray-400 mb-1">
                  Description
                </label>
                <textarea
                  id="challengeDescription"
                  rows={3}
                  className="input w-full"
                  placeholder="Describe the challenge"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="difficulty" className="block text-sm font-medium text-gray-400 mb-1">
                    Difficulty
                  </label>
                  <select id="difficulty" className="input w-full">
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="timeLimit" className="block text-sm font-medium text-gray-400 mb-1">
                    Time Limit (minutes)
                  </label>
                  <input
                    type="number"
                    id="timeLimit"
                    className="input w-full"
                    placeholder="e.g. 30"
                    min="1"
                    defaultValue="30"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-400 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  className="input w-full"
                  defaultValue={new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowCreateChallenge(false)}
                className="btn-ghost"
              >
                Cancel
              </button>
              <Link
                to="/challenges/create"
                onClick={() => setShowCreateChallenge(false)}
                className="btn-primary"
              >
                Continue
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Group