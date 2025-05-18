import React from "react";
import { CheckCircle, Clock } from "lucide-react";
import Card from "../common/Card";



const QuestionsList = ({ questions }) => {
  return (
    <div className="space-y-3">
      {questions.map((query) => (
        <div
          key={query.id}
          className={`bg-gray-700/80 p-3 rounded-lg transition-all hover:bg-gray-700 border border-gray-700/70 
            ${query.answered ? 'border-l-green-500 border-l-2' : 'border-l-amber-500 border-l-2'}`}
        >
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1">
              <p className="text-gray-200">{query.text}</p>
              <div className="flex items-center gap-2 mt-1">
                <Clock size={12} className="text-gray-400" />
                <span className="text-gray-400 text-xs">{query.time}</span>
              </div>
            </div>
            <div
              className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
                query.answered
                  ? "bg-green-900/50 text-green-300 border border-green-700"
                  : "bg-amber-900/50 text-amber-300 border border-amber-700"
              }`}
            >
              {query.answered ? (
                <>
                  <CheckCircle size={12} />
                  <span>Answered</span>
                </>
              ) : (
                <>
                  <Clock size={12} />
                  <span>Pending</span>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionsList;