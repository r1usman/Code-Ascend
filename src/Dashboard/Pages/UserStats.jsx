import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Code, 
  Award,
  LineChart,
  LayoutDashboard
} from 'lucide-react';

import { ProgressChart } from './ProgressChart';
import { StatsCard } from './StatsCard';
import { ChallengesCard } from './ChallengesCard';
import { AdminStats } from './AdminStats';
import {RightBarContextApi} from "../ContextApi/DisplayContextApi"
import { use } from 'react';

export const UserStats = () => {
  const [isAdmin, setIsAdmin ,] = useState(false);
  const {setDisplayRightBar,DisplayRightBar} = useContext(RightBarContextApi)
  
  const userData = {
    name: 'Jason',
    progress: 50,
    avatarUrl: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  };
  
  const chartData = [
    { name: '1-10 Aug', value: 15, fill: '#4F46E5' },
    { name: '11-20 Aug', value: 28, fill: '#4F46E5' },
    { name: '21-30 Aug', value: 42, fill: '#4F46E5' },
  ];
  
  const challenges = [
    { 
      id: '1', 
      title: 'Binary Search Implementation', 
      difficulty: 'medium', 
      status: 'completed', 
      dueDate: 'Aug 15' 
    },
    { 
      id: '2', 
      title: 'React State Management', 
      difficulty: 'hard', 
      status: 'in-progress', 
      dueDate: 'Aug 22' 
    },
    { 
      id: '3', 
      title: 'Basic CSS Layout', 
      difficulty: 'easy', 
      status: 'not-started', 
      dueDate: 'Aug 30' 
    },
  ];
  const shiftToAdmin = (isAdmin)=>{
    console.log("Here");
    
    setIsAdmin(!isAdmin)
    setDisplayRightBar(isAdmin)
  }

  console.log("Here", isAdmin);
  console.log("DisplayRightBar" , DisplayRightBar);


  useEffect(()=>{
    if(isAdmin == false && DisplayRightBar == false )
    {
      setDisplayRightBar(true)
    }
  })
  
  
  

    
  return (
    <div className="space-y-6 text-white">
      <motion.div 
        className={`border-b border-gray-200 pb-4 flex justify-between items-center   ${isAdmin ?"w-full":"w-[70%]"}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold ">Dashboard</h1>
        <button
          onClick={() => shiftToAdmin(isAdmin)}
          className="Btn1 flex items-center   gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
        >
          <LayoutDashboard size={18} />
          <span>{isAdmin ? 'User View' : 'Admin View'}</span>
        </button>
      </motion.div>
      
      {isAdmin ? (
        <AdminStats />
      ) : (
        <div className="mx-2 ml-3 grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          <div className="lg:col-span-2 space-y-6">
            <div className={`grid grid-cols-1 md:grid-cols-3  gap-4`}>
                {[
                    { icon: <Clock size={20} />, title: 'Hours Studied', value: 42, change: 12, suffix: 'h', delay: 0, color: 'primary' },
                    { icon: <Code size={20} />, title: 'Challenges Completed', value: 24, change: 8, delay: 1, color: 'secondary' },
                    { icon: <Award size={20} />, title: 'Current Rank', value: 128, change: -3, delay: 2, color: 'accent' },
                ].map((card, index) => (
                    <div key={index} className=" min-h-20">
                    <StatsCard
                        icon={card.icon}
                        title={card.title}
                        value={card.value}
                        change={card.change}
                        suffix={card.suffix}
                        delay={card.delay}
                        color={card.color}
                    />
                    </div>
                ))}
                </div>

                            
            <ProgressChart 
              data={chartData} 
              title="Study Hours (August)" 
            />
            
            <ChallengesCard challenges={challenges} />
          </div>
          
          
        </div>
      )}
    </div>
  );
};
