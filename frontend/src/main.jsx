import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App.jsx";
import MainLayout from "./components/layout/MainLayout.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import AddBike from "./components/admin/AddBike.jsx";
import AllBikes from "./components/admin/AllBikes.jsx";
import Users from "./components/admin/Users.jsx";
import Explore from "./components/Explore/explore.jsx";
import BikeSpecs from "./components/bikespecs/BikeSpecs.jsx";
import ContactUs from "./components/contactUs/Contact.jsx";
import AboutUs from "./components/aboutUs/About.jsx";
import Login from "./components/login/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";

import "./index.css";

// Simple ProtectedRoute component
const ProtectedRoute = ({ children, role = "user" }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const userRole = localStorage.getItem("userRole");
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Main Site wrapped in MainLayout */}
        <Route
          path="/"
          element={
            <MainLayout>
              <App />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <AboutUs />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <ContactUs />
            </MainLayout>
          }
        />
        <Route
          path="/explore"
          element={
            <MainLayout>
              <Explore />
            </MainLayout>
          }
        />
        <Route
          path="/explore/bikespecs/:id"
          element={
            <MainLayout>
              <BikeSpecs />
            </MainLayout>
          }
        />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="/admin/add-bike" element={<AddBike />} />
        <Route path="/admin/all-bikes" element={<AllBikes />} />
        <Route path="/admin/users" element={<Users />} />

        {/* 404 */}
        <Route
          path="*"
          element={<h1 className="text-center mt-10">404 - Page Not Found</h1>}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);