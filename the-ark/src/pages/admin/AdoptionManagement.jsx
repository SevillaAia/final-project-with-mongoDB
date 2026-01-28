import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCheck,
  faTimes,
  faEye,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../../../config/config";

const AdoptionManagement = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedAdoption, setSelectedAdoption] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const headers = { Authorization: `Bearer ${token}` };

      // Fetch pets with Pending status (adoption requests)
      const petsRes = await axios.get(`${API_URL}/pets`, {
        headers,
      });
      const petsData = Array.isArray(petsRes.data)
        ? petsRes.data
        : petsRes.data?.pets || [];

      setPets(petsData);

      // Build adoption requests from pets with Pending or Adopted status
      const adoptionRequests = petsData
        .filter((pet) => pet.status === "Pending" || pet.status === "Adopted")
        .map((pet) => ({
          _id: pet._id,
          petName: pet.name,
          petType: pet.species,
          petBreed: pet.breed,
          petImage: pet.image,
          adopterName: pet.adopter || "Unknown",
          status: pet.status === "Pending" ? "Pending" : "Approved",
          createdAt: pet.updatedAt || pet.createdAt,
        }));

      setAdoptions(adoptionRequests);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (adoption) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `${API_URL}/pets/${adoption._id}`,
        { status: "Adopted" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Update local state
      setAdoptions((prev) =>
        prev.map((a) =>
          a._id === adoption._id ? { ...a, status: "Approved" } : a,
        ),
      );

      alert(`Adoption for ${adoption.petName} has been approved!`);
    } catch (error) {
      console.error("Error approving adoption:", error);
      alert("Failed to approve adoption. Please try again.");
    }
  };

  const handleReject = async (adoption) => {
    if (
      !window.confirm(
        `Are you sure you want to reject the adoption request for ${adoption.petName}?`,
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `${API_URL}/pets/${adoption._id}`,
        { status: "Available", adopter: "" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Remove from adoption list
      setAdoptions((prev) => prev.filter((a) => a._id !== adoption._id));

      alert(`Adoption request for ${adoption.petName} has been rejected.`);
    } catch (error) {
      console.error("Error rejecting adoption:", error);
      alert("Failed to reject adoption. Please try again.");
    }
  };

  const handleViewDetails = (adoption) => {
    setSelectedAdoption(adoption);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAdoption(null);
  };

  // Filter adoptions
  const filteredAdoptions = adoptions.filter((adoption) => {
    const matchesSearch =
      adoption.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adoption.adopterName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || adoption.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="adoption-management">
        <div className="page-header">
          <h1>
            <FontAwesomeIcon icon={faClipboardList} /> Adoption Requests
          </h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="adoption-management">
      <div className="page-header">
        <h1>
          <FontAwesomeIcon icon={faClipboardList} /> Adoption Requests
        </h1>
        <p>Review and manage pet adoption applications</p>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search by pet or adopter name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
        </select>
      </div>

      {/* Stats */}
      <div className="adoption-stats">
        <div className="stat-box pending">
          <h3>{adoptions.filter((a) => a.status === "Pending").length}</h3>
          <p>Pending Requests</p>
        </div>
        <div className="stat-box approved">
          <h3>{adoptions.filter((a) => a.status === "Approved").length}</h3>
          <p>Approved Adoptions</p>
        </div>
        <div className="stat-box total">
          <h3>{adoptions.length}</h3>
          <p>Total Requests</p>
        </div>
      </div>

      {/* Adoptions Table */}
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Pet</th>
              <th>Type</th>
              <th>Adopter</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdoptions.length > 0 ? (
              filteredAdoptions.map((adoption) => (
                <tr key={adoption._id}>
                  <td>
                    <div className="pet-cell">
                      <img
                        src={
                          adoption.petImage || "https://via.placeholder.com/40"
                        }
                        alt={adoption.petName}
                        className="pet-thumbnail"
                      />
                      <span>{adoption.petName}</span>
                    </div>
                  </td>
                  <td>{adoption.petType}</td>
                  <td>{adoption.adopterName}</td>
                  <td>{formatDate(adoption.createdAt)}</td>
                  <td>
                    <span
                      className={`status-badge ${adoption.status.toLowerCase()}`}
                    >
                      {adoption.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon view"
                        onClick={() => handleViewDetails(adoption)}
                        title="View Details"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      {adoption.status === "Pending" && (
                        <>
                          <button
                            className="btn-icon approve"
                            onClick={() => handleApprove(adoption)}
                            title="Approve"
                          >
                            <FontAwesomeIcon icon={faCheck} />
                          </button>
                          <button
                            className="btn-icon reject"
                            onClick={() => handleReject(adoption)}
                            title="Reject"
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No adoption requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {showModal && selectedAdoption && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <h2>Adoption Request Details</h2>

            <div className="adoption-details">
              <div className="detail-section">
                <h3>Pet Information</h3>
                <div className="detail-row">
                  <img
                    src={
                      selectedAdoption.petImage ||
                      "https://via.placeholder.com/150"
                    }
                    alt={selectedAdoption.petName}
                    className="detail-image"
                  />
                  <div className="detail-info">
                    <p>
                      <strong>Name:</strong> {selectedAdoption.petName}
                    </p>
                    <p>
                      <strong>Type:</strong> {selectedAdoption.petType}
                    </p>
                    <p>
                      <strong>Breed:</strong>{" "}
                      {selectedAdoption.petBreed || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Adopter Information</h3>
                <p>
                  <strong>Name:</strong> {selectedAdoption.adopterName}
                </p>
                <p>
                  <strong>Request Date:</strong>{" "}
                  {formatDate(selectedAdoption.createdAt)}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`status-badge ${selectedAdoption.status.toLowerCase()}`}
                  >
                    {selectedAdoption.status}
                  </span>
                </p>
              </div>

              {selectedAdoption.status === "Pending" && (
                <div className="modal-actions">
                  <button
                    className="btn-approve"
                    onClick={() => {
                      handleApprove(selectedAdoption);
                      closeModal();
                    }}
                  >
                    <FontAwesomeIcon icon={faCheck} /> Approve Adoption
                  </button>
                  <button
                    className="btn-reject"
                    onClick={() => {
                      handleReject(selectedAdoption);
                      closeModal();
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} /> Reject Request
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdoptionManagement;
