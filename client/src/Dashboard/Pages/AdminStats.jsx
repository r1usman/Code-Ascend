import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, CheckSquare, Clock, Group } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { RightBarContextApi } from '../ContextApi/DisplayContextApi';



const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-lg">
        <p className="font-medium text-gray-800">{label}</p>
        <p className="text-primary-500 font-semibold">{payload[0].value} {payload[0].name}</p>
      </div>
    );
  }
  return null;
};


export const AdminStats = () => {
  const tasks = [
    { 
      id: '1', 
      title: 'Complete React Assessment', 
      assignee: 'John Doe',
      deadline: '2024-03-20',
      status: 'pending'
    },
    { 
      id: '2', 
      title: 'Review Code Submissions', 
      assignee: 'Jane Smith',
      deadline: '2024-03-18',
      status: 'completed'
    },
    { 
      id: '3', 
      title: 'Update Documentation', 
      assignee: 'Mike Johnson',
      deadline: '2024-03-25',
      status: 'pending'
    },
  ];

  const groups = [
    { id: '1', name: 'Frontend Team', memberCount: 8, activeProjects: 3 },
    { id: '2', name: 'Backend Team', memberCount: 6, activeProjects: 2 },
    { id: '3', name: 'UI/UX Team', memberCount: 4, activeProjects: 1 },
  ];

  const memberActivityData = [
    { name: 'Mon', active: 15, total: 18 },
    { name: 'Tue', active: 12, total: 18 },
    { name: 'Wed', active: 16, total: 18 },
    { name: 'Thu', active: 14, total: 18 },
    { name: 'Fri', active: 17, total: 18 },
    { name: 'Sat', active: 13, total: 18 },
    { name: 'Sun', active: 11, total: 18 },
  ];

  const taskCompletionData = [
    { name: 'Week 1', completed: 8, assigned: 12 },
    { name: 'Week 2', completed: 15, assigned: 18 },
    { name: 'Week 3', completed: 12, assigned: 15 },
    { name: 'Week 4', completed: 20, assigned: 22 },
  ];

  const {DisplayRightBar , setDisplayRightBar} = useContext(RightBarContextApi)

  return (
    <div className="space-y-6 font-poppins ">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
        <motion.div 
          className="Admcard px-4 py-3 bg-[#1d1d45] text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-dark-bg-secondary1 rounded-[8px]">
              <Group className="text-primary-600" size={24} />
            </div>
            <div>
              <p className="text-sm ">Total Groups</p>
              <h3 className="text-2xl font-bold text-primary-600">{groups.length}</h3>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="Admcard px-4 py-3 bg-[#182134] text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-dark-bg-secondary1 rounded-[8px]">
              <Users className="text-secondary-600" size={24} />
            </div>
            <div>
              <p className="text-sm ">Total Members</p>
              <h3 className="text-2xl font-bold text-secondary-600">
                {groups.reduce((acc, group) => acc + group.memberCount, 0)}
              </h3>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="Admcard px-4 py-3 bg-[#222225] text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-dark-bg-secondary1 rounded-[8px]">              
            <CheckSquare className="text-accent-600" size={24} />
            </div>
            <div>
              <p className="text-sm ">Active Projects</p>
              <h3 className="text-2xl font-bold text-accent-600">
                {groups.reduce((acc, group) => acc + group.activeProjects, 0)}
              </h3>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="Admcard px-4 py-3 bg-[#20402c] text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-dark-bg-secondary1 rounded-[8px]">
                <Clock className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm ">Pending Tasks</p>
              <h3 className="text-2xl font-bold  ">
                {tasks.filter(task => task.status === 'pending').length}
              </h3>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          className="card h-80 p-4 font-poppins"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-4">Member Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={memberActivityData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="active"
                  name="Active Members"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorActive)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          className="card h-80 p-4 font-poppins"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold mb-4">Task Completion Rate</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={taskCompletionData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="completed"
                  name="Completed"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  dot={{ fill: '#4F46E5', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#4F46E5' }}
                />
                <Line
                  type="monotone"
                  dataKey="assigned"
                  name="Assigned"
                  stroke="#0BA5EC"
                  strokeWidth={2}
                  dot={{ fill: '#0BA5EC', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#0BA5EC' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          className="card font-poppins px-4 py-3 "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-4">Managed Groups</h3>
          <div className="space-y-3">
            {groups.map((group) => (
              <div 
                key={group.id}
                className="flex items-center justify-between p-3 bg-dark-bg-secondary2 rounded-[8px] hover:bg-dark-bg-secondary4 text-white transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10  rounded-[8px] bg-dark-bg-secondary3 flex items-center justify-center">
                    <Group className="text-text_primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium ">{group.name}</h4>
                    <p className="text-sm text-gray-300">{group.memberCount} members</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-primary-600">
                  {group.activeProjects} projects
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="card font-poppins px-4 py-3 "
          
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold mb-4">Assigned Tasks</h3>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div 
                key={task.id}
                className="flex items-center justify-between p-3 bg-dark-bg-secondary2 rounded-[8px] hover:bg-dark-bg-secondary4 text-white transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${task.status === 'completed' ? 'bg-green-100' : 'bg-amber-100'} rounded-lg flex items-center justify-center`}>
                    <CheckSquare className={task.status === 'completed' ? 'text-green-600' : 'text-amber-600'} size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{task.title}</h4>
                    <p className="text-sm text-gray-500">Assigned to: {task.assignee}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${task.status === 'completed' ? 'text-green-600' : 'text-amber-600'}`}>
                    {task.status}
                  </span>
                  <p className="text-xs text-gray-500">Due: {task.deadline}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
