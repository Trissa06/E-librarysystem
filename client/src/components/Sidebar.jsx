import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// 1. Added PersonCircle to imports
import { HouseDoor, Book, People, BoxArrowRight, Speedometer2, Megaphone, PersonCircle } from 'react-bootstrap-icons';

const Sidebar = () => {
  const location = useLocation();
  
  // Logic: Check if the current URL contains "/admin"
  const isAdmin = location.pathname.startsWith('/admin');

  // Helper for active link styling
  const isActive = (path) => location.pathname === path 
    ? "bg-blue-600 text-white shadow-md" 
    : "text-gray-400 hover:bg-gray-800 hover:text-white";

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col flex-shrink-0 transition-all duration-300">
      
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-3 border-b border-gray-800">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-lg">E</div>
        <h2 className="text-xl font-bold tracking-wide">Library.io</h2>
      </div>

      {/* Navigation Links */}
      <ul className="flex-1 p-4 space-y-2 mt-2 overflow-y-auto">
        
        {/* --- ADMIN LINKS (Only show if isAdmin is true) --- */}
        {isAdmin ? (
            <>
                <li>
                  <Link to="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin')}`}>
                    <Speedometer2 size={20} />
                    <span className="font-medium">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/books" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin/books')}`}>
                    <Book size={20} />
                    <span className="font-medium">Manage Books</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/users" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin/users')}`}>
                    <People size={20} />
                    <span className="font-medium">Manage Users</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/announcements" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin/announcements')}`}>
                    <Megaphone size={20} />
                    <span className="font-medium">Announcements</span>
                  </Link>
                </li>
            </>
        ) : (
            /* --- USER LINKS (Show if NOT admin) --- */
            <>
                <li>
                  <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/dashboard')}`}>
                    <Speedometer2 size={20} />
                    <span className="font-medium">My Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/home" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/dashboard/home')}`}>
                    <Book size={20} />
                    <span className="font-medium">Browse Library</span>
                  </Link>
                </li>
                
                {/* 2. ADDED PROFILE LINK HERE */}
                <li>
                  <Link to="/dashboard/profile" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/dashboard/profile')}`}>
                    <PersonCircle size={20} />
                    <span className="font-medium">My Profile</span>
                  </Link>
                </li>

            </>
        )}

      </ul>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-800">
        <Link to="/login" className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
          <BoxArrowRight size={20} />
          <span className="font-medium">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;