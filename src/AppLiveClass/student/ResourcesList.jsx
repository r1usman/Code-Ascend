import React from "react";
import { Book, Video, FileText, ExternalLink } from "lucide-react";
import Card from "../common/Card";
  const resources = [
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

const ResourcesList = () => {
  const getIcon = (type) => {
    switch (type.toLowerCase()) {
      case "article":
        return <FileText size={16} className="text-blue-400" />;
      case "video":
        return <Video size={16} className="text-red-400" />;
      case "documentation":
        return <Book size={16} className="text-green-400" />;
      default:
        return <FileText size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="space-y-3">
      {resources.map((resource) => (
        <div 
          key={resource.id} 
          className="bg-gray-700/80 p-3 rounded-lg border border-gray-700/70 transition-all hover:bg-gray-700 hover:border-gray-600"
        >
          <div className="flex items-center gap-2">
            {getIcon(resource.type)}
            <h4 className="text-gray-200 font-medium flex-1">{resource.title}</h4>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-400 text-xs px-2 py-0.5 bg-gray-800 rounded">
              {resource.type}
            </span>
            <a
              href={resource.link}
              className="text-blue-400 text-sm hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              <span>View</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResourcesList;