import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faCamera,
  faSpinner,
  faSave,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [previewImage, setPreviewImage] = useState(
    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&q=80",
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // Fetch user data from database on component mount
  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");

      // If no token, check if we have user data from context
      if (!token) {
        if (user && isMounted) {
          setFormData({
            username: user.username || "",
            email: user.email || "",
          });
          setPreviewImage(
            user.profilePicture ||
              "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&q=80",
          );
        }
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5005/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data.currentLoggedInUser;
        if (isMounted) {
          setFormData({
            username: userData.username || "",
            email: userData.email || "",
          });
          setPreviewImage(
            userData.profilePicture ||
              "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&q=80",
          );
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Fallback to user data from context if API fails
        if (user && isMounted) {
          setFormData({
            username: user.username || "",
            email: user.email || "",
          });
          setPreviewImage(
            user.profilePicture ||
              "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&q=80",
          );
        } else if (isMounted) {
          setMessage("Failed to load profile data.");
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUserData();

    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array - only run once on mount

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection for profile picture
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image file.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image size should be less than 5MB.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    await uploadToCloudinary(file);
  };

  // Upload image to Cloudinary
  const uploadToCloudinary = async (file) => {
    setUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("upload_preset", "the-ark-uploads");

      console.log(
        "Uploading to Cloudinary...",
        file.name,
        file.type,
        file.size,
      );

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dnv3hrhir/image/upload",
        uploadData,
      );

      console.log("Cloudinary response:", response.data);
      setPreviewImage(response.data.secure_url);
      setMessage("Image uploaded successfully!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      console.error("Error response:", error.response?.data);
      setMessage(
        error.response?.data?.error?.message ||
          "Failed to upload image. Please try again.",
      );
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    } finally {
      setUploading(false);
    }
  };

  // Save profile changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        "http://localhost:5005/auth/profile",
        {
          username: formData.username,
          profilePicture: previewImage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Update user in context
      if (updateUser) {
        updateUser(response.data);
      }

      setMessage("Profile updated successfully!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage(
        error.response?.data?.errorMessage ||
          "Failed to update profile. Please try again.",
      );
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Show loading state
  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <FontAwesomeIcon icon={faSpinner} spin size="2x" />
            <p style={{ marginTop: "1rem" }}>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <h2>Please log in to view your profile</h2>
          <button className="auth-button" onClick={() => navigate("/login")}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>My Profile</h2>

        {showAlert && message && (
          <div
            className={`alert ${message.includes("successfully") ? "alert-success" : "alert-error"}`}
            onClick={() => setShowAlert(false)}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Profile Picture Section */}
          <div className="profile-picture-section">
            <div className="profile-picture-wrapper">
              <img
                src={previewImage}
                alt="Profile"
                className="profile-picture"
              />
              {uploading && (
                <div className="upload-overlay">
                  <FontAwesomeIcon icon={faSpinner} spin />
                </div>
              )}
              <button
                type="button"
                className="change-picture-btn"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                <FontAwesomeIcon icon={faCamera} />
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: "none" }}
            />
            <p className="profile-picture-hint">
              Click the camera icon to change your profile picture
            </p>
          </div>

          {/* Username Field */}
          <div className="form-group">
            <label htmlFor="username">
              <FontAwesomeIcon icon={faUser} /> Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email Field (read-only) */}
          <div className="form-group">
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              disabled
              className="input-disabled"
            />
            <small className="input-hint">Email cannot be changed</small>
          </div>

          {/* Role Badge */}
          <div className="form-group">
            <label>Role</label>
            <div className="role-display">
              <span
                className={`role-badge ${user.role?.toLowerCase() || "user"}`}
              >
                {user.role || "User"}
              </span>
            </div>
          </div>

          {/* Save Button */}
          <button type="submit" className="auth-button" disabled={saving}>
            {saving ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin /> Saving...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faSave} /> Save Changes
              </>
            )}
          </button>
        </form>

        {/* Logout Button */}
        <button type="button" className="logout-button" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
