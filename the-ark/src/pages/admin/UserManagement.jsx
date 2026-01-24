import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faSearch,
  faEdit,
  faTrash,
  faUserPlus,
  faTimes,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const UserManagement = () => {
  const [users, setUsers] = useState([
    /*  {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      role: "User",
      status: "Active",
      joinDate: "Jan 15, 2026",
    },
    {
      id: 2,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      role: "User",
      status: "Active",
      joinDate: "Jan 10, 2026",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.b@email.com",
      role: "Volunteer",
      status: "Active",
      joinDate: "Dec 28, 2025",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.w@email.com",
      role: "User",
      status: "Inactive",
      joinDate: "Dec 15, 2025",
    },
    {
      id: 5,
      name: "David Lee",
      email: "david.lee@email.com",
      role: "Admin",
      status: "Active",
      joinDate: "Nov 20, 2025",
    },
    {
      id: 6,
      name: "Anna Martinez",
      email: "anna.m@email.com",
      role: "Volunteer",
      status: "Active",
      joinDate: "Nov 10, 2025",
    }, */
  ]);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const users = await axios.get("http://localhost:5005/auth/user");
        console.log(users.data);
        setUsers(users.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    getAllUsers();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "User",
    status: "Active",
  });

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.username?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "All" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "All" || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      setEditingUser(null);
      setFormData({
        username: "",
        email: "",
        role: "User",
        status: "Active",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData({
      username: "",
      email: "",
      role: "User",
      status: "Active",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingUser) {
      try {
        // Send PUT request to backend to update user
        const userId = editingUser._id || editingUser.id;
        await axios.put(`http://localhost:5005/auth/user/${userId}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        // Update local state
        setUsers((prev) =>
          prev.map((user) =>
            (user.id && editingUser.id && user.id === editingUser.id) ||
            (user._id && editingUser._id && user._id === editingUser._id)
              ? { ...user, ...formData }
              : user,
          ),
        );
      } catch (error) {
        console.error("Error updating user:", error);
        alert("Failed to update user.");
      }
    } else {
      // Add new user
      const newUser = {
        id: Date.now(),
        ...formData,
        joinDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
      setUsers((prev) => [...prev, newUser]);
    }
    handleCloseModal();
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5005/auth/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setUsers((prev) =>
          prev.filter((user) => user.id !== userId && user._id !== userId),
        );
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  const handleToggleStatus = async (userId) => {
    try {
      // Find the user to get the current status
      const user = users.find((u) => u.id === userId || u._id === userId);
      if (!user) return;
      const newStatus = user.status === "Active" ? "Inactive" : "Active";
      // Update status in backend
      await axios.put(
        `http://localhost:5005/auth/user/${userId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      // Update status in local state
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId || u._id === userId ? { ...u, status: newStatus } : u,
        ),
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update user status.");
    }
  };

  return (
    <div className="user-management">
      <div className="management-header">
        <h1>User Management</h1>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          <FontAwesomeIcon icon={faUserPlus} /> Add User
        </button>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="All">All Roles</option>
            <option value="User">User</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Admin">Admin</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="table-container">
        <table className="admin-table users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id || user.id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        {(user.username || "U").charAt(0).toUpperCase()}
                      </div>
                      <span>{user.username}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`role-badge ${(user.role || "user").toLowerCase()}`}
                    >
                      {user.role || "User"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${(user.status || "active").toLowerCase()}`}
                    >
                      {user.status || "Active"}
                    </span>
                  </td>
                  <td>{user.joinDate || user.createdAt || "N/A"}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon btn-edit"
                        onClick={() => handleOpenModal(user)}
                        title="Edit user"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="btn-icon btn-toggle"
                        onClick={() => handleToggleStatus(user._id || user.id)}
                        title={
                          user.status === "Active" ? "Deactivate" : "Activate"
                        }
                      >
                        <FontAwesomeIcon
                          icon={user.status === "Active" ? faTimes : faCheck}
                        />
                      </button>
                      <button
                        className="btn-icon btn-delete"
                        onClick={() => handleDelete(user._id || user.id)}
                        title="Delete user"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-results">
                  No users found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* User count */}
      <div className="table-footer">
        <p>
          Showing {filteredUsers.length} of {users.length} users
        </p>
      </div>

      {/* Add/Edit User Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingUser ? "Edit User" : "Add New User"}</h2>
              <button className="btn-close" onClick={handleCloseModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Full Name</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
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
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="User">User</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="Admin">Admin</option>
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
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
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
                  {editingUser ? "Update User" : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
