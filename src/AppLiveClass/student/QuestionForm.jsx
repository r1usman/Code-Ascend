import React, { useState } from "react";
import { MessageSquare, Send } from "lucide-react";



const QuestionForm = ({ onSubmit }) => {
  const [question, setQuestion] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question);
      setQuestion("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <MessageSquare size={18} />
      </div>
      <input
        type="text"
        placeholder="Type your question here..."
        value={question}
        onChange={(e) => {
          setQuestion(e.target.value);
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 1000);
        }}
        className="bg-gray-700 text-gray-200 p-3 pl-10 pr-12 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
      />
      <button 
        type="submit"
        className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full transition-all ${
          question ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-400'
        } ${isTyping ? 'scale-110' : 'scale-100'}`}
        disabled={!question}
      >
        <Send size={16} />
      </button>
    </form>
  );
};

export default QuestionForm;