import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import {AuthContext} from '../../ContextApi/AuthContext'
import { ChallengesContext } from '../../ContextApi/ChallengesContext'
import { ArrowRightIcon, FireIcon, UserGroupIcon, TrophyIcon } from '@heroicons/react/24/outline'
import {statsData, activityTypeStyles} from "./Utils/object.jsx"
import Header from './Components/Header'
import Stats from './Components/Stats'
import RecentActvity from './Components/RecentActvity'
import TopPerformer from './Components/TopPerformer.jsx'


const Dashboard = () => {
  const { user } = useContext(AuthContext)
  const { challenges } = useContext(ChallengesContext)
  const [activeTab, setActiveTab] = useState('recommended')
  const [User, setUser] = useState(user)
  console.log(user);
  

  
  const recommendedChallenges = challenges.slice(0, 2)
  const popularChallenges = [...challenges].sort(() => 0.5 - Math.random()).slice(0, 2)
  
  const getDisplayChallenges = () => {
    switch (activeTab) {
      case 'recommended':
        return recommendedChallenges
      case 'popular':
        return popularChallenges
      default:
        return recommendedChallenges
    }
  }

 


 



  return (
    <div className="p-6 space-y-7  min-h-screen font-poppins ">


      
      <Header user={user}/>

      <Stats statsData={statsData}/>

    
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Challenges</h2>
          <Link to="/appchallenge@/problemlist" className="text-primary-400 hover:text-primary-300 flex items-center text-sm">
            View All
            <ArrowRightIcon className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-dark-700 mb-6">
          <button
            className={`py-2 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'recommended'
                ? 'border-primary-500 text-primary-400'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('recommended')}
          >
            Recommended
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'popular'
                ? 'border-primary-500 text-primary-400'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('popular')}
          >
            Popular
          </button>
        </div>

        {/* Challenge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {getDisplayChallenges().map((challenge) => (
            <div
              key={challenge.id}
              className="card card-hover overflow-hidden hover:translate-y-[-5px] transition-transform duration-200 ease-in-out"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-white">{challenge.title}</h3>
                  <span className={`badge ${
                    challenge.difficulty === 'Easy' ? 'badge-success' :
                    challenge.difficulty === 'Medium' ? 'badge-warning' :
                    'badge-error'
                  }`}>
                    {challenge.difficulty}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-2 line-clamp-2">{challenge.description}</p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <span className="flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {challenge.timeLimit} min
                  </span>
                  <span className="mx-3">•</span>
                  <span className="badge badge-primary">{challenge.category}</span>
                </div>
              </div>
              <div className="bg-dark-700 px-6 py-4 flex justify-between items-center">
                
                <Link
                  to={`/challenges/${challenge.id}`}
                  className="btn-primary py-1 px-3 text-sm"
                >
                  View Challenge
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity and Leaderboard Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        
        <RecentActvity user={user} activityTypeStyles={activityTypeStyles}/>

        {/* Top Performers */}
        <TopPerformer/>
      </div>
    </div>
  )
}

export default Dashboard
