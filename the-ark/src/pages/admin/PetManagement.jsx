import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faEdit,
  faTrash,
  faPlus,
  faTimes,
  faImage,
  faPaw,
} from "@fortawesome/free-solid-svg-icons";

const PetManagement = () => {
  // Sample pets data
  const [pets, setPets] = useState([
    {
      id: 1,
      name: "Buddy",
      species: "Dog",
      breed: "Golden Retriever",
      age: "3 years",
      gender: "Male",
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=300&q=80",
      description:
        "Friendly and energetic golden retriever looking for a loving home.",
    },
    {
      id: 2,
      name: "Whiskers",
      species: "Cat",
      breed: "Persian",
      age: "2 years",
      gender: "Female",
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80",
      description:
        "Calm and affectionate Persian cat, perfect for apartment living.",
    },
    {
      id: 3,
      name: "Charlie",
      species: "Dog",
      breed: "Beagle",
      age: "1 year",
      gender: "Male",
      status: "Pending",
      image:
        "https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=300&q=80",
      description: "Playful beagle puppy with lots of energy and love to give.",
    },
    {
      id: 4,
      name: "Luna",
      species: "Cat",
      breed: "Siamese",
      age: "4 years",
      gender: "Female",
      status: "Adopted",
      image:
        "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=300&q=80",
      description: "Beautiful Siamese cat with striking blue eyes.",
    },
    {
      id: 5,
      name: "Max",
      species: "Dog",
      breed: "German Shepherd",
      age: "5 years",
      gender: "Male",
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=300&q=80",
      description: "Loyal and protective German Shepherd, great with families.",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecies, setFilterSpecies] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    species: "Dog",
    breed: "",
    age: "",
    gender: "Male",
    status: "Available",
    image: "",
    description: "",
  });

  // Filter pets based on search and filters
  const filteredPets = pets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecies =
      filterSpecies === "All" || pet.species === filterSpecies;
    const matchesStatus = filterStatus === "All" || pet.status === filterStatus;
    return matchesSearch && matchesSpecies && matchesStatus;
  });

  const handleOpenModal = (pet = null) => {
    if (pet) {
      setEditingPet(pet);
      setFormData({
        name: pet.name,
        species: pet.species,
        breed: pet.breed,
        age: pet.age,
        gender: pet.gender,
        status: pet.status,
        image: pet.image,
        description: pet.description,
      });
      setImagePreview(pet.image);
    } else {
      setEditingPet(null);
      setFormData({
        name: "",
        species: "Dog",
        breed: "",
        age: "",
        gender: "Male",
        status: "Available",
        image: "",
        description: "",
      });
      setImagePreview(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPet(null);
    setImagePreview(null);
    setFormData({
      name: "",
      species: "Dog",
      breed: "",
      age: "",
      gender: "Male",
      status: "Available",
      image: "",
      description: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      // In a real app, you would upload this to a server
      // For now, we'll store the preview URL
      setFormData((prev) => ({ ...prev, image: previewUrl }));
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData((prev) => ({ ...prev, image: url }));
    setImagePreview(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPet) {
      // Update existing pet
      setPets((prev) =>
        prev.map((pet) =>
          pet.id === editingPet.id ? { ...pet, ...formData } : pet,
        ),
      );
    } else {
      // Add new pet
      const newPet = {
        id: Date.now(),
        ...formData,
      };
      setPets((prev) => [...prev, newPet]);
    }
    handleCloseModal();
  };

  const handleDelete = (petId) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      setPets((prev) => prev.filter((pet) => pet.id !== petId));
    }
  };

  return (
    <div className="pet-management">
      <div className="management-header">
        <h1>Pet Management</h1>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          <FontAwesomeIcon icon={faPlus} /> Add Pet
        </button>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search pets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <select
            value={filterSpecies}
            onChange={(e) => setFilterSpecies(e.target.value)}
          >
            <option value="All">All Species</option>
            <option value="Dog">Dogs</option>
            <option value="Cat">Cats</option>
            <option value="Bird">Birds</option>
            <option value="Rabbit">Rabbits</option>
            <option value="Other">Other</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Available">Available</option>
            <option value="Pending">Pending</option>
            <option value="Adopted">Adopted</option>
          </select>
        </div>
      </div>

      {/* Pets Grid */}
      <div className="pets-grid">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <div key={pet.id} className="pet-card">
              <div className="pet-card-image">
                {pet.image ? (
                  <img src={pet.image} alt={pet.name} />
                ) : (
                  <div className="pet-card-placeholder">
                    <FontAwesomeIcon icon={faPaw} />
                  </div>
                )}
                <span
                  className={`pet-status-badge ${pet.status.toLowerCase()}`}
                >
                  {pet.status}
                </span>
              </div>
              <div className="pet-card-content">
                <h3>{pet.name}</h3>
                <p className="pet-breed">{pet.breed}</p>
                <div className="pet-details">
                  <span>{pet.species}</span>
                  <span>•</span>
                  <span>{pet.age}</span>
                  <span>•</span>
                  <span>{pet.gender}</span>
                </div>
                <p className="pet-description">{pet.description}</p>
                <div className="pet-card-actions">
                  <button
                    className="btn-icon btn-edit"
                    onClick={() => handleOpenModal(pet)}
                    title="Edit pet"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="btn-icon btn-delete"
                    onClick={() => handleDelete(pet.id)}
                    title="Delete pet"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-pets">
            <FontAwesomeIcon icon={faPaw} />
            <p>No pets found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Pet count */}
      <div className="table-footer">
        <p>
          Showing {filteredPets.length} of {pets.length} pets
        </p>
      </div>

      {/* Add/Edit Pet Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div
            className="modal-content pet-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>{editingPet ? "Edit Pet" : "Add New Pet"}</h2>
              <button className="btn-close" onClick={handleCloseModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              {/* Image Upload Section */}
              <div className="image-upload-section">
                <div className="image-preview">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Pet preview" />
                  ) : (
                    <div className="image-placeholder">
                      <FontAwesomeIcon icon={faImage} />
                      <span>No image</span>
                    </div>
                  )}
                </div>
                <div className="image-upload-controls">
                  <label className="btn-upload">
                    <FontAwesomeIcon icon={faImage} /> Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      hidden
                    />
                  </label>
                  <span className="upload-or">or</span>
                  <input
                    type="url"
                    placeholder="Paste image URL..."
                    value={formData.image}
                    onChange={handleImageUrlChange}
                    className="image-url-input"
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Pet Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="species">Species</label>
                  <select
                    id="species"
                    name="species"
                    value={formData.species}
                    onChange={handleInputChange}
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="breed">Breed</label>
                  <input
                    type="text"
                    id="breed"
                    name="breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="text"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="e.g., 2 years"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Available">Available</option>
                    <option value="Pending">Pending</option>
                    <option value="Adopted">Adopted</option>
                  </select>
                </div>
              </div>
              <div className="form-group full-width">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Describe the pet's personality, history, special needs..."
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingPet ? "Update Pet" : "Add Pet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetManagement;
