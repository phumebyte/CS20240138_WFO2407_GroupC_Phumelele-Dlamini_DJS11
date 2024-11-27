import "../../assets/styles/homePageFilter.css"; // Import CSS
import PropTypes from "prop-types";

const HomePageFilter = ({ onSort }) => {
  return (
    <div className="homepage-filter">
      <button onClick={() => onSort("a-z")} className="filter-button">
        Sort A-Z
      </button>
      <button onClick={() => onSort("z-a")} className="filter-button">
        Sort Z-A
      </button>
      <button onClick={() => onSort("oldest")} className="filter-button">
        Oldest Updated
      </button>
      <button onClick={() => onSort("newest")} className="filter-button">
        Newest Updated
      </button>
    </div>
  );
};

// Add PropTypes validation
HomePageFilter.propTypes = {
    onSort: PropTypes.func.isRequired, // `onSort` must be a function and is required
  };

export default HomePageFilter;
