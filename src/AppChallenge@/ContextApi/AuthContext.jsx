import { createContext, useState } from 'react'


const DEMO_USER = {
  id: 'user1',
  username: 'codemaster',
  email: 'demo@example.com',
  name: 'Usman Akram',
  bio: 'Full-stack developer with a passion for algorithms and problem-solving',
  avatarUrl: 'https://i.pravatar.cc/150?img=33',
  joinDate: new Date('2023-01-15'),
  stats: {
    challengesCompleted: 48,
    rank: 156,
    rating: 1850,
    victoriesCount: 32,
    defeatCount: 16,
  },
  badges: [
    { id: 'badge1', name: 'Algorithm Master', icon: '🧠' },
    { id: 'badge2', name: 'JavaScript Guru', icon: '🌟' },
    { id: 'badge3', name: 'Fast Solver', icon: '⚡' },
  ],
  recentActivity: [
    { id: 'act1', type: 'challenge_completed', title: 'Binary Tree Traversal', date: new Date('2023-10-15') },
    { id: 'act2', type: 'victory', title: 'Beat JohnDev in 1v1', date: new Date('2023-10-10') },
    { id: 'act3', type: 'joined_group', title: 'Frontend Masters', date: new Date('2023-10-05') },
  ]
}

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(DEMO_USER) 
  const [isAuthenticated, setIsAuthenticated] = useState(true) 


  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
