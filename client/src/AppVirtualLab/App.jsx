import {
  Activity,
  ArrowLeft,
  Code2,
  Hand,
  History,
  MessageCircle,
  MessageSquare,
  Mic,
  MicOff,
  MonitorOff,
  MonitorPlay,
  Settings,
  Share2,
  User,
  Users,
  Users2,
  Video,
  VideoOff,
  X,
} from 'lucide-react';
import { useState } from 'react';

// Simulated data for demonstration
const activeUsers = [
  {
    id: 1,
    name: 'Alice Chen',
    status: 'coding',
    progress: 75,
    code: `function findLCS(str1: string, str2: string): string {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = Array(m + 1).fill(0)
    .map(() => Array(n + 1).fill(0));
  
  // Building the dp table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  // TODO: Implement backtracking to construct LCS
  return "";
}`,
  },
  {
    id: 2,
    name: 'Bob Smith',
    status: 'debugging',
    progress: 45,
    code: `function findLCS(str1: string, str2: string): string {
  if (!str1 || !str2) return "";
  
  // Need to implement dynamic programming approach
  console.log("Debug: Input strings", str1, str2);
  
  return "Work in progress...";
}`,
  },
  {
    id: 3,
    name: 'Carol Davis',
    status: 'testing',
    progress: 90,
    code: `function findLCS(str1: string, str2: string): string {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = Array(m + 1).fill(0)
    .map(() => Array(n + 1).fill(0));
  
  // Fill the dp table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  // Backtrack to find the LCS
  let lcs = "";
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      lcs = str1[i - 1] + lcs;
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  
  return lcs;
}`,
  },
];

const problemStatement = `
// Problem: Implement a function that finds the longest common subsequence
// of two strings.
//
// Description:
// The longest common subsequence (LCS) problem is to find the longest subsequence 
// present in both strings in the same relative order, but not necessarily contiguous.
// For example, if str1 = "ABCDGH" and str2 = "AEDFHR", then "ADH" is one of the
// longest common subsequences.
//
// Function Signature:
function findLCS(str1: string, str2: string): string {
  // Your implementation here
}

// Example:
// Input: str1 = "ABCDGH", str2 = "AEDFHR"
// Output: "ADH"

// Test Cases:
// 1. findLCS("AGGTAB", "GXTXAYB") => "GTAB"
// 2. findLCS("HELLO", "WORLD") => "LO"
// 3. findLCS("", "ABC") => ""
// 4. findLCS("ABC", "ABC") => "ABC"
`;

