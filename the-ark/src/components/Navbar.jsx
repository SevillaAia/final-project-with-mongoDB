import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMoon,
  faSun,
  faUser,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { toggleTheme, isDark } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          The Ark
        </Link>
        <div className="navbar-menu">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/about" className="navbar-link">
            About
          </Link>
          <Link to="/services" className="navbar-link">
            Services
          </Link>
          <Link to="/adoption" className="navbar-link">
            Adoption
          </Link>
          <Link to="/donate" className="navbar-link">
            Donate
          </Link>
          {isAuthenticated ? (
            <Link to="/profile" className="navbar-link profile-link">
              <img
                src={
                  user?.profilePicture ||
                  "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=32&q=80"
                }
                alt={user?.username || "Profile"}
                className="navbar-avatar"
              />
              <span>{user?.username || "Profile"}</span>
            </Link>
          ) : (
            <Link to="/login" className="navbar-link">
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Link>
          )}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
          </button>
        </div>
        <div className="navbar-toggle">
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
