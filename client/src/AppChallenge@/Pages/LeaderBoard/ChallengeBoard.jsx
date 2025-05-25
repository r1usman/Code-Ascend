import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

import { globalLeaderboard } from "../../Assests/index.js"
import Header from './Components/Header.jsx'
import UserStats from './Components/UserStats.jsx'
import LeadTable from './Components/LeadTable.jsx'



const ChallengeBoard = () => {
  const [timeFilter, setTimeFilter] = useState('all-time')
  const [page, setPage] = useState(1)
  const pageSize = 10

  const displayLeaderboard = globalLeaderboard.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="space-y-6 px-4 py-6 font-poppins">
      {/* Header */}
      <Header timeFilter={timeFilter} setTimeFilter={timeFilter}/>

      {/* Current User Stats */}
      <UserStats/>

      {/* Leaderboard Table */}
      <LeadTable 
        displayLeaderboard={displayLeaderboard}
        page={page}
        setPage={setPage}
        globalLeaderboard={globalLeaderboard}
        pageSize={pageSize}
      />
    </div>
  )
}

export default ChallengeBoard