import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users"); 
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const handleDelete = async (userId) => {
    // Show a conformation dialog before proceeding
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          const text = await res.text().catch(() => null);
          throw new Error(text || "Failed to delete user");
        }

        // Remove the deleted user from the state to update the UI
        setUsers(users.filter((user) => user._id !== userId));
        alert("✅ User deleted successfully!");
      } catch (err) {
        console.error("Delete error:", err);
        // Use an alert because we can't use confirm in the sandbox
        alert(`❌ Failed to delete: ${err.message}`);
      }
    }
  };


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
                    className={`badge ${user.status === "Active"
                      ? "badge-success"
                      : "badge-error"
                      }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="flex justify-center gap-2">
                  <button className="btn btn-xs btn-outline">
                    <Link
                      to={`/admin/users/edit-user/${user._id}`}
                    > ✏️ Edit </Link></button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-xs btn-error text-white">
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
