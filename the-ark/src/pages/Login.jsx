import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5005/auth/login", {
        email,
        password,
      });
      console.log("LOGIN RESPONSE", data);

      // Save user data to AuthContext
      login(data.user, data.authToken);

      setMessage("Login successful!");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        // Redirect admin to /admin, others to /
        if (data.user && data.user.role === "Admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }, 2000);
    } catch (err) {
      console.log(err);
      setMessage(
        err.response?.data?.errorMessage || "Login failed. Please try again.",
      );
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  // Dismiss alert on click anywhere
  const handlePageClick = () => {
    if (showAlert) setShowAlert(false);
  };

  return (
    <div className="login-page" onClick={handlePageClick}>
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {showAlert && message && (
            <div
              style={{
                marginBottom: "1rem",
                color: message.includes("successful") ? "green" : "red",
                cursor: "pointer",
              }}
              onClick={() => setShowAlert(false)}
            >
              {message}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">
              <FontAwesomeIcon icon={faUser} /> Email
            </label>
            <input
              type="email"
              id="email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                style={{ marginRight: "0.5rem" }}
              />
            ) : null}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="auth-link">
          Don't have an account? <Link to="/signup">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
