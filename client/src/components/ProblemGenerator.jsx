// import React from 'react';

// const ProblemGenerator = () => {
//   return (
//     <div className='min-h-screen bg-dark-bg-secondary2 text-white font-poppins p-6'>
//       <div className='flex justify-between mb-4'>
//         <h1 className='font-semibold text-2xl cursor-pointer hover:underline'>Back to Dashboard</h1>
//         <h1 className='font-semibold text-2xl'>Smart Problem Generator</h1>
//       </div>

//       <div className='flex flex-col md:flex-row gap-6'>
//         {/* Original Question - Left Panel */}
//         <div className='w-full md:w-1/2 bg-dark-bg-secondary1 p-6 rounded-lg'>
//           <div className='flex justify-between items-center mb-4'>
//             <h2 className='font-semibold text-xl'>problem_2</h2>
//             <span className='bg-red-500 px-3 py-1 rounded-full text-xs font-bold'>VERY HARD</span>
//           </div>
          
//           <div className='flex flex-wrap gap-2 mb-4'>
//             <span className='bg-dark-bg-secondary2 px-3 py-1 rounded-full text-xs'>Sorting</span>
//             <span className='bg-dark-bg-secondary2 px-3 py-1 rounded-full text-xs'>Amortized analysis</span>
//             <span className='bg-dark-bg-secondary2 px-3 py-1 rounded-full text-xs'>Dynamic programming</span>
//             <span className='bg-dark-bg-secondary2 px-3 py-1 rounded-full text-xs'>Divide and conquer</span>
//             <span className='bg-dark-bg-secondary2 px-3 py-1 rounded-full text-xs'>Data structures</span>
//           </div>
          
//           <div className='flex items-center gap-4 mb-6 text-sm'>
//             <div className='flex items-center gap-1'>
//               <span className='text-yellow-500'>☉</span>
//               <span>Accepted: 0</span>
//             </div>
//             <div className='flex items-center gap-1'>
//               <span className='text-gray-500'>☒</span>
//               <span>Submissions: 0</span>
//             </div>
//             <div className='flex items-center gap-1'>
//               <span className='text-green-500'>✅</span>
//               <span>Acceptance Rate: 0%</span>
//             </div>
//           </div>
          
//           <div className='mb-6 space-y-4'>
//             <p>
//               Zookeeper is buying a carton of fruit to feed his pet wabbit. The fruits are a sequence of apples and oranges, 
//               which is represented by a binary string <code className='bg-dark-bg-secondary2 px-1 rounded'>s<sub>1</sub>s<sub>2</sub>...s<sub>n</sub></code> of length <code className='bg-dark-bg-secondary2 px-1 rounded'>n</code>. 
//               1 represents an apple and 0 represents an orange.
//             </p>
//             <p>
//               Since wabbit is allergic to eating oranges, Zookeeper would like to find the longest contiguous sequence of apples. 
//               Let <code className='bg-dark-bg-secondary2 px-1 rounded'>f(l,r)</code> be the longest contiguous sequence of apples in the substring <code className='bg-dark-bg-secondary2 px-1 rounded'>s<sub>l</sub>s<sub>l+1</sub>...s<sub>r</sub></code>.
//             </p>
//             <p>
//               Help Zookeeper find <code className='bg-dark-bg-secondary2 px-1 rounded'>∑<sub>i=1</sub><sup>n</sup> ∑<sub>j=1</sub><sup>m</sup> f(l,r)</code>, or the sum of <code className='bg-dark-bg-secondary2 px-1 rounded'>f</code> across all substrings.
//             </p>
//           </div>
          
