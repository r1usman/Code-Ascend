import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PlusIcon, PencilIcon, UserPlusIcon, UserMinusIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import GroupHeader from './Components/GroupHeader'
import Member from './Components/Member'
import LeaderBoard from './Components/LeaderBoard'
import Breadcrumb from '../../Components/Breadcrumb'
import GroupLeaderBoard from './Components/GroupLeaderBoard'
import Form from './Components/Form'


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
    id: `user${i + 1}`,
    username: `user${i + 1}`,
    avatarUrl: `https://i.pravatar.cc/150?img=${i + 1}`,
    role: i === 0 ? 'admin' : 'member'
  })),
  challenges: Array(5).fill(0).map((_, i) => ({
    id: `challenge${i + 1}`,
    title: `Frontend Challenge ${i + 1}`,
    difficulty: i % 3 === 0 ? 'Easy' : i % 3 === 1 ? 'Medium' : 'Hard',
    createdAt: new Date(Date.now() - (i * 86400000)), // One day earlier for each challenge
    dueDate: new Date(Date.now() + ((7 - i) * 86400000)), // 7 days from now, minus i days
    submissions: Math.floor(Math.random() * 20) + 5
  }))
}

const Group = () => {
  const { id } = useParams()
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
    <div className="space-y-6 px-4 py-2 font-poppins">
      <Breadcrumb/>
      {/* Header */}
      <GroupHeader group={group} setActiveTab={setActiveTab} isAdmin={isAdmin} activeTab={activeTab}/>

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
              <div className="text-center py-12 bg-dark-800 rounded-[8px] border border-dark-700">
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
              <GroupLeaderBoard group={group} />
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
            
           <Member group={group} isAdmin={isAdmin} currentUserId={currentUserId} />
          </div>
        )}

        {/* Leaderboard Tab */}
        <LeaderBoard activeTab={activeTab} group={group}/>
        
      </div>

      {/* Create Challenge Modal */}
      {
        showCreateChallenge && (
          <Form 
            isOpen={showCreateChallenge}
            onClose={()=>setShowCreateChallenge(false)}
          
          />
        )
      }
      

    </div>
  )
}

export default Group
