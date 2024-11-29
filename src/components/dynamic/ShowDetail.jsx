import PropTypes from "prop-types";
import { useState } from "react";
import '../../assets/styles/showDetail.css'

const ShowDetail = ({ show }) => {
  if (!show) return null; 

  const seasons = Array.isArray(show.seasons) ? show.seasons : [];

  const [visibleSeasons, setVisibleSeasons] = useState({});
  const [visibleEpisodes, setVisibleEpisodes] = useState({});

  const toggleSeason = (index) => {
    setVisibleSeasons((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleEpisode = (seasonIndex, episodeIndex) => {
    setVisibleEpisodes((prev) => ({
      ...prev,
      [`${seasonIndex}-${episodeIndex}`]: !prev[`${seasonIndex}-${episodeIndex}`],
    }));
  };

  return (
    <div className="show-details">
      <h2>{show.title}</h2> 
      <img src={show.image} alt={show.title} className="show-image" /> {/* Show image */}
      <p>{show.description}</p> 

      {/* Render seasons if available */}
      <div>
        <p>Seasons:</p>
        {seasons.length > 0 ? (
          <div className="seasons-flex-container">
            {seasons.map((season, index) => (
              <div key={index} className="season-card">
                <div className="season-container">
                  {/* Make season title clickable */}
                  <button
                    onClick={() => toggleSeason(index)}
                    className="season-button"
                  >
                    <strong>{season.title}</strong>
                  </button>

                  {/* Display the season image */}
                  {season.image && (
                    <img
                      src={season.image}
                      alt={season.title}
                      className="season-image"
                    />
                  )}
                </div>

                {/* Render episodes if this season is visible */}
                {visibleSeasons[index] && season.episodes && season.episodes.length > 0 && (
                  <ol>
                    {season.episodes.map((episode, episodeIndex) => (
                      <li key={episodeIndex}>
                        {/* Make episode title clickable */}
                        <button
                          onClick={() => toggleEpisode(index, episodeIndex)}
                          className="episode-button"
                        >
                          <strong>{episode.title}</strong> - {episode.duration} min
                        </button>

                        {/* Render episode details if this episode is visible */}
                        {visibleEpisodes[`${index}-${episodeIndex}`] && episode.description && (
                          <p>{episode.description}</p>
                        )}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No seasons available</p>
        )}
      </div>
    </div>
  );
};

ShowDetail.propTypes = {
  show: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
    seasons: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string,
        episodes: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string.isRequired,
            duration: PropTypes.string,
            description: PropTypes.string,
          })
        ),
      })
    ),
  }).isRequired,
};

export default ShowDetail;
