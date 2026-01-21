import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Banner = ({ title, subtitle }) => {
  return (
    <div className="banner">
      <div className="banner-content">
        <h1 className="banner-title">
          <FontAwesomeIcon icon={faHeart} className="banner-icon" />
          {title}
        </h1>
        {subtitle && <p className="banner-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
};

export default Banner;
