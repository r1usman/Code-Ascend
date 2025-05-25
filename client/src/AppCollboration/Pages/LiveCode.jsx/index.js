export const participants = [
    {
        id: "1",
        name: "Sarah Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        status: "active",
    },
    {
        id: "2",
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        status: "active",
    },
    {
        id: "3",
        name: "Alex Kim",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        status: "idle",
    },
];

export const initialCode = `function solve(nums: number[]): number {
  // Problem: Find the maximum subarray sum
  let maxSum = nums[0];
  let currentSum = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}`;

export const chats =
    [
        {
            id: "1",
            user: "Sarah Chen",
            text: "We should add a check for empty array here",
            timestamp: "2 min ago",
            lineNumber: 2,
        },
        {
            id: "2",
            user: "John Doe",
            text: "Good catch! Also consider handling negative numbers",
            timestamp: "1 min ago",
            lineNumber: 2,
        },
    ]