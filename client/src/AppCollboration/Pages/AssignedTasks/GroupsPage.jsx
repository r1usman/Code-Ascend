import React from 'react';
import GroupsList from './Components/GroupsList';


// Dummy data (Initial groups list)
const initialGroups = [
  {
    id: "group_001",
    name: "Frontend Developers",
    description: "A group for HTML, CSS, and React developers.",
    category: "Development",
    members: [
      { userId: "67e8e6ad324c37d4ca5ecdf8", role: "admin" }, // ali
      { userId: "someOtherId", role: "member" }
    ],
    createdAt: "2024-08-10",
  },
  {
    id: "group_002",
    name: "AI Researchers",
    description: "Discuss machine learning, AI ethics, and more.",
    category: "AI",
    members: [
      { userId: "67e8e6ad324c37d4ca5ecdf8", role: "member" } // ali
    ],
    createdAt: "2024-09-01"
  },
  {
    id: "group_003",
    name: "UX Design Team",
    description: "Collaborate on user experience design projects.",
    category: "Design",
    members: [
      { userId: "67e8e6ad324c37d4ca5ecdf8", role: "admin" } // ali
    ],
    createdAt: "2024-09-15"
  }
];

const GroupsPage = () => {
  // Assume the current user ID is `67e8e6ad324c37d4ca5ecdf8`
  const currentUserId = "67e8e6ad324c37d4ca5ecdf8";

  // Filter the groups the current user has joined
  const userJoinedGroups = initialGroups.filter(group =>
    group.members.some(member => member.userId === currentUserId)
  );

  // Functions for button actions
  const handleAddTask = (groupId) => {
    console.log(`Add Task clicked for group: ${groupId}`);
    // Here you would typically open a modal or navigate to a task creation page
  };

  const handleCheckTask = (groupId) => {
    console.log(`Check Task clicked for group: ${groupId}`);
    // Here you would typically navigate to a task list page for the group
  };

  return (
    <div className="p-6 font-poppins min-h-screen">
      <main className="">
        <div className="mb-8 space-y-3">
          <h2 className="text-2xl font-bold ">My Groups</h2>
          <p className="">
            Manage tasks for groups you've joined
          </p>
        </div>
        
        <GroupsList
          groups={userJoinedGroups}
          currentUserId={currentUserId}
          onAddTask={handleAddTask}
          onCheckTask={handleCheckTask}
        />
      </main>
    </div>
  );
};

export default GroupsPage;
