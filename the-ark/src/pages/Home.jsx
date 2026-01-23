import React, { useState } from "react";
import Banner from "../components/Banner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingHeart,
  faUsers,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  // Example comments data
  const [comments, setComments] = useState([
    {
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
    },
  ]);

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

  const handleDelete = (idx) => {
    setComments((prev) => prev.filter((_, i) => i !== idx));
    if (editIdx === idx) setEditIdx(null);
  };

  const [form, setForm] = useState({
    name: "",
    photo: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.comment) return;
    setComments((prev) => [
      {
        name: form.name,
        photo:
          form.photo ||
          "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=128&q=80",
        rating: form.rating,
        comment: form.comment,
      },
      ...prev,
    ]);
    setForm({ name: "", photo: "", rating: 5, comment: "" });
  };

  return (
    <div className="home-page">
      <Banner
        title="Welcome to The Ark"
        subtitle="Rescuing Wildlife & Fostering Shelter Pets"
      />
      {/* Scrolling logos for supporting organizations */}
      <div className="scrolling-logos-container">
        <div className="scrolling-logos">
          <img
            src="/src/assets/logo1.png"
            alt="Wildlife Org 1"
            className="logo-icon"
          />
          <img
            src="/src/assets/logo2.png"
            alt="Wildlife Org 2"
            className="logo-icon"
          />
          <img
            src="/src/assets/logo3.png"
            alt="Wildlife Org 3"
            className="logo-icon"
          />
          <img
            src="/src/assets/logo4.png"
            alt="Wildlife Org 4"
            className="logo-icon"
          />
          {/* Add more logos as needed */}
        </div>
      </div>
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
          <form
            className="comment-form"
            onSubmit={handleSubmit}
            style={{ marginBottom: "2rem" }}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleInputChange}
              className="comment-input"
              required
            />
            <input
              type="url"
              name="photo"
              placeholder="Photo URL (Unsplash, optional)"
              value={form.photo}
              onChange={handleInputChange}
              className="comment-input"
            />
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
            >
              Submit Comment
            </button>
          </form>
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
                    <img src={c.photo} alt={c.name} className="comment-photo" />
                    <div className="comment-content">
                      <div className="comment-header">
                        <span className="comment-name">{c.name}</span>
                        <span className="comment-rating">
                          {"★".repeat(c.rating)}
                          {"☆".repeat(5 - c.rating)}
                        </span>
                      </div>
                      <p className="comment-text">{c.comment}</p>
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
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
