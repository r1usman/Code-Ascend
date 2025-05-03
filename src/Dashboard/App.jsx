import {
  Activity,
  Award,
  Bell,
  BookOpen,
  CheckCircle2,
  Code2,
  MessageSquare,
  Moon,
  Star,
  Sun,
  Trophy,
  User,
} from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const notifications = [
    {
      id: 1,
      title: 'New Python Challenge Available',
      time: '2m ago',
      type: 'challenge',
    },
    {
      id: 2,
      title: 'Sarah commented on your solution',
      time: '1h ago',
      type: 'message',
    },
    {
      id: 3,
      title: "You earned the 'Code Ninja' badge!",
      time: '2h ago',
      type: 'achievement',
    },
  ];

  const achievements = [
    { id: 1, name: 'Algorithm Master', progress: 80, total: 100 },
    { id: 2, name: 'Bug Crusher', progress: 45, total: 50 },
    { id: 3, name: 'Code Reviewer', progress: 28, total: 30 },
  ];

  const recentActivities = [
    {
      id: 1,
      title: "Completed 'Binary Search' challenge",
      time: 'Today, 10:30 AM',
      type: 'challenge',
    },
    {
      id: 2,
      title: "Earned 'Early Bird' badge",
      time: 'Yesterday',
      type: 'badge',
    },
    {
      id: 3,
      title: "Started 'Advanced React' course",
      time: '2 days ago',
      type: 'course',
    },
  ];

  return (
    <div
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      {/* Navigation Header */}
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
                CodeAscend
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

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar Navigation */}
          <div className="col-span-2">
            <nav className="space-y-1">
              <Link
                to={'/'}
                className={`flex items-center px-4 py-2 text-sm font-medium ${
                  isDarkMode
                    ? 'bg-blue-900/20 text-blue-400'
                    : 'bg-blue-50 text-blue-600'
                } rounded-lg`}
              >
                <Activity className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
              <Link
                to={'/appchallenge@'}
                className={`flex items-center px-4 py-2 text-sm font-medium ${
                  isDarkMode
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-600 hover:bg-gray-50'
                } rounded-lg`}
              >
                <Code2 className="mr-3 h-5 w-5" />
                Challenges
              </Link>
              <Link
                to={'/appcollaboration'}
                className={`flex items-center px-4 py-2 text-sm font-medium ${
                  isDarkMode
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-600 hover:bg-gray-50'
                } rounded-lg`}
              >
                <BookOpen className="mr-3 h-5 w-5" />
                Collaborations
              </Link>
              <Link
                to={'/appshowcase'}
                className={`flex items-center px-4 py-2 text-sm font-medium ${
                  isDarkMode
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-600 hover:bg-gray-50'
                } rounded-lg`}
              >
                <MessageSquare className="mr-3 h-5 w-5" />
                appshowcase
              </Link>
              <Link
                to={'/appvirtuallab'}
                className={`flex items-center px-4 py-2 text-sm font-medium ${
                  isDarkMode
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-600 hover:bg-gray-50'
                } rounded-lg`}
              >
                <User className="mr-3 h-5 w-5" />
                Appvirtuallab
              </Link>
              <Link
                to={'/appeditor'}
                className={`flex items-center px-4 py-2 text-sm font-medium ${
                  isDarkMode
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-600 hover:bg-gray-50'
                } rounded-lg`}
              >
                <User className="mr-3 h-5 w-5" />
                Appeditor
              </Link>
            </nav>
          </div>

          {/* Main Content */}
          <div className="col-span-7">
            {/* Welcome Section */}
            <div
              className={`${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } mb-6 rounded-lg p-6 shadow-sm`}
            >
              <h1
                className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Welcome back, Code Ascend Users!
              </h1>
              <p
                className={`${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                } mt-1`}
              >
                You've completed 80% of your weekly goals. Keep it up!
              </p>
              <div className="mt-4 h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{ width: '80%' }}
                ></div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="mb-6 grid grid-cols-3 gap-6">
              <div
                className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-lg p-6 shadow-sm`}
              >
                <div className="flex items-center">
                  <Trophy className="h-10 w-10 text-yellow-500" />
                  <div className="ml-4">
                    <h3
                      className={`text-lg font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      247
                    </h3>
                    <p
                      className={`${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      Challenges Completed
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-lg p-6 shadow-sm`}
              >
                <div className="flex items-center">
                  <Star className="h-10 w-10 text-purple-500" />
                  <div className="ml-4">
                    <h3
                      className={`text-lg font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      15
                    </h3>
                    <p
                      className={`${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      Badges Earned
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-lg p-6 shadow-sm`}
              >
                <div className="flex items-center">
                  <Award className="h-10 w-10 text-blue-500" />
                  <div className="ml-4">
                    <h3
                      className={`text-lg font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      5
                    </h3>
                    <p
                      className={`${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      Certificates
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div
              className={`${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-lg p-6 shadow-sm`}
            >
              <h2
                className={`text-lg font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                } mb-4`}
              >
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start">
                    <div className="flex-shrink-0">
                      {activity.type === 'challenge' && (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      )}
                      {activity.type === 'badge' && (
                        <Award className="h-5 w-5 text-yellow-500" />
                      )}
                      {activity.type === 'course' && (
                        <BookOpen className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p
                        className={`text-sm font-medium ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {activity.title}
                      </p>
                      <p
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3">
            {/* Notifications */}
            <div
              className={`${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } mb-6 rounded-lg p-6 shadow-sm`}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2
                  className={`text-lg font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Notifications
                </h2>
                <span className="cursor-pointer text-sm text-blue-600">
                  Mark all as read
                </span>
              </div>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start">
                    <div className="flex-shrink-0">
                      {notification.type === 'challenge' && (
                        <Code2 className="h-5 w-5 text-blue-500" />
                      )}
                      {notification.type === 'message' && (
                        <MessageSquare className="h-5 w-5 text-green-500" />
                      )}
                      {notification.type === 'achievement' && (
                        <Trophy className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p
                        className={`text-sm font-medium ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {notification.title}
                      </p>
                      <p
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        {notification.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Progress */}
            <div
              className={`${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-lg p-6 shadow-sm`}
            >
              <h2
                className={`text-lg font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                } mb-4`}
              >
                Achievement Progress
              </h2>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id}>
                    <div className="mb-1 flex items-center justify-between">
                      <span
                        className={`text-sm font-medium ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        {achievement.name}
                      </span>
                      <span
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {achievement.progress}/{achievement.total}
                      </span>
                    </div>
                    <div
                      className={`h-2 ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                      } rounded-full`}
                    >
                      <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{
                          width: `${
                            (achievement.progress / achievement.total) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