const testCases = [
  { input: ['AGGTAB', 'GXTXAYB'], output: 'GTAB' },
  { input: ['HELLO', 'WORLD'], output: 'LO' },
  { input: ['', 'ABC'], output: '' },
  { input: ['ABC', 'ABC'], output: 'ABC' },
];

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex items-center">
              <Code2 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">CodeAscend</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="rounded-full p-2 hover:bg-gray-100">
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Admin profile"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-2">
            <div className="rounded-lg bg-white p-4 shadow">
              <nav className="space-y-2">
                <button className="flex w-full items-center space-x-2 rounded-md bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                  <Users className="h-5 w-5" />
                  <span>Participants</span>
                </button>
                <button className="flex w-full items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                  <MessageSquare className="h-5 w-5" />
                  <span>Chat</span>
                </button>
                <button
                  className="flex w-full items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                  onClick={() => setShowVideoCall(true)}
                >
                  <Video className="h-5 w-5" />
                  <span>Video Call</span>
                </button>
                <button className="flex w-full items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                  <Activity className="h-5 w-5" />
                  <span>Analytics</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-7">
            <div className="rounded-lg bg-white shadow">
              {/* Editor Header */}
              <div className="flex items-center justify-between border-b px-4 py-3">
                <div className="flex items-center">
                  {selectedUser ? (
                    <div className="flex items-center">
                      <button
                        onClick={() => setSelectedUser(null)}
                        className="mr-3 rounded-full p-1 hover:bg-gray-100"
                      >
                        <ArrowLeft className="h-5 w-5 text-gray-600" />
                      </button>
                      <h2 className="text-lg font-semibold">
                        {selectedUser.name}'s Solution
                      </h2>
                    </div>
                  ) : (
                    <h2 className="text-lg font-semibold">
                      Longest Common Subsequence
                    </h2>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center rounded-md bg-blue-50 px-3 py-1 text-sm text-blue-700">
                    <Share2 className="mr-1 h-4 w-4" />
                    Share
                  </button>
                  <button className="flex items-center rounded-md bg-red-50 px-3 py-1 text-sm text-red-700">
                    <MonitorPlay className="mr-1 h-4 w-4" />
                    Record
                  </button>
                </div>
              </div>

              {selectedUser ? (
                <>
                  {/* Problem Statement (Collapsed) */}
                  <div className="border-b px-4 py-3">
                    <details className="text-sm">
                      <summary className="cursor-pointer font-medium text-gray-700 hover:text-blue-600">
                        View Problem Statement
                      </summary>
                      <pre className="font-mono mt-2 rounded-md bg-gray-50 p-3 text-gray-600">
                        {problemStatement}
                      </pre>
                    </details>
                  </div>

                  {/* Code Editor */}
                  <div className="p-4">
                    <div className="mb-2">
                      <h3 className="text-sm font-medium text-gray-700">
                        Current Implementation
                      </h3>
                    </div>
                    <pre className="font-mono overflow-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
                      {selectedUser.code}
                    </pre>
                  </div>

                  {/* Compiler Output */}
                  <div className="border-t px-4 py-3">
                    <h3 className="mb-2 text-sm font-medium text-gray-700">
                      Compiler Output
                    </h3>
                    <div className="font-mono rounded-md bg-gray-50 p-3 text-sm text-gray-600">
                      {'>'}Compiling {selectedUser.name}'s code...
                      <br />
                      {selectedUser.status === 'debugging' ? (
                        <>
                          {'>'}Warning: Incomplete implementation detected
                          <br />
                          {'>'}Debug logs enabled
                        </>
                      ) : selectedUser.status === 'testing' ? (
                        <>
                          {'>'}All test cases passed
                          <br />
                          {'>'}Implementation complete
                        </>
                      ) : (
                        <>
                          {'>'}Implementation in progress
                          <br />
                          {'>'}No errors found
                        </>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Problem Description */}
                  <div className="p-4">
                    <div className="mb-6">
                      <h3 className="mb-2 text-sm font-medium text-gray-700">
                        Problem Description
                      </h3>
                      <pre className="font-mono rounded-md bg-gray-50 p-4 text-sm text-gray-600">
                        {problemStatement}
                      </pre>
                    </div>

                    <div>
                      <h3 className="mb-2 text-sm font-medium text-gray-700">
                        Test Cases
                      </h3>
                      <div className="overflow-hidden rounded-md bg-gray-50">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                Input
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                Expected Output
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {testCases.map((test, index) => (
                              <tr key={index}>
                                <td className="font-mono px-4 py-2 text-sm">
                                  str1: "{test.input[0]}"<br />
                                  str2: "{test.input[1]}"
                                </td>
                                <td className="font-mono px-4 py-2 text-sm">
                                  "{test.output}"
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Sidebar - Participant List */}
          <div className="col-span-3">
            <div className="rounded-lg bg-white shadow">
              <div className="border-b px-4 py-3">
                <h2 className="text-lg font-semibold">Active Participants</h2>
              </div>
              <div className="space-y-4 p-4">
                {activeUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`cursor-pointer rounded-lg p-3 transition ${
                      selectedUser?.id === user.id
                        ? 'border border-blue-100 bg-blue-50'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            user.status === 'coding'
                              ? 'bg-green-400'
                              : user.status === 'debugging'
                              ? 'bg-yellow-400'
                              : 'bg-blue-400'
                          }`}
                        />
                        <span className="font-medium">{user.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {user.progress}%
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-gray-200">
                      <div
                        className="h-1.5 rounded-full bg-blue-600"
                        style={{ width: `${user.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Session History */}
              <div className="border-t px-4 py-3">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700">
                    Session History
                  </h3>
                  <History className="h-4 w-4 text-gray-400" />
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Alice modified line 15</span>
                    <span>2m ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bob started debugging</span>
                    <span>5m ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Carol completed testing</span>
                    <span>8m ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Call Modal */}
      {showVideoCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="flex h-full w-full flex-col bg-gray-900 p-4">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between text-white">
              <div className="flex items-center space-x-2">
                <Video className="h-5 w-5" />
                <span className="font-semibold">Virtual Lab Meeting</span>
              </div>
              <button
                onClick={() => setShowVideoCall(false)}
                className="rounded-full p-2 hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Main Video Grid */}
            <div className="mb-4 grid flex-1 grid-cols-2 gap-4">
              {activeUsers.map((user, index) => (
                <div
                  key={user.id}
                  className="relative overflow-hidden rounded-lg bg-gray-800"
                >
                  <div className=" flex h-full items-center justify-center">
                    <User className="size-16 text-black text-opacity-50" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white">
                    <div className="flex items-center justify-between">
                      <span>{user.name}</span>
                      <div className="flex items-center space-x-1">
                        {index === 0 && <Mic className="h-4 w-4" />}
                        {index === 1 && <MicOff className="h-4 w-4" />}
                        {index === 2 && <Video className="h-4 w-4" />}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4 rounded-lg bg-gray-800 p-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`rounded-full p-3 ${
                  isMuted ? 'bg-red-500' : 'bg-gray-700'
                } hover:bg-opacity-80`}
              >
                {isMuted ? (
                  <MicOff className="h-5 w-5 text-white" />
                ) : (
                  <Mic className="h-5 w-5 text-white" />
                )}
              </button>
              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`rounded-full p-3 ${
                  isVideoOff ? 'bg-red-500' : 'bg-gray-700'
                } hover:bg-opacity-80`}
              >
                {isVideoOff ? (
                  <VideoOff className="h-5 w-5 text-white" />
                ) : (
                  <Video className="h-5 w-5 text-white" />
                )}
              </button>
              <button
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`rounded-full p-3 ${
                  isScreenSharing ? 'bg-green-500' : 'bg-gray-700'
                } hover:bg-opacity-80`}
              >
                {isScreenSharing ? (
                  <MonitorOff className="h-5 w-5 text-white" />
                ) : (
                  <MonitorPlay className="h-5 w-5 text-white" />
                )}
              </button>
              <button
                onClick={() => setShowChat(!showChat)}
                className={`rounded-full p-3 ${
                  showChat ? 'bg-blue-500' : 'bg-gray-700'
                } hover:bg-opacity-80`}
              >
                <MessageCircle className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={() => setShowParticipants(!showParticipants)}
                className={`rounded-full p-3 ${
                  showParticipants ? 'bg-blue-500' : 'bg-gray-700'
                } hover:bg-opacity-80`}
              >
                <Users2 className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={() => setIsHandRaised(!isHandRaised)}
                className={`rounded-full p-3 ${
                  isHandRaised ? 'bg-yellow-500' : 'bg-gray-700'
                } hover:bg-opacity-80`}
              >
                <Hand className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={() => setShowVideoCall(false)}
                className="rounded-full bg-red-500 p-3 hover:bg-red-600"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
