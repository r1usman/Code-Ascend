import { User } from "lucide-react";
import { useState } from "react";
import VideoFeed from "../common/VideoFeed";
import AttentionMetrics from "../instructor/AttentionMetrics";
import QueryManager from "../instructor/QueryManager";


const InstructorView = ({ layout }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const dummyQueries = [
    {
      id: 1,
      text: "Can you explain the concept of recursion again?",
      time: "10:32 AM",
      answered: false,
      user: "John D.",
    },
    {
      id: 2,
      text: "What's the difference between let and const in JavaScript?",
      time: "10:28 AM",
      answered: true,
      user: "Sarah M.",
    },
    {
      id: 3,
      text: "How do React hooks work?",
      time: "10:25 AM",
      answered: false,
      user: "Miguel S.",
    },
    {
      id: 4,
      text: "Can you show another example of async/await?",
      time: "10:17 AM",
      answered: true,
      user: "Aisha K.",
    },
    {
      id: 5,
      text: "I'm confused about the virtual DOM concept",
      time: "10:12 AM",
      answered: false,
      user: "Raj P.",
    },
  ];

  const clusteredQueries = [
    {
      id: 1,
      topic: "Recursion",
      count: 3,
      representative: "Can you explain the concept of recursion again?",
    },
    {
      id: 2,
      topic: "JavaScript Basics",
      count: 5,
      representative:
        "What's the difference between let and const in JavaScript?",
    },
    {
      id: 3,
      topic: "React Concepts",
      count: 7,
      representative: "How do React hooks work?",
    },
  ];

  const attentionData = [
    { id: 1, name: "John D.", attention: 87 },
    { id: 2, name: "Sarah M.", attention: 92 },
    { id: 3, name: "Miguel S.", attention: 75 },
    { id: 4, name: "Aisha K.", attention: 95 },
    { id: 5, name: "Raj P.", attention: 63 },
    { id: 6, name: "Emily L.", attention: 78 },
    { id: 7, name: "David W.", attention: 82 },
  ];





  // Default layout
  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">
          Teaching: Advanced Web Development
        </h2>
        <div className="text-gray-400 flex items-center gap-2">
          <User size={16} />
          <span>24 students online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
        <div className="lg:col-span-2 space-y-4">
          {/* Live class feed with instructor controls */}
          <VideoFeed 
            type="instructor" 
            isFullscreen={isFullscreen}
            onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
          />

          {/* Student attention */}
          <AttentionMetrics students={attentionData} />
        </div>

        {/* Query management */}
        <div className="space-y-4 h-full">
          <QueryManager queries={dummyQueries} clusters={clusteredQueries} />
        </div>
      </div>
    </div>
  );
};

export default InstructorView;