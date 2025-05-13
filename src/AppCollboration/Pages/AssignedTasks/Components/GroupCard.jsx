import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';
import Button from '../UI/Button';
import Badge from '../UI/Badge';
import { formatDate } from '../Utils/formatDate';

const GroupCard = ({ group, currentUserId }) => {
  const navigate = useNavigate();
  const userMember = group.members.find(member => member.userId === currentUserId);
  const userRole = userMember?.role || 'member';
  const isAdmin = userRole === 'admin';
  console.log("User role", userRole);
  
  
  const getCategoryColor = (category) => {
    const categories = {
      'Development': 'indigo',
      'AI': 'sky',
      'Design': 'rose',
      'Marketing': 'amber',
      'Management': 'emerald'
    };
    
    return categories[category] || 'indigo';
  };

  const handleViewTasks = (isAdmin) => {
  console.log(isAdmin);
  
  navigate('/appcollaboration/tasks', { state: { UserRole: userRole } });
};


  return (
    <div 
      className={`bg-[#121212] text-white rounded-lg shadow-md overflow-hidden border-l-4 
        ${isAdmin ? 'border-text_primary' : 'border-white'} 
        transition-all duration-300 hover:shadow-lg`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3 ">
          <h3 className="text-xl font-semibold  mb-1 min-h-16">{group.name}</h3>
          <Badge color={getCategoryColor(group.category)}>{group.category}</Badge>
        </div>
        
        <p className="mb-4 text-slate-200">{group.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Created: {formatDate(group.createdAt)}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-6  min-h-8">
          <Users className="h-4 w-4 mr-1" />
          <span>{group.members.length} member{group.members.length !== 1 ? 's' : ''}</span>
          {isAdmin && (
            <span className="inline-block ml-3 text-xs px-2 py-1 rounded-full bg-[#121212] border border-border_Col text-red-500 font-medium">
              Admin
            </span>
          )}
        </div>
        
        <div>
          <Button 
            variant={isAdmin ? "primary" : "secondary"}
            onClick={()=>handleViewTasks(isAdmin)}
            className="w-full"
          >
            {isAdmin ? 'Add Task' : 'View Tasks'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
