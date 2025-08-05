import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquare, User, Mail, Lock, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningup } = useAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Please enter your full name.");
      return false;
    } else if (!formData.email.trim()) {
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
    if (valid === true) {
      const success = await signup(formData);
      if (success) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-background text-text-primary">
      <div className="w-full max-w-md p-8 mt-10 border shadow-2xl bg-component-bg border-soft-teal/30 rounded-2xl animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <h1 className="mb-2 text-3xl font-extrabold tracking-wide sm:text-4xl text-text-primary">
            Sign Up
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label
              htmlFor="fullname-input"
              className="block mb-2 font-medium text-text-secondary"
            >
              Full Name
            </label>
            <div className="absolute inset-y-0 flex items-center pt-8 pointer-events-none left-3 text-text-muted">
              <User className="w-5 h-5" />
            </div>
            <input
              id="fullname-input"
              type="text"
              placeholder="John Doe"
              className="w-full h-12 pl-10 pr-3 transition-all duration-200 border rounded-lg placeholder:text-gray-500 text-text-primary placeholder-text-muted bg-input-bg border-border-color focus:outline-none focus:ring-2 focus:ring-soft-teal"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              autoComplete="name"
            />
          </div>
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
              placeholder="your@email.com"
              className="w-full h-12 pl-10 pr-3 transition-all duration-200 border rounded-lg placeholder:text-gray-500 text-text-primary placeholder-text-muted bg-input-bg border-border-color focus:outline-none focus:ring-2 focus:ring-soft-teal"
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
              className="w-full h-12 pl-10 pr-3 transition-all duration-200 border rounded-lg placeholder:text-gray-500 text-text-primary placeholder-text-muted bg-input-bg border-border-color focus:outline-none focus:ring-2 focus:ring-soft-teal"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            disabled={isSigningup}
            className="w-full h-12 custom mt-4 font-semibold bg-soft-teal text-deep-ocean-blue rounded-lg hover:bg-soft-teal/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg transform hover:scale-[1.01] duration-200"
          >
            {isSigningup ? (
              <div className="flex items-center gap-2">
                <Loader2 className="size-5 animate-spin" />
                Creating account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        <div className="my-6 text-center">
          <p className="text-text-muted">
            Already have an account? &nbsp;
            <Link
              to="/login"
              className="font-medium transition-colors duration-200 text-muted-gold hover:underline hover:text-muted-gold/80"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
