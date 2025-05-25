import React from 'react';
import Editor from "@monaco-editor/react";
import { Code } from 'lucide-react';
import OutputSection from './OutputSection';

const CodeEditor = ({ code, setCode, language }) => {
  const getEditorLanguage = () => {
    switch (language) {
      case 'c++': return 'cpp';
      case 'python': return 'python';
      case 'java': return 'java';
      case 'c': return 'c';
      default: return 'cpp';
    }
  };

  return (
    <div className="h-[50vh] flex flex-col border-r border-border_Col">
      <div className="bg-slate-900 px-4 py-2 flex items-center border-b border-border_Col opacity-70">
        <Code className="h-4 w-4 text-slate-400 mr-2" />
        <span className="text-sm font-medium text-slate-300">Source Code</span>
      </div>

      <div className="flex-grow relative">
        <Editor
          height="calc(100% - 60px)" // Accounts for header and button space
          language={getEditorLanguage()}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            lineNumbers: 'on',
            roundedSelection: true,
            automaticLayout: true,
            padding: { top: 16 },
          }}
        />

        <div className="absolute bottom-2 right-2 flex space-x-2">
          <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm font-medium text-gray-200">
            Run
          </button>
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 text-white rounded-lg text-sm font-medium">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;