import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import '../../assets/styles/header.css';

function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <header className="header">
      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search shows..." />
      </div>

      {/* Profile Section */}
      <div className="profile">
        <img
          src="" 
          alt="Profile"
          className="profile-image"
        />
        <FiChevronDown
          className="dropdown-icon"
          onClick={toggleDropdown}
        />

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