//           <div className='mb-6'>
//             <h3 className='font-semibold mb-3'>Examples:</h3>
//             <div className='space-y-3'>
//               <div className='bg-dark-bg-secondary2 p-3 rounded'>
//                 <p className='font-semibold mb-1'>Example 1:</p>
//                 <p><span className='text-gray-400'>Input:</span> 4 0110</p>
//                 <p><span className='text-gray-400'>Output:</span> 12</p>
//               </div>
//               <div className='bg-dark-bg-secondary2 p-3 rounded'>
//                 <p className='font-semibold mb-1'>Example 2:</p>
//                 <p><span className='text-gray-400'>Input:</span> 7 1101001</p>
//                 <p><span className='text-gray-400'>Output:</span> 30</p>
//               </div>
//             </div>
//           </div>
          
//           <div className='grid grid-cols-2 gap-4 mb-6'>
//             <div className='bg-dark-bg-secondary2 p-3 rounded'>
//               <h3 className='font-semibold mb-2'>Input Format:</h3>
//               <ul className='list-disc pl-5 space-y-1 text-sm'>
//                 <li>First line: integer <code className='bg-dark-bg-secondary1 px-1 rounded'>n</code> (1 ≤ n ≤ 5×10<sup>4</sup>)</li>
//                 <li>Second line: binary string <code className='bg-dark-bg-secondary1 px-1 rounded'>s</code> of length n</li>
//               </ul>
//             </div>
//             <div className='bg-dark-bg-secondary2 p-3 rounded'>
//               <h3 className='font-semibold mb-2'>Output Format:</h3>
//               <p className='text-sm'>Single integer with the sum</p>
//             </div>
//           </div>

//           <button className='w-full bg-blue-600 hover:bg-opacity-90 text-white py-3 rounded font-semibold transition-colors'>
//             Solve Original Question
//           </button>
//         </div>

        
//       </div>
//     </div>
//   );
// };

// export default ProblemGenerator;

import React, { useState } from 'react';
import { ArrowLeft, Users, CheckCircle, TrendingUp } from 'lucide-react';

