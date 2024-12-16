import { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; 
import profilePicture from "../../assets/images/Phumelele-Dlamini.jpg";
import search from "../../assets/images/search.svg";
import "../../assets/styles/header.css";
import { fetchPreviews } from "../../services/showsApi";

function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [allShows, setAllShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const shows = await fetchPreviews();
        setAllShows(shows);
      } catch (error) {
        console.error("Error fetching shows:", error);
      }
    };

    fetchShows();
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter shows based on the search term
    const results = allShows.filter((show) =>
      show.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredShows(results);
  };

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  // Clear the search input and filtered shows array when the X button is clicked
  const clearSearchResults = () => {
    setSearchTerm("");
    setFilteredShows([]);
  };

  // Navigate to the show's details page
  const handleShowClick = (showId) => {
    navigate(`/shows/${showId}`); 
  };

  return (
    <header className="header">
      {/* Search Bar */}
      <div className="search-bar">
        <span>
          <img src={search} alt="search-svg" />
        </span>
        <input
          type="text"
          placeholder="Search shows..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <div className="search-results">
            <button className="close-results" onClick={clearSearchResults}>
              ✕
            </button>
            {filteredShows.length > 0 ? (
              filteredShows.slice(0, 10).map((show) => (
                <div
                  key={show.id}
                  className="search-result-item"
                  onClick={() => handleShowClick(show.id)}
                >
                  <img src={show.image} alt={show.title} className="show-image" />
                  <span>{show.title}</span>
                </div>
              ))
            ) : (
              <div className="no-results">No results found</div>
            )}
          </div>
        )}
      </div>

      {/* Profile Section */}
      <div className="profile">
        <img src={profilePicture} alt="Profile" className="profile-image" />
        <FiChevronDown className="dropdown-icon" onClick={toggleDropdown} />

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <ul>
              <li>View Profile</li>
              <li>Manage Account</li>
              <li>Log Out</li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
