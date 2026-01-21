import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          The Ark
        </Link>
        <div className="navbar-menu">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/about" className="navbar-link">About</Link>
          <Link to="/services" className="navbar-link">Services</Link>
          <Link to="/donate" className="navbar-link">Donate</Link>
          <Link to="/login" className="navbar-link">Login</Link>
          <Link to="/register" className="navbar-link">Register</Link>
        </div>
        <div className="navbar-toggle">
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
