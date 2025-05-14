import React from 'react'
import StatsGrid from './BentoGrid'
import BentoGrid from './BentoGrid'
import BoxAnimation from './assests/Animation/BoxAnimation'

const Front = () => (
  <div className="bg-dark-bg-primary h-screen flex">

    <div className="w-[30%] bg-dark-bg-secondary2 p-5 space-y-6">
      <h1 className="text-text_primary text-2xl font-bold">Hi Ghulam</h1>

      <div className="Card_Relative group">
        <div className="Card_Absolute  group-hover:scale-105 group-hover:blur-2xl group-hover:opacity-100"/>
        <div>
          <h2 className="text-white text-lg font-semibold">Mobile App Design</h2>
          <p className="text-gray-400 text-sm mt-1">Mike and Anita</p>
        </div>

        <div className="flex items-center">
          <div className="flex -space-x-2">
            <img
              src="/avatars/mike.jpg"
              alt="Mike"
              className="w-6 h-6 rounded-full ring-2 ring-dark-bg-secondary1"
            />
            <img
              src="/avatars/anita.jpg"
              alt="Anita"
              className="w-6 h-6 rounded-full ring-2 ring-dark-bg-secondary1"
            />
          </div>
          <span className="ml-auto text-gray-400 text-xs">Now</span>
        </div>
      </div>
      <BentoGrid/>
    </div>
   

   
  </div>

)

export default Front
