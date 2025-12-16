import React, { useState } from 'react';
import { PersonCircle, Envelope, Gear, Book, ClockHistory, HeartFill } from 'react-bootstrap-icons';

const Profile = () => {
  // Fake User Data (We will replace this with real DB data later)
  const [user, setUser] = useState({
    name: "Alex Reader",
    email: "alex@example.com",
    role: "Premium Member",
    joined: "Oct 2025",
    avatar: "https://placehold.co/150x150?text=Alex", // Placeholder image
    stats: {
      booksRead: 12,
      readingHours: 45,
      favorites: 5
    }
  });

  const [activeTab, setActiveTab] = useState("Activity");

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full font-sans">
      
      {/* Header Section */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16"></div>

        {/* Avatar */}
        <div className="relative z-10">
            <img 
              src={user.avatar} 
              alt="Profile" 
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition">
              <Gear size={16} />
            </button>
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left relative z-10">
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 mt-2">
                <Envelope size={16} />
                <span>{user.email}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full mx-2"></span>
                <span className="text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full text-xs">
                  {user.role}
                </span>
            </div>
            <p className="text-sm text-gray-400 mt-4">Member since {user.joined}</p>
        </div>

        {/* Stats Cards */}
        <div className="flex gap-4 relative z-10">
            <div className="bg-gray-50 p-4 rounded-2xl text-center min-w-[100px]">
                <h3 className="text-2xl font-bold text-gray-900">{user.stats.booksRead}</h3>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Books</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl text-center min-w-[100px]">
                <h3 className="text-2xl font-bold text-gray-900">{user.stats.readingHours}h</h3>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Hours</p>
            </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Menu */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit">
            <h3 className="font-bold text-gray-900 mb-4 px-2">Menu</h3>
            <nav className="space-y-2">
                {['Activity', 'My Library', 'Settings'].map((item) => (
                    <button 
                        key={item}
                        onClick={() => setActiveTab(item)}
                        className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-3 ${
                            activeTab === item 
                            ? "bg-gray-900 text-white shadow-md" 
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                        {item === 'Activity' && <ClockHistory />}
                        {item === 'My Library' && <Book />}
                        {item === 'Settings' && <Gear />}
                        {item}
                    </button>
                ))}
            </nav>
        </div>

        {/* Right Column: Content Area */}
        <div className="lg:col-span-2">
            {activeTab === 'Activity' && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                    
                    {/* Fake Activity List */}
                    <div className="space-y-6">
                        <div className="flex gap-4 items-start">
                            <div className="bg-green-100 text-green-600 p-3 rounded-xl">
                                <Book size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Finished "Atomic Habits"</h4>
                                <p className="text-sm text-gray-500">You completed this book on Dec 12, 2025.</p>
                            </div>
                        </div>
                        <div className="w-full h-px bg-gray-100"></div>
                        <div className="flex gap-4 items-start">
                            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                                <HeartFill size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Liked "The Alchemist"</h4>
                                <p className="text-sm text-gray-500">Added to your favorites list.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'Settings' && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center py-20">
                    <p className="text-gray-400">Settings form will go here...</p>
                </div>
            )}
             
             {activeTab === 'My Library' && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center py-20">
                    <p className="text-gray-400">Library list will go here...</p>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default Profile;