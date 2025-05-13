export const initialTasks = [
  {
    id: '1',
    title: 'Design Homepage',
    description: 'Create a clean and modern homepage layout using Tailwind CSS. Ensure the design is responsive and optimized.',
    priority: 'High Priority',
    status: 'In Progress',
    progress: { done: 2, total: 5 },
    startDate: '2025-03-16',
    dueDate: '2025-03-31',
    assignees: [
      { id: '1', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: '2', avatar: 'https://i.pravatar.cc/150?img=2' },
      { id: '3', avatar: 'https://i.pravatar.cc/150?img=3' }
    ],
    attachments: 2
  },
  {
    id: '2',
    title: 'Write Blog Post',
    description: 'Write an informative blog post about React performance optimization. Cover techniques like memoization, lazy loading, and code splitting.',
    priority: 'Medium Priority',
    status: 'In Progress',
    progress: { done: 2, total: 5 },
    startDate: '2025-03-16',
    dueDate: '2025-03-27',
    assignees: [
      { id: '4', avatar: 'https://i.pravatar.cc/150?img=4' },
      { id: '5', avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: '6', avatar: 'https://i.pravatar.cc/150?img=6' }
    ]
  },
  {
    id: '3',
    title: 'API Integration',
    description: 'Implement API integration for the user dashboard. Ensure data fetching is efficient and includes proper error handling.',
    priority: 'High Priority',
    status: 'Pending',
    progress: { done: 0, total: 5 },
    startDate: '2025-03-16',
    dueDate: '2025-04-05',
    assignees: [
      { id: '7', avatar: 'https://i.pravatar.cc/150?img=7' },
      { id: '8', avatar: 'https://i.pravatar.cc/150?img=8' },
      { id: '9', avatar: 'https://i.pravatar.cc/150?img=9' }
    ]
  }
];