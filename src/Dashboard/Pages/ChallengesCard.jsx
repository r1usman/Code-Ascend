import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Code } from 'lucide-react';

export const ChallengesCard = ({ challenges }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-[#10B981]';
      case 'medium': return 'text-[#F59E0B]';
      case 'hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <Check size={16} className="text-[#D1FAE5]" />;
      case 'in-progress': return <Clock size={16} className="text-[#FEE2B6]" />;
      case 'not-started': return <Code size={16} className="text-gray-400" />;
      default: return null;
    }
  };

  
  return (
    <motion.div 
      className="card font-poppins px-4 py-3    "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Challenges</h3>
        <button className="text-primary-500 text-sm font-medium hover:text-primary-600 transition-colors">
          View All
        </button>
      </div>
      
      <div className="space-y-3">
        {challenges.map((challenge, index) => (
          <motion.div 
            key={challenge.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="flex items-center justify-between p-3 bg-dark-bg-secondary2 rounded-[8px] hover:bg-dark-bg-secondary4 text-white transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-dark-bg-secondary4 rounded-full shadow-sm">
                {getStatusIcon(challenge.status)}
              </div>
              <div>
                <h4 className="font-medium ">{challenge.title}</h4>
                <span className={`text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                </span>
              </div>
            </div>
            
            {challenge.dueDate && (
              <span className="text-xs text-gray-500">Due: {challenge.dueDate}</span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
