import React from 'react'

const RecentActvity = ({user ,activityTypeStyles}) => {
  return (
    <div>
            <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
            <div className="card p-6 space-y-4">
              {user?.recentActivity.map((activity) => {
                const { icon, className } = activityTypeStyles[activity.type] || {};

                return (
                  <div key={activity.id} className="flex items-start">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center border`}>
                      {icon}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-white">{activity.title}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(activity.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
        </div>
  )
}

export default RecentActvity