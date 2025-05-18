import React, { useState } from "react";
import { 
  Maximize2, 
  Minimize2,
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  MessageSquare,
  Users,
  ScreenShare,
  PenTool
} from "lucide-react";



const VideoFeed = ({ 
  type, 
  isPiP = false,
  isFullscreen = false,
  onToggleFullscreen
}) => {
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isWhiteboardActive, setIsWhiteboardActive] = useState(false);

  return (
    <div 
      className={`relative rounded-lg overflow-hidden transition-all duration-300 shadow-lg
        ${isPiP ? "w-80 h-48 absolute bottom-4 right-4 z-10" : "w-full h-96"}`}
    >
      {/* Video background gradient placeholder */}
      <div className={`w-full h-full ${
        videoEnabled 
          ? "bg-gradient-to-br from-blue-900/80 to-purple-900/80" 
          : "bg-gray-800 flex items-center justify-center"
      }`}>
        {videoEnabled ? (
          <div className="w-full h-full flex items-center justify-center">
            {isScreenSharing ? (
              <div className="bg-white p-8 rounded w-full h-full flex items-center justify-center">
                <p className="text-gray-800 text-center">Screen sharing active</p>
              </div>
            ) : isWhiteboardActive ? (
              <div className="bg-white p-8 rounded w-full h-full flex items-center justify-center">
                <p className="text-gray-800 text-center">Interactive whiteboard active</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="bg-gray-700/70 backdrop-blur-sm p-8 rounded-lg">
                  <Users size={48} className="mx-auto text-blue-400 mb-4" />
                  <p className="text-gray-300">
                    {type === "instructor" ? "Instructor Live Feed" : "Live Class Feed"}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center p-4">
            <Users size={48} className="mx-auto text-gray-500 mb-2" />
            <p className="text-gray-400">Video disabled</p>
          </div>
        )}
      </div>

      {/* Controls overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-gray-900 to-transparent">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button 
              onClick={() => setMicEnabled(!micEnabled)}
              className={`p-2 rounded-full ${
                micEnabled ? "bg-blue-600 hover:bg-blue-700" : "bg-red-600 hover:bg-red-700"
              } transition-colors`}
            >
              {micEnabled ? (
                <Mic size={16} className="text-white" />
              ) : (
                <MicOff size={16} className="text-white" />
              )}
            </button>

            <button 
              onClick={() => setVideoEnabled(!videoEnabled)}
              className={`p-2 rounded-full ${
                videoEnabled ? "bg-blue-600 hover:bg-blue-700" : "bg-red-600 hover:bg-red-700"
              } transition-colors`}
            >
              {videoEnabled ? (
                <Video size={16} className="text-white" />
              ) : (
                <VideoOff size={16} className="text-white" />
              )}
            </button>
          </div>

          {type === "instructor" && (
            <div className="flex gap-2">
              <button 
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`p-2 rounded-full ${
                  isScreenSharing ? "bg-green-600 hover:bg-green-700" : "bg-gray-700 hover:bg-gray-600"
                } transition-colors`}
                title="Share Screen"
              >
                <ScreenShare size={16} className="text-white" />
              </button>
              
              <button 
                onClick={() => setIsWhiteboardActive(!isWhiteboardActive)}
                className={`p-2 rounded-full ${
                  isWhiteboardActive ? "bg-green-600 hover:bg-green-700" : "bg-gray-700 hover:bg-gray-600"
                } transition-colors`}
                title="Whiteboard"
              >
                <PenTool size={16} className="text-white" />
              </button>
            </div>
          )}

          <div>
            <button 
              onClick={onToggleFullscreen}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              {isFullscreen ? (
                <Minimize2 size={16} className="text-white" />
              ) : (
                <Maximize2 size={16} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* PiP indicator */}
      {isPiP && (
        <div className="absolute top-2 left-2 bg-gray-900/80 text-xs px-2 py-1 rounded">
          PiP Mode
        </div>
      )}
    </div>
  );
};

export default VideoFeed;