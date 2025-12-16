import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Signup = () => {
  const [role, setRole] = useState('user'); 
  const [secretKey, setSecretKey] = useState('');
  // This state tracks what you type
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  // Handle typing in the form
  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.type === 'text' ? 'name' : e.target.type]: e.target.value });
  };
  // Specific handler for name field
  const handleName = (e) => setFormData({ ...formData, name: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role === 'admin' && secretKey !== 'admin123') {
      return toast.error("Invalid Admin Secret Key!");
    }

    try {
        await axios.post('http://localhost:5000/api/auth/register', {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: role
        });
        toast.success("Account Created! Please Login.");
        navigate('/login'); 
    } catch (error) {
        toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="bg-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Create an account</h2>
        <p className="text-gray-500 mt-2">Start your journey with us today.</p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-full inline-flex relative shadow-inner">
          <button type="button" onClick={() => setRole('user')} className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${role === 'user' ? 'bg-black text-white shadow-md' : 'text-gray-500'}`}>User</button>
          <button type="button" onClick={() => setRole('admin')} className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${role === 'admin' ? 'bg-black text-white shadow-md' : 'text-gray-500'}`}>Admin</button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" value={formData.name} onChange={handleName} placeholder="John Doe" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-black" />
        </div>

        {role === 'admin' && (
           <div className="animate-fade-in-down">
              <label className="block text-sm font-bold text-red-500 mb-1">Admin Secret Key</label>
              <input type="password" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} placeholder="Enter key (admin123)" className="w-full px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 outline-none" />
           </div>
        )}
        
        <button type="submit" className="w-full py-3.5 rounded-lg bg-gray-900 text-white font-bold text-lg hover:bg-black transition-all">
            {role === 'admin' ? 'Register as Admin' : 'Create Account'}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        Already have an account? <Link to="/login" className="font-semibold text-black hover:underline">Log In</Link>
      </p>
    </div>
  );
};

export default Signup;