import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useChallenges } from '../contexts/ChallengesContext'

const OneVsOne = () => {
  const { challenges } = useChallenges()
  const [searchTerm, setSearchTerm] = useState('')
  const [isJoining, setIsJoining] = useState(false)
  const [isInviting, setIsInviting] = useState(false)
  const [inviteUsername, setInviteUsername] = useState('')

  // Mock active matches
  const activeMatches = [
    {
      id: 'match1',
      challengeId: challenges[0].id,
      challengeName: challenges[0].title,
      player1: {
        id: 'user2',
        username: 'CodeNinja',
        avatarUrl: 'https://i.pravatar.cc/150?img=2'
      },
      player2: {
        id: 'user3',
        username: 'ByteWizard',
        avatarUrl: 'https://i.pravatar.cc/150?img=3'
      },
      startTime: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      timeRemaining: '8:45',
      status: 'active'
    },
    {
      id: 'match2',
      challengeId: challenges[1].id,
      challengeName: challenges[1].title,
      player1: {
        id: 'user4',
        username: 'DevHero',
        avatarUrl: 'https://i.pravatar.cc/150?img=4'
      },
      player2: {
        id: 'user5',
        username: 'Programmer42',
        avatarUrl: 'https://i.pravatar.cc/150?img=5'
      },
      startTime: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      timeRemaining: '12:21',
      status: 'active'
    }
  ]

  // Filter by search term
  const filteredMatches = activeMatches.filter(match => 
    match.challengeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.player1.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.player2.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle quick match
  const handleQuickMatch = () => {
    setIsJoining(true)
    setTimeout(() => {
      setIsJoining(false)
      // Navigate to match (would be implemented in a real app)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">1 vs 1 Challenges</h1>
          <p className="text-gray-400 mt-1">Compete head-to-head with other coders in real-time</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => setIsInviting(true)}
            className="btn-secondary"
          >
            Invite Friend
          </button>
          <button
            onClick={handleQuickMatch}
            className="btn-primary flex items-center justify-center"
            disabled={isJoining}
          >
            {isJoining ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Finding Match...
              </>
            ) : (
              'Quick Match'
            )}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Matches */}
        <div className="lg:col-span-2">
          <div className="bg-dark-800 rounded-lg overflow-hidden border border-dark-700">
            <div className="px-4 py-3 bg-dark-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Live Matches</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search matches..."
                  className="input py-1 px-3 text-sm pr-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="divide-y divide-dark-700">
              {filteredMatches.length > 0 ? (
                filteredMatches.map((match) => (
                  <motion.div
                    key={match.id}
                    whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.3)' }}
                    className="p-4"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <Link to={`/challenges/${match.challengeId}`} className="text-white font-medium hover:text-primary-400 transition-colors">
                          {match.challengeName}
                        </Link>
                        <div className="flex items-center mt-2">
                          <div className="flex items-center">
                            <img src={match.player1.avatarUrl} alt={match.player1.username} className="h-8 w-8 rounded-full border-2 border-primary-500" />
                            <span className="ml-2 text-sm text-white">{match.player1.username}</span>
                          </div>
                          <span className="mx-3 text-gray-500">vs</span>
                          <div className="flex items-center">
                            <img src={match.player2.avatarUrl} alt={match.player2.username} className="h-8 w-8 rounded-full border-2 border-secondary-500" />
                            <span className="ml-2 text-sm text-white">{match.player2.username}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center text-sm text-gray-400 mb-2">
                          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Time remaining: <span className="text-white font-mono">{match.timeRemaining}</span></span>
                        </div>
                        <button className="btn-ghost py-1 px-3 text-sm">
                          Spectate
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <div className="text-gray-500 mb-2">
                    <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">No matches found</h3>
                  <p className="text-gray-400 mt-1">Try adjusting your search or start a new match</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* History and Stats */}
        <div className="space-y-6">
          {/* Personal Stats */}
          <div className="bg-dark-800 rounded-lg overflow-hidden border border-dark-700">
            <div className="px-4 py-3 bg-dark-700">
              <h3 className="text-lg font-semibold text-white">Your Stats</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-dark-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Matches Won</p>
                  <p className="text-2xl font-bold text-success-500 mt-1">32</p>
                </div>
                <div className="bg-dark-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Matches Lost</p>
                  <p className="text-2xl font-bold text-error-500 mt-1">16</p>
                </div>
                <div className="bg-dark-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Win Rate</p>
                  <p className="text-2xl font-bold text-primary-500 mt-1">67%</p>
                </div>
                <div className="bg-dark-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Avg. Time</p>
                  <p className="text-2xl font-bold text-secondary-500 mt-1">14:28</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-white mb-2">Rating History</h4>
                <div className="bg-dark-700 p-4 rounded-lg h-32 flex items-center justify-center">
                  <div className="h-full w-full relative">
                    {/* This would be a chart in a real app */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-gray-400">Rating chart would go here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Matches */}
          <div className="bg-dark-800 rounded-lg overflow-hidden border border-dark-700">
            <div className="px-4 py-3 bg-dark-700">
              <h3 className="text-lg font-semibold text-white">Recent Matches</h3>
            </div>
            <div className="divide-y divide-dark-700">
              {[
                { id: 'recent1', opponent: 'CodeNinja', result: 'win', challenge: 'Two Sum', date: '2d ago' },
                { id: 'recent2', opponent: 'AlgoMaster', result: 'loss', challenge: 'Valid Parentheses', date: '3d ago' },
                { id: 'recent3', opponent: 'ByteWizard', result: 'win', challenge: 'Merge Intervals', date: '5d ago' }
              ].map((match) => (
                <div key={match.id} className="p-4 hover:bg-dark-700/50">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-medium">{match.challenge}</p>
                      <p className="text-sm text-gray-400">vs {match.opponent} • {match.date}</p>
                    </div>
                    <span className={`badge ${match.result === 'win' ? 'badge-success' : 'badge-error'}`}>
                      {match.result === 'win' ? 'Victory' : 'Defeat'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Invite Friend Modal */}
      {isInviting && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-800 rounded-lg max-w-md w-full p-6 border border-dark-700"
          >
            <h3 className="text-xl font-bold text-white mb-4">Invite a Friend</h3>
            <p className="text-gray-400 mb-4">Challenge a friend to a 1v1 coding battle</p>
            
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">
                Friend's Username
              </label>
              <input
                type="text"
                id="username"
                className="input w-full"
                placeholder="Enter username"
                value={inviteUsername}
                onChange={(e) => setInviteUsername(e.target.value)}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="challenge" className="block text-sm font-medium text-gray-400 mb-1">
                Select Challenge
              </label>
              <select id="challenge" className="input w-full">
                {challenges.map(challenge => (
                  <option key={challenge.id} value={challenge.id}>{challenge.title}</option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsInviting(false)}
                className="btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle invite logic
                  setIsInviting(false)
                }}
                className="btn-primary"
                disabled={!inviteUsername.trim()}
              >
                Send Invite
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default OneVsOne