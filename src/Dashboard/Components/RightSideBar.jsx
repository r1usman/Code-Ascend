import React from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { RadialBarChart, RadialBar, BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';
import Def from "../../assests/Default.jpg";
import AvatarSVG from './AvatarSVG';
import {motion} from "framer-motion"

import { FaCode } from 'react-icons/fa'; 
import { LineChart } from 'recharts';  


const radialData = [{ name: 'Progress', value: 32 }];
const barData = [
  { period: '1–10 Aug', value: 20 },
  { period: '11–20 Aug', value: 40 },
  { period: '21–30 Aug', value: 60 },
];

const progressBarTransition = (delay) => ({
  initial: { width: 0 },
  animate: { width: '100%' },
  transition: { duration: 1, ease: "easeOut", delay },
});

const ProgressBar = ({ label, progress, color, delay }) => (
  <div>
    <div className="flex  justify-between text-sm mb-1">
      <span className="font-medium">{label}</span>
      <span className=''>{progress}%</span>
    </div>
    <div className="h-2 bg-dark-bg-secondary3 rounded-full border overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={progressBarTransition(delay)}
      />
    </div>
  </div>
);

const UpcomingEvent = ({ icon, title, time, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay }}
    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
  >
    <div className={`flex items-center justify-center w-8 h-8 ${icon.bg} ${icon.text} rounded-full`} aria-label={title}>
      {icon.component}
    </div>
    <div>
      <h4 className="font-medium text-gray-800">{title}</h4>
      <span className="text-xs text-gray-500">{time}</span>
    </div>
  </motion.div>
);

export default function RightSideBar({ changeShow }) {
  return (
    <aside className="w-full h-full space-y-5 text-white font-poppins mt-7 bg-dark-bg-secondary4 rounded-2xl pt-16 shadow-md flex flex-col">
      <div className='space-y-3'>
        {/* Header */}
        <div className=" flex flex-col items-center gap-4 justify-between">
          <h2 className="text-lg font-semibold">Statistic</h2>
          <AvatarSVG changeShow={changeShow} />
        </div>

        {/* Progress Circle + Greeting */}
        <div className="flex flex-col items-center">
          <p className="mt-4 text-center font-medium">
            Good Morning Jason <span role="img">🔥</span>
          </p>
          <p className="text-sm text-gray-400 text-center">
            Continue your learning to achieve your target!
          </p>
        </div>
      </div>
      
      {/* Weekly Goal */}
      <motion.div
        className="card px-3 py-5 mx-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Weekly Goal</h3>
          <span className="text-accent-500 text-sm font-medium text-text_primary">3/5 days</span>
        </div>

       <div className="space-y-3 ">
        <ProgressBar label="Study Streak" progress={60} color="bg-[#f59e0b] opacity-55" delay={0.7} />
        <ProgressBar label="Challenges" progress={75} color="bg-[#06b6d4] opacity-55" delay={0.8} />
        <ProgressBar label="Collaborations" progress={40} color="bg-[#9333ea] opacity-55" delay={0.9} />
      </div>


      </motion.div>

  
    </aside>
  );
}
