import Banner from "../components/Banner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandsHelping,
  faHeart,
  faHome,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

const Services = () => {
  return (
    <div className="services-page">
      <Banner
        title="Our Services"
        subtitle="Wildlife Rescue, Pet Shelter & Adoption"
      />
      <div className="services-content">
        <div className="service-card">
          <FontAwesomeIcon icon={faHandsHelping} className="service-icon" />
          <h3>Wildlife Rescue & Rehabilitation</h3>
          <p>
            Our team rescues wildlife from dangerous situations, provides
            medical care, and rehabilitates them for release or sanctuary.
          </p>
        </div>
        <div className="service-card">
          <FontAwesomeIcon icon={faHeart} className="service-icon" />
          <h3>Shelter & Foster Care</h3>
          <p>
            We offer safe shelter and foster care for pets in need, preparing
            them for adoption into loving homes.
          </p>
        </div>
        <div className="service-card">
          <FontAwesomeIcon icon={faHome} className="service-icon" />
          <h3>Adoption Services</h3>
          <p>
            Our adoption program matches rescued pets with families, ensuring
            every animal finds a forever home.
          </p>
        </div>
        <div className="service-card">
          <FontAwesomeIcon icon={faGraduationCap} className="service-icon" />
          <h3>Education & Advocacy</h3>
          <p>
            We provide basic education on how to care for house pets, and offer
            guidance on how to report possible poachers or hurt animals. Our
            advocacy efforts empower the community to protect and support both
            wildlife and pets.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
