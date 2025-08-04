import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, Lock, Loader2, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Please enter your email.");
      return false;
    } else if (!formData.password) {
      toast.error("Please enter your password.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = validateForm();
    if (valid) {
      const success = await login(formData);
      if (success) {
        navigate("/");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-background text-text-primary">
      <div className="w-full max-w-md p-8 border shadow-2xl bg-component-bg border-soft-teal/30 rounded-2xl animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center mb-4 shadow-inner size-16 bg-soft-teal/20 rounded-xl">
            <MessageSquare className="text-soft-teal size-8" />
          </div>
          <h1 className="mb-2 text-3xl font-extrabold tracking-wide sm:text-4xl text-text-primary">
            Welcome Back
          </h1>
          <p className="text-sm text-center text-text-muted">
            Log in to continue your conversations
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label
              htmlFor="email-input"
              className="block mb-2 font-medium text-text-secondary"
            >
              Email
            </label>
            <div className="absolute inset-y-0 flex items-center pt-8 pointer-events-none left-3 text-text-muted">
              <Mail className="w-5 h-5" />
            </div>
            <input
              id="email-input"
              type="email"
              placeholder="you@example.com"
              className="w-full h-12 pl-10 pr-3 transition-all duration-200 border rounded-lg text-text-primary placeholder-text-muted bg-input-bg border-border-color focus:outline-none focus:ring-2 focus:ring-soft-teal"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              autoComplete="email"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password-input"
              className="block mb-2 font-medium text-text-secondary"
            >
              Password
            </label>
            <div className="absolute inset-y-0 flex items-center pt-8 pointer-events-none left-3 text-text-muted">
              <Lock className="w-5 h-5" />
            </div>
            <input
              id="password-input"
              type="password"
              placeholder="Enter your password"
              className="w-full h-12 pl-10 pr-3 transition-all duration-200 border rounded-lg text-text-primary placeholder-text-muted bg-input-bg border-border-color focus:outline-none focus:ring-2 focus:ring-soft-teal"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            disabled={isLoggingIn}
            // Explicitly setting bg, text, and hover for the button
            className="w-full h-12 mt-4 font-semibold bg-soft-teal text-deep-ocean-blue rounded-lg hover:bg-soft-teal/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg transform hover:scale-[1.01] duration-200"
          >
            {isLoggingIn ? (
              <div className="flex items-center gap-2">
                <Loader2 className="size-5 animate-spin" />
                Logging in...
              </div>
            ) : (
              "Log In"
            )}
          </button>
        </form>
        <div className="my-6 text-center">
          <p className="text-text-muted">
            Don't have an account?{" "}
            {/* Explicitly setting text color for the link */}
            <Link
              to="/signup"
              className="font-medium transition-colors duration-200 text-muted-gold hover:underline hover:text-muted-gold/80"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
