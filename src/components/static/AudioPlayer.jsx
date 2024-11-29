import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "../../assets/styles/audioPlayer.css"; 
import "../../assets/styles/layout.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const AudioPlayer = ({ episode, onFavorite }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const audioRef = useRef(null);  // Reference to the audio element

  useEffect(() => {
    // Sync progress with audio playback
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () => {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      };
    }
  }, [audioRef]);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
    onFavorite(episode);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (event) => {
    const newProgress = event.target.value;
    setProgress(newProgress);
    audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
  };

  return (
    <div className="audio-player">
      {/* Left Section: Episode Image and Title */}
      <div className="audio-player-left">
        <img
          src={episode.image || "placeholder-image.jpg"} // Fallback image if none exists
          alt={episode.title}
          className="audio-player-image"
        />
        <div className="audio-player-title">{episode.title || "No Episode Selected"}</div>
      </div>

      {/* Center Section: Audio and Progress Bar */}
      <div className="audio-player-center">
        <audio ref={audioRef} src={episode.file} />
        <button className="play-pause-button" onClick={togglePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        
        <input
          type="range"
          className="audio-player-progress"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
        />
      </div>

      {/* Right Section: Heart Icon */}
      <div className="audio-player-right" onClick={handleFavoriteClick}>
        {isFavorited ? (
          <FaHeart className="audio-player-heart active" />
        ) : (
          <FaRegHeart className="audio-player-heart" />
        )}
      </div>
    </div>
  );
};

AudioPlayer.propTypes = {
  episode: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    file: PropTypes.string.isRequired, // Add file URL as required prop
  }),
  onFavorite: PropTypes.func.isRequired,
};

AudioPlayer.defaultProps = {
  episode: {
    image: "",
    title: "",
    file: "", // Default empty string if not passed
  },
};

export default AudioPlayer;
