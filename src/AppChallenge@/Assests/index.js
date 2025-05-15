export const globalLeaderboard = Array(100).fill(0).map((_, i) => ({
    id: `user${i + 1}`,
    username: i === 0 ? 'AlgoMaster' : i === 1 ? 'CodeNinja' : i === 2 ? 'ByteWizard' : `user${i + 1}`,
    avatarUrl: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
    rank: i + 1,
    previousRank: i + 1 + (Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0) * (Math.random() > 0.5 ? 1 : -1),
    rating: 3000 - (i * 15) + Math.floor(Math.random() * 10),
    challengesSolved: 150 - i + Math.floor(Math.random() * 10),
    winRate: Math.floor(80 - (i * 0.5) + Math.random() * 5)
}))