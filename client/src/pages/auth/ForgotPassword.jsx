import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Fake Logic: Just show a success message for now
    if(email) {
        toast.success("Reset link sent to your email!");
        setEmail(''); // Clear the input
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">Forgot Password?</h2>
        <p className="text-gray-500 mt-2">No worries! Enter your email and we will send you a reset instructions.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
                type="email" 
                placeholder="Enter your registered email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-black focus:bg-white focus:ring-4 focus:ring-gray-100 transition-all outline-none" 
            />
        </div>
        
        <button type="submit" className="w-full py-3.5 rounded-lg bg-gray-900 text-white font-bold text-lg hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
            Send Reset Link
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        Remember your password? <Link to="/login" className="font-semibold text-black hover:underline">Back to Login</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;