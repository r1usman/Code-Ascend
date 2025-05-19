import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const StatsCard = ({ 
  icon, 
  title, 
  value,
  change,
  suffix = '',
  delay = 0,
  color
  
}) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 1500; 
    const steps = 20;
    const stepValue = value / steps;
    const stepTime = duration / steps;
    
    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        clearInterval(timer);
        setCount(value);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [value]);
  
  const getColorClass = (color) => {
  switch (color) {
    case 'primary': 
      return 'text-[#4F46E5] bg-[#1a1a3a]'; 
    case 'secondary': 
      return 'text-[#0b8ecd] bg-[#0f172a]'; 
    case 'accent': 
      return 'text-[#D4AF37] bg-[#18181b]'; 
    case 'success': 
      return 'text-[#10B981] bg-[#D1FAE5]';
    case 'warning': 
      return 'text-[#F59E0B] bg-[#FEE2B6]'; 
    default: 
      return 'text-[#4F46E5] bg-[#E0E7FF]';
  }
};

  return (
    <motion.div 
      className="px-4 py-3
       h-full  card card-hover transform hover:-translate-y-1 transition-transform font-poppins"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 + delay / 10 }}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-[8px] ${getColorClass(color)}`}>
          {icon}
        </div>
        
        <div>
          <h3 className="text-gray-500 text-sm font-medium line-clamp-1">{title}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">
              {count}{suffix}
            </span>
            <span className={`text-xs font-medium ${change >= 0 ? 'text-[#10B981]' : 'text-red-500'}`}>
              {change >= 0 ? `+${change}%` : `${change}%`}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
