import React from 'react';
import GroupCard from './GroupCard';

const GroupsList = ({
  groups,
  currentUserId,
  onAddTask,
  onCheckTask
}) => {
  if (groups.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">You haven't joined any groups yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map(group => (
        <GroupCard
          key={group.id}
          group={group}
          currentUserId={currentUserId}
          onAddTask={onAddTask}
          onCheckTask={onCheckTask}
        />
      ))}
    </div>
  );
};

export default GroupsList;
