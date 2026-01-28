import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingHeart,
  faUsers,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../../config/config";

// Import logo images
import EWTLogo from "../assets/EWTLogo.png";
import GWCLogo from "../assets/GWCLogo.png";
import wwfLogo from "../assets/wwfLogo.png";
import haribonLogo from "../assets/haribonLogo.png";
import SSCSLogo from "../assets/SSCSLogo.png";
import unescoLogo from "../assets/unesco.png";
import MCiLogo from "../assets/MCiLogo.png";

const Home = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();

  // Example comments data
  const [comments, setComments] = useState([
    /*     {
      name: "Jane D.",
      photo:
        "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=128&q=80",
      rating: 5,
      comment:
        "The Ark truly cares for every animal. The adoption process was smooth and the staff are amazing!",
    },
    {
      name: "Carlos M.",
      photo:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=128&q=80",
      rating: 4,
      comment:
        "Great experience supporting wildlife rescue. I appreciate the transparency and dedication.",
    },
    {
      name: "Ava S.",
      photo:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=128&q=80",
      rating: 5,
      comment:
        "Volunteering at The Ark has been life-changing. The team is passionate and the animals are well cared for.",
    }, */
  ]);

  useEffect(() => {
    // Fetch comments from backend API (if available)
    async function getAllComments() {
      try {
        const response = await axios.get(`${API_URL}/comments`);
        console.log("Comments from backend:", response.data);
        if (response.data && response.data.length > 0) {
          setComments(response.data);
        }
      } catch (error) {
        // Comments endpoint not available yet - using local state only
        console.error("Error fetching comments:", error);
      }
    }
    getAllComments();
  }, []);

  const [editIdx, setEditIdx] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    photo: "",
    rating: 5,
    comment: "",
  });

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditForm({ ...comments[idx] });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditRatingChange = (r) => {
    setEditForm((prev) => ({ ...prev, rating: r }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setComments((prev) =>
      prev.map((c, i) => (i === editIdx ? { ...editForm } : c)),
    );
    setEditIdx(null);
  };

  const handleDelete = async (idx) => {
    const commentToDelete = comments[idx];

    // Optimistically remove from UI
    setComments((prev) => prev.filter((_, i) => i !== idx));
    if (editIdx === idx) setEditIdx(null);

    // Delete from backend
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${API_URL}/comments/${commentToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
      // If delete fails, add the comment back
      setComments((prev) => [
        ...prev.slice(0, idx),
        commentToDelete,
        ...prev.slice(idx),
      ]);
      alert("Failed to delete comment. Please try again.");
    }
  };

  const [form, setForm] = useState({
    rating: 5,
    comment: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (r) => {
    setForm((prev) => ({ ...prev, rating: r }));
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated || !form.comment || submitting) return;

    const newComment = {
      name: user.username || user.email,
      photo:
        user.profilePicture ||
        "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=128&q=80",
      rating: form.rating,
      comment: form.comment,
      user: user._id,
    };

    console.log("Submitting comment:", newComment);
    console.log("User object:", user);

    setSubmitting(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(`${API_URL}/comments`, newComment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Add the saved comment (with _id from backend) to the list
      setComments((prev) => [response.data, ...prev]);
      setForm({ rating: 5, comment: "" });
    } catch (error) {
      console.error("Error saving comment:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      // Fallback: add to local state even if backend fails
      setComments((prev) => [newComment, ...prev]);
      setForm({ rating: 5, comment: "" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="home-page">
      <Banner
        title="Welcome to The Ark"
        subtitle="Rescuing Wildlife & Fostering Shelter Pets"
      />

      <div className="home-content">
        <section className="features">
          <div className="feature-card">
            <FontAwesomeIcon
              icon={faHandHoldingHeart}
              className="feature-icon"
            />
            <h3>Wildlife Rescue</h3>
            <p>
              We protect and rehabilitate wildlife from poaching and harm,
              giving them a safe haven and a second chance at life.
            </p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon={faUsers} className="feature-icon" />
            <h3>Shelter Pet Adoption</h3>
            <p>
              Our local shelters foster rescued pets, preparing them for loving
              families and forever homes through our adoption program.
            </p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon={faGlobe} className="feature-icon" />
            <h3>Community & Volunteers</h3>
            <p>
              The Ark thrives with the help of dedicated volunteers and on-call
              vets, ensuring every animal receives the care they deserve.
            </p>
          </div>
        </section>
        {/* Comment Section */}
        <section className="comments-section">
          <h2>User Comments & Ratings</h2>
          {isAuthenticated ? (
            <form
              className="comment-form"
              onSubmit={handleSubmit}
              style={{ marginBottom: "2rem" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1rem",
                  padding: "0.75rem",
                  backgroundColor: "var(--card-bg, #f5f5f5)",
                  borderRadius: "8px",
                }}
              >
                <img
                  src={
                    user.profilePicture ||
                    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=128&q=80"
                  }
                  alt={user.username || user.email}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <strong>{user.username || user.email}</strong>
                  {user.role && (
                    <span
                      style={{
                        marginLeft: "0.5rem",
                        fontSize: "0.8rem",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "4px",
                        backgroundColor:
                          user.role === "Admin" ? "#4caf50" : "#2196f3",
                        color: "white",
                      }}
                    >
                      {user.role}
                    </span>
                  )}
                </div>
              </div>
              <textarea
                name="comment"
                placeholder="Your Comment"
                value={form.comment}
                onChange={handleInputChange}
                className="comment-input"
                required
              />
              <div className="comment-rating-input">
                {[1, 2, 3, 4, 5].map((r) => (
                  <span
                    key={r}
                    style={{
                      cursor: "pointer",
                      color: r <= form.rating ? "#f5b301" : "#ccc",
                      fontSize: "1.5rem",
                    }}
                    onClick={() => handleRatingChange(r)}
                    aria-label={`Rate ${r}`}
                  >
                    ★
                  </span>
                ))}
                <span style={{ marginLeft: "0.5rem" }}>({form.rating})</span>
              </div>
              <button
                type="submit"
                className="adopt-btn"
                style={{ marginTop: "1rem", width: "100%" }}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Comment"}
              </button>
            </form>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                marginBottom: "2rem",
                backgroundColor: "var(--card-bg, #f5f5f5)",
                borderRadius: "8px",
              }}
            >
              <p style={{ marginBottom: "1rem" }}>
                Please log in to leave a comment.
              </p>
              <Link to="/login" className="adopt-btn">
                Login
              </Link>
            </div>
          )}
          <div className="comments-list">
            {comments.map((c, idx) => (
              <div className="comment-card" key={idx}>
                {editIdx === idx ? (
                  <form
                    className="comment-edit-form"
                    onSubmit={handleEditSubmit}
                    style={{ width: "100%" }}
                  >
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditInputChange}
                      className="comment-input"
                      required
                    />
                    <input
                      type="url"
                      name="photo"
                      value={editForm.photo}
                      onChange={handleEditInputChange}
                      className="comment-input"
                    />
                    <textarea
                      name="comment"
                      value={editForm.comment}
                      onChange={handleEditInputChange}
                      className="comment-input"
                      required
                    />
                    <div className="comment-rating-input">
                      {[1, 2, 3, 4, 5].map((r) => (
                        <span
                          key={r}
                          style={{
                            cursor: "pointer",
                            color: r <= editForm.rating ? "#f5b301" : "#ccc",
                            fontSize: "1.5rem",
                          }}
                          onClick={() => handleEditRatingChange(r)}
                          aria-label={`Rate ${r}`}
                        >
                          ★
                        </span>
                      ))}
                      <span style={{ marginLeft: "0.5rem" }}>
                        ({editForm.rating})
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="adopt-btn"
                      style={{ marginTop: "0.5rem", width: "100%" }}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="support-btn"
                      style={{ marginTop: "0.5rem", width: "100%" }}
                      onClick={() => setEditIdx(null)}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <img
                      src={
                        c.user?.profilePicture ||
                        c.photo ||
                        "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=128&q=80"
                      }
                      alt={c.user?.username || c.name}
                      className="comment-photo"
                    />
                    <div className="comment-content">
                      <div className="comment-header">
                        <span className="comment-name">
                          {c.user?.username || c.name || "Anonymous"}
                        </span>
                        <span className="comment-rating">
                          {"★".repeat(c.rating)}
                          {"☆".repeat(5 - c.rating)}
                        </span>
                      </div>
                      <p className="comment-text">{c.comment}</p>
                      {/* Only show edit/delete buttons if user owns the comment or is admin */}
                      {isAuthenticated &&
                        (isAdmin ||
                          c.user?._id === user?._id ||
                          c.user === user?._id) && (
                          <div
                            style={{
                              display: "flex",
                              gap: "0.5rem",
                              marginTop: "0.5rem",
                            }}
                          >
                            <button
                              className="adopt-btn"
                              style={{
                                padding: "0.3rem 0.8rem",
                                fontSize: "0.95rem",
                              }}
                              onClick={() => handleEdit(idx)}
                            >
                              Edit
                            </button>
                            <button
                              className="support-btn"
                              style={{
                                padding: "0.3rem 0.8rem",
                                fontSize: "0.95rem",
                              }}
                              onClick={() => handleDelete(idx)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
        {/* Scrolling logos for supporting organizations */}
        <div className="scrolling-logos-container">
          <div className="scrolling-logos">
            <img
              src={EWTLogo}
              alt="Endangered Wildlife Trust"
              className="logo-icon"
            />
            <img
              src={GWCLogo}
              alt="Global Wildlife Conservancy"
              className="logo-icon"
            />
            <img src={wwfLogo} alt="Wildlife WWF" className="logo-icon" />
            <img
              src={haribonLogo}
              alt="Haribon Foundation"
              className="logo-icon"
            />
            <img
              src={SSCSLogo}
              alt="Sea Shepherd Conservation Society"
              className="logo-icon"
            />
            <img src={unescoLogo} alt="UNESCO" className="logo-icon" />
            <img
              src={MCiLogo}
              alt="Marine Conservation Institute"
              className="logo-icon"
            />
            {/* Add more logos as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
