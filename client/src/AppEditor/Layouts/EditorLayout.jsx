import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LanguageSelector from '../Components/LanguageSelector';
import CodeEditor from '../Components/CodeEditor';
import OutputSection from '../Components/OutputSection';

const EditorLayout = () => {
  const [activeTab, setActiveTab] = useState('description');
  const [activeBottomTab, setActiveBottomTab] = useState('output'); // New state for bottom tabs
  const [problem, setProblem] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { problemId } = useParams();

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const api = axios.create({
          baseURL: "https://jz675pcc-4000.inc1.devtunnels.ms",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        });

        const response = await api.get(`/problems/${problemId}`);
        setProblem(response.data);
        setSolutions(response.data.solutions || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching problem:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId]);

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Loading problem...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-400">
        Error: {error}
        <p className="text-sm text-gray-400 mt-2">
          Failed to load problem details.
        </p>
      </div>
    );
  }

  if (!problem) {
    return <div className="text-center py-8 text-gray-400">Problem not found</div>;
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toUpperCase()) {
      case "EASY":
        return "bg-green-800 text-green-100";
      case "MEDIUM":
        return "bg-yellow-800 text-yellow-100";
      case "MEDIUM_HARD":
      case "MEDIUM HARD":
        return "bg-orange-800 text-orange-100";
      case "HARD":
        return "bg-red-800 text-red-100";
      case "VERY_HARD":
      case "VERY HARD":
        return "bg-purple-800 text-purple-100";
      default:
        return "bg-gray-800 text-gray-100";
    }
  };

  const formatDescription = (text) => {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/```([^`]+)```/g, '<pre class="bg-gray-700 p-2 rounded my-2 overflow-x-auto"><code>$1</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-dark-bg-secondary4">
      {/* Left Panel */}
      <div className="w-full lg:w-1/2 border-r border-gray-700 overflow-y-auto">
        {/* Tabs */}
        <div className="border-b border-gray-700 mb-4">
          <nav className="flex space-x-4 text-sm font-medium text-gray-400">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-2 px-4 ${activeTab === 'description' ? 'border-b-2 border-blue-500 text-blue-400' : 'hover:text-blue-400'}`}
            >
              Problem Description
            </button>
            <button
              onClick={() => setActiveTab('solutions')}
              className={`py-2 px-4 ${activeTab === 'solutions' ? 'border-b-2 border-blue-500 text-blue-400' : 'hover:text-blue-400'}`}
            >
              Solutions
            </button>
            <button
              onClick={() => setActiveTab('discussion')}
              className={`py-2 px-4 ${activeTab === 'discussion' ? 'border-b-2 border-blue-500 text-blue-400' : 'hover:text-blue-400'}`}
            >
              Discussion
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'description' && (
            <>
              {/* Title and Meta */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-100 mb-4">{problem.name}</h1>

                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 mb-4">
                  {/* Difficulty */}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty.split('_').join(' ')}
                  </span>

                  {/* Tags */}
                  {problem.tags?.length > 0 && (
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-400 text-sm">Topics:</span>
                      {problem.tags.map((tag, i) => (
                        <span key={i} className="text-blue-400 hover:text-blue-300 text-sm cursor-pointer">
                          {tag}{i < problem.tags.length - 1 ? ',' : ''}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Problem Description */}
                <div className="prose prose-invert max-w-none text-gray-300 mb-6">
                  {problem.description && (
                    <div
                      className="mb-6 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: formatDescription(problem.description) }}
                    />
                  )}

                  {/* Constraints */}
                  {(problem.input_format || problem.output_format || problem.note) && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-3 text-gray-200">Constraints:</h3>
                      <div className="space-y-4 text-sm text-gray-300">
                        {problem.input_format && (
                          <div>
                            <div className="font-medium">Input:</div>
                            <div className="ml-4">
                              <div
                                dangerouslySetInnerHTML={{ __html: formatDescription(problem.input_format) }}
                              />
                            </div>
                          </div>
                        )}

                        {problem.output_format && (
                          <div>
                            <div className="font-medium">Output:</div>
                            <div className="ml-4">
                              <div
                                dangerouslySetInnerHTML={{ __html: formatDescription(problem.output_format) }}
                              />
                            </div>
                          </div>
                        )}

                        {problem.note && (
                          <div>
                            <div className="font-medium">Note:</div>
                            <div className="ml-4">
                              <div
                                dangerouslySetInnerHTML={{ __html: formatDescription(problem.note) }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Related Tags */}
                  {problem.raw_tags?.length > 0 && (
                    <div className="border-t border-gray-700 pt-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0 mb-4">
                        <span className="text-sm font-medium text-gray-400">Related Topics:</span>
                        <div className="flex flex-wrap gap-2">
                          {problem.raw_tags.map((tag, i) => (
                            <span
                              key={i}
                              className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full text-sm text-gray-200 cursor-pointer"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'solutions' && (
            <div className="space-y-4">
              {solutions.map((sol, i) => (
                <div key={i} className="mb-4 p-4 bg-gray-800 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2 text-gray-200">{sol.language} Solution</h3>
                  <pre className="bg-gray-900 p-3 rounded overflow-x-auto text-sm text-gray-200">
                    <code>{sol.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'discussion' && (
            <div className="text-gray-400 italic p-4">
              User comments and discussions will be here.
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Code Editor */}
     {/* Right Panel - Code Editor */}
<div className="w-full lg:w-1/2 bg-gray-900 flex flex-col h-screen">
  {/* =============== Right top (60%) */}
  <div className="flex flex-col p-4 lg:p-6" style={{ height: '60%' }}>
    {/* Language Selector */}
    <LanguageSelector />

    {/* Code Editor - Takes remaining space in top section */}
    <div className="flex-grow overflow-hidden">
      <CodeEditor />
    </div>
  </div>

  {/* =============== Right bottom (40%) */}
  <div className="flex flex-col p-4 lg:p-6 border-t border-gray-700" style={{ height: '40%' }}>
    {/* Bottom Tabs */}
    <nav className="flex space-x-4 text-sm font-medium text-gray-400 mb-2">
      <button
        onClick={() => setActiveBottomTab('output')}
        className={`py-2 px-4 ${activeBottomTab === 'output' ? 'border-b-2 border-blue-500 text-blue-400' : 'hover:text-blue-400'}`}
      >
        Output
      </button>
      <button
        onClick={() => setActiveBottomTab('examples')}
        className={`py-2 px-4 ${activeBottomTab === 'examples' ? 'border-b-2 border-blue-500 text-blue-400' : 'hover:text-blue-400'}`}
      >
        Examples
      </button>
    </nav>

    {/* Bottom Tab Content */}
    <div className="bg-gray-800 rounded-lg overflow-hidden flex-grow">
      {activeBottomTab === 'output' && (
        <OutputSection />
      )}

      {activeBottomTab === 'examples' && problem.examples?.length > 0 && (
        <div className="p-3 space-y-3 h-full overflow-y-auto">
          {problem.examples.map((example, i) => (
            <div key={i} className="mb-3 last:mb-0">
              <h3 className="text-md font-semibold mb-1 text-gray-200">Example {i + 1}</h3>
              <div className="space-y-1">
                {example.input && (
                  <div>
                    <div className="text-sm text-gray-300">Input:</div>
                    <div className="bg-gray-700 p-2 rounded text-sm font-mono text-gray-200">
                      {example.input}
                    </div>
                  </div>
                )}
                {example.output && (
                  <div>
                    <div className="text-sm text-gray-300">Output:</div>
                    <div className="bg-gray-700 p-2 rounded text-sm font-mono text-gray-200">
                      {example.output}
                    </div>
                  </div>
                )}
                {example.explanation && (
                  <div>
                    <div className="text-sm text-gray-300">Explanation:</div>
                    <div className="text-sm text-gray-300">
                      {example.explanation}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</div>
    </div>
  );
};

export default EditorLayout;