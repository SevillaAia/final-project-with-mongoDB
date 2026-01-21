import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Donate from './pages/Donate';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Layout Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="donate" element={<Donate />} />
        </Route>

        {/* Auth Layout Routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Admin Layout Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<div>Admin Dashboard</div>} />
          <Route path="users" element={<div>Users Management</div>} />
          <Route path="settings" element={<div>Settings</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
