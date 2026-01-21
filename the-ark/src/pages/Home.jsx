import Banner from '../components/Banner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart, faUsers, faGlobe } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  return (
    <div className="home-page">
      <Banner 
        title="Welcome to The Ark" 
        subtitle="Making a difference in our community" 
      />
      <div className="home-content">
        <section className="features">
          <div className="feature-card">
            <FontAwesomeIcon icon={faHandHoldingHeart} className="feature-icon" />
            <h3>Make a Difference</h3>
            <p>Your support helps us provide essential services to those in need.</p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon={faUsers} className="feature-icon" />
            <h3>Community Focused</h3>
            <p>We work directly with local communities to create lasting impact.</p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon={faGlobe} className="feature-icon" />
            <h3>Global Reach</h3>
            <p>Our programs extend across the globe, helping people everywhere.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
