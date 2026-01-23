import Banner from "../components/Banner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <div className="about-page">
      <Banner
        title="About The Ark"
        subtitle="Rescuing Wildlife & Fostering Shelter Pets"
      />
      <div className="about-content">
        <section className="about-section">
          <h2>
            <FontAwesomeIcon icon={faInfoCircle} /> Our Story
          </h2>
          <p>
            The Ark was founded to protect wildlife from poaching and neglect,
            and to provide shelter for pets in need. Our journey began with a
            vision to create a safe space for all animals—whether wild or
            domestic—where they can heal, thrive, and find loving families.
          </p>
        </section>
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to rescue, rehabilitate, and rehome wildlife and
            shelter pets. We work tirelessly to prevent animal cruelty, educate
            the public, and foster a compassionate community for all living
            beings.
          </p>
        </section>
        <section className="about-section">
          <h2>Our Values</h2>
          <ul>
            <li>Compassion and empathy for every animal</li>
            <li>Integrity and transparency in rescue and adoption</li>
            <li>Community engagement and volunteerism</li>
            <li>Education and advocacy for wildlife protection</li>
            <li>Sustainable, lifelong solutions for animal welfare</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
