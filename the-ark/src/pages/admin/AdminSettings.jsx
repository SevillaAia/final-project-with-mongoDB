import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faBell,
  faShield,
  faPalette,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: "The Ark",
    siteEmail: "contact@theark.org",
    enableNotifications: true,
    enableEmailAlerts: true,
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
    maxUploadSize: "10",
    theme: "light",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save to backend
    console.log("Settings saved:", settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="admin-settings">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your application settings and preferences</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* General Settings */}
        <div className="settings-section">
          <div className="section-header">
            <FontAwesomeIcon icon={faPalette} />
            <h2>General Settings</h2>
          </div>
          <div className="settings-grid">
            <div className="form-group">
              <label htmlFor="siteName">Site Name</label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="siteEmail">Contact Email</label>
              <input
                type="email"
                id="siteEmail"
                name="siteEmail"
                value={settings.siteEmail}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="theme">Theme</label>
              <select
                id="theme"
                name="theme"
                value={settings.theme}
                onChange={handleChange}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="maxUploadSize">Max Upload Size (MB)</label>
              <input
                type="number"
                id="maxUploadSize"
                name="maxUploadSize"
                value={settings.maxUploadSize}
                onChange={handleChange}
                min="1"
                max="100"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="settings-section">
          <div className="section-header">
            <FontAwesomeIcon icon={faBell} />
            <h2>Notifications</h2>
          </div>
          <div className="settings-toggles">
            <div className="toggle-item">
              <div className="toggle-info">
                <label htmlFor="enableNotifications">
                  Enable Push Notifications
                </label>
                <p>Receive push notifications for important updates</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  id="enableNotifications"
                  name="enableNotifications"
                  checked={settings.enableNotifications}
                  onChange={handleChange}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="toggle-item">
              <div className="toggle-info">
                <label htmlFor="enableEmailAlerts">Email Alerts</label>
                <p>Receive email notifications for new activities</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  id="enableEmailAlerts"
                  name="enableEmailAlerts"
                  checked={settings.enableEmailAlerts}
                  onChange={handleChange}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="settings-section">
          <div className="section-header">
            <FontAwesomeIcon icon={faShield} />
            <h2>Security & Access</h2>
          </div>
          <div className="settings-toggles">
            <div className="toggle-item">
              <div className="toggle-info">
                <label htmlFor="allowRegistration">
                  Allow User Registration
                </label>
                <p>Allow new users to create accounts</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  id="allowRegistration"
                  name="allowRegistration"
                  checked={settings.allowRegistration}
                  onChange={handleChange}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="toggle-item">
              <div className="toggle-info">
                <label htmlFor="requireEmailVerification">
                  Require Email Verification
                </label>
                <p>New users must verify their email address</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  id="requireEmailVerification"
                  name="requireEmailVerification"
                  checked={settings.requireEmailVerification}
                  onChange={handleChange}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="toggle-item warning">
              <div className="toggle-info">
                <label htmlFor="maintenanceMode">Maintenance Mode</label>
                <p>Put the site in maintenance mode (only admins can access)</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  name="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={handleChange}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="settings-actions">
          <button type="submit" className="btn-primary btn-save">
            <FontAwesomeIcon icon={faSave} /> Save Settings
          </button>
          {saved && (
            <span className="save-message">Settings saved successfully!</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
