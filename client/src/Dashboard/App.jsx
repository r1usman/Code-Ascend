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

import {notifications,achievements,recentActivities} from "./DashboardAssests/index.js"

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from "./Components/Navigation.jsx"
import Sidebar from "./Components/Sidebar.jsx"

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  

  return (
    <div
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      {/* Navigation Header */}
      <Navigation isDarkMode={isDarkMode}/>
    

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-6">
          
          <Sidebar/>

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
