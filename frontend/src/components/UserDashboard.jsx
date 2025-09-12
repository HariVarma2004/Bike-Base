import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  UserCircleIcon, 
  CogIcon, 
  QuestionMarkCircleIcon,
  CreditCardIcon,
  ClockIcon,
  TruckIcon
} from "@heroicons/react/24/outline";

export default function UserDashboard() {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [rentalHistory, setRentalHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    notifications: true
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    
    if (!token || role !== "user") {
      navigate("/login");
      return;
    }

    // Load user data
    const userName = localStorage.getItem("userName");
    setUserData({
      name: userName,
      email: "user@example.com",
      joinedDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    });

    setProfileData({
      name: userName,
      email: "user@example.com",
      phone: "+1 (555) 123-4567",
      notifications: true
    });

    // Mock rental history data
    setRentalHistory([
      { id: 1, date: "2024-01-15", bike: "Mountain Bike Pro", duration: "3 days", status: "Completed", price: "$45" },
      { id: 2, date: "2024-01-10", bike: "City Cruiser", duration: "1 day", status: "Completed", price: "$20" },
      { id: 3, date: "2024-01-05", bike: "Road Bike Elite", duration: "2 days", status: "Completed", price: "$35" }
    ]);

    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleBrowseBikes = () => {
    navigate("/explore");
  };

  const handleRentalHistory = () => {
    setActiveTab("history");
  };

  const handlePaymentMethods = () => {
    alert("Payment methods feature coming soon! 💳");
    // Would open payment methods modal in real app
  };

  const handleHelpSupport = () => {
    alert("Help & support page loading... 📞");
    // Would navigate to help center or open chat
  };

  const handleEditProfile = () => {
    setShowProfileModal(true);
  };

  const handleProfileSave = () => {
    localStorage.setItem("userName", profileData.name);
    setUserData(prev => ({ ...prev, name: profileData.name }));
    setShowProfileModal(false);
    alert("Profile updated successfully! ✅");
  };

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  // Profile Modal Component
  const ProfileModal = () => (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Profile</h3>
        <div className="space-y-4 mt-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => handleProfileChange("name", e.target.value)}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => handleProfileChange("email", e.target.value)}
              className="input input-bordered"
              disabled
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => handleProfileChange("phone", e.target.value)}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Email Notifications</span>
              <input
                type="checkbox"
                checked={profileData.notifications}
                onChange={(e) => handleProfileChange("notifications", e.target.checked)}
                className="toggle toggle-primary"
              />
            </label>
          </div>
        </div>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={() => setShowProfileModal(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleProfileSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200" data-theme="forest">
      {showProfileModal && <ProfileModal />}
      
      {/* Header */}
      <div className="navbar bg-base-100 shadow-lg border-b border-base-300">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-primary">
            🚴‍♂️ BikeBase <span className="text-base-content">User Dashboard</span>
          </h1>
        </div>
        <div className="flex-none gap-4">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                <UserCircleIcon className="h-6 w-6" />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li className="menu-title">
                <span>Welcome, {userData.name}</span>
              </li>
              <li><button onClick={handleEditProfile}><CogIcon className="h-4 w-4" />Edit Profile</button></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary to-secondary text-primary-content rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Welcome back, {userData.name}! 🌟</h2>
              <p className="mt-2 opacity-90">Ready for your next adventure? Browse our bike collection!</p>
            </div>
            <div className="text-4xl">🌲</div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="stats shadow bg-base-100">
            <div className="stat">
              <div className="stat-figure text-primary">
                <TruckIcon className="h-8 w-8" />
              </div>
              <div className="stat-title">Total Rentals</div>
              <div className="stat-value">{rentalHistory.length}</div>
              <div className="stat-desc">All-time rentals</div>
            </div>
          </div>

          <div className="stats shadow bg-base-100">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <ClockIcon className="h-8 w-8" />
              </div>
              <div className="stat-title">Active Rentals</div>
              <div className="stat-value">0</div>
              <div className="stat-desc">Currently riding</div>
            </div>
          </div>

          <div className="stats shadow bg-base-100">
            <div className="stat">
              <div className="stat-figure text-accent">
                <CreditCardIcon className="h-8 w-8" />
              </div>
              <div className="stat-title">Total Spent</div>
              <div className="stat-value">$100</div>
              <div className="stat-desc">Lifetime total</div>
            </div>
          </div>

          <div className="stats shadow bg-base-100">
            <div className="stat">
              <div className="stat-figure text-info">
                <UserCircleIcon className="h-8 w-8" />
              </div>
              <div className="stat-title">Member Since</div>
              <div className="stat-value">{userData.joinedDate.split(' ')[0]}</div>
              <div className="stat-desc">{userData.joinedDate}</div>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer" onClick={handleBrowseBikes}>
            <div className="card-body text-center">
              <TruckIcon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="card-title justify-center">Browse Bikes</h3>
              <p className="text-base-content/70">Explore our collection</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer" onClick={handleRentalHistory}>
            <div className="card-body text-center">
              <ClockIcon className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="card-title justify-center">Rental History</h3>
              <p className="text-base-content/70">Past rentals</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer" onClick={handlePaymentMethods}>
            <div className="card-body text-center">
              <CreditCardIcon className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="card-title justify-center">Payment Methods</h3>
              <p className="text-base-content/70">Manage payments</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer" onClick={handleHelpSupport}>
            <div className="card-body text-center">
              <QuestionMarkCircleIcon className="h-12 w-12 text-info mx-auto mb-4" />
              <h3 className="card-title justify-center">Help & Support</h3>
              <p className="text-base-content/70">Get assistance</p>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-xl">📊 Recent Activity</h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Bike</th>
                    <th>Duration</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rentalHistory.map(rental => (
                    <tr key={rental.id}>
                      <td>{rental.date}</td>
                      <td>{rental.bike}</td>
                      <td>{rental.duration}</td>
                      <td className="font-semibold">{rental.price}</td>
                      <td>
                        <span className="badge badge-success badge-sm">{rental.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}