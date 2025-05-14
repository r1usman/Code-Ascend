import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

// Mock groups data
const mockGroups = [
  {
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
      difficulty: i % 3 === 0 ? 'Easy' : i % 3 === 1 ? 'Medium' : 'Hard'
    }))
  },
  {
    id: 'group2',
    name: 'Algorithm Wizards',
    description: 'Focusing on algorithm challenges and competitive programming techniques',
    createdAt: new Date('2023-09-10'),
    createdBy: {
      id: 'user2',
      username: 'algomaster'
    },
    members: Array(16).fill(0).map((_, i) => ({
      id: `user${i+2}`,
      username: `user${i+2}`,
      avatarUrl: `https://i.pravatar.cc/150?img=${i+2}`,
      role: i === 0 ? 'admin' : 'member'
    })),
    challenges: Array(8).fill(0).map((_, i) => ({
      id: `challenge${i+6}`,
      title: `Algorithm Challenge ${i+1}`,
      difficulty: i % 3 === 0 ? 'Easy' : i % 3 === 1 ? 'Medium' : 'Hard'
    }))
  },
  {
    id: 'group3',
    name: 'Backend Developers',
    description: 'Group focused on backend development, databases, and system design',
    createdAt: new Date('2023-10-05'),
    createdBy: {
      id: 'user3',
      username: 'backenddev'
    },
    members: Array(12).fill(0).map((_, i) => ({
      id: `user${i+3}`,
      username: `user${i+3}`,
      avatarUrl: `https://i.pravatar.cc/150?img=${i+3}`,
      role: i === 0 ? 'admin' : 'member'
    })),
    challenges: Array(6).fill(0).map((_, i) => ({
      id: `challenge${i+14}`,
      title: `Backend Challenge ${i+1}`,
      difficulty: i % 3 === 0 ? 'Easy' : i % 3 === 1 ? 'Medium' : 'Hard'
    }))
  }
]

const Groups = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [newGroupName, setNewGroupName] = useState('')
  const [newGroupDescription, setNewGroupDescription] = useState('')

  // Filter groups by search term
  const filteredGroups = mockGroups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Groups</h1>
          <p className="text-gray-400 mt-1">Join groups to collaborate and compete with other developers</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          Create Group
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search groups..."
          className="input w-full pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </div>
      </div>

      {/* Groups List */}
      {filteredGroups.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white">No groups found</h3>
          <p className="text-gray-400 mt-1">Try adjusting your search or create a new group</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <motion.div
              key={group.id}
              whileHover={{ y: -5 }}
              className="card card-hover"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">{group.name}</h3>
                <p className="text-gray-400 text-sm mt-2 line-clamp-2">{group.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex -space-x-2 overflow-hidden">
                    {group.members.slice(0, 5).map((member, index) => (
                      <img
                        key={index}
                        className="h-6 w-6 rounded-full ring-2 ring-dark-800"
                        src={member.avatarUrl}
                        alt={member.username}
                      />
                    ))}
                    {group.members.length > 5 && (
                      <div className="h-6 w-6 rounded-full bg-dark-700 ring-2 ring-dark-800 flex items-center justify-center text-xs text-gray-400">
                        +{group.members.length - 5}
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-gray-400">{group.challenges.length} challenges</span>
                </div>
              </div>
              <div className="bg-dark-700 px-6 py-4 flex justify-between items-center">
                <span className="text-xs text-gray-400">
                  Created {new Date(group.createdAt).toLocaleDateString()}
                </span>
                <Link
                  to={`/groups/${group.id}`}
                  className="btn-primary py-1 px-3 text-sm"
                >
                  View Group
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Group Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-800 rounded-lg max-w-md w-full p-6 border border-dark-700"
          >
            <h3 className="text-xl font-bold text-white mb-4">Create New Group</h3>
            
            <div className="mb-4">
              <label htmlFor="groupName" className="block text-sm font-medium text-gray-400 mb-1">
                Group Name
              </label>
              <input
                type="text"
                id="groupName"
                className="input w-full"
                placeholder="Enter group name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="groupDescription" className="block text-sm font-medium text-gray-400 mb-1">
                Description
              </label>
              <textarea
                id="groupDescription"
                rows={4}
                className="input w-full"
                placeholder="Describe your group"
                value={newGroupDescription}
                onChange={(e) => setNewGroupDescription(e.target.value)}
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Privacy
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="privacy"
                    value="public"
                    defaultChecked
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-600 bg-dark-700"
                  />
                  <span className="ml-2 text-white text-sm">Public</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="privacy"
                    value="private"
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-600 bg-dark-700"
                  />
                  <span className="ml-2 text-white text-sm">Private</span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsCreating(false)}
                className="btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle group creation
                  setIsCreating(false)
                }}
                className="btn-primary"
                disabled={!newGroupName.trim()}
              >
                Create Group
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Groups