import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Attempting to register user:", formData.email);
      
      // Register the user only 
      const registerResponse = await axios.post("https://bike-base-backend-2rde.onrender.com/api/auth/register", {
      // const registerResponse = await axios.post("http://localhost:5000/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "user"
      });

      console.log("Registration successful:", registerResponse.data);

      // Show success message and redirect to login
      alert("Registration successful! Please login with your credentials.");
      navigate("/login");
      
    } catch (err) {
      console.error("Registration error details:", err);
      
      if (err.response) {
        // Server responded with error status
        const errorMessage = err.response.data.error || 
                            err.response.data.message || 
                            `Registration failed with status ${err.response.status}`;
        setError(errorMessage);
      } else if (err.request) {
        // Request was made but no response received
        setError("Cannot connect to server. Please check if the backend is running on port 5000.");
      } else {
        // Other errors
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4" data-theme="forest">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Create Account</h1>
            <p className="text-base-content mt-2">Join Motovex today</p>
          </div>
          
          {error && (
            <div className="alert alert-error mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-base-content">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full h-12 px-4"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-base-content">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full h-12 px-4"
                placeholder="Enter your email address"
                required
              />
            </div>
            
            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-base-content">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="input input-bordered w-full h-12 px-4 pr-10"
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/70 hover:text-base-content"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Confirm Password Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-base-content">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input input-bordered w-full h-12 px-4 pr-10"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/70 hover:text-base-content"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`btn btn-primary w-full h-12 text-lg ${isLoading ? 'loading' : ''}`}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </button>
            </div>
          </form>
          
          <div className="text-center mt-6 pt-5 border-t border-base-300">
            <p className="text-base-content">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}