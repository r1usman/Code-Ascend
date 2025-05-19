import React from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area,
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-lg">
        <p className="font-medium text-gray-800">{label}</p>
        <p className="text-orange-500 font-semibold">{payload[0].value} hours</p>
      </div>
    );
  }
  return null;
};

export const ProgressChart = ({ 
  data, 
  title = "Progress Chart" 
}) => {
  return (
    <motion.div 
      className="card h-64 p-4 font-poppins"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-[calc(100%-2rem)]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FB923C" stopOpacity={0.3}/> {/* Orange color */}
                <stop offset="95%" stopColor="#FB923C" stopOpacity={0}/> {/* Orange color */}
              </linearGradient>
            </defs>
           <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="#1e1e1e" // rgba for orange with 30% opacity
            />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              dx={-10}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ stroke: '#FB923C', strokeWidth: 1, strokeDasharray: '5 5' }} 
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#FB923C"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
