import {
  AcademicCapIcon,
  ChartBarIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const achievements = [
  {
    id: '1',
    title: 'Algorithm Master',
    description: 'Complete advanced algorithm challenges',
    progress: 80,
    total: 100,
    category: 'skill',
  },
  {
    id: '2',
    title: 'Speed Demon',
    description: 'Solve problems under optimal time',
    progress: 45,
    total: 50,
    category: 'performance',
  },
  {
    id: '3',
    title: 'Code Reviewer',
    description: 'Review and improve code quality',
    progress: 28,
    total: 30,
    category: 'completion',
  },
];

const certificates = [
  {
    id: '1',
    name: 'Advanced Algorithms',
    issueDate: '2024-01-15',
    skills: ['Dynamic Programming', 'Graph Algorithms', 'Sorting'],
  },
  {
    id: '2',
    name: 'Data Structures Expert',
    issueDate: '2024-02-01',
    skills: ['Trees', 'Heaps', 'Hash Tables'],
  },
];

const performanceMetrics = [
  { label: 'Average Runtime', value: '0.45s', change: '-12%', improved: true },
  { label: 'Memory Usage', value: '24MB', change: '-8%', improved: true },
  { label: 'Code Quality Score', value: '94', change: '+5%', improved: true },
];

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Achievements & Progress
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`${
                activeTab === 'certificates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium`}
            >
              Certificates
            </button>
          </nav>
        </div>

        {activeTab === 'overview' ? (
          <div className="space-y-8">
            {/* Performance Metrics */}
            <div className="rounded-lg bg-white shadow">
              <div className="border-b border-gray-200 px-6 py-5">
                <h2 className="text-lg font-medium text-gray-900">
                  Performance Metrics
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-3">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <ChartBarIcon className="h-8 w-8 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {metric.label}
                      </p>
                      <div className="flex items-baseline">
                        <p className="text-2xl font-semibold text-gray-900">
                          {metric.value}
                        </p>
                        <span
                          className={`ml-2 text-sm ${
                            metric.improved ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {metric.change}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Progress */}
            <div className="rounded-lg bg-white shadow">
              <div className="border-b border-gray-200 px-6 py-5">
                <h2 className="text-lg font-medium text-gray-900">
                  Achievement Progress
                </h2>
              </div>
              <div className="space-y-6 p-6">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <TrophyIcon className="h-5 w-5 text-yellow-500" />
                        <span className="font-medium text-gray-900">
                          {achievement.title}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {achievement.progress}/{achievement.total}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{
                          width: `${
                            (achievement.progress / achievement.total) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-white shadow">
            <div className="border-b border-gray-200 px-6 py-5">
              <h2 className="text-lg font-medium text-gray-900">
                Earned Certificates
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
              {certificates.map((certificate) => (
                <div
                  key={certificate.id}
                  className="space-y-4 rounded-lg border p-6"
                >
                  <div className="flex items-center space-x-3">
                    <AcademicCapIcon className="h-8 w-8 text-blue-500" />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {certificate.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Issued on{' '}
                        {new Date(certificate.issueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {certificate.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
