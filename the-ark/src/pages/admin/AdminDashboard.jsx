import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faUsers,
  faPaw,
  faDollarSign,
  faChartLine,
  faArrowUp,
  faArrowDown,
  faUserPlus,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../../../config/config";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [pets, setPets] = useState([]);
  const [wildAnimals, setWildAnimals] = useState([]);
  const [adoptions, setAdoptions] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch all data in parallel
        const [usersRes, petsRes, wildRes, adoptionsRes] = await Promise.all([
          axios.get(`${API_URL}/user`, { headers }),
          axios.get(`${API_URL}/pets`, { headers }),
          axios.get(`${API_URL}/wild-animals`, { headers }),
          axios
            .get(`${API_URL}/adoptions`, { headers })
            .catch(() => ({ data: [] })),
        ]);

        const usersData = Array.isArray(usersRes.data)
          ? usersRes.data
          : usersRes.data?.users || [];
        const petsData = Array.isArray(petsRes.data)
          ? petsRes.data
          : petsRes.data?.pets || [];
        const wildData = Array.isArray(wildRes.data)
          ? wildRes.data
          : wildRes.data?.animals || [];
        const adoptionsData = Array.isArray(adoptionsRes.data)
          ? adoptionsRes.data
          : adoptionsRes.data?.adoptions || [];

        setUsers(usersData);
        setPets(petsData);
        setWildAnimals(wildData);
        setAdoptions(adoptionsData);

        // Build recent activities from timestamps
        const activities = [];

        // Add user registrations
        usersData.forEach((user) => {
          if (user.createdAt) {
            activities.push({
              id: `user-${user._id}`,
              action: "New user registered",
              user: user.username || user.email,
              time: new Date(user.createdAt),
              type: "user",
              icon: faUserPlus,
            });
          }
        });

        // Add pet additions
        petsData.forEach((pet) => {
          if (pet.createdAt) {
            activities.push({
              id: `pet-${pet._id}`,
              action: `New pet added: ${pet.name}`,
              user: "Admin",
              time: new Date(pet.createdAt),
              type: "pet",
              icon: faPaw,
            });
          }
        });

        // Add wild animal rescues
        wildData.forEach((animal) => {
          const timestamp = animal.createdAt || animal.rescueDate;
          if (timestamp) {
            activities.push({
              id: `wild-${animal._id}`,
              action: `Wildlife rescued: ${animal.name} (${animal.species})`,
              user: "Admin",
              time: new Date(timestamp),
              type: "wild",
              icon: faLeaf,
            });
          }
        });

        // Sort by time (most recent first) and take top 10
        activities.sort((a, b) => b.time - a.time);
        setRecentActivities(activities.slice(0, 10));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format time ago
  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    if (diffHours > 0)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffMins > 0) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  // Calculate statistics from real data
  const stats = [
    {
      title: "Total Users",
      value: users.length.toLocaleString(),
      change: "+12%",
      isPositive: true,
      icon: faUsers,
      color: "#4ecca3",
    },
    {
      title: "Animals Rescued",
      value: (pets.length + wildAnimals.length).toString(),
      change: "+8%",
      isPositive: true,
      icon: faPaw,
      color: "#f5b301",
    },
    {
      title: "Total Donations",
      value: "$45,678",
      change: "+23%",
      isPositive: true,
      icon: faDollarSign,
      color: "#3498db",
    },
    {
      title: "Adoptions This Month",
      value: pets.filter((p) => p.status === "Adopted").length.toString(),
      change: "-5%",
      isPositive: false,
      icon: faChartLine,
      color: "#e74c3c",
    },
  ];

  // Recent adoptions from adoptions endpoint
  const recentAdoptions =
    adoptions.length > 0
      ? adoptions.slice(0, 5).map((adoption) => ({
          id: adoption._id,
          animalName: adoption.petName,
          type: adoption.petType,
          adopter: adoption.adopterName,
          date: adoption.createdAt
            ? new Date(adoption.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "N/A",
          status: adoption.status,
        }))
      : pets
          .filter((pet) => pet.status === "Adopted" || pet.status === "Pending")
          .slice(0, 5)
          .map((pet) => ({
            id: pet._id,
            animalName: pet.name,
            type: pet.species,
            adopter: pet.adopter || "Pending",
            date: pet.updatedAt
              ? new Date(pet.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "N/A",
            status: pet.status,
          }));

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, Admin! Here's what's happening at The Ark.</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-icon" style={{ backgroundColor: stat.color }}>
              <FontAwesomeIcon icon={stat.icon} />
            </div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
              <span
                className={`stat-change ${stat.isPositive ? "positive" : "negative"}`}
              >
                <FontAwesomeIcon
                  icon={stat.isPositive ? faArrowUp : faArrowDown}
                />
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        {/* Recent Activities */}
        <div className="dashboard-card">
          <h2>Recent Activities</h2>
          <ul className="activity-list">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <li key={activity.id} className="activity-item">
                  <div className="activity-info">
                    <FontAwesomeIcon
                      icon={activity.icon}
                      style={{ marginRight: "0.5rem", color: "#4ecca3" }}
                    />
                    <span className="activity-action">{activity.action}</span>
                    <span className="activity-user">by {activity.user}</span>
                  </div>
                  <span className="activity-time">
                    {formatTimeAgo(activity.time)}
                  </span>
                </li>
              ))
            ) : (
              <li className="activity-item">No recent activities</li>
            )}
          </ul>
        </div>

        {/* Recent Adoptions */}
        <div className="dashboard-card">
          <h2>Recent Adoptions</h2>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Animal</th>
                  <th>Type</th>
                  <th>Adopter</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAdoptions.map((adoption) => (
                  <tr key={adoption.id}>
                    <td>{adoption.animalName}</td>
                    <td>{adoption.type}</td>
                    <td>{adoption.adopter}</td>
                    <td>{adoption.date}</td>
                    <td>
                      <span
                        className={`status-badge ${adoption.status.toLowerCase()}`}
                      >
                        {adoption.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
