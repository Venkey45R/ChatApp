import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Mail, Lock, Loader2, MessageSquare } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Enter your email");
      return false;
    } else if (!formData.password) {
      toast.error("Enter your password");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = validateForm();
    if (valid) {
      console.log(formData);
      const success = await login(formData);
      if (success) {
        navigate('/');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-950">
      <div className="w-full max-w-md p-8 bg-gray-900 border border-gray-800 shadow-xl rounded-2xl">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center mb-2 size-12 bg-indigo-800/20 rounded-xl">
            <MessageSquare className="text-indigo-400 size-6" />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-sm text-center text-gray-400">
            Log in to continue chatting
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label className="block mb-1 font-medium text-gray-300">Email</label>
            <div className="absolute inset-y-0 flex items-center text-gray-500 pointer-events-none left-3">
              <Mail className="w-5 h-5 mt-7" />
            </div>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full h-12 pl-10 pr-3 text-white placeholder-gray-500 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="relative">
            <label className="block mb-1 font-medium text-gray-300">Password</label>
            <div className="absolute inset-y-0 flex items-center text-gray-500 pointer-events-none left-3">
              <Lock className="w-5 h-5 mt-7" />
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full h-12 pl-10 pr-3 text-white placeholder-gray-500 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full h-12 mt-2 font-semibold text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            {isLoggingIn ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="size-5 animate-spin" />
                Logging in...
              </div>
            ) : (
              'Log In'
            )}
          </button>
        </form>
        <div className="my-4 text-center">
          <p className="text-white">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
