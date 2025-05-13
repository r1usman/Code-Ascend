import React from 'react';
import { FileText } from 'lucide-react';
import Badge from '../UI/Badge';
import { useLocation } from 'react-router-dom';

const TaskList = ({ tasks }) => {
    console.log(tasks);
     const location = useLocation();

  
  const data = location.state?.UserRole || "Default Role";
  
  console.log("Role",data);  

    
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High Priority':
        return 'rose';
      case 'Medium Priority':
        return 'amber';
      case 'Low Priority':
        return 'emerald';
      default:
        return 'indigo';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-purple-100 text-purple-800';
      case 'In Progress':
        return 'bg-sky-100 text-sky-800';
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };



      
  return (
    <div className="grid grid-cols-2 gap-6 ">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-dark-bg-secondary3 border border-border_Col rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
                <Badge color={getPriorityColor(task.priority)}>{task.priority}</Badge>
              </div>
              <h3 className="text-lg font-medium ">{task.title}</h3>
              <p className="text-gray-300 mt-2">{task.description}</p>
            </div>
          </div>

          <div className="mb-4 mt-2">
            <div className="h-2 bg-border_Col rounded-full overflow-hidden">
              <div
                className="h-full bg-text_primary rounded-full"
                style={{ width: `${(task.progress.done / task.progress.total) * 100}%` }}
              />
            </div>
            <div className="mt-1 text-sm text-gray-600">
              Task Done: {task.progress.done} / {task.progress.total}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="space-y-1 text-gray-300">
              <div>
                <span className="font-medium">Start Date:</span> {new Date(task.startDate).toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">Due Date:</span> {new Date(task.dueDate).toLocaleDateString()}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {task.assignees.map((assignee, index) => (
                  <img
                    key={assignee.id}
                    src={assignee.avatar}
                    alt={`Assignee ${index + 1}`}
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              {task.attachments && (
                <div className="flex items-center gap-1 text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>{task.attachments}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
