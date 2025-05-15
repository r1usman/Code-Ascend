export const mockGroups = [
    {
        id: 'group1',
        name: 'Frontend Masters',
        description: 'A group for frontend developers focused on UI/UX and modern web frameworks',
        createdAt: new Date('2023-08-15'),
        createdBy: {
            id: 'user1',
            username: 'codemaster',
        },
        members: Array(24).fill(0).map((_, i) => ({
            id: `user${i + 1}`,
            username: `user${i + 1}`,
            avatarUrl: `https://i.pravatar.cc/150?img=${i + 1}`,
            role: i === 0 ? 'admin' : 'member',
        })),
        challenges: Array(5).fill(0).map((_, i) => ({
            id: `challenge${i + 1}`,
            title: `Frontend Challenge ${i + 1}`,
            difficulty: i % 3 === 0 ? 'Easy' : i % 3 === 1 ? 'Medium' : 'Hard',
        })),
    },
    {
        id: 'group2',
        name: 'Algorithm Wizards',
        description: 'Focusing on algorithm challenges and competitive programming techniques',
        createdAt: new Date('2023-09-10'),
        createdBy: {
            id: 'user2',
            username: 'algomaster',
        },
        members: Array(16).fill(0).map((_, i) => ({
            id: `user${i + 2}`,
            username: `user${i + 2}`,
            avatarUrl: `https://i.pravatar.cc/150?img=${i + 2}`,
            role: i === 0 ? 'admin' : 'member',
        })),
        challenges: Array(8).fill(0).map((_, i) => ({
            id: `challenge${i + 6}`,
            title: `Algorithm Challenge ${i + 1}`,
            difficulty: i % 3 === 0 ? 'Easy' : i % 3 === 1 ? 'Medium' : 'Hard',
        })),
    },
    {
        id: 'group3',
        name: 'Backend Developers',
        description: 'Group focused on backend development, databases, and system design',
        createdAt: new Date('2023-10-05'),
        createdBy: {
            id: 'user3',
            username: 'backenddev',
        },
        members: Array(12).fill(0).map((_, i) => ({
            id: `user${i + 3}`,
            username: `user${i + 3}`,
            avatarUrl: `https://i.pravatar.cc/150?img=${i + 3}`,
            role: i === 0 ? 'admin' : 'member',
        })),
        challenges: Array(6).fill(0).map((_, i) => ({
            id: `challenge${i + 14}`,
            title: `Backend Challenge ${i + 1}`,
            difficulty: i % 3 === 0 ? 'Easy' : i % 3 === 1 ? 'Medium' : 'Hard',
        })),
    },
];