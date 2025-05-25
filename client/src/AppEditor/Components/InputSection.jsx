import React from 'react';
import { Terminal } from 'lucide-react';

const   InputSection = ({ input, setInput }) => {
  return (
    <div className="border-l border-b  border-border_Col h-1/2">
      <div className="bg-slate-900 px-4 py-2 flex items-center border-b border-border_Col opacity-70">
        <Terminal className="h-4 w-4 text-slate-400 mr-2" />
        <span className="text-sm font-medium text-slate-300">Input</span>
      </div>
      
      <textarea
        placeholder="Enter program input here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-[calc(100%-36px)] bg-dark-bg-secondary3 text-slate-300 p-4 resize-none  outline-none font-mono text-sm"
      />
    </div>
  );
};

export default InputSection;
