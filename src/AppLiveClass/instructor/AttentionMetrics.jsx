import React, { useState } from "react";
import { BarChart2, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import Card from "../common/Card";


const AttentionMetrics  = ({ students }) => {
  const [showAll, setShowAll] = useState(false);
  const averageAttention = Math.round(
    students.reduce((sum, student) => sum + student.attention, 0) / students.length
  );

  const getAttentionColor = (level) => {
    if (level > 85) return "bg-green-500";
    if (level > 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getClassAverageColor = () => {
    if (averageAttention > 85) return "text-green-400";
    if (averageAttention > 70) return "text-yellow-400";
    return "text-red-400";
  };

  const sortedStudents = [...students].sort((a, b) => a.attention - b.attention);
  const displayStudents = showAll ? sortedStudents : sortedStudents.slice(0, 5);

  const lowAttentionCount = students.filter(s => s.attention < 70).length;

  return (
    <Card title="Student Attention Levels" icon={<BarChart2 size={16} />}>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-400">Class Average:</div>
          <div className={`text-lg font-bold ${getClassAverageColor()}`}>
            {averageAttention}%
          </div>
        </div>
        
        {lowAttentionCount > 0 && (
          <div className="flex items-center gap-1 bg-red-900/30 text-red-300 px-2 py-1 rounded text-xs">
            <AlertTriangle size={12} />
            <span>{lowAttentionCount} student{lowAttentionCount > 1 ? 's' : ''} below 70%</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {displayStudents.map((student) => (
          <div
            key={student.id}
            className="flex items-center justify-between bg-gray-700/50 p-2 px-3 rounded-lg transition-all hover:bg-gray-700"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm">
                {student.avatar ? (
                  <img 
                    src={student.avatar} 
                    alt={student.name} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  student.name.charAt(0)
                )}
              </div>
              <span className="text-gray-300">{student.name}</span>
            </div>
            <div className="flex-grow mx-4 max-w-48">
              <div className="bg-gray-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${getAttentionColor(student.attention)}`}
                  style={{ 
                    width: `${student.attention}%`,
                    transition: "width 1s ease-in-out"
                  }}
                ></div>
              </div>
            </div>
            <span 
              className={`text-sm w-8 text-right ${
                student.attention > 85 
                  ? "text-green-400" 
                  : student.attention > 70 
                    ? "text-yellow-400" 
                    : "text-red-400"
              }`}
            >
              {student.attention}%
            </span>
          </div>
        ))}
      </div>

      {students.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-3 text-center text-sm text-blue-400 hover:text-blue-300 flex items-center justify-center gap-1"
        >
          {showAll ? (
            <>
              <span>Show Less</span>
              <ChevronUp size={14} />
            </>
          ) : (
            <>
              <span>Show All ({students.length})</span>
              <ChevronDown size={14} />
            </>
          )}
        </button>
      )}
    </Card>
  );
};

export default AttentionMetrics;