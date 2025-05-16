// import { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { useChallenges } from '../contexts/ChallengesContext'
// import { useAuth } from '../contexts/AuthContext'
// import CodeMirror from '@uiw/react-codemirror'
// import { javascript } from '@codemirror/lang-javascript'
// import { vscodeDark } from '@uiw/codemirror-theme-vscode'
// import { motion, AnimatePresence } from 'framer-motion'
// import { ArrowPathIcon, CheckIcon, XMarkIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

// const ChallengeEditor = () => {
//   const { id } = useParams<{ id: string }>()
//   const navigate = useNavigate()
//   const { getChallenge, submitSolution } = useChallenges()
//   const { user } = useAuth()
//   const challenge = getChallenge(id || '')
  
//   const [code, setCode] = useState('')
//   const [language, setLanguage] = useState('javascript')
//   const [isRunning, setIsRunning] = useState(false)
//   const [results, setResults] = useState<any | null>(null)
//   const [timeLeft, setTimeLeft] = useState(0)
//   const [timerActive, setTimerActive] = useState(false)

//   useEffect(() => {
//     if (challenge) {
//       setCode(challenge.starterCode[language] || '')
//       setTimeLeft(challenge.timeLimit * 60) // Convert minutes to seconds
//       setTimerActive(true)
//     }
//   }, [challenge, language])

//   useEffect(() => {
//     let interval: NodeJS.Timeout | null = null;
    
//     if (timerActive && timeLeft > 0) {
//       interval = setInterval(() => {
//         setTimeLeft(timeLeft - 1)
//       }, a000)
//     } else if (timeLeft === 0) {
//       // Time's up logic
//       setTimerActive(false)
//       // Automatically submitt the user has so far
//       handleSubmit()
//     }

    
//     return () => {
//       if (interval) clearInterval(interval)
//     }
//   }, [timerActive, timeLeft])

//   if (!challenge || !user) {
//     return (
//       <div className="text-center py-12">
//         <h2 className="text-xl font-semibold text-white">Challenge not found</h2>
//         <p className="text-gray-400 mt-2">The challenge you're looking for doesn't exist or has been removed.</p>
//         <button 
//           onClick={() => navigate('/challenges')}
//           className="btn-primary mt-6"
//         >
//           Back to Challenges
//         </button>
//       </div>
//     )
//   }

//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60)
//     const remainingSeconds = seconds % 60
//     return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
//   }

//   const handleRun = () => {
//     setIsRunning(true)
    
//     // Simulate running tests
//     setTimeout(() => {
//       setIsRunning(false)
      
//       // Mock test results
//       const mockResults = {
//         success: true,
//         passedTests: challenge.testCases.filter(tc => !tc.isHidden).length - 1,
//         totalTests: challenge.testCases.filter(tc => !tc.isHidden).length,
//         results: challenge.testCases.filter(tc => !tc.isHidden).map((testCase, index) => ({
//           testCaseId: testCase.id,
//           passed: index !== 1, // Make one test fail for demo
//           output: index !== 1 ? testCase.expectedOutput : '[]',
//           executionTime: Math.floor(Math.random() * 100) + 10 // Random time between 10-110ms
//         }))
//       }
      
//       setResults(mockResults)
//     }, 1500)
//   }

//   const handleSubmit = () => {
//     setIsRunning(true)
    
//     // Simulate submission
//     setTimeout(() => {
//       setIsRunning(false)
      
//       // Create submission object
//       const submission = {
//         id: `submission-${Date.now()}`,
//         challengeId: challenge.id,
//         userId: user.id,
//         code,
//         language,
//         status: 'Accepted' as const,
//         runtime: 124, // ms
//         memory: 38912, // KB
//         submittedAt: new Date(),
//         testCaseResults: challenge.testCases.map(testCase => ({
//           testCaseId: testCase.id,
//           passed: true,
//           output: testCase.expectedOutput,
//           executionTime: Math.floor(Math.random() * 100) + 10
//         }))
//       }
      
//       // Submit solution
//       submitSolution(submission)
      
//       // Navigate to results
//       navigate(`/challenges/${challenge.id}`)
//     }, 2000)
//   }

//   return (
//     <div className="h-full">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center">
//           <button
//             onClick={() => navigate(`/challenges/${challenge.id}`)}
//             className="p-2 rounded-md hover:bg-dark-700 text-gray-400 mr-2"
//           >
//             <ArrowLeftIcon className="h-5 w-5" />
//           </button>
//           <div>
//             <h1 className="text-xl font-bold text-white">{challenge.title}</h1>
//             <div className="flex items-center gap-2 mt-1">
//               <span className={`badge ${
//                 challenge.difficulty === 'Easy' ? 'badge-success' :
//                 challenge.difficulty === 'Medium' ? 'badge-warning' :
//                 'badge-error'
//               }`}>
//                 {challenge.difficulty}
//               </span>
//               <span className="text-sm text-gray-400">
//                 Time Remaining: <span className={`font-mono ${timeLeft < 60 ? 'text-error-500' : timeLeft < 300 ? 'text-warning-500' : 'text-white'}`}>{formatTime(timeLeft)}</span>
//               </span>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="input py-1 px-2 text-sm"
//           >
//             {challenge.languages.map(lang => (
//               <option key={lang} value={lang}>{lang.charAt(0).toUpperCase() + lang.slice(1)}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Editor and Results */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-13rem)]">
//         {/* Code Editor */}
//         <div className="bg-dark-800 rounded-lg overflow-hidden border border-dark-700 h-full flex flex-col">
//           <CodeMirror
//             value={code}
//             height="100%"
//             theme={vscodeDark}
//             extensions={[javascript()]}
//             onChange={(value) => setCode(value)}
//             className="flex-1 overflow-auto text-sm"
//           />
//         </div>

