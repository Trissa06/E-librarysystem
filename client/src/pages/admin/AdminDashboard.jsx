import React from 'react';
import { People, Book, Eye, ChatSquareQuote, ClockHistory } from 'react-bootstrap-icons';

const AdminDashboard = () => {
  // Fake Activity Log
  const recentActivity = [
    { id: 1, user: "John Doe", book: "The Great Gatsby", action: "Started Reading", date: "Just now", status: "Online" },
    { id: 2, user: "Jane Smith", book: "Clean Code", action: "Rated 5 Stars", date: "2 mins ago", status: "Offline" },
    { id: 3, user: "Mike Ross", book: "Suits Vol. 1", action: "Commented", date: "1 hour ago", status: "Online" },
    { id: 4, user: "Rachel Zane", book: "Legal Ethics", action: "Added to Favorites", date: "3 hours ago", status: "Offline" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Overview</h1>
        <p className="text-gray-500 mt-2">Monitor user engagement and content popularity.</p>
      </div>

      {/* Stats Cards - E-Library Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Card 1: Total Books */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl">
            <Book size={24} />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Total Books</h3>
            <p className="text-2xl font-bold text-gray-900">1,240</p>
          </div>
        </div>

        {/* Card 2: Active Readers */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-xl">
            <People size={24} />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Active Readers</h3>
            <p className="text-2xl font-bold text-gray-900">350</p>
          </div>
        </div>

        {/* Card 3: Total Reads (Views) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-xl">
            <Eye size={24} />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Total Reads</h3>
            <p className="text-2xl font-bold text-gray-900">15.2k</p>
          </div>
        </div>

        {/* Card 4: Reviews/Engagement */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-xl">
            <ChatSquareQuote size={24} />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Reviews</h3>
            <p className="text-2xl font-bold text-gray-900">850</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Live User Activity</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">User</th>
                <th className="p-4 font-semibold">Content</th>
                <th className="p-4 font-semibold">Activity</th>
                <th className="p-4 font-semibold">Time</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentActivity.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900">{item.user}</td>
                  <td className="p-4 text-gray-600">{item.book}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        item.action.includes("Started") ? "bg-blue-100 text-blue-700" :
                        item.action.includes("Rated") ? "bg-yellow-100 text-yellow-700" :
                        "bg-gray-100 text-gray-700"
                    }`}>
                        {item.action}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 flex items-center gap-2">
                    <ClockHistory size={14} /> {item.date}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${item.status === "Online" ? "bg-green-500" : "bg-gray-300"}`}></span>
                        <span className="text-sm text-gray-600">{item.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;