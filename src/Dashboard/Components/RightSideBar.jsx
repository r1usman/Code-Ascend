// Sidebar.jsx
import React from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import {
  RadialBarChart,
  RadialBar,
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
} from 'recharts'

import Def from "../../assests/Default.jpg"
import AvatarSVG from './AvatarSVG'

const radialData = [{ name: 'Progress', value: 32 }]
const barData = [
  { period: '1–10 Aug', value: 20 },
  { period: '11–20 Aug', value: 40 },
  { period: '21–30 Aug', value: 60 },
]

const mentors = [
  {
    name: 'Padhang Satrio',
    role: 'Mentor',
    avatar: '/avatars/padhang.png',
  },
  {
    name: 'Zakir Horizontal',
    role: 'Mentor',
    avatar: '/avatars/zakir.png',
  },
  {
    name: 'Leonardo Samsul',
    role: 'Mentor',
    avatar: '/avatars/leonardo.png',
  },
]

export default function RightSideBar({changeShow}) {
  return (
    <aside className="w-full h-full mt-10 bg-white rounded-2xl pt-16 shadow-md flex flex-col ">
      {/* Header */}
      <div className="flex flex-col  items-center justify-between">
        <h2 className="text-lg font-semibold">Statistic</h2>
        {/* <div  className='rounded-full p-2 ring-2 ring-red-500' >
            <img src={Def} className='size-28 rounded-full object-cover' alt="" />
        </div> */}
        <AvatarSVG changeShow={changeShow}/>
        
      </div>

      {/* Progress Circle + Greeting */}
      <div className="flex flex-col items-center mb-6">
       
        <p className="mt-4 text-center font-medium">
          Good Morning Jason <span role="img">🔥</span>
        </p>
        <p className="text-sm text-gray-500 text-center">
          Continue your learning to achieve your target!
        </p>
      </div>

      {/* Bar Chart */}
      <div className="mb-6 flex items-center justify-center">
        <ResponsiveContainer width="80%" height={100}>
          <BarChart data={barData}>
            <XAxis dataKey="period" tick={{ fontSize: 12 }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#7F56D9" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Mentor List */}
      {/* <div className="flex-1 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">Your mentor</h3>
          <button className="text-2xl leading-none text-gray-400 hover:text-gray-600">
            +
          </button>
        </div>
        <ul className="space-y-3">
          {mentors.map((m) => (
            <li
              key={m.name}
              className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
            >
              <div className="flex items-center">
                <img
                  src={m.avatar}
                  alt={m.name}
                  className="w-8 h-8 rounded-full mr-3"
                />
                <div>
                  <p className="text-sm font-medium">{m.name}</p>
                  <p className="text-xs text-gray-500">{m.role}</p>
                </div>
              </div>
              <button className="text-xs font-semibold text-indigo-600 px-3 py-1 rounded-full hover:bg-indigo-50">
                Follow
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* See All */}
      {/* <button className="w-full py-2 text-sm font-medium text-indigo-600 rounded-lg hover:bg-indigo-50">
        See All
      </button>  */}
    </aside>
  )
}
