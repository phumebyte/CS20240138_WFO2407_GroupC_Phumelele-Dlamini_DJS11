import { NavLink } from "react-router-dom";
import '../../assets/styles/sidebar.css';

function Sidebar() {
  return (
    <nav>
      <h1>AudioNest</h1>
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
