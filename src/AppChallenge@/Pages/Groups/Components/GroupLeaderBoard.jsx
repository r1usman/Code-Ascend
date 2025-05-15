import React from 'react'
import {motion} from "framer-motion"
import { Link } from 'react-router-dom'
const GroupLeaderBoard = ({group}) => {
    return (
    <div className="rounded-lg overflow-hidden border border-dark-700">
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
    )
}

export default GroupLeaderBoard