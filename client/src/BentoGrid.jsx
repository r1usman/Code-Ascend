import React from 'react'

const stats = [
  { value: 22, label: 'Done' },
  { value: 7,  label: 'In Progress' },
  { value: 10, label: 'Ongoing' },
  { value: 12, label: 'Waiting for Review' },
]

export default function BentoGrid() {
  return (
    <div className="p-6">
      <h2 className="text-white text-xl font-semibold mb-4">Monthly Review</h2>

      <div className="grid grid-cols-2 auto-rows-fr gap-6">
        {stats.map(({ value, label }) => (
          <div
            key={label}
            className="
              relative
              bg-dark-bg-secondary1
              rounded-xl
              p-6
              flex flex-col justify-center items-center
              overflow-hidden
              group
              transition-transform transition-shadow duration-300 ease-out
              hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50
              cursor-pointer
            "
          >
            {/* glowing accent */}
            <div
              className="
                absolute top-0 right-0
                w-24 h-24
                rounded-full
                bg-gradient-to-br from-orange-600 to-transparent
                opacity-50 blur-2xl
                transition-opacity duration-300 ease-out
                group-hover:opacity-75
              "
            />

            <span className="text-3xl font-bold text-white">{value}</span>
            <p className="mt-1 text-gray-400 text-sm whitespace-nowrap">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
