import React from "react";
import { Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div
      data-theme="forest"
      className="min-h-screen flex items-center justify-center bg-base-200 px-4"
    >
      {/* Admin Card */}
      <div className="bg-base-100 shadow-xl rounded-2xl p-8 w-full max-w-3xl text-center">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">🏍 Admin Panel</h1>
          <p className="text-sm opacity-70 mt-2">
            Manage your bikes and users
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <Link
            to="/admin/add-bike"
            className="p-6 bg-base-200 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="text-3xl mb-2">➕</div>
            <h2 className="font-semibold text-lg">Add Bike</h2>
            <p className="text-sm opacity-70">Add a new bike to the system</p>
          </Link>

          <Link
            to="/admin/all-bikes"
            className="p-6 bg-base-200 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="text-3xl mb-2">📋</div>
            <h2 className="font-semibold text-lg">All Bikes</h2>
            <p className="text-sm opacity-70">View and manage all bikes</p>
          </Link>

          <Link
            to="/admin/users"
            className="p-6 bg-base-200 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="text-3xl mb-2">👥</div>
            <h2 className="font-semibold text-lg">Users</h2>
            <p className="text-sm opacity-70">Manage user accounts</p>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 text-sm opacity-60">
          © {new Date().getFullYear()} BikeStore Admin
        </div>
      </div>
    </div>
  );
}
