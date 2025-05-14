import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useChallenges } from '../contexts/ChallengesContext'
import { PlusIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

const Challenges = () => {
  const { challenges } = useChallenges()
  const [filter, setFilter] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [category, setCategory] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Get unique categories
  const categories = Array.from(new Set(challenges.map(c => c.category)))

  // Filter challenges
  const filteredChallenges = challenges.filter(challenge => {
    const matchesFilter = filter === '' || 
      challenge.title.toLowerCase().includes(filter.toLowerCase()) ||
      challenge.description.toLowerCase().includes(filter.toLowerCase())
    
    const matchesDifficulty = difficulty === '' || challenge.difficulty === difficulty
    const matchesCategory = category === '' || challenge.category === category

    return matchesFilter && matchesDifficulty && matchesCategory
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Coding Challenges</h1>
          <p className="text-gray-400 mt-1">Sharpen your skills with our collection of coding challenges</p>
        </div>
        <Link to="/challenges/create" className="btn-primary flex items-center">
          <PlusIcon className="h-5 w-5 mr-1" />
          Create Challenge
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Search challenges..."
              className="input w-full pl-10"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-ghost flex items-center text-sm sm:whitespace-nowrap"
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5 mr-1" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Advanced filters */}
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-400 mb-1">
                Difficulty
              </label>
              <select
                id="difficulty"
                className="input w-full"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-1">
                Category
              </label>
              <select
                id="category"
                className="input w-full"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Challenges List */}
      {filteredChallenges.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white">No challenges found</h3>
          <p className="text-gray-400 mt-1">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredChallenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              className="card card-hover"
              variants={itemVariants}
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
                <p className="text-gray-400 text-sm mt-2 line-clamp-3">{challenge.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="badge badge-primary">{challenge.category}</span>
                  {challenge.languages.map(lang => (
                    <span key={lang} className="badge bg-dark-700 text-gray-300">{lang}</span>
                  ))}
                </div>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <span className="flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {challenge.timeLimit} min
                  </span>
                </div>
              </div>
              <div className="bg-dark-700 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-400">
                  <img
                    src={challenge.createdBy.avatarUrl}
                    alt={challenge.createdBy.username}
                    className="h-6 w-6 rounded-full mr-2"
                  />
                  <span>{challenge.createdBy.username}</span>
                </div>
                <Link
                  to={`/challenges/${challenge.id}`}
                  className="btn-primary py-1 px-3 text-sm"
                >
                  View Challenge
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default Challenges