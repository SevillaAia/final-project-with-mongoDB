import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Context
import { AuthProvider } from "./context/AuthContext";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Donate from "./pages/Donate";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Adoption from "./pages/Adoption";
import Profile from "./pages/Profile";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import PetManagement from "./pages/admin/PetManagement";
import WildAnimalRescue from "./pages/admin/WildAnimalRescue";
import AdminSettings from "./pages/admin/AdminSettings";
import AdoptionManagement from "./pages/admin/AdoptionManagement";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Main Layout Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="donate" element={<Donate />} />
            <Route path="adoption" element={<Adoption />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Auth Layout Routes */}
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          {/* Admin Layout Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="pets" element={<PetManagement />} />
            <Route path="adoptions" element={<AdoptionManagement />} />
            <Route path="wild-rescue" element={<WildAnimalRescue />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
