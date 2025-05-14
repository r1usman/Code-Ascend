import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useChallenges } from '../contexts/ChallengesContext'
import { useAuth } from '../contexts/AuthContext'
import { ArrowLeftIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'

const CreateChallenge = () => {
  const navigate = useNavigate()
  const { createChallenge } = useChallenges()
  const { user } = useAuth()
  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState('Medium')
  const [category, setCategory] = useState('')
  const [timeLimit, setTimeLimit] = useState(30)
  const [constraints, setConstraints] = useState('')
  const [starterCode, setStarterCode] = useState(`/**
 * Write your solution here
 */
function solution(input) {
  // Your code here
}`)
  
  const [testCases, setTestCases] = useState([
    { input: '', expectedOutput: '', isHidden: false }
  ])
  
  const [selectedLanguages, setSelectedLanguages] = useState(['javascript'])
  
  const languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'cpp', name: 'C++' }
  ]
  
  const addTestCase = () => {
    setTestCases([...testCases, { input: '', expectedOutput: '', isHidden: false }])
  }
  
  const removeTestCase = (index: number) => {
    const newTestCases = [...testCases]
    newTestCases.splice(index, 1)
    setTestCases(newTestCases)
  }
  
  const updateTestCase = (index: number, field: keyof typeof testCases[0], value: string | boolean) => {
    const newTestCases = [...testCases]
    newTestCases[index] = { ...newTestCases[index], [field]: value }
    setTestCases(newTestCases)
  }
  
  const toggleLanguage = (langId: string) => {
    if (selectedLanguages.includes(langId)) {
      setSelectedLanguages(selectedLanguages.filter(id => id !== langId))
    } else {
      setSelectedLanguages([...selectedLanguages, langId])
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) return
    
    // Process all the starter code into a map
    const starterCodeMap: Record<string, string> = {}
    selectedLanguages.forEach(lang => {
      starterCodeMap[lang] = starterCode // In a real app, we would have different starter code for each language
    })
    
    // Process test cases to add IDs
    const processedTestCases = testCases.map((tc, index) => ({
      ...tc,
      id: `test${index + 1}`
    }))
    
    const newChallenge = {
      title,
      description,
      difficulty: difficulty as 'Easy' | 'Medium' | 'Hard',
      timeLimit: Number(timeLimit),
      category,
      createdBy: {
        id: user.id,
        username: user.username,
        avatarUrl: user.avatarUrl
      },
      languages: selectedLanguages,
      testCases: processedTestCases,
      starterCode: starterCodeMap,
      constraints
    }
    
    try {
      const challenge = await createChallenge(newChallenge)
      navigate(`/challenges/${challenge.id}`)
    } catch (error) {
      console.error('Failed to create challenge:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-md hover:bg-dark-700 text-gray-400"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Create Challenge</h1>
          <p className="text-gray-400 mt-1">Design a coding challenge for the community</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="bg-dark-800 rounded-lg border border-dark-700 p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">
              Challenge Title
            </label>
            <input
              id="title"
              type="text"
              className="input w-full"
              placeholder="e.g. Two Sum"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">
              Description
            </label>
            <textarea
              id="description"
              rows={5}
              className="input w-full"
              placeholder="Describe the problem..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-1">
                Category
              </label>
              <input
                id="category"
                type="text"
                className="input w-full"
                placeholder="e.g. Arrays, Strings, DP"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="timeLimit" className="block text-sm font-medium text-gray-400 mb-1">
                Time Limit (minutes)
              </label>
              <input
                id="timeLimit"
                type="number"
                min="1"
                max="120"
                className="input w-full"
                value={timeLimit}
                onChange={(e) => setTimeLimit(Number(e.target.value))}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="constraints" className="block text-sm font-medium text-gray-400 mb-1">
              Constraints
            </label>
            <textarea
              id="constraints"
              rows={3}
              className="input w-full"
              placeholder="Enter any constraints or requirements..."
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Supported Languages
            </label>
            <div className="flex flex-wrap gap-2">
              {languages.map(lang => (
                <button
                  key={lang.id}
                  type="button"
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedLanguages.includes(lang.id)
                      ? 'bg-primary-500 text-white'
                      : 'bg-dark-700 text-gray-400 hover:bg-dark-600'
                  }`}
                  onClick={() => toggleLanguage(lang.id)}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Starter Code (JavaScript)
            </label>
            <div className="border border-dark-700 rounded-lg overflow-hidden">
              <CodeMirror
                value={starterCode}
                height="200px"
                theme={vscodeDark}
                extensions={[javascript()]}
                onChange={(value) => setStarterCode(value)}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              This will be the starting point for users attempting the challenge.
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-400">
                Test Cases
              </label>
              <button
                type="button"
                onClick={addTestCase}
                className="btn-secondary py-1 px-2 text-sm flex items-center"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Test Case
              </button>
            </div>
            
            <div className="space-y-4">
              {testCases.map((testCase, index) => (
                <div key={index} className="bg-dark-700 rounded-lg p-4 relative">
                  <div className="absolute top-2 right-2">
                    <button
                      type="button"
                      onClick={() => removeTestCase(index)}
                      className="text-gray-400 hover:text-error-500 p-1"
                      disabled={testCases.length === 1}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <h4 className="text-white font-medium mb-3">Test Case {index + 1}</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Input
                      </label>
                      <textarea
                        rows={3}
                        className="input w-full"
                        placeholder="Enter test input..."
                        value={testCase.input}
                        onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Expected Output
                      </label>
                      <textarea
                        rows={3}
                        className="input w-full"
                        placeholder="Enter expected output..."
                        value={testCase.expectedOutput}
                        onChange={(e) => updateTestCase(index, 'expectedOutput', e.target.value)}
                        required
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id={`hidden-${index}`}
                      type="checkbox"
                      className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-600 bg-dark-700 rounded"
                      checked={testCase.isHidden}
                      onChange={(e) => updateTestCase(index, 'isHidden', e.target.checked)}
                    />
                    <label htmlFor={`hidden-${index}`} className="ml-2 text-sm text-gray-400">
                      Hide this test case from users (will be used for validation only)
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-dark-700 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={!title || !description || testCases.some(tc => !tc.input || !tc.expectedOutput)}
            >
              Create Challenge
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateChallenge