import { PencilIcon, Pi } from 'lucide-react'
import React from 'react'
import Pic from "../Utils/Frontend.png"

const GroupHeader = ({group , setActiveTab,isAdmin,activeTab}) => {
  return (
    <div className="bg-dark-bg-secondary3 font-poppins rounded-[8px] overflow-hidden border border-dark-700">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">{group.name}</h1>
              <p className="text-gray-400 mt-1">{group.description}</p>
            </div>
            <div className='rounded-full shadow-lg mr-4 shadow-yellow-500'>
              <img src={Pic} className='size-32 rounded-full object-cover' alt="" />
            </div>
          </div>
          
          <div className="bg flex items-center mt-4 text-sm text-gray-400">
            <span>Created by {group.createdBy.username}</span>
            <span className="mx-2">•</span>
            <span>{group.members.length} members</span>
            <span className="mx-2">•</span>
            <span>{group.challenges.length} challenges</span>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-t bg-dark-bg-secondary4">
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
  )
}

export default GroupHeader