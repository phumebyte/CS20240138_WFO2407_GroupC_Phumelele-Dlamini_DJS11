// This component will display the details of the specific show

import PropTypes from "prop-types";
import "../../assets/styles/showDetail.css";

const ShowDetail = ({ show }) => {
  if (!show) return <p>No details found for this show.</p>;

  return (
    <div className="show-detail-container">
      <h1>{show.title}</h1>
      <img src={show.image} alt={show.title} className="show-image" />
      <p>{show.description}</p>
      <p>Seasons: {show.seasons}</p>
    </div>
  );
};

ShowDetail.propTypes = {
  show: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    seasons: PropTypes.number.isRequired,
  }).isRequired,
};

export default ShowDetail;
