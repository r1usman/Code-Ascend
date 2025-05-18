import { Book, Clock, MessageSquare } from "lucide-react";
import React, { useState } from "react";
import Card from "../common/Card";
import VideoFeed from "../common/VideoFeed";
import QuestionForm from "../student/QuestionForm";
import QuestionsList from "../student/QuestionsList";
import ResourcesList from "../student/ResourcesList";


const StudentView = ({ layout }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const dummyQueries = [
    {
      id: 1,
      text: "Can you explain the concept of recursion again?",
      time: "10:32 AM",
      answered: false,
    },
    {
      id: 2,
      text: "What's the difference between let and const in JavaScript?",
      time: "10:28 AM",
      answered: true,
    },
    {
      id: 3,
      text: "How do React hooks work?",
      time: "10:25 AM",
      answered: false,
    },
    {
      id: 4,
      text: "Can you show another example of async/await?",
      time: "10:17 AM",
      answered: true,
    },
    {
      id: 5,
      text: "I'm confused about the virtual DOM concept",
      time: "10:12 AM",
      answered: false,
    },
  ];

  const recommendedResources = [
    {
      id: 1,
      title: "Introduction to JavaScript ES6",
      type: "Article",
      link: "#",
    },
    { 
      id: 2, 
      title: "React Hooks Deep Dive", 
      type: "Video", 
      link: "#" 
    },
    {
      id: 3,
      title: "Understanding the Virtual DOM",
      type: "Documentation",
      link: "#",
    },
  ];

  const handleQuestionSubmit = (question) => {
    console.log("Question submitted:", question);
    // Here you would normally send the question to the server
  };





  // Default layout
  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">
          Live Class: Advanced Web Development
        </h2>
        <div className="text-gray-400 flex items-center gap-2">
          <Clock size={16} />
          <span>Session started 45 minutes ago</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
        <div className="lg:col-span-2 space-y-4">
          {/* Live class feed */}
          <VideoFeed 
            type="student" 
            isFullscreen={isFullscreen}
            onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
          />

          {/* Question submission */}
          <Card>
            <QuestionForm onSubmit={handleQuestionSubmit} />
          </Card>

          {/* Question history */}
          <Card title="Your Questions" icon={<MessageSquare size={16} />}>
            <QuestionsList questions={dummyQueries.slice(0, 3)} />
          </Card>
        </div>

        {/* Resource recommendations */}
        <div className="space-y-4">
          <Card title="Recommended Resources" icon={<Book size={16} />}>
            <ResourcesList resources={recommendedResources} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentView;