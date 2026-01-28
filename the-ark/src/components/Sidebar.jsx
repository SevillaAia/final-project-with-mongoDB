import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDashboard,
  faUsers,
  faPaw,
  faLeaf,
  faGear,
  faHome,
  faMoon,
  faSun,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";

function Sidebar() {
  const { theme, toggleTheme, isDark } = useTheme();
  return (
    <div>
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>Admin Panel</h2>
        </div>
        <nav className="admin-nav">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <FontAwesomeIcon icon={faDashboard} /> Dashboard
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <FontAwesomeIcon icon={faUsers} /> Users
          </NavLink>
          <NavLink
            to="/admin/pets"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <FontAwesomeIcon icon={faPaw} /> Pets
          </NavLink>
          <NavLink
            to="/admin/adoptions"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <FontAwesomeIcon icon={faClipboardList} /> Adoptions
          </NavLink>
          <NavLink
            to="/admin/wild-rescue"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <FontAwesomeIcon icon={faLeaf} /> Wild Rescue
          </NavLink>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <FontAwesomeIcon icon={faGear} /> Settings
          </NavLink>
          <button className="admin-theme-toggle" onClick={toggleTheme}>
            <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
          <NavLink to="/" className="admin-nav-link back-link">
            <FontAwesomeIcon icon={faHome} /> Back to Site
          </NavLink>
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;
