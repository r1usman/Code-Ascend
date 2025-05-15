import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline'
import React from 'react'

const stats = [
  {
    label: 'Your Rank',
    value: '#156',
    delta: '+5',
    deltaColor: 'text-[#21a050]',
    valueColor: 'text-white',
    showIcon: true,
  },
  {
    label: 'Your Rating',
    value: '1,850',
    delta: '+12',
     deltaColor: 'text-[#21a050]',
    valueColor: 'text-[#3b7bcd]',
    showIcon: true,
  },
  {
    label: 'Challenges Solved',
    value: '48',
    delta: '/ 120',
    deltaColor: 'text-gray-400',
    valueColor: 'text-white',
    showIcon: false,
  },
]

const UserStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat, idx) => (

        <div className="bg-dark-bg-secondary3 rounded-lg border border-border_Col p-5">
        <p className="text-gray-400 mb-1 text-sm">{stat.label}</p>
        <div className="flex items-baseline">
            <span className={`text-2xl font-bold ${stat.valueColor}`}>{stat.value}</span>
            <span className={`ml-2 text-xs flex items-center ${stat.deltaColor}`}>
                {stat.showIcon && <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />}
                {stat.delta}
            </span>
        </div>
    </div>

      ))}
    </div>
  )
}

export default UserStats
