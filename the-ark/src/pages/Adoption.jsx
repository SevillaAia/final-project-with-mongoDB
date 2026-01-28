import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../App.css";
import { API_URL } from "../../config/config";

const Adoption = () => {
  const { user, isAuthenticated } = useAuth();
  const [adoptionProfiles, setAdoptionProfiles] = useState([]);
  const [wildlifeRescues, setWildlifeRescues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    reason: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch pets for adoption
        const petsResponse = await axios.get(`${API_URL}/pets`);
        const petsData = Array.isArray(petsResponse.data)
          ? petsResponse.data
          : petsResponse.data?.pets || [];
        // Filter only available pets for adoption
        const availablePets = petsData.filter(
          (pet) => pet.status === "Available",
        );
        setAdoptionProfiles(availablePets);

        // Fetch wild animals
        const wildResponse = await axios.get(`${API_URL}/wild-animals`);
        const wildData = Array.isArray(wildResponse.data)
          ? wildResponse.data
          : wildResponse.data?.animals || [];
        setWildlifeRescues(wildData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAdoptClick = (pet) => {
    if (!isAuthenticated) {
      alert("Please log in to adopt a pet.");
      return;
    }
    setSelectedPet(pet);
    setFormData({
      fullName: user?.username || "",
      email: user?.email || "",
      phone: "",
      address: "",
      reason: "",
    });
    setShowModal(true);
    setSuccessMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPet || submitting) return;

    setSubmitting(true);
    try {
      const token = localStorage.getItem("authToken");

      // Create adoption record
      const adoptionData = {
        petId: selectedPet._id,
        petName: selectedPet.name,
        petType: selectedPet.species,
        adopterName: formData.fullName,
        adopterEmail: formData.email,
        adopterPhone: formData.phone,
        adopterAddress: formData.address,
        reason: formData.reason,
        userId: user?._id,
        status: "Pending",
      };

      // Try to create adoption record (optional - may not exist yet)
      try {
        await axios.post(`${API_URL}/adoptions`, adoptionData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (adoptionError) {
        console.log(
          "Adoptions endpoint not available, continuing with pet status update",
        );
      }

      // Update pet status to Pending
      await axios.put(
        `${API_URL}/pets/${selectedPet._id}`,
        { status: "Pending", adopter: formData.fullName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Remove pet from available list
      setAdoptionProfiles((prev) =>
        prev.filter((pet) => pet._id !== selectedPet._id),
      );

      setSuccessMessage(
        `Your adoption application for ${selectedPet.name} has been submitted successfully! We will contact you soon.`,
      );
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        reason: "",
      });

      // Close modal after 3 seconds
      setTimeout(() => {
        setShowModal(false);
        setSelectedPet(null);
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error submitting adoption:", error);
      alert("Failed to submit adoption application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPet(null);
    setSuccessMessage("");
  };

  if (loading) {
    return (
      <div className="adoption-page">
        <h1>Adoption & Wildlife Rescue</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="adoption-page">
      <h1>Adoption & Wildlife Rescue</h1>
      <p>
        The Ark rescues and shelters wildlife, protecting them from poachers. We
        also have local shelters that care for rescued pets and help them find
        loving homes. Below are animals ready for adoption and wildlife needing
        your support.
      </p>
      <h2>House Pets for Adoption</h2>
      <div className="adoption-cards">
        {adoptionProfiles.length > 0 ? (
          adoptionProfiles.map((pet) => (
            <div className="adoption-card" key={pet._id || pet.id}>
              <img src={pet.image} alt={pet.name} className="adoption-img" />
              <h3>{pet.name}</h3>
              <p>
                {pet.species} • {pet.breed} • {pet.age}
              </p>
              <p>{pet.description}</p>
              <button
                className="adopt-btn"
                onClick={() => handleAdoptClick(pet)}
              >
                Adopt
              </button>
            </div>
          ))
        ) : (
          <p>No pets available for adoption at the moment.</p>
        )}
      </div>
      <h2>Wildlife Rescues Needing Support</h2>
      <div className="adoption-cards">
        {wildlifeRescues.length > 0 ? (
          wildlifeRescues.map((animal) => (
            <div className="adoption-card" key={animal._id || animal.id}>
              <img
                src={animal.image}
                alt={animal.name}
                className="adoption-img"
              />
              <h3>{animal.name}</h3>
              <p>
                {animal.species} • {animal.condition}
              </p>
              <p>{animal.notes || animal.description}</p>
              <a href="/donate" className="support-btn">
                Support
              </a>
            </div>
          ))
        ) : (
          <p>No wildlife rescues at the moment.</p>
        )}
      </div>

      {/* Adoption Form Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>

            {successMessage ? (
              <div className="success-message">
                <h2>🎉 Success!</h2>
                <p>{successMessage}</p>
              </div>
            ) : (
              <>
                <h2>Adopt {selectedPet?.name}</h2>
                <div className="modal-pet-info">
                  <img
                    src={selectedPet?.image}
                    alt={selectedPet?.name}
                    className="modal-pet-image"
                  />
                  <div>
                    <p>
                      <strong>Species:</strong> {selectedPet?.species}
                    </p>
                    <p>
                      <strong>Breed:</strong> {selectedPet?.breed}
                    </p>
                    <p>
                      <strong>Age:</strong> {selectedPet?.age}
                    </p>
                  </div>
                </div>

                {!isAuthenticated ? (
                  <div className="login-prompt">
                    <p>Please log in to submit an adoption application.</p>
                    <Link to="/login" className="adopt-btn">
                      Login
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="adoption-form">
                    <div className="form-group">
                      <label htmlFor="fullName">Full Name *</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Address *</label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        rows="2"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="reason">
                        Why do you want to adopt {selectedPet?.name}? *
                      </label>
                      <textarea
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleInputChange}
                        required
                        rows="3"
                        placeholder="Tell us about your home, lifestyle, and why you'd be a great fit..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="adopt-btn"
                      disabled={submitting}
                      style={{ width: "100%", marginTop: "1rem" }}
                    >
                      {submitting ? "Submitting..." : "Submit Application"}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Adoption;
