import React, { useEffect, useState } from "react";

export default function Users() {
  // Mock data (replace with API later)
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Mike Ross",
      email: "mike@example.com",
      role: "Moderator",
      status: "Active",
    },
  ]);

  useEffect(() => {
    // later: fetch("/api/users") and setUsers(data)
  }, []);

  return (
    <div className="bg-base-100 shadow-xl rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">👥 Users</h2>
        <button className="btn btn-primary btn-sm">➕ Add User</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table Head */}
          <thead>
            <tr className="bg-base-200 text-sm text-gray-500">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover">
                <td>{user.id}</td>
                <td className="font-medium">{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className="badge badge-outline">{user.role}</span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      user.status === "Active"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="flex justify-center gap-2">
                  <button className="btn btn-xs btn-outline">✏️ Edit</button>
                  <button className="btn btn-xs btn-error text-white">
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
