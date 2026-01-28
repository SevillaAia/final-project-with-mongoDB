import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../../config/config";

function Signup() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${API_URL}/signup`, {
        username,
        password,
        email,
      });

      console.log(data);
      setMessage("Registration successful! Redirecting to login...");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.log(err);
      setMessage(
        err.response?.data?.errorMessage ||
          "Registration failed. Please try again.",
      );
      setShowAlert(true);
    }
  };

  return (
    <div className="register-page">
      <div className="auth-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          {showAlert && message && (
            <div
              style={{
                marginBottom: "1rem",
                color: message.includes("match") ? "red" : "green",
                cursor: "pointer",
              }}
              onClick={() => setShowAlert(false)}
            >
              {message}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="username">
              <FontAwesomeIcon icon={faUser} /> Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <FontAwesomeIcon icon={faLock} /> Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">
              <FontAwesomeIcon icon={faLock} /> Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>
          <button type="submit" className="auth-button">
            Register
          </button>
        </form>
        <p className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
