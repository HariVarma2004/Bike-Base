import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditUser() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the specific user's data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`https://bike-base-backend-2rde.onrender.com/api/users/${id}`);
        // const res = await fetch(`http://localhost:5000/api/users/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await res.json();
        setUser(data);
        setFormData({
          name: data.name,
          email: data.email,
          role: data.role,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const res = await fetch(`http://localhost:5000/api/users/${id}`, {
      const res = await fetch(`https://bike-base-backend-2rde.onrender.com/api/users/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("Failed to update user");
      }
      // Redirect to the users list or a success page
      navigate("/users"); 
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div className="bg-base-100 shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-primary mb-6">✏️ Edit User</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label htmlFor="email" className="label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            disabled 
          />
        </div>
        <div>
          <label htmlFor="role" className="label">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="user">User</option>
            {/* <option value="admin">Admin</option> */}
          </select>
        </div>
        <div className="flex gap-2 mt-4">
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <button type="button" onClick={() => navigate("/users")} className="btn btn-ghost">Cancel</button>
        </div>
      </form>
    </div>
  );
}