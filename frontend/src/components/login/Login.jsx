// src/components/Login.jsx (updated with proper alignment)
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token, role, name } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userName", name);

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      // Handle different error scenarios
      if (err.response) {
        setError(err.response.data.error || "Login failed. Please check your credentials.");
      } else if (err.request) {
        setError("Cannot connect to server. Please try again later.");
      } else {
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
            <h1 className="text-3xl font-bold text-primary">BikeBase</h1>
            <p className="text-base-content mt-2">Sign in to your account</p>
          </div>
          
          {error && (
            <div className="alert alert-error mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-base-content">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full h-12 px-4"
                placeholder="Enter your email"
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
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full h-12 px-4 pr-10"
                  placeholder="Enter your password"
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
              <div className="flex justify-end mt-1">
                <a href="#" className="text-sm link link-hover text-base-content/70">
                  Forgot password?
                </a>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`btn btn-primary w-full h-12 text-lg ${isLoading ? 'loading' : ''}`}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
          
          <div className="text-center mt-6 pt-5 border-t border-base-300">
            <p className="text-base-content">
              Don't have an account?{" "}
              <Link to="/register" className="link link-primary font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}