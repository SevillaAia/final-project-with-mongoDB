import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faUsers, faGear } from '@fortawesome/free-solid-svg-icons';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>Admin Panel</h2>
        </div>
        <nav className="admin-nav">
          <a href="/admin/dashboard" className="admin-nav-link">
            <FontAwesomeIcon icon={faDashboard} /> Dashboard
          </a>
          <a href="/admin/users" className="admin-nav-link">
            <FontAwesomeIcon icon={faUsers} /> Users
          </a>
          <a href="/admin/settings" className="admin-nav-link">
            <FontAwesomeIcon icon={faGear} /> Settings
          </a>
        </nav>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
