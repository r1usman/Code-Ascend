import { format } from 'date-fns';
import { Bell, Code2, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { BsClock, BsLightningCharge, BsPeople, BsTrophy } from 'react-icons/bs';

const challenges = [
  {
    id: 1,
    title: 'Algorithm Marathon',
    type: 'individual',
    difficulty: 'hard',
    participants: 234,
    startTime: new Date(2023, 11, 25, 14, 30),
    duration: '2 hours',
  },
  {
    id: 2,
    title: 'Team Code Sprint',
    type: 'team',
    difficulty: 'medium',
    participants: 156,
    startTime: new Date(2023, 11, 26, 10, 0),
    duration: '3 hours',
  },
  {
    id: 3,
    title: 'Data Structures Challenge',
    type: 'individual',
    difficulty: 'medium',
    participants: 189,
    startTime: new Date(2023, 11, 27, 15, 0),
    duration: '1.5 hours',
  },
];

const teamLeaderboard = [
  { rank: 1, team: 'Code Ninjas', score: 2850, members: 4 },
  { rank: 2, team: 'Binary Beasts', score: 2720, members: 3 },
  { rank: 3, team: 'Algorithm Aces', score: 2680, members: 4 },
];

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      <header
        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Code2 className="h-8 w-8 text-blue-600" />
              <span
                className={`ml-2 text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                CodeHub
              </span>
            </div>
            <nav className="flex items-center space-x-4">
              <button
                className={`p-2 ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-blue-600'
                } transition-colors`}
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? (
                  <Sun className="h-6 w-6" />
                ) : (
                  <Moon className="h-6 w-6" />
                )}
              </button>
              <button className="relative p-2 text-gray-600 hover:text-blue-600">
                <Bell
                  className={`h-6 w-6 ${
                    isDarkMode
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                />
                <span className="absolute right-0 top-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32"
                alt="Profile"
                className="h-8 w-8 cursor-pointer rounded-full"
              />
            </nav>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Coding Challenges & Competitions
        </h1>

        {/* Stats Overview */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <BsLightningCharge className="mr-3 text-2xl text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Active Challenges</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <BsPeople className="mr-3 text-2xl text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Participants</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <BsTrophy className="mr-3 text-2xl text-yellow-500" />
              <div>
                <p className="text-sm text-gray-500">Total Competitions</p>
                <p className="text-2xl font-bold">42</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <BsClock className="mr-3 text-2xl text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">Hours Coded</p>
                <p className="text-2xl font-bold">3,567</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Challenges */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Upcoming Challenges</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="pb-4">Challenge</th>
                  <th className="pb-4">Type</th>
                  <th className="pb-4">Difficulty</th>
                  <th className="pb-4">Participants</th>
                  <th className="pb-4">Start Time</th>
                  <th className="pb-4">Duration</th>
                </tr>
              </thead>
              <tbody>
                {challenges.map((challenge) => (
                  <tr key={challenge.id} className="border-t">
                    <td className="py-4">{challenge.title}</td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          challenge.type === 'team'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {challenge.type}
                      </span>
                    </td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          challenge.difficulty === 'hard'
                            ? 'bg-red-100 text-red-800'
                            : challenge.difficulty === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {challenge.difficulty}
                      </span>
                    </td>
                    <td className="py-4">{challenge.participants}</td>
                    <td className="py-4">
                      {format(challenge.startTime, 'MMM dd, HH:mm')}
                    </td>
                    <td className="py-4">{challenge.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Team Leaderboard */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Team Leaderboard</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="pb-4">Rank</th>
                  <th className="pb-4">Team</th>
                  <th className="pb-4">Score</th>
                  <th className="pb-4">Members</th>
                </tr>
              </thead>
              <tbody>
                {teamLeaderboard.map((team) => (
                  <tr key={team.team} className="border-t">
                    <td className="py-4">#{team.rank}</td>
                    <td className="py-4">{team.team}</td>
                    <td className="py-4">{team.score}</td>
                    <td className="py-4">{team.members}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
