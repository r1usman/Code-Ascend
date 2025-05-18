import React, { useState } from "react";
import { MessageSquare, Filter, BarChart } from "lucide-react";
import Card from "../common/Card";



const QueryManager = ({ queries, clusters }) => {
  const [queryView, setQueryView] = useState("all"); // 'all' or 'clustered'

  return (
    <Card 
      title="Student Queries" 
      icon={<MessageSquare size={16} />}
      className="h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-3">
        <div className="text-sm text-gray-400">{queries.length} total questions</div>
        <div className="flex items-center gap-2 text-sm">
          <button
            className={`px-2 py-1 rounded flex items-center gap-1 ${
              queryView === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setQueryView("all")}
          >
            <Filter size={12} />
            <span>All</span>
          </button>
          <button
            className={`px-2 py-1 rounded flex items-center gap-1 ${
              queryView === "clustered"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setQueryView("clustered")}
          >
            <BarChart size={12} />
            <span>Clustered</span>
          </button>
        </div>
      </div>

      <div className="overflow-y-auto flex-grow space-y-3">
        {queryView === "all" ? (
          <div className="space-y-3">
            {queries.map((query) => (
              <div 
                key={query.id} 
                className="bg-gray-700/80 p-3 rounded-lg transition-all hover:bg-gray-700 border border-gray-700/70"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-200">{query.text}</p>
                    <div className="flex justify-between mt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-xs">{query.time}</span>
                        {query.user && (
                          <span className="text-gray-400 text-xs">from {query.user}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
                    Answer
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {clusters.map((cluster) => (
              <div 
                key={cluster.id} 
                className="bg-gray-700/80 p-3 rounded-lg hover:bg-gray-700 transition-all border border-gray-700/70"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-gray-200 font-medium">{cluster.topic}</h4>
                  <span className="bg-blue-900/50 text-blue-300 px-2 py-1 rounded text-xs border border-blue-800/70">
                    {cluster.count} questions
                  </span>
                </div>
                <p className="text-gray-300 mt-2 text-sm">{cluster.representative}</p>
                <div className="flex justify-end mt-2">
                  <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
                    Address this topic
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default QueryManager;