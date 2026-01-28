import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faSearch,
  faEdit,
  faTrash,
  faPlus,
  faTimes,
  faImage,
  faLeaf,
  faExclamationTriangle,
  faHeart,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../../../config/config";

const WildAnimalRescue = () => {
  // Sample wild animals data
  const [animals, setAnimals] = useState([
    /*  {
      id: 1,
      name: "Rocky",
      species: "Raccoon",
      rescueDate: "2026-01-20",
      location: "Central Park, North Side",
      condition: "Critical",
      injuryType: "Vehicle collision - leg injury",
      status: "Under Treatment",
      image:
        "https://images.unsplash.com/photo-1497752531616-c3afd9760a11?auto=format&fit=crop&w=300&q=80",
      notes:
        "Found near roadside, requires surgery on left hind leg. Showing signs of improvement.",
    },
    {
      id: 2,
      name: "Sky",
      species: "Red-tailed Hawk",
      rescueDate: "2026-01-18",
      location: "Riverside Drive",
      condition: "Stable",
      injuryType: "Wing fracture",
      status: "Recovering",
      image:
        "https://images.unsplash.com/photo-1549608276-5786777e6587?auto=format&fit=crop&w=300&q=80",
      notes:
        "Wing splint applied. Beginning physical therapy. Expected recovery in 4-6 weeks.",
    },
    {
      id: 3,
      name: "Nutkin",
      species: "Squirrel",
      rescueDate: "2026-01-15",
      location: "Oak Street Garden",
      condition: "Good",
      injuryType: "Orphaned juvenile",
      status: "Ready for Release",
      image:
        "https://images.unsplash.com/photo-1507666405895-422eee7d517f?auto=format&fit=crop&w=300&q=80",
      notes:
        "Successfully weaned and showing natural foraging behavior. Ready for soft release.",
    },
    {
      id: 4,
      name: "Shelly",
      species: "Box Turtle",
      rescueDate: "2026-01-10",
      location: "Highway 42 crossing",
      condition: "Stable",
      injuryType: "Shell damage",
      status: "Under Treatment",
      image:
        "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=300&q=80",
      notes: "Shell repair in progress. Eating well and active.",
    },
    {
      id: 5,
      name: "Midnight",
      species: "Opossum",
      rescueDate: "2026-01-05",
      location: "Suburban backyard",
      condition: "Good",
      injuryType: "Orphaned babies",
      status: "Released",
      image:
        "https://images.unsplash.com/photo-1588690214972-79c5d0d5ea6f?auto=format&fit=crop&w=300&q=80",
      notes:
        "Successfully raised and released back into suitable habitat on Jan 20.",
    }, */
  ]);

  useEffect(() => {
    async function fetchAnimals() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${API_URL}/wild-animals`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        const animalsData = Array.isArray(data) ? data : data?.animals || [];
        setAnimals(animalsData);
      } catch (error) {
        console.error("Error fetching wild animals:", error);
        setAnimals([]);
      }
    }
    fetchAnimals();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCondition, setFilterCondition] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    rescueDate: "",
    location: "",
    condition: "Stable",
    injuryType: "",
    status: "Under Treatment",
    image: "",
    notes: "",
  });

  // Filter animals based on search and filters
  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch =
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCondition =
      filterCondition === "All" || animal.condition === filterCondition;
    const matchesStatus =
      filterStatus === "All" || animal.status === filterStatus;
    return matchesSearch && matchesCondition && matchesStatus;
  });

  const handleOpenModal = (animal = null) => {
    if (animal) {
      setEditingAnimal(animal);
      setFormData({
        name: animal.name,
        species: animal.species,
        rescueDate: animal.rescueDate,
        location: animal.location,
        condition: animal.condition,
        injuryType: animal.injuryType,
        status: animal.status,
        image: animal.image,
        notes: animal.notes,
      });
      setImagePreview(animal.image);
    } else {
      setEditingAnimal(null);
      setFormData({
        name: "",
        species: "",
        rescueDate: new Date().toISOString().split("T")[0],
        location: "",
        condition: "Stable",
        injuryType: "",
        status: "Under Treatment",
        image: "",
        notes: "",
      });
      setImagePreview(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAnimal(null);
    setImagePreview(null);
    setImageFile(null);
    setFormData({
      name: "",
      species: "",
      rescueDate: "",
      location: "",
      condition: "Stable",
      injuryType: "",
      status: "Under Treatment",
      image: "",
      notes: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImageFile(file);
    }
  };

  const uploadToCloudinary = async (file) => {
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "the-ark-uploads");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        uploadData,
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData((prev) => ({ ...prev, image: url }));
    setImagePreview(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = formData.image;

      // Upload image to Cloudinary if a new file was selected
      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
      }

      const animalData = {
        ...formData,
        image: imageUrl,
      };

      const token = localStorage.getItem("authToken");

      if (editingAnimal) {
        // Update existing animal
        const response = await axios.put(
          `${API_URL}/wild-animals/${editingAnimal._id}`,
          animalData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setAnimals((prev) =>
          prev.map((animal) =>
            animal._id === editingAnimal._id ? response.data : animal,
          ),
        );
      } else {
        // Add new animal
        const response = await axios.post(
          `${API_URL}/wild-animals`,
          animalData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setAnimals((prev) => [...prev, response.data]);
      }

      handleCloseModal();
      setImageFile(null);
    } catch (error) {
      console.error("Error saving animal:", error);
      alert("Failed to save animal. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (animalId) => {
    if (window.confirm("Are you sure you want to delete this rescue record?")) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.delete(`${API_URL}/wild-animals/${animalId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAnimals((prev) =>
          prev.filter(
            (animal) => animal._id !== animalId && animal.id !== animalId,
          ),
        );
      } catch (error) {
        console.error("Error deleting animal:", error);
        alert("Failed to delete animal. Please try again.");
      }
    }
  };

  const getConditionIcon = (condition) => {
    switch (condition) {
      case "Critical":
        return <FontAwesomeIcon icon={faExclamationTriangle} />;
      case "Stable":
        return <FontAwesomeIcon icon={faHeart} />;
      case "Good":
        return <FontAwesomeIcon icon={faCheckCircle} />;
      default:
        return null;
    }
  };

  return (
    <div className="wild-animal-rescue">
      <div className="management-header">
        <h1>Wild Animal Rescue</h1>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          <FontAwesomeIcon icon={faPlus} /> Add Rescue Case
        </button>
      </div>

      {/* Stats Summary */}
      <div className="rescue-stats">
        <div className="rescue-stat critical">
          <span className="stat-number">
            {animals.filter((a) => a.condition === "Critical").length}
          </span>
          <span className="stat-label">Critical</span>
        </div>
        <div className="rescue-stat treatment">
          <span className="stat-number">
            {animals.filter((a) => a.status === "Under Treatment").length}
          </span>
          <span className="stat-label">Under Treatment</span>
        </div>
        <div className="rescue-stat recovering">
          <span className="stat-number">
            {animals.filter((a) => a.status === "Recovering").length}
          </span>
          <span className="stat-label">Recovering</span>
        </div>
        <div className="rescue-stat released">
          <span className="stat-number">
            {animals.filter((a) => a.status === "Released").length}
          </span>
          <span className="stat-label">Released</span>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, species, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <select
            value={filterCondition}
            onChange={(e) => setFilterCondition(e.target.value)}
          >
            <option value="All">All Conditions</option>
            <option value="Critical">Critical</option>
            <option value="Stable">Stable</option>
            <option value="Good">Good</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Under Treatment">Under Treatment</option>
            <option value="Recovering">Recovering</option>
            <option value="Ready for Release">Ready for Release</option>
            <option value="Released">Released</option>
          </select>
        </div>
      </div>

      {/* Animals Grid */}
      <div className="rescue-grid">
        {filteredAnimals.length > 0 ? (
          filteredAnimals.map((animal) => (
            <div
              key={animal._id || animal.id}
              className={`rescue-card ${animal.condition.toLowerCase()}`}
            >
              <div className="rescue-card-image">
                {animal.image ? (
                  <img src={animal.image} alt={animal.name} />
                ) : (
                  <div className="rescue-card-placeholder">
                    <FontAwesomeIcon icon={faLeaf} />
                  </div>
                )}
                <span
                  className={`condition-badge ${animal.condition.toLowerCase()}`}
                >
                  {getConditionIcon(animal.condition)} {animal.condition}
                </span>
              </div>
              <div className="rescue-card-content">
                <div className="rescue-card-header">
                  <h3>{animal.name}</h3>
                  <span
                    className={`rescue-status ${animal.status.toLowerCase().replace(/ /g, "-")}`}
                  >
                    {animal.status}
                  </span>
                </div>
                <p className="rescue-species">{animal.species}</p>
                <div className="rescue-details">
                  <div className="rescue-detail">
                    <strong>Rescue Date:</strong> {animal.rescueDate}
                  </div>
                  <div className="rescue-detail">
                    <strong>Location:</strong> {animal.location}
                  </div>
                  <div className="rescue-detail">
                    <strong>Injury/Reason:</strong> {animal.injuryType}
                  </div>
                </div>
                <p className="rescue-notes">{animal.notes}</p>
                <div className="rescue-card-actions">
                  <button
                    className="btn-icon btn-edit"
                    onClick={() => handleOpenModal(animal)}
                    title="Edit record"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="btn-icon btn-delete"
                    onClick={() => handleDelete(animal._id || animal.id)}
                    title="Delete record"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-rescues">
            <FontAwesomeIcon icon={faLeaf} />
            <p>No rescue cases found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Count */}
      <div className="table-footer">
        <p>
          Showing {filteredAnimals.length} of {animals.length} rescue cases
        </p>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div
            className="modal-content rescue-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>
                {editingAnimal ? "Edit Rescue Case" : "Add New Rescue Case"}
              </h2>
              <button className="btn-close" onClick={handleCloseModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              {/* Image Upload Section */}
              <div className="image-upload-section">
                <div className="image-preview">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Animal preview" />
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
                  <label htmlFor="name">Animal Name/ID</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Rocky or WA-2026-001"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="species">Species</label>
                  <input
                    type="text"
                    id="species"
                    name="species"
                    value={formData.species}
                    onChange={handleInputChange}
                    placeholder="e.g., Red-tailed Hawk"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rescueDate">Rescue Date</label>
                  <input
                    type="date"
                    id="rescueDate"
                    name="rescueDate"
                    value={formData.rescueDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="location">Rescue Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Where was the animal found?"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="condition">Condition</label>
                  <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                  >
                    <option value="Critical">Critical</option>
                    <option value="Stable">Stable</option>
                    <option value="Good">Good</option>
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
                    <option value="Under Treatment">Under Treatment</option>
                    <option value="Recovering">Recovering</option>
                    <option value="Ready for Release">Ready for Release</option>
                    <option value="Released">Released</option>
                  </select>
                </div>
              </div>
              <div className="form-group full-width">
                <label htmlFor="injuryType">Injury Type / Rescue Reason</label>
                <input
                  type="text"
                  id="injuryType"
                  name="injuryType"
                  value={formData.injuryType}
                  onChange={handleInputChange}
                  placeholder="e.g., Wing fracture, Orphaned, Vehicle collision"
                  required
                />
              </div>
              <div className="form-group full-width">
                <label htmlFor="notes">Care Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Treatment details, progress updates, special care requirements..."
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
                  {editingAnimal ? "Update Record" : "Add Rescue Case"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WildAnimalRescue;
