import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../ContextApi/AuthContext';
import { motion } from 'framer-motion';
import { CalendarIcon, PencilIcon } from '@heroicons/react/24/outline';
import img1 from "../../Assests/Default.jpg"
const Profile = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState('overview');
  
  
  const profileUser = id ? (id === user?.id ? user : null) : user;
  
  if (!profileUser) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-white">User not found</h2>
        <p className="text-gray-400 mt-2">The user you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  const isCurrentUser = !id || id === user?.id;
  
  // Line chart data (could be real data in a real app)
  const activityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values: [5, 7, 3, 8, 12, 15, 18, 14, 10, 9, 6, 4]
  };
  const tabs = ['overview', 'challenges', 'achievements'];
  const maxActivity = Math.max(...activityData.values);
  const stats = [
  {
    label: 'Rank',
    value: `#${profileUser.stats.rank}`,
    colorClass: 'text-white',
  },
  {
    label: 'Rating',
    value: profileUser.stats.rating,
    colorClass: 'text-primary-500',
  },
  {
    label: 'Challenges',
    value: profileUser.stats.challengesCompleted,
    colorClass: 'text-white',
  },
  {
    label: 'Win Rate',
    value: `${Math.round(
      (profileUser.stats.victoriesCount /
        (profileUser.stats.victoriesCount + profileUser.stats.defeatCount)) * 100
    )}%`,
    colorClass: 'text-success-500',
  },
];
  return (
    <div className="space-y-6 px-4 py-6 font-poppins">
      {/* Profile Header */}
      <div className=" bg-dark-bg-secondary3  rounded-lg overflow-hidden border border-border_Col">
        <div className="bg-gradient-to-r from-red-700/50 to-pink-700/50 h-32"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end mt-[-48px] gap-4">
            <img
              src={img1}
              alt={profileUser.username}
              className="h-24 w-24 rounded-full border-4 border-border_Col"
            />
            <div className="flex-1  translate-y-2">
              <h1 className="text-2xl font-bold text-white">{profileUser.name || profileUser.username}</h1>
              <p className="text-gray-400">@{profileUser.username}</p>
            </div>
            {isCurrentUser && (
              <button className="btn-ghost py-1 px-3 text-sm flex items-center mt-4 sm:mt-0">
                <PencilIcon className="h-4 w-4 mr-1" />
                Edit Profile
              </button>
            )}
          </div>
          
          <div className="flex items-center mt-4 text-sm text-gray-400">
            <CalendarIcon className="h-4 w-4 mr-1" />
            Joined {new Date(profileUser.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
          
          {profileUser.bio && (
            <p className="mt-4 text-gray-300">{profileUser.bio}</p>
          )}
        </div>
        
    
        {/* tabs */}
      <div className="flex border-t bg-dark-bg-secondary4 border-border_Col">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              activeTab === tab
                ? 'border-btn-bg text-white'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab(tab)}
            aria-selected={activeTab === tab}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      </div>

      {/* Tab Content */}
      <div>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((item, index) => (
                <div key={index} className="bg-dark-bg-secondary3 rounded-lg border border-border_Col  p-5">
                  <p className="text-gray-400 mb-1 text-sm">{item.label}</p>
                  <p className={`text-2xl font-bold ${item.colorClass}`}>{item.value}</p>
                </div>
              ))}
            </div>
            
            {/* Badges */}
            <div className="bg-dark-bg-secondary1 rounded-lg border border-border_Col overflow-hidden">
              <div className="px-4 py-3 bg-dark-bg-secondary4">
                <h3 className="text-lg font-semibold text-white">Badges</h3>
              </div>
              <div className="p-4">
                {profileUser.badges.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-gray-500 mb-2">
                      <svg className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <p className="text-gray-400">No badges earned yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {profileUser.badges.map(badge => (
                      <motion.div
                        key={badge.id}
                        whileHover={{ scale: 1.05 }}
                        className="bg-dark-bg-secondary3 rounded-lg p-3 text-center border border-border_Col"
                      >
                        <div className="text-2xl mb-1">{badge.icon}</div>
                        <p className="text-white text-sm font-medium">{badge.name}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Activity Graph */}
            <div className="lg:col-span-2 rounded-lg border border-border_Col overflow-hidden">
              <div className="px-4 py-3 bg-dark-700">
                <h3 className="text-lg font-semibold text-white">Activity</h3>
              </div>
              <div className="p-6">
                <div className="h-48 flex items-end gap-2">
                  {activityData.values.map((value, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-primary-500/20 rounded-t-sm hover:bg-primary-500/30 transition-colors"
                        style={{ height: `${(value / maxActivity) * 100}%` }}
                      ></div>
                      <p className="text-xs text-gray-500 mt-2">{activityData.labels[index]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-dark-bg-secondary1 rounded-lg border border-border_Col overflow-hidden">
              <div className="px-4 py-3 bg-dark-bg-secondary4">
                <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
              </div>
              <div className="divide-y divide-dark-700">
                {profileUser.recentActivity.map(activity => (
                  <div key={activity.id} className="p-4">
                    <div className="flex items-start">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        activity.type === 'challenge_completed' ? 'bg-[#25334A] text-[#5e6fe9]' :
                        activity.type === 'victory' ? 'bg-[#20402c] text-[#22c55e]' :
                        activity.type === 'defeat' ? 'bg-[#20402c] text-[#635292]' :
                        'bg-secondary-500/20 text-secondary-400'
                      }`}>
                        {activity.type === 'challenge_completed' && (
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {activity.type === 'victory' && (
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        )}
                        {activity.type === 'joined_group' && (
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-4">
                        <p className="text-white">{activity.title}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(activity.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Challenges Tab */}
        {activeTab === 'challenges' && (
          <div className=" rounded-lg bg-dark-bg-secondary3 border  border-border_Col overflow-hidden">
            <div className="px-4 py-3 bg-dark-bg-secondary1  flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Solved Challenges</h3>
              <div className=''>
                <select className="bg-dark-bg-secondary3 border border-border_Col rounded-md focus:outline-none ring-0 py-1 px-3 text-sm">
                  <option value="all">All Challenges</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
            <div className="divide-y divide-border_Col">
              {Array(10).fill(0).map((_, i) => (
               <div
                    className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-dark-bg-secondary4"
                  >
                    <div className="col-span-6">
                      <p className="text-white font-medium">Challenge {i + 1}</p>
                      <p className="text-sm text-gray-400">
                        Category: {['Arrays', 'Strings', 'Dynamic Programming', 'Trees', 'Graphs'][i % 5]}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <span>
                        {i % 3 === 0 ? 'Easy' : i % 3 === 1 ? 'Medium' : 'Hard'}
                      </span>
                    </div>
                    <div className="col-span-2 text-gray-400 text-sm">
                      {new Date(Date.now() - i * 86400000 * 2).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="col-span-2 text-right">
                      <span className="font-mono">{(i * 50 + 100).toLocaleString()}ms</span>
                    </div>
                </div>

              ))}
            </div>
              <div className="p-4 bg-dark-700 border-t border-dark-600 flex justify-center">
                <button className="text-primary-400 hover:text-primary-300 text-sm">
                  Load More
                </button>
              </div>
            </div>
        )}
        
        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="bg-dark-bg-secondary3  rounded-lg border border-border_Col  overflow-hidden">
            <div className="px-4 py-3 bg-dark-bg-secondary1">
              <h3 className="text-lg font-semibold text-white">Achievements</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {Array(6).fill(0).map((_, i) => {
                  const isUnlocked = i < 3;
                  return (
                    <div
                          className={`rounded-lg p-5 bg-dark-bg-secondary1  border border-border_Col transition-transform duration-200 ${
                            isUnlocked
                              ? 'hover:scale-105 bg-gradient-to-br from-dark-800 to-dark-700 border-primary-500/30'
                              : 'bg-dark-800/50 border-dark-700 opacity-60'
                          }`}
                        >
                          <div className="flex items-center  justify-center h-16 mb-4">
                            <div className={`text-3xl ${!isUnlocked && 'grayscale opacity-50'}`}>
                              {['🧠', '⚡', '🌟', '🏆', '🔥', '💎'][i]}
                            </div>
                          </div>
                          <h3 className="text-center text-white font-semibold mb-1">
                            {[
                              'Algorithm Master',
                              'Fast Solver',
                              'JavaScript Guru',
                              'Tournament Champion',
                              'Streak Keeper',
                              'Diamond Coder',
                            ][i]}
                          </h3>
                          <p className="text-center text-sm text-gray-400">
                            {[
                              'Solve 50 algorithm challenges',
                              'Solve a Hard challenge in under 10 minutes',
                              'Complete all JavaScript challenges',
                              'Win a tournament with 10+ participants',
                              'Solve a challenge every day for 30 days',
                              'Reach top 10 on the global leaderboard',
                            ][i]}
                          </p>
                          {isUnlocked ? (
                            <div className="mt-3 flex items-center justify-center text-xs text-success-500">
                              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Unlocked
                            </div>
                          ) : (
                            <div className="mt-3 flex items-center justify-center text-xs text-gray-500">
                              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                              Locked
                            </div>
                          )}
                        </div>

                                          );
                                        })}
                    </div>
                  </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
