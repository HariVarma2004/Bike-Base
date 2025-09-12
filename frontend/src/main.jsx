import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

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
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";
import EditBike from "./components/admin/EditBike.jsx";
import EditUser from "./components/admin/EditUser.jsx";

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

        {/* Admin Dashboard - PROTECTED ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-bike"
          element={
            <ProtectedRoute role="admin">
              <AddBike />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/all-bikes"
          element={
            <ProtectedRoute role="admin">
              <AllBikes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-bike/:id"
          element={
            <ProtectedRoute role="admin">
              <EditBike />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users/edit-user/:id"
          element={
            <ProtectedRoute role="admin">
              <EditUser />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={<h1 className="text-center mt-10">404 - Page Not Found</h1>}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);