// sidebarItems.js
import {
    LayoutDashboard,
    Users,
    UserPlus,
    ListChecks,
    Code2,
    LogOut,
    Home,
} from 'lucide-react';

export const sidebarItems = [
    {
        name: 'Home',
        path: '/dashboard',
        icon: Home,
    },
    {
        name: 'All Groups',
        path: '/appcollaboration/all-groups',
        icon: LayoutDashboard,
    },
    {
        name: 'My Groups',
        path: '/appcollaboration/my-groups',
        icon: Users,
    },
    {
        name: 'Join Requests',
        path: '/appcollaboration/group-requests',
        icon: UserPlus,
    },
    {
        name: 'Assigned Tasks',
        path: '/appcollaboration/assigned-tasks',
        icon: ListChecks,
    },
    {
        name: 'Live Code Space',
        path: '/appcollaboration/code/live',
        icon: Code2,
    },

];



export const allGroupsScreen = {
    title: "All Groups",
    description: "Browse and explore all available groups in the system.",
    filters: [
        {
            name: "Category",
            type: "dropdown",
            options: ["Development", "Design", "Marketing", "AI", "Other"],
        },
        {
            name: "Sort By",
            type: "dropdown",
            options: ["Most Active", "Newest", "Alphabetical"],
        },
        {
            name: "Search",
            type: "text",
            placeholder: "Search groups...",
        },
    ],
    groups: [
        {
            id: "group_001",
            name: "Frontend Developers",
            description: "A group for HTML, CSS, and React developers.",
            membersCount: 35,
            createdAt: "2024-08-10",
            isJoined: false,
        },
        {
            id: "group_002",
            name: "AI Researchers",
            description: "Discuss machine learning, AI ethics, and more.",
            membersCount: 20,
            createdAt: "2024-09-01",
            isJoined: true,
        },
        // ... more groups
    ],
    actions: {
        joinGroup: (groupId) => {
            console.log(`Requested to join group: ${groupId}`);
        },
        viewGroupDetails: (groupId) => {
            console.log(`Navigate to group detail view: ${groupId}`);
        },
    },
};


export const initialGroups = [
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
    }
];
