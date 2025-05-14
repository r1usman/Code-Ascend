import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useChallenges } from '../contexts/ChallengesContext'
import { motion } from 'framer-motion'
import { DocumentDuplicateIcon, ClockIcon, CodeBracketIcon } from '@heroicons/react/24/outline'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const Challenge = () => {
  const { id } = useParams()
  const { getChallenge } = useChallenges()
  const challenge = getChallenge(id || '')
  const [selectedTab, setSelectedTab] = useState('description')
  
  if (!challenge) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-white">Challenge not found</h2>
        <p className="text-gray-400 mt-2">The challenge you're looking for doesn't exist or has been removed.</p>
        <Link to="/challenges" className="btn-primary mt-6">
          Back to Challenges
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">{challenge.title}</h1>
            <span className={`badge ${
              challenge.difficulty === 'Easy' ? 'badge-success' :
              challenge.difficulty === 'Medium' ? 'badge-warning' :
              'badge-error'
            }`}>
              {challenge.difficulty}
            </span>
          </div>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
            <span className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" />
              {challenge.timeLimit} min
            </span>
            <span className="flex items-center">
              <CodeBracketIcon className="h-4 w-4 mr-1" />
              {challenge.languages.join(', ')}
            </span>
            <span className="badge badge-primary">{challenge.category}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn-ghost py-1 px-3 text-sm flex items-center">
            <DocumentDuplicateIcon className="h-4 w-4 mr-1" />
            Share
          </button>
          <Link
            to={`/challenges/${challenge.id}/solve`}
            className="btn-primary flex items-center"
          >
            Solve Challenge
          </Link>
        </div>
      </div>

      {/* Challenge Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="card overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-dark-700">
              <button
                className={`py-3 px-4 text-sm font-medium ${
                  selectedTab === 'description'
                    ? 'text-white border-b-2 border-primary-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setSelectedTab('description')}
              >
                Description
              </button>
              <button
                className={`py-3 px-4 text-sm font-medium ${
                  selectedTab === 'test-cases'
                    ? 'text-white border-b-2 border-primary-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setSelectedTab('test-cases')}
              >
                Test Cases
              </button>
              <button
                className={`py-3 px-4 text-sm font-medium ${
                  selectedTab === 'solutions'
                    ? 'text-white border-b-2 border-primary-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setSelectedTab('solutions')}
              >
                Solutions
              </button>
            </div>

            <div className="p-6">
              {selectedTab === 'description' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300">{challenge.description}</p>
                    
                    <h3 className="text-lg font-semibold text-white mt-6">Constraints:</h3>
                    <p className="text-gray-300 whitespace-pre-line">{challenge.constraints}</p>
                    
                    {challenge.starterCode && (
                      <>
                        <h3 className="text-lg font-semibold text-white mt-6">Example Starter Code:</h3>
                        <div className="mt-2 rounded-md overflow-hidden">
                          <SyntaxHighlighter 
                            language="javascript" 
                            style={atomOneDark}
                            customStyle={{ 
                              borderRadius: '0.375rem',
                              padding: '1rem',
                              backgroundColor: '#1a1a1a',
                              marginTop: '0.5rem'
                            }}
                          >
                            {challenge.starterCode.javascript}
                          </SyntaxHighlighter>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}

              {selectedTab === 'test-cases' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-400 mb-4">The following test cases will be used to evaluate your solution:</p>
                  <div className="space-y-4">
                    {challenge.testCases.filter(tc => !tc.isHidden).map((testCase) => (
                      <div key={testCase.id} className="bg-dark-700 p-4 rounded-md">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-400 mb-1">Input:</p>
                            <div className="bg-dark-900 p-3 rounded-md">
                              <code className="text-sm text-primary-300 font-mono">{testCase.input}</code>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-400 mb-1">Expected Output:</p>
                            <div className="bg-dark-900 p-3 rounded-md">
                              <code className="text-sm text-accent-300 font-mono">{testCase.expectedOutput}</code>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 bg-dark-700 p-4 rounded-md">
                    <div className="flex items-center text-warning-500 mb-2">
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">Note</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      There {challenge.testCases.filter(tc => tc.isHidden).length === 1 ? 'is' : 'are'} {challenge.testCases.filter(tc => tc.isHidden).length} hidden test {challenge.testCases.filter(tc => tc.isHidden).length === 1 ? 'case' : 'cases'} that will be used to evaluate your solution. Make sure your code handles all possible scenarios described in the constraints.
                    </p>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'solutions' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-center h-48">
                    <div className="text-center">
                      <svg className="h-12 w-12 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <h3 className="mt-2 text-lg font-semibold text-white">Solutions locked</h3>
                      <p className="mt-1 text-sm text-gray-400">
                        Solutions will be available after you solve the challenge.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Creator Info */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Challenge Creator</h3>
            <div className="flex items-center">
              <img
                src={challenge.createdBy.avatarUrl}
                alt={challenge.createdBy.username}
                className="h-10 w-10 rounded-full mr-3"
              />
              <div>
                <p className="text-white font-medium">{challenge.createdBy.username}</p>
                <p className="text-sm text-gray-400">Created on {new Date(challenge.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Challenge Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Acceptance Rate</span>
                <span className="text-white font-medium">72%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Submissions</span>
                <span className="text-white font-medium">248</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Success Rate</span>
                <span className="text-white font-medium">64%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Average Time</span>
                <span className="text-white font-medium">12.4 min</span>
              </div>
            </div>
          </div>

          {/* Related Challenges */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Related Challenges</h3>
            <div className="space-y-3">
              {[ 
                { id: 'related1', title: 'Three Sum', difficulty: 'Medium' },
                { id: 'related2', title: 'Valid Anagram', difficulty: 'Easy' },
                { id: 'related3', title: 'Group Anagrams', difficulty: 'Medium' }
              ].map(related => (
                <Link key={related.id} to={`/challenges/${related.id}`} className="block p-3 rounded-md bg-dark-700 hover:bg-dark-600 transition-colors">
                  <p className="text-white text-sm font-medium">{related.title}</p>
                  <div className="flex items-center mt-1">
                    <span className={`text-xs ${
                      related.difficulty === 'Easy' ? 'text-success-500' :
                      related.difficulty === 'Medium' ? 'text-warning-500' :
                      'text-error-500'
                    }`}>
                      {related.difficulty}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Challenge
