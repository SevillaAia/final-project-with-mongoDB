import Banner from '../components/Banner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsHelping, faHeart, faHome, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const Services = () => {
  return (
    <div className="services-page">
      <Banner 
        title="Our Services" 
        subtitle="Programs and support we offer to the community" 
      />
      <div className="services-content">
        <div className="service-card">
          <FontAwesomeIcon icon={faHandsHelping} className="service-icon" />
          <h3>Community Outreach</h3>
          <p>
            We provide direct support to individuals and families through our 
            community outreach programs, including food assistance and basic needs.
          </p>
        </div>
        <div className="service-card">
          <FontAwesomeIcon icon={faHeart} className="service-icon" />
          <h3>Healthcare Support</h3>
          <p>
            Access to healthcare resources and support for those who need medical 
            assistance and wellness programs.
          </p>
        </div>
        <div className="service-card">
          <FontAwesomeIcon icon={faHome} className="service-icon" />
          <h3>Housing Assistance</h3>
          <p>
            We help individuals and families find safe, stable housing and provide 
            support for those experiencing homelessness.
          </p>
        </div>
        <div className="service-card">
          <FontAwesomeIcon icon={faGraduationCap} className="service-icon" />
          <h3>Education Programs</h3>
          <p>
            Educational resources, tutoring, and skill development programs to 
            help people build better futures.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
