import {
  Code2,
  Copy,
  Languages,
  Maximize2,
  Play,
  RefreshCw,
  Save,
  Settings,
  Split,
  Terminal,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(
    '// Write your code here\nfunction example() {\n  console.log("Hello, World!");\n}'
  );
  const [output, setOutput] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleRunCode = () => {
    setOutput(
      "Console Output:\n> Hello, World!\n> Program executed successfully."
    );
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      {/* Header */}
      <header
        className={`${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        } border-b`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Code2
                className={`h-6 w-6 ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className={`${
                  isDarkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-900 border-gray-300"
                } border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
              </select>
            </div>
            <div className="flex items-center space-x-3">
              <button
                className={`${
                  isDarkMode
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white px-4 py-1.5 rounded-md text-sm flex items-center space-x-2`}
                onClick={handleRunCode}
              >
                <Play className="h-4 w-4" />
                <span>Run</span>
              </button>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`${
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } p-2 rounded-md`}
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
          {/* Editor Panel */}
          <div
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-lg overflow-hidden`}
          >
            <div
              className={`${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              } px-4 py-2 flex items-center justify-between`}
            >
              <div className="flex items-center space-x-2">
                <Languages
                  className={`h-4 w-4 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  main.{selectedLanguage === "javascript" ? "js" : "py"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className={`p-1.5 rounded hover:${
                    isDarkMode ? "bg-gray-600" : "bg-gray-200"
                  }`}
                >
                  <Copy
                    className={`h-4 w-4 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  />
                </button>
                <button
                  className={`p-1.5 rounded hover:${
                    isDarkMode ? "bg-gray-600" : "bg-gray-200"
                  }`}
                >
                  <Save
                    className={`h-4 w-4 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  />
                </button>
                <button
                  className={`p-1.5 rounded hover:${
                    isDarkMode ? "bg-gray-600" : "bg-gray-200"
                  }`}
                >
                  <RefreshCw
                    className={`h-4 w-4 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  />
                </button>
              </div>
            </div>
            <div className="p-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={`w-full h-[calc(100vh-16rem)] font-mono text-sm p-4 ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-100"
                    : "bg-white text-gray-900"
                } focus:outline-none resize-none`}
                spellCheck="false"
              />
            </div>
          </div>

          {/* Output Panel */}
          <div
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-lg overflow-hidden`}
          >
            <div
              className={`${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              } px-4 py-2 flex items-center justify-between`}
            >
              <div className="flex items-center space-x-2">
                <Terminal
                  className={`h-4 w-4 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Console Output
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className={`p-1.5 rounded hover:${
                    isDarkMode ? "bg-gray-600" : "bg-gray-200"
                  }`}
                >
                  <Trash2
                    className={`h-4 w-4 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  />
                </button>
                <button
                  className={`p-1.5 rounded hover:${
                    isDarkMode ? "bg-gray-600" : "bg-gray-200"
                  }`}
                >
                  <Split
                    className={`h-4 w-4 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  />
                </button>
                <button
                  className={`p-1.5 rounded hover:${
                    isDarkMode ? "bg-gray-600" : "bg-gray-200"
                  }`}
                >
                  <Maximize2
                    className={`h-4 w-4 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  />
                </button>
              </div>
            </div>
            <div className="p-4">
              <pre
                className={`font-mono text-sm p-4 h-[calc(100vh-16rem)] overflow-auto ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-100"
                    : "bg-white text-gray-900"
                }`}
              >
                {output || "Run your code to see the output here..."}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <footer
        className={`${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        } border-t fixed bottom-0 w-full`}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {selectedLanguage === "javascript"
                  ? "Node.js v16.14.0"
                  : "Python 3.9.0"}
              </span>
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                UTF-8
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Line 1, Column 1
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