const SmartProblemGenerator = () => {
  const [activeView, setActiveView] = useState('original'); // 'original' or 'ai'

  const problemData = {
    title: "problem_2",
    difficulty: "VERY HARD",
    topics: ["Sorting", "Amortized analysis", "Dynamic programming", "Divide and conquer", "Data structures"],
    stats: {
      accepted: 0,
      submissions: 0,
      acceptanceRate: "0%"
    },
    description: `Zookeeper is buying a carton of fruit to feed his pet wabbit. The fruits are a sequence of apples and oranges, which is represented by a binary string S₁S₂...Sₙ of length n. 1 represents an apple and 0 represents an orange.

Since wabbit is allergic to eating oranges, Zookeeper would like to find the longest contiguous sequence of apples. Let f(l,r) be the longest contiguous sequence of apples in the substring Sₗsₗ₊₁...sᵣ.

Help Zookeeper find Σᵢ₌₁ⁿ Σⱼ₌ᵢⁿ f(l,r), or the sum of f across all substrings.`,
    examples: [
      { input: "4\n0110", output: "12" },
      { input: "7\n1101001", output: "30" },
      { input: "12\n011100011100", output: "156" }
    ],
    constraints: [
      "The first line contains a single integer n (1 ≤ n ≤ 5 × 10⁵).",
      "The next line contains a binary string s of length n (s ∈ {0,1})"
    ],
    note: "In the first test, there are ten substrings. The lengths of the longest contiguous sequence of ones in each of these ten substrings are 0,1,2,2,1,2,2,1,1,0 respectively. Hence, the answer is 0+1+2+2+1+2+2+1+1+0 = 12."
  };

  const aiVersion = {
    description: `You are given a binary string s consisting only of 0s and 1s, where each 1 represents an apple and each 0 represents an orange.

The Zookeeper wants to feed apples to his wabbit, who is allergic to oranges. For every possible substring of s, the Zookeeper wants to determine the length of the longest sequence of consecutive apples (1s) within that substring.

Your task is to compute the total sum of the longest contiguous sequences of apples across all possible substrings of s.`,
    inputFormat: [
      "• The first line contains a single integer n (1 ≤ n ≤ 5 × 10⁵), the length of the string.",
      "• The second line contains a binary string s of length n, where each character is either '0' or '1'."
    ],
    outputFormat: "Output a single integer representing the sum of the longest contiguous sequence of apples (1s) for all substrings of s.",
    examples: [
      { input: "4\n0110", output: "12" },
      { input: "7\n1101001", output: "30" }
    ]
  };

  return (
    <div className="min-h-screen bg-dark-bg-secondary2">
      {/* Header */}
      <div className="bg-dark-bg-secondary1 border-b border-border_Col px-6 py-4">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm">Back to Dashboard</span>
          </button>
          <h1 className="text-xl font-semibold text-white">Smart Problem Generator</h1>
        </div>
      </div>

      <div className="flex">
        {/* Left Panel - Original Problem */}
        <div className="w-1/2 p-6">
          <div className="bg-dark-bg-secondary3 rounded-lg border border-border_Col">
            {/* Problem Header */}
            <div className="p-6 border-b border-border_Col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">{problemData.title}</h2>
                <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm font-medium rounded border border-red-500/30">
                  {problemData.difficulty}
                </span>
              </div>

              {/* Topics */}
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-400 mb-2 block">Topics:</span>
                <div className="flex flex-wrap gap-2">
                  {problemData.topics.map((topic, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded border border-blue-500/30">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-gray-400">Accepted</span>
                  <span className="text-lg font-semibold text-green-500">{problemData.stats.accepted}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-xs text-gray-400">Submissions</span>
                  <span className="text-lg font-semibold text-blue-500">{problemData.stats.submissions}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                  <span className="text-xs text-gray-400">Acceptance Rate</span>
                  <span className="text-lg font-semibold text-purple-500">{problemData.stats.acceptanceRate}</span>
                </div>
              </div>
            </div>

            {/* Problem Content */}
            <div className="p-6">
              {/* Description */}
              <div className="mb-6">
                <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm">
                  {problemData.description}
                </p>
              </div>

              {/* Examples */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-4">Examples:</h3>
                
                {/* Example 1 */}
                <div className="mb-4">
                  <h4 className="text-white font-medium mb-2">Example 1:</h4>
                  <div className="bg-dark-bg-secondary1 rounded p-3 border border-border_Col">
                    <div className="mb-2">
                      <span className="text-blue-400 text-sm font-medium">Input:</span>
                      <pre className="text-gray-300 text-sm mt-1 font-mono">{problemData.examples[0].input}</pre>
                    </div>
                    <div>
                      <span className="text-green-400 text-sm font-medium">Output:</span>
                      <pre className="text-gray-300 text-sm mt-1 font-mono">{problemData.examples[0].output}</pre>
                    </div>
                  </div>
                </div>

                {/* Example 2 */}
                <div className="mb-4">
                  <h4 className="text-white font-medium mb-2">Example 2:</h4>
                  <div className="bg-dark-bg-secondary1 rounded p-3 border border-border_Col">
                    <div className="mb-2">
                      <span className="text-blue-400 text-sm font-medium">Input:</span>
                      <pre className="text-gray-300 text-sm mt-1 font-mono">{problemData.examples[1].input}</pre>
                    </div>
                    <div>
                      <span className="text-green-400 text-sm font-medium">Output:</span>
                      <pre className="text-gray-300 text-sm mt-1 font-mono">{problemData.examples[1].output}</pre>
                    </div>
                  </div>
                </div>

                {/* Example 3 */}
                <div className="mb-4">
                  <h4 className="text-white font-medium mb-2">Example 3:</h4>
                  <div className="bg-dark-bg-secondary1 rounded p-3 border border-border_Col">
                    <div className="mb-2">
                      <span className="text-blue-400 text-sm font-medium">Input:</span>
                      <pre className="text-gray-300 text-sm mt-1 font-mono">{problemData.examples[2].input}</pre>
                    </div>
                    <div>
                      <span className="text-green-400 text-sm font-medium">Output:</span>
                      <pre className="text-gray-300 text-sm mt-1 font-mono">{problemData.examples[2].output}</pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Constraints */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">Constraints:</h3>
                <div className="text-gray-300 text-sm space-y-1">
                  {problemData.constraints.map((constraint, index) => (
                    <p key={index}>{constraint}</p>
                  ))}
                </div>
              </div>

              {/* Note */}
              <div className="bg-green-500/10 border border-green-500/30 rounded p-4">
                <h4 className="text-green-400 font-semibold mb-2">Note:</h4>
                <p className="text-green-300 text-sm">{problemData.note}</p>
              </div>
            </div>

            {/* Solve Button */}
            <div className="p-6 border-t border-border_Col">
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                Solve Question
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - AI Generated Version */}
        <div className="w-1/2 p-6">
          <div className="bg-dark-bg-secondary3 rounded-lg border border-border_Col">
            {/* AI Header */}
            <div className="p-6 border-b border-border_Col">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">
                  📘 AI Generated Version
                </div>
              </div>
            </div>

            {/* AI Content */}
            <div className="p-6">
              {/* Description */}
              <div className="mb-6">
                <p className="text-gray-300 leading-relaxed text-sm">
                  {aiVersion.description}
                </p>
              </div>

              {/* Input Format */}
              <div className="mb-6">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-t p-3">
                  <h3 className="text-blue-400 font-semibold">Input Format:</h3>
                </div>
                <div className="bg-blue-500/5 border border-blue-500/30 border-t-0 rounded-b p-4">
                  <div className="text-gray-300 text-sm space-y-1">
                    {aiVersion.inputFormat.map((format, index) => (
                      <p key={index}>{format}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Output Format */}
              <div className="mb-6">
                <div className="bg-green-500/10 border border-green-500/30 rounded-t p-3">
                  <h3 className="text-green-400 font-semibold">Output Format:</h3>
                </div>
                <div className="bg-green-500/5 border border-green-500/30 border-t-0 rounded-b p-4">
                  <p className="text-gray-300 text-sm">{aiVersion.outputFormat}</p>
                </div>
              </div>

              {/* Examples */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-4">Examples:</h3>
                
                {/* Example 1 */}
                <div className="mb-4">
                  <h4 className="text-white font-medium mb-2">Example 1:</h4>
                  <div className="bg-dark-bg-secondary1 rounded p-3 border border-border_Col">
                    <div className="mb-2">
                      <span className="text-blue-400 text-sm font-medium">Input:</span>
                      <pre className="text-gray-300 text-sm mt-1 font-mono">{aiVersion.examples[0].input}</pre>
                    </div>
                    <div>
                      <span className="text-green-400 text-sm font-medium">Output:</span>
                      <pre className="text-gray-300 text-sm mt-1 font-mono">{aiVersion.examples[0].output}</pre>
                    </div>
                  </div>
                </div>

                {/* Example 2 */}
                <div className="mb-4">
                  <h4 className="text-white font-medium mb-2">Example 2:</h4>
                  <div className="bg-dark-bg-secondary1 rounded p-3 border border-border_Col">
                    <div className="mb-2">
                      <span className="text-blue-400 text-sm font-medium">Input:</span>
                      <pre className="text-gray-300 text-sm mt-1 font-mono">{aiVersion.examples[1].input}</pre>
                    </div>
                    <div>
                      <span className="text-green-400 text-sm font-medium">Output:</span>
                      <pre className="text-gray-300 text-sm mt-1 font-mono">{aiVersion.examples[1].output}</pre>
                    </div>
                  </div>
                </div>

                {/* Solve Button */}
                <div className="p-6 border-t border-border_Col">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                    Solve Question
                </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartProblemGenerator;