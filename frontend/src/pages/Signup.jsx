import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, User, Mail, Lock, Loader2 } from 'lucide-react';
import {Link} from 'react-router-dom';
import toast from 'react-hot-toast';

function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const { signup, isSigningup } = useAuthStore();

  const validateForm = () =>{
    if(!formData.fullName.trim()){
      toast.error("Enter Your Name")
      return false;
    }
    else if(!formData.email.trim()){
      toast.error("Enter Your Email")
      return false;
    }
    else if(!formData.password){
      toast.error("Enter Your Password")
      return false;
    }
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm()
    if(success === true){
      signup(formData);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-950">
      <div className="w-full max-w-md p-8 mt-10 bg-gray-900 border border-gray-800 shadow-xl rounded-2xl">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center mb-2 size-12 bg-indigo-800/20 rounded-xl">
            <MessageSquare className="text-indigo-400 size-6" />
          </div>
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-sm text-center text-gray-400">
            Get started with your free account
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label className="block mb-1 font-medium text-gray-300">Full Name</label>
            <div className="absolute inset-y-0 flex items-center text-gray-500 pointer-events-none left-3">
              <User className="w-5 h-5 mt-7" />
            </div>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full h-12 pl-10 pr-3 text-white placeholder-gray-500 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>
          <div className="relative">
            <label className="block mb-1 font-medium text-gray-300">Email</label>
            <div className="absolute inset-y-0 flex items-center text-gray-500 pointer-events-none left-3">
              <Mail className="w-5 h-5 mt-7" />
            </div>
            <input
              type="email"
              placeholder="your@email.com"
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
          <button type="submit" disabled={isSigningup} className="w-full h-12 mt-2 font-semibold text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700">
            {isSigningup 
              ? <div className="flex items-center justify-center gap-2">
                  <Loader2 className='size-5 animate-spin' />
                  Loading...
                </div>
              : "Create Account"
            }
          </button>
        </form>
        <div className="my-4 text-center">
          <p className="text-white">Already have an account? <Link to="/login" className='text-blue-500 underline'>Log in</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
