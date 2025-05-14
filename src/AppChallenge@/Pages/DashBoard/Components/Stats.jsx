import React from 'react'

const Stats = ({statsData}) => {
  return (
    <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className=" p-6 rounded-md bg-dark-bg-secondary3 hover:translate-y-[-5px] transition-transform duration-200 ease-in-out"
          >
            <div className="flex items-center">
              <div className={`${stat.bgColor}  p-3 rounded-lg`}>
                {stat.icon}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-white">{stat.value}</h3>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
  )
}

export default Stats