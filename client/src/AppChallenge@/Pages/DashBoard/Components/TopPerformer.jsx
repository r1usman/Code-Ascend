import React from 'react'
import { Link } from 'react-router-dom'

const Users = [
  {
    id: 'user1',
    username: 'AlgoMaster',
    avatar: 'https://api.dicebear.com/7.x/lorelei/svg?seed=AlgoMaster',
    rating: 2145,
    solved: 124
  },
  {
    id: 'user2',
    username: 'CodeNinja',
    avatar: 'https://api.dicebear.com/7.x/lorelei/svg?seed=CodeNinja',
    rating: 2089,
    solved: 118
  },
  {
    id: 'user3',
    username: 'ByteWizard',
    avatar: 'https://api.dicebear.com/7.x/lorelei/svg?seed=ByteWizard',
    rating: 2067,
    solved: 112
  },
  {
    id: 'user4',
    username: 'DevHero',
    avatar: 'https://api.dicebear.com/7.x/lorelei/svg?seed=DevHero',
    rating: 2011,
    solved: 105
  },
  {
    id: 'user5',
    username: 'Programmer42',
    avatar: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Programmer42',
    rating: 1998,
    solved: 101
  }
]


const TopPerformer = () => {
  return (
    <div>
          <h2 className="text-xl font-bold text-white mb-4">Top Performers</h2>
          <div className="card overflow-hidden">
            <div className="p-4 bg-dark-700 border-b border-dark-600">
              <div className="grid grid-cols-12 text-xs font-semibold text-gray-400">
                <div className="col-span-1">#</div>
                <div className="col-span-7">User</div>
                <div className="col-span-2 text-right">Rating</div>
                <div className="col-span-2 text-right">Solved</div>
              </div>
            </div>
            <div className="divide-y divide-dark-700">
              {
                Users.map((user, index) => (
                <div key={user.id} className="p-4 hover:bg-dark-700/50">
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-1 text-gray-500 font-medium">{index + 1}</div>
                    <div className="col-span-7 flex items-center">
                      <img src={user.avatar} alt={user.username} className="h-8 w-8 rounded-full mr-2" />
                      <span className="text-white text-sm font-medium">{user.username}</span>
                    </div>
                    <div className="col-span-2 text-right text-primary-400 font-semibold">{user.rating}</div>
                    <div className="col-span-2 text-right text-gray-400">{user.solved}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-dark-700 border-t border-dark-600 text-center">
              <Link to="/leaderboard" className="text-sm text-primary-400 hover:text-primary-300">
                View Full Leaderboard
              </Link>
            </div>
          </div>
        </div>
  )
}

export default TopPerformer