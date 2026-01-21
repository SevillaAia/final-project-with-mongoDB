import Banner from '../components/Banner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  return (
    <div className="about-page">
      <Banner 
        title="About The Ark" 
        subtitle="Learn more about our mission and values" 
      />
      <div className="about-content">
        <section className="about-section">
          <h2>
            <FontAwesomeIcon icon={faInfoCircle} /> Our Story
          </h2>
          <p>
            The Ark was founded with a simple mission: to make a positive impact 
            in the lives of those who need it most. We believe in the power of 
            community and the difference that compassion can make.
          </p>
        </section>
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            We are committed to providing support, resources, and hope to 
            individuals and families facing challenging circumstances. Through 
            our programs and services, we strive to create lasting change.
          </p>
        </section>
        <section className="about-section">
          <h2>Our Values</h2>
          <ul>
            <li>Compassion and empathy in all we do</li>
            <li>Integrity and transparency in our operations</li>
            <li>Community engagement and collaboration</li>
            <li>Sustainable and impactful solutions</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
