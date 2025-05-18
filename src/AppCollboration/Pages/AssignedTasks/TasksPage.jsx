import React, { useState } from 'react';
import TaskList from './Components/TaskList';
import Button from './UI/Button';
import { Download } from 'lucide-react';
import Breadcrumb from './Components/Breadcrumb';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import {initialTasks} from "./Utils/index"



const TasksPage = () => {
  const [filter, setFilter] = useState('All');

   const location = useLocation();
   const navigate = useNavigate()
  
    
    const data = location.state?.UserRole || "Default Role";
  
  
  const filteredTasks = filter === 'All' 
    ? initialTasks 
    : initialTasks.filter(task => task.status === filter);

  const taskCounts = {
    All: initialTasks.length,
    Pending: initialTasks.filter(t => t.status === 'Pending').length,
    'In Progress': initialTasks.filter(t => t.status === 'In Progress').length,
    Completed: initialTasks.filter(t => t.status === 'Completed').length
  };

  const filterOptions = ['All', 'Pending', 'In Progress', 'Completed'];

  return (
    <div className="p-6 font-poppins min-h-screen">
      <Breadcrumb/>
      <main className="">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold ">My Tasks</h2>
          </div>
          {
            data=="admin" && (
              <button className='flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'>
                  <Download className="w-4 h-4" />
                Download Report
              </button>
            )
          }
        </div>

        <div className='flex items-center justify-between mb-6'>
          <div className="flex  items-center gap-4 ">
          {filterOptions.map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${filter === status 
                  ? 'bg-white text-btn-txt' 
                  : 'text-white bg-btn-bg'}`}
            >
              {status} {taskCounts[status] > 0 && <span className="ml-1 text-xs">{taskCounts[status]}</span>}
            </button>
          ))}
          </div>
          
            {data === "admin" && (
              <div
                onClick={() => navigate("/appcollaboration/AdminTask")}
                className="px-5 py-2 space-x-2 cursor-pointer rounded-md bg-text_primary"
              >
                <span>+</span>
                <span>Add Tasks</span>
              </div>
          )}
              
        </div>

        <TaskList tasks={filteredTasks} />
      </main>
    </div>
  );
};

export default TasksPage;
