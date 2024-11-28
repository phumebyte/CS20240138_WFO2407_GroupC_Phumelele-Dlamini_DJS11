import { useState } from "react";
import PropTypes from "prop-types";
import "../../assets/styles/audioPlayer.css"; 
import "../../assets/styles/layout.css"
import { FaHeart, FaRegHeart } from "react-icons/fa";

const AudioPlayer = ({ episode, onFavorite }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
    onFavorite(episode);
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

      {/* Center Section: Progress Bar */}
      <div className="audio-player-center">
        <input
          type="range"
          className="audio-player-progress"
          min="0"
          max="100"
          value="50" // Placeholder value for progress
          readOnly
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
  }),
  onFavorite: PropTypes.func.isRequired,
};

AudioPlayer.defaultProps = {
  episode: {
    image: "",
    title: "",
  },
};

export default AudioPlayer;