//         {/* Challenge Description and Results */}
//         <div className="bg-dark-800 rounded-lg border border-dark-700 h-full flex flex-col">
//           <div className="flex border-b border-dark-700">
//             <button className="py-2 px-4 text-sm font-medium text-white border-b-2 border-primary-500">
//               Results
//             </button>
//           </div>
          
//           <div className="flex-1 overflow-auto p-4">
//             <AnimatePresence mode="wait">
//               {isRunning ? (
//                 <motion.div
//                   key="loading"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="h-full flex items-center justify-center"
//                 >
//                   <div className="text-center">
//                     <ArrowPathIcon className="h-8 w-8 mx-auto text-primary-500 animate-spin" />
//                     <p className="mt-4 text-white font-medium">Running your code...</p>
//                     <p className="text-gray-400 text-sm mt-2">This might take a few seconds</p>
//                   </div>
//                 </motion.div>
//               ) : results ? (
//                 <motion.div
//                   key="results"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="space-y-4"
//                 >
//                   <div className={`p-4 rounded-md ${results.success ? 'bg-success-500/20' : 'bg-error-500/20'} flex items-center`}>
//                     <div className={`h-8 w-8 rounded-full flex items-center justify-center ${results.success ? 'bg-success-500/20 text-success-500' : 'bg-error-500/20 text-error-500'}`}>
//                       {results.success ? (
//                         <CheckIcon className="h-5 w-5" />
//                       ) : (
//                         <XMarkIcon className="h-5 w-5" />
//                       )}
//                     </div>
//                     <div className="ml-3">
//                       <p className="text-white font-medium">
//                         {results.success
//                           ? `${results.passedTests}/${results.totalTests} tests passed`
//                           : `${results.passedTests}/${results.totalTests} tests passed`}
//                       </p>
//                       <p className="text-sm text-gray-400">
//                         {results.success
//                           ? 'Your solution passed most test cases. Submit to check all tests.'
//                           : 'Your solution failed some test cases. Check the details below.'}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="space-y-3">
//                     {results.results.map((result: any, index: number) => (
//                       <div key={index} className={`p-4 rounded-md ${result.passed ? 'bg-dark-700' : 'bg-error-500/10 border border-error-500/30'}`}>
//                         <div className="flex justify-between items-center mb-2">
//                           <span className="text-sm font-medium text-white">Test Case {index + 1}</span>
//                           <div className="flex items-center">
//                             <span className="text-xs text-gray-400 mr-2">{result.executionTime} ms</span>
//                             <span className={`h-5 w-5 rounded-full flex items-center justify-center ${result.passed ? 'bg-success-500/20 text-success-500' : 'bg-error-500/20 text-error-500'}`}>
//                               {result.passed ? (
//                                 <CheckIcon className="h-3 w-3" />
//                               ) : (
//                                 <XMarkIcon className="h-3 w-3" />
//                               )}
//                             </span>
//                           </div>
//                         </div>
                        
//                         <div className="grid grid-cols-1 gap-2">
//                           <div>
//                             <p className="text-xs text-gray-400 mb-1">Input:</p>
//                             <div className="bg-dark-900 p-2 rounded-md">
//                               <code className="text-xs text-primary-300 font-mono">
//                                 {challenge.testCases[index]?.input || 'N/A'}
//                               </code>
//                             </div>
//                           </div>
                          
//                           <div className="grid grid-cols-2 gap-2">
//                             <div>
//                               <p className="text-xs text-gray-400 mb-1">Expected:</p>
//                               <div className="bg-dark-900 p-2 rounded-md">
//                                 <code className="text-xs text-accent-300 font-mono">
//                                   {challenge.testCases[index]?.expectedOutput || 'N/A'}
//                                 </code>
//                               </div>
//                             </div>
                            
//                             <div>
//                               <p className="text-xs text-gray-400 mb-1">Your Output:</p>
//                               <div className="bg-dark-900 p-2 rounded-md">
//                                 <code className={`text-xs font-mono ${result.passed ? 'text-accent-300' : 'text-error-400'}`}>
//                                   {result.output}
//                                 </code>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="description"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="prose prose-invert max-w-none"
//                 >
//                   <p className="text-gray-300">{challenge.description}</p>
                  
//                   <h3 className="text-lg font-semibold text-white mt-6">Example:</h3>
//                   <div className="bg-dark-700 p-4 rounded-md">
//                     <div className="mb-2">
//                       <p className="text-sm font-medium text-gray-400">Input:</p>
//                       <div className="bg-dark-900 p-3 rounded-md mt-1">
//                         <code className="text-sm text-primary-300 font-mono">{challenge.testCases[0]?.input || 'N/A'}</code>
//                       </div>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-400">Output:</p>
//                       <div className="bg-dark-900 p-3 rounded-md mt-1">
//                         <code className="text-sm text-accent-300 font-mono">{challenge.testCases[0]?.expectedOutput || 'N/A'}</code>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <h3 className="text-lg font-semibold text-white mt-6">Constraints:</h3>
//                   <p className="text-gray-300 whitespace-pre-line">{challenge.constraints}</p>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
          
//           <div className="border-t border-dark-700 p-4 flex justify-between">
//             <button
//               onClick={handleRun}
//               disabled={isRunning}
//               className="btn-secondary w-1/2 mr-2"
//             >
//               Run Code
//             </button>
//             <button
//               onClick={handleSubmit}
//               disabled={isRunning}
//               className="btn-primary w-1/2 ml-2"
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ChallengeEditor