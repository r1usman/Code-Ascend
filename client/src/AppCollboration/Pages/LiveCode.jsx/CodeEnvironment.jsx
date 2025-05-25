import { useState } from "react";
import Editor from "@monaco-editor/react";
import {
  VideoCameraIcon,
  MicrophoneIcon,
  ChatBubbleLeftIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

import {initialCode, participants ,chats} from "./index"

function CodeEnvironment() {
  const [showChat, setShowChat] = useState(false);
  const [comments] = useState(chats);

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg-secondary3 text-white">
      {/* Header */}
      <header className=" border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold ">
              Collaborative Coding Session
            </h1>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Live: Problem #234 - Maximum Subarray
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
              <VideoCameraIcon className="w-6 h-6" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
              <MicrophoneIcon className="w-6 h-6" />
            </button>
            <button
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
              onClick={() => setShowChat(!showChat)}
            >
              <ChatBubbleLeftIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex bg-dark-bg-secondary3">
       
        <div className="flex-1 flex flex-col">
          <div className="flex-1 ">
            <Editor
              height="100%"
              defaultLanguage="typescript"
              defaultValue={initialCode}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                renderLineHighlight: "all",
                scrollBeyondLastLine: false,
              }}
            />
          </div>
        </div>
        <div className="w-64  border-l border-border_Col flex flex-col text-white">
          <div className="p-4 border-b border-border_Col ">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold ">
                Participants
              </h2>
              <button className="p-1 text-gray-500 hover:text-gray-700 rounded hover:bg-gray-100">
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-white ">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center space-x-3 rounded-md  py-1 bg-[#1e1e1e]"
                >
                  <div className="relative">
                    <img
                      src={participant.avatar}
                      alt={participant.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span
                      className={`absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white ${
                        participant.status === "active"
                          ? "bg-green-400"
                          : "bg-gray-300"
                      }`}
                    />
                  </div>
                  <span className="text-sm">
                    {participant.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          
          <div className="text-white flex-1 overflow-y-auto p-4">
            <h2 className="text-sm font-semibold  mb-4">
              Code Comments
            </h2>
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-[#1e1e1e] rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <span className="text-xs text-gray-500">
                      Line {comment.lineNumber}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mt-1">
                    {comment.user}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{comment.text}</p>
                  <span className="text-xs text-gray-500 mt-2 block">
                    {comment.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Add Comment Input */}
          <div className="p-4 border-t bg-[#1e1e1e] border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full px-3 py-2 border bg-[#1e1e1e] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>      
      </div>
    </div>
  );
}

export default CodeEnvironment;
