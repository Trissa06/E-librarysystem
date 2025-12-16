import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; 

const Login = () => {
  const [role, setRole] = useState('user'); 
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === 'admin') {
      toast.success("Welcome back, Admin!");
      navigate('/admin');
    } else {
      toast.success("Welcome back, User!");
      navigate('/dashboard'); 
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">Log In</h2>
        <p className="text-gray-500 mt-2">Welcome back! Please enter your details.</p>
      </div>

      {/* Role Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-full inline-flex relative shadow-inner">
          <button 
            type="button"
            onClick={() => setRole('user')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                role === 'user' 
                ? 'bg-black text-white shadow-md' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            User
          </button>
          <button 
            type="button"
            onClick={() => setRole('admin')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                role === 'admin' 
                ? 'bg-black text-white shadow-md' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Admin
          </button>
        </div>
      </div>
      
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" placeholder="Enter your email" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-black focus:bg-white focus:ring-4 focus:ring-gray-100 transition-all outline-none" />
        </div>
        
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" placeholder="••••••••" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-black focus:bg-white focus:ring-4 focus:ring-gray-100 transition-all outline-none" />
        </div>

        {/* --- NEW: FORGOT PASSWORD LINK --- */}
        <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm font-medium text-gray-500 hover:text-black hover:underline transition-colors">
                Forgot password?
            </Link>
        </div>
        
        <button type="submit" className="w-full py-3.5 rounded-lg bg-gray-900 text-white font-bold text-lg hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
            {role === 'admin' ? 'Login as Admin' : 'Sign In'}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        Don't have an account? <Link to="/signup" className="font-semibold text-black hover:underline">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;