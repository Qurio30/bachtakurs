import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react';

const VideoPlayer = ({ videoId, title, description }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const videoUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`;

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== 'https://www.youtube.com') return;
      
      const data = JSON.parse(event.data);
      if (data.event === 'video-progress') {
        setCurrentTime(data.info.currentTime);
        setDuration(data.info.duration);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (iframeRef.current) {
      const command = isPlaying ? 'pauseVideo' : 'playVideo';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command }),
        'https://www.youtube.com'
      );
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (iframeRef.current) {
      const command = isMuted ? 'unMute' : 'mute';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command }),
        'https://www.youtube.com'
      );
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (iframeRef.current) {
      if (isFullscreen) {
        document.exitFullscreen?.();
      } else {
        iframeRef.current.requestFullscreen?.();
      }
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="bg-black rounded-xl overflow-hidden shadow-lg">
        <div 
          className="relative aspect-video bg-gray-900"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setShowControls(false)}
        >
          <iframe
            ref={iframeRef}
            src={videoUrl}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          
          {/* Custom Controls Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showControls ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
          >
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlayPause}
                className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-gray-900" />
                ) : (
                  <Play className="w-8 h-8 text-gray-900 ml-1" />
                )}
              </button>
            </div>
          </motion.div>

          {/* Bottom Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4"
          >
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-4">
                <button
                  onClick={togglePlayPause}
                  className="hover:text-gray-300 transition-colors"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                
                <button
                  onClick={toggleMute}
                  className="hover:text-gray-300 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                </button>
                
                <div className="text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="hover:text-gray-300 transition-colors">
                  <Settings className="w-6 h-6" />
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="hover:text-gray-300 transition-colors"
                >
                  <Maximize className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Video Info */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        {description && (
          <p className="text-gray-600">{description}</p>
        )}
      </div>
    </motion.div>
  );
};

export default VideoPlayer;
