import React from 'react'
import video from '../assets/images/video.jpeg'
import { Play } from 'lucide-react';

const VideoPlayer = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative w-[80%] md:w-[70%] h-64 md:h-[550px] rounded-xl shadow-sm overflow-hidden">
        <img
          src={video}
          alt="Mountain landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="bg-[#23A6F0] hover:bg-blue-600 text-white rounded-full p-4 transition-colors duration-300">
            <Play size={48} />
          </button>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
          <span className="text-sm">0:00 / 3:45</span>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </button>
            <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 15v4c0 1.1.9 2 2 2h4"></path>
                <path d="M21 15v4c0 1.1-.9 2-2 2h-4"></path>
                <path d="M21 9V5c0-1.1-.9-2-2-2h-4"></path>
                <path d="M3 9V5c0-1.1.9-2 2-2h4"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;