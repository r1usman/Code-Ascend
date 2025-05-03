import React, { useState, useEffect } from "react";
import {
  Timer,
  Trophy,
  Code2,
  User,
  CheckCircle2,
  EyeOff,
  Clock,
  Award,
  Code,
  GitCompare,
} from "lucide-react";

function App() {
  const [timeLeft, setTimeLeft] = useState(30); // 1 hour in seconds
  const [programmers, setProgrammers] = useState([
    { id: 1, name: "Programmer 1", status: "coding", code: "", isActive: true },
    {
      id: 2,
      name: "Programmer 2",
      status: "coding",
      code: "",
      isActive: false,
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCodeChange = (id, newCode) => {
    setProgrammers((prev) =>
      prev.map((prog) => (prog.id === id ? { ...prog, code: newCode } : prog))
    );
  };

  const handleSubmit = (id) => {
    const submissionTime = 3600 - timeLeft; // Time taken in seconds
    const executionTime = Math.random() * 100 + 50; // Simulated execution time (ms)

    setProgrammers((prev) =>
      prev.map((prog) =>
        prog.id === id
          ? {
              ...prog,
              status: "submitted",
              submissionTime,
              executionTime,
              codeLength: prog.code.length,
            }
          : prog
      )
    );

    // Simulate submission verification
    setTimeout(() => {
      setProgrammers((prev) =>
        prev.map((prog) =>
          prog.id === id ? { ...prog, status: "accepted" } : prog
        )
      );
    }, 2000);
  };

  const switchProgrammer = (id) => {
    setProgrammers((prev) =>
      prev.map((prog) => ({
        ...prog,
        isActive: prog.id === id,
      }))
    );
  };

  const getWinner = () => {
    const acceptedProgrammers = programmers.filter(
      (p) => p.status === "accepted"
    );
    if (acceptedProgrammers.length === 0) return null;

    return acceptedProgrammers.reduce((fastest, current) => {
      if (!fastest.submissionTime || !current.submissionTime) return fastest;
      return fastest.submissionTime < current.submissionTime
        ? fastest
        : current;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">CodeAscend</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
              <Timer className="h-5 w-5 text-blue-600" />
              <span className="text-blue-700 font-mono font-medium">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>
      </header>

      {timeLeft > 0 ? (
        <>
          {/* Programmer Switch */}
          {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                        <div className="bg-white shadow-sm rounded-lg p-4 flex justify-center space-x-4">
                            {programmers.map((programmer) => (
                                <button
                                    key={programmer.id}
                                    onClick={() => switchProgrammer(programmer.id)}
                                    className={`px-6 py-2 rounded-lg transition-all ${programmer.isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {programmer.name}
                                </button>
                            ))}
                        </div>
                    </div> */}

          {/* Problem Statement */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Problem: Two Sum
              </h2>
              <p className="text-gray-600">
                Given an array of integers nums and an integer target, return
                indices of the two numbers such that they add up to target. You
                may assume that each input would have exactly one solution, and
                you may not use the same element twice.
              </p>
            </div>
          </div>

          {/* Coding Area */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-2 gap-8">
            {programmers.map((programmer) => (
              <div
                key={programmer.id}
                className={`bg-white shadow-sm rounded-lg overflow-hidden ${
                  !programmer.isActive ? "relative" : ""
                }`}
              >
                <div className="border-b px-4 py-3 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-500" />
                    <span className="font-medium text-gray-700">
                      {programmer.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {programmer.status === "accepted" && (
                      <span className="flex items-center text-green-600">
                        <CheckCircle2 className="h-5 w-5 mr-1" />
                        Accepted
                      </span>
                    )}
                    {programmer.status === "submitted" && (
                      <span className="text-yellow-600">Evaluating...</span>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <textarea
                    className={`w-full h-96 font-mono text-sm p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      !programmer.isActive ? "blur-md" : ""
                    }`}
                    value={programmer.code}
                    onChange={(e) =>
                      handleCodeChange(programmer.id, e.target.value)
                    }
                    placeholder="Write your solution here..."
                    disabled={!programmer.isActive}
                  />
                  {!programmer.isActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                      <div className="flex flex-col items-center space-y-2">
                        <EyeOff className="h-12 w-12 text-gray-400" />
                        <p className="text-gray-600 font-medium">
                          Code hidden during challenge
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleSubmit(programmer.id)}
                      disabled={
                        !programmer.isActive || programmer.status !== "coding"
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Solution
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Results and Report */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
          {/* Winner Announcement */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-center text-white shadow-xl">
            <Trophy className="h-16 w-16 mx-auto mb-6 text-yellow-300" />
            <h2 className="text-3xl font-bold mb-4">Challenge Complete!</h2>
            {getWinner() ? (
              <>
                <p className="text-xl mb-2">🎉 Congratulations!</p>
                <h3 className="text-2xl font-semibold">
                  {getWinner()?.name} Wins!
                </h3>
              </>
            ) : (
              <p className="text-xl">No solutions were submitted</p>
            )}
          </div>

          {/* Detailed Statistics */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-6">Challenge Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {programmers.map((programmer) => (
                <div
                  key={programmer.id}
                  className={`p-6 rounded-lg border ${
                    programmer === getWinner()
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium">{programmer.name}</h4>
                    {programmer === getWinner() && (
                      <Award className="h-6 w-6 text-blue-600" />
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-600">
                        Submission Time:{" "}
                        {programmer.submissionTime
                          ? `${formatTime(programmer.submissionTime)}`
                          : "Not submitted"}
                      </span>
                    </div>

                    {programmer.executionTime && (
                      <div className="flex items-center space-x-2">
                        <Timer className="h-5 w-5 text-gray-500" />
                        <span className="text-gray-600">
                          Execution Time: {programmer.executionTime.toFixed(2)}
                          ms
                        </span>
                      </div>
                    )}

                    {programmer.codeLength && (
                      <div className="flex items-center space-x-2">
                        <Code className="h-5 w-5 text-gray-500" />
                        <span className="text-gray-600">
                          Code Length: {programmer.codeLength} characters
                        </span>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <GitCompare className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-600">
                        Status:{" "}
                        <span
                          className={
                            programmer.status === "accepted"
                              ? "text-green-600"
                              : programmer.status === "submitted"
                              ? "text-yellow-600"
                              : "text-gray-600"
                          }
                        >
                          {programmer.status.charAt(0).toUpperCase() +
                            programmer.status.slice(1)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
