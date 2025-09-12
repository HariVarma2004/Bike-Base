// src/components/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  UsersIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  TruckIcon,
  WrenchScrewdriverIcon,
  UserCircleIcon,
  CogIcon
} from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  const [adminData, setAdminData] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBikes: 0,
    activeRentals: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSystemModal, setShowSystemModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    notifications: true
  });
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    autoApproveUsers: true,
    rentalLimit: 3,
    businessHours: "08:00-22:00"
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and is admin
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    
    if (!token || role !== "admin") {
      navigate("/login");
      return;
    }

    // Load admin data
    const userName = localStorage.getItem("userName");
    setAdminData({
      name: userName,
      email: "admin@bikebase.com"
    });

    // Load profile data (mock for now)
    setProfileData({
      name: userName,
      email: "admin@bikebase.com",
      phone: "+1 (555) 123-4567",
      notifications: true
    });

    // Simulate API call with loading state
    setTimeout(() => {
      setStats({
        totalUsers: 124,
        totalBikes: 45,
        activeRentals: 18,
        revenue: 2540
      });
      setLoading(false);
    }, 1000);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  // Profile Settings Functions
  const handleProfileSettings = () => {
    setShowProfileModal(true);
  };

  const handleProfileSave = () => {
    // In a real app, you would send this to your backend API
    console.log("Saving profile:", profileData);
    localStorage.setItem("userName", profileData.name);
    setAdminData(prev => ({ ...prev, name: profileData.name }));
    setShowProfileModal(false);
    alert("Profile settings saved successfully!");
  };

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  // System Settings Functions
  const handleSystemSettings = () => {
    setShowSystemModal(true);
  };

  const handleSystemSave = () => {
    // In a real app, you would send this to your backend API
    console.log("Saving system settings:", systemSettings);
    setShowSystemModal(false);
    alert("System settings updated successfully!");
  };

  const handleSystemChange = (field, value) => {
    setSystemSettings(prev => ({ ...prev, [field]: value }));
  };

  const StatCard = ({ icon: Icon, value, label, trend, trendValue }) => (
    <div className="card bg-base-100 shadow-lg border-l-4 border-primary hover:shadow-xl transition-shadow">
      <div className="card-body p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-base-content">{value}</h3>
              <p className="text-sm text-base-content/70">{label}</p>
            </div>
          </div>
          {trend && (
            <div className={`text-sm font-semibold ${trend === 'up' ? 'text-success' : 'text-error'}`}>
              {trend === 'up' ? '↗' : '↘'} {trendValue}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Modal Components
  const ProfileSettingsModal = () => (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Profile Settings</h3>
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
              <span className="label-text">Enable Notifications</span>
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

  const SystemSettingsModal = () => (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">System Settings</h3>
        <div className="space-y-4 mt-4">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Maintenance Mode</span>
              <input
                type="checkbox"
                checked={systemSettings.maintenanceMode}
                onChange={(e) => handleSystemChange("maintenanceMode", e.target.checked)}
                className="toggle toggle-warning"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Auto-approve New Users</span>
              <input
                type="checkbox"
                checked={systemSettings.autoApproveUsers}
                onChange={(e) => handleSystemChange("autoApproveUsers", e.target.checked)}
                className="toggle toggle-primary"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Maximum Rentals per User</span>
            </label>
            <select
              value={systemSettings.rentalLimit}
              onChange={(e) => handleSystemChange("rentalLimit", parseInt(e.target.value))}
              className="select select-bordered"
            >
              <option value={1}>1 Bike</option>
              <option value={2}>2 Bikes</option>
              <option value={3}>3 Bikes</option>
              <option value={5}>5 Bikes</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Business Hours</span>
            </label>
            <input
              type="text"
              value={systemSettings.businessHours}
              onChange={(e) => handleSystemChange("businessHours", e.target.value)}
              className="input input-bordered"
              placeholder="e.g., 08:00-22:00"
            />
          </div>
        </div>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={() => setShowSystemModal(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSystemSave}>Save Settings</button>
        </div>
      </div>
    </div>
  );

  if (!adminData || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200" data-theme="forest">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200" data-theme="forest">
      {/* Modals */}
      {showProfileModal && <ProfileSettingsModal />}
      {showSystemModal && <SystemSettingsModal />}

      {/* Header */}
      <div className="navbar bg-base-100 shadow-lg border-b border-base-300">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-primary">
            🌲 Motovex <span className="text-base-content">Admin Portal</span>
          </h1>
        </div>
        <div className="flex-none gap-4">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                <span className="font-bold">{adminData.name.charAt(0).toUpperCase()}</span>
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <span className="text-base-content/70">Signed in as</span>
                <span className="font-semibold">{adminData.name}</span>
              </li>
              <li><hr className="my-2" /></li>
              <li><button onClick={handleProfileSettings}><UserCircleIcon className="h-4 w-4 mr-2" />Profile Settings</button></li>
              <li><button onClick={handleSystemSettings}><CogIcon className="h-4 w-4 mr-2" />System Settings</button></li>
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
              <h2 className="text-3xl font-bold">Welcome back, {adminData.name}! 👋</h2>
              <p className="mt-2 opacity-90">Here's what's happening with your bike rental system today.</p>
            </div>
            <div className="text-4xl">🚴‍♂️</div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={UserGroupIcon} 
            value={stats.totalUsers} 
            label="Total Users" 
            trend="up" 
            trendValue="+12%"
          />
          <StatCard 
            icon={TruckIcon} // Using TruckIcon instead of BikeIcon
            value={stats.totalBikes} 
            label="Available Bikes" 
            trend="up" 
            trendValue="+5%"
          />
          <StatCard 
            icon={ClockIcon} 
            value={stats.activeRentals} 
            label="Active Rentals" 
            trend="down" 
            trendValue="-3%"
          />
          <StatCard 
            icon={CurrencyDollarIcon} 
            value={`$${stats.revenue}`} 
            label="Today's Revenue" 
            trend="up" 
            trendValue="+18%"
          />
        </div>

        {/* Admin Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Management Tools */}
          <div className="card bg-base-100 shadow-xl lg:col-span-2">
            <div className="card-body">
              <h2 className="card-title text-xl">🚀 Management Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  className="btn btn-primary btn-outline justify-start h-16"
                  onClick={() => navigate("/admin/users")}
                >
                  <UsersIcon className="h-5 w-5 mr-2" />
                  Manage Users
                </button>
                <button 
                  className="btn btn-primary btn-outline justify-start h-16"
                  onClick={() => navigate("/admin/all-bikes")}
                >
                  <TruckIcon className="h-5 w-5 mr-2" />
                  Manage Bikes
                </button>
                <button 
                  className="btn btn-success btn-outline justify-start h-16"
                  onClick={() => navigate("/admin/add-bike")}
                >
                  <Cog6ToothIcon className="h-5 w-5 mr-2" />
                  Add New Bike
                </button>
                <button 
                  className="btn btn-info btn-outline justify-start h-16"
                >
                  <ChartBarIcon className="h-5 w-5 mr-2" />
                  View Reports
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl">📈 Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-success/10 p-2 rounded-full">
                    <UsersIcon className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">New user registration</p>
                    <p className="text-sm text-base-content/70">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-warning/10 p-2 rounded-full">
                    <WrenchScrewdriverIcon className="h-4 w-4 text-warning" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Bike maintenance completed</p>
                    <p className="text-sm text-base-content/70">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-info/10 p-2 rounded-full">
                    <ArrowTrendingUpIcon className="h-4 w-4 text-info" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">New rental started</p>
                    <p className="text-sm text-base-content/70">30 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CurrencyDollarIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Payment received</p>
                    <p className="text-sm text-base-content/70">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="font-semibold">System Health</h3>
              <div className="radial-progress text-success" style={{"--value":90}} role="progressbar">90%</div>
              <p className="text-sm text-base-content/70">All systems operational</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="font-semibold">Bike Availability</h3>
              <div className="radial-progress text-warning" style={{"--value":65}} role="progressbar">65%</div>
              <p className="text-sm text-base-content/70">27/45 bikes available</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="font-semibold">Customer Satisfaction</h3>
              <div className="radial-progress text-primary" style={{"--value":95}} role="progressbar">95%</div>
              <p className="text-sm text-base-content/70">Based on recent feedback</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}