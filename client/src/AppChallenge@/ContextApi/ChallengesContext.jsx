import { createContext, useContext, useState } from 'react'

const DEMO_CHALLENGES = [
  {
    id: 'challenge1',
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'Easy',
    timeLimit: 30, 
    category: 'Arrays',
    createdBy: {
      id: 'admin1',
      username: 'admin',
      avatarUrl: 'https://i.pravatar.cc/150?img=1'
    },
    createdAt: new Date('2023-09-01'),
    languages: ['javascript', 'python', 'java'],
    testCases: [
      { id: 'test1', input: '[2,7,11,15], 9', expectedOutput: '[0,1]', isHidden: false },
      { id: 'test2', input: '[3,2,4], 6', expectedOutput: '[1,2]', isHidden: false },
      { id: 'test3', input: '[3,3], 6', expectedOutput: '[0,1]', isHidden: false },
      { id: 'test4', input: '[1,2,3,4,5], 8', expectedOutput: '[2,4]', isHidden: true },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Your solution here
}`,
      python: `def two_sum(nums, target):
    # Your solution here
    pass`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your solution here
    }
}`
    },
    constraints: 'You may assume that each input would have exactly one solution, and you may not use the same element twice.'
  },
  {
    id: 'challenge2',
    title: 'Valid Parentheses',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    difficulty: 'Medium',
    timeLimit: 45,
    category: 'Stacks',
    createdBy: {
      id: 'admin1',
      username: 'admin',
      avatarUrl: 'https://i.pravatar.cc/150?img=1'
    },
    createdAt: new Date('2023-09-10'),
    languages: ['javascript', 'python', 'java'],
    testCases: [
      { id: 'test1', input: '"()"', expectedOutput: 'true', isHidden: false },
      { id: 'test2', input: '"()[]{}"', expectedOutput: 'true', isHidden: false },
      { id: 'test3', input: '"(]"', expectedOutput: 'false', isHidden: false },
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  // Your solution here
}`,
      python: `def is_valid(s):
    # Your solution here
    pass`,
      java: `class Solution {
    public boolean isValid(String s) {
        // Your solution here
    }
}`
    },
    constraints: 'An input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.'
  },
  {
    id: 'challenge3',
    title: 'Maximum Subarray',
    description: 'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
    difficulty: 'Hard',
    timeLimit: 60,
    category: 'Dynamic Programming',
    createdBy: {
      id: 'admin1',
      username: 'admin',
      avatarUrl: 'https://i.pravatar.cc/150?img=1'
    },
    createdAt: new Date('2023-09-20'),
    languages: ['javascript', 'python', 'java'],
    testCases: [
      { id: 'test1', input: '[-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6', isHidden: false },
      { id: 'test2', input: '[1]', expectedOutput: '1', isHidden: false },
      { id: 'test3', input: '[5,4,-1,7,8]', expectedOutput: '23', isHidden: false },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  // Your solution here
}`,
      python: `def max_sub_array(nums):
    # Your solution here
    pass`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        // Your solution here
    }
}`
    },
    constraints: 'If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.'
  }
]

export const ChallengesContext = createContext()

export const ChallengesProvider = ({ children }) => {
  const [challenges, setChallenges] = useState(DEMO_CHALLENGES)
  const [submissions, setSubmissions] = useState([])

  const getChallenge = (id) => {
    return challenges.find(challenge => challenge.id === id)
  }

  const submitSolution = (submission) => {
    setSubmissions(prev => [...prev, submission])
  }

  const createChallenge = async (challenge) => {
    const newChallenge = {
      ...challenge,
      id: `challenge${challenges.length + 1}`,
      createdAt: new Date()
    }
    
    setChallenges(prev => [...prev, newChallenge])
    return newChallenge
  }

  return (
    <ChallengesContext.Provider value={{ 
      challenges, 
      submissions, 
      getChallenge, 
      submitSolution,
      createChallenge 
    }}>
      {children}
    </ChallengesContext.Provider>
  )
}
