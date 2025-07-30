import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Slider } from "../ui/slider";
import { Pause, Play } from "lucide-react";
import { Button } from "../ui/button";

function VideoPlayer({ url, className }) {
  // const [playing, setPlaying] = useState(false);
  // const [volume, setVolume] = useState(0.5);
  // const [muted, setMuted] = useState(false);
  // const [played, setPlayed] = useState(0);
  // const [seeking, setSeeking] = useState(false);
  // const [isFullScreen, setIsFullScreen] = useState(false);
  // const [showControls, setShowControls] = useState(true);

  // const playerRef = useRef(null);
  // const playerContainerRef = useRef(null);
  // const controlsTimeoutRef = useRef(null);

  // const handlePlayAndPause = () => {
  //   setPlaying((prev) => !prev);
  // };
  return (
    <div
      // ref={playerContainerRef}
      className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ease-in-out ${
        false ? "w-screen h-screen" : ""
      } ${className}`}
    >
      <ReactPlayer
        // ref={playerRef}
        className="absolute top-0 left-0"
        width={"100%"}
        height={"100%"}
        url={url}
        // playing={playing}
        controls
        // volume={volume}
        // muted={muted}
        // onProgress={handleProgress}
      />
      {/* {showControls && (
        <div
          className={`active:bsolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 p-4 transition-opacity duration-300 opacity-100`}
        >
          <Slider value={played * 100} max={100} step={0.1} onValueChange={(value)=> handleSeekChange(value[0]/100)} onValueCommit={handleSeekMouseUp} className='w-full mb-4' />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={handlePlayAndPause} className="text-white hover:text-primary hover:bg-gray-700">
                {
                  playing? <Pause className="h-6 w-6"/> : <Play className="h-6 w-6"/>
                }
              </Button>
              <Button onClick={handleRewind}></Button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default VideoPlayer;
