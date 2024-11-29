import PropTypes from "prop-types";

const ShowDetail = ({ show }) => {
  if (!show) return null; // If no data, return null

  // Handle seasons as an array and render them
  const seasons = Array.isArray(show.seasons) ? show.seasons : [];
  const episodes = show.episodes || []; // Handle episodes as an array

  return (
    <div className="show-details">
      <h2>{show.title}</h2> 
      <img src={show.image} alt={show.title} className="show-image" /> {/* Display show image */}
      <p>{show.description}</p>

      <p>Seasons:</p>
      <ul>
        {seasons.length > 0 ? (
          seasons.map((season, index) => (
            <li key={index}>
              <strong>{season.title}</strong> - {season.episodes.length} Episodes
            </li>
          ))
        ) : (
          <p>No seasons available</p>
        )}
      </ul>
      
      <p>Episodes:</p>
      <ul>
        {episodes.length > 0 ? (
          episodes.map((episode, index) => (
            <li key={index}>
              <strong>{episode.title}</strong> - {episode.duration} min
            </li>
          ))
        ) : (
          <p>No episodes available</p>
        )}
      </ul>
    </div>
  );
};

ShowDetail.propTypes = {
  show: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
    seasons: PropTypes.array, // Expecting an array for seasons
    episodes: PropTypes.array, // Expecting an array for episodes
  }).isRequired,
};

export default ShowDetail;
