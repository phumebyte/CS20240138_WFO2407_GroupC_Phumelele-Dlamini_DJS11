import { NavLink } from "react-router-dom";
import logo from '../../assets/images/audioNEST-logo.png'
import '../../assets/styles/sidebar.css';

function Sidebar() {
  return (
    <nav>
        <div className="logo-container">
            <img src={logo} alt="audioNest Logo" className="logo"/>
            <h1>AudioNest</h1>
        </div>
      
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favourites"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Favourites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
