import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faPaw,
  faDollarSign,
  faChartLine,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

const AdminDashboard = () => {
  // Sample statistics data
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      isPositive: true,
      icon: faUsers,
      color: "#4ecca3",
    },
    {
      title: "Animals Rescued",
      value: "856",
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
      value: "45",
      change: "-5%",
      isPositive: false,
      icon: faChartLine,
      color: "#e74c3c",
    },
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      action: "New user registered",
      user: "John Smith",
      time: "2 minutes ago",
    },
    {
      id: 2,
      action: "Donation received",
      user: "Emily Davis",
      time: "15 minutes ago",
    },
    {
      id: 3,
      action: "Adoption application submitted",
      user: "Michael Brown",
      time: "1 hour ago",
    },
    {
      id: 4,
      action: "New animal added",
      user: "Admin",
      time: "2 hours ago",
    },
    {
      id: 5,
      action: "User profile updated",
      user: "Sarah Wilson",
      time: "3 hours ago",
    },
  ];

  // Recent adoptions
  const recentAdoptions = [
    {
      id: 1,
      animalName: "Buddy",
      type: "Dog",
      adopter: "Jane Doe",
      date: "Jan 22, 2026",
      status: "Completed",
    },
    {
      id: 2,
      animalName: "Whiskers",
      type: "Cat",
      adopter: "Tom Wilson",
      date: "Jan 21, 2026",
      status: "Pending",
    },
    {
      id: 3,
      animalName: "Charlie",
      type: "Dog",
      adopter: "Lisa Chen",
      date: "Jan 20, 2026",
      status: "Completed",
    },
  ];

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
            {recentActivities.map((activity) => (
              <li key={activity.id} className="activity-item">
                <div className="activity-info">
                  <span className="activity-action">{activity.action}</span>
                  <span className="activity-user">by {activity.user}</span>
                </div>
                <span className="activity-time">{activity.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Adoptions */}
        <div className="dashboard-card">
          <h2>Recent Adoptions</h2>
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
  );
};

export default AdminDashboard;
