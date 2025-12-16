import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Book, Star, Heart, Megaphone, X, Envelope, BellFill, Reply, CheckCircle, ClockHistory, ExclamationTriangle, InfoCircle } from 'react-bootstrap-icons';

const UserDashboard = () => {
  const myLibrary = [
    { id: 1, title: "Harry Potter", author: "J.K. Rowling", dateAdded: "2025-12-10", progress: "45%", cover: "https://placehold.co/100x150?text=Harry+Potter" },
    { id: 2, title: "Introduction to Algorithms", author: "Thomas H. Cormen", dateAdded: "2025-12-12", progress: "10%", cover: "https://placehold.co/100x150?text=Algorithms" },
    { id: 3, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", dateAdded: "2025-12-14", progress: "Completed", cover: "https://placehold.co/100x150?text=Rich+Dad" },
  ];

  const [notifications, setNotifications] = useState([
    { id: 1, title: "Admin Message", content: "Please return 'Clean Code'. We are moving fully digital!", type: "message", date: "Just now", sender: "System Admin", read: false },
    { id: 2, title: "System Maintenance", content: "The site will be down for 30 mins tonight.", type: "alert", date: "2 hours ago", read: false }, // <-- RED ALERT
    { id: 3, title: "New Arrival: Dune", content: "The Dune series is now available.", type: "info", date: "Yesterday", read: false }, // <-- BLUE INFO
    { id: 4, title: "Welcome!", content: "Thanks for joining Library.io", type: "info", date: "Last Week", read: true },
  ]);

  const [showNotifications, setShowNotifications] = useState(false); 
  const [notificationTab, setNotificationTab] = useState('unread');
  const [selectedMessage, setSelectedMessage] = useState(null); 
  const [replyText, setReplyText] = useState("");

  const markAsRead = (e, id) => { e.stopPropagation(); setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n)); toast.success("Moved to History"); };
  const deleteNotification = (e, id) => { e.stopPropagation(); setNotifications(notifications.filter(n => n.id !== id)); };
  
  const handleNotificationClick = (note) => {
    if (note.type === 'message') {
        setSelectedMessage(note); 
        setShowNotifications(false); 
        setNotifications(notifications.map(n => n.id === note.id ? { ...n, read: true } : n));
    }
  };

  const unreadList = notifications.filter(n => !n.read);
  const readList = notifications.filter(n => n.read);

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full relative" onClick={() => setShowNotifications(false)}>
      
      {/* Header */}
      <div className="flex justify-between items-end mb-8 relative">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">My Library</h1>
            <p className="text-gray-500 mt-2">Welcome back! Pick up where you left off.</p>
        </div>
        
        {/* BELL ICON & DROPDOWN */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-3 rounded-full transition-all ${showNotifications ? "bg-blue-100 text-blue-600" : "bg-white text-gray-400 hover:text-gray-600 shadow-sm"}`}
            >
                <BellFill size={24} />
                {unreadList.length > 0 && (
                    <span className="absolute top-2 right-2 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                )}
            </button>

            {/* --- DROPDOWN MENU --- */}
            {showNotifications && (
                <div className="absolute right-0 mt-4 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fade-in-up origin-top-right">
                    
                    {/* Tabs */}
                    <div className="flex border-b border-gray-100 bg-gray-50">
                        <button onClick={() => setNotificationTab('unread')} className={`flex-1 py-3 text-sm font-bold transition-colors ${notificationTab === 'unread' ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-gray-500 hover:text-gray-700'}`}>New ({unreadList.length})</button>
                        <button onClick={() => setNotificationTab('read')} className={`flex-1 py-3 text-sm font-bold transition-colors ${notificationTab === 'read' ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-gray-500 hover:text-gray-700'}`}>History</button>
                    </div>

                    {/* SCROLLABLE LIST CONTAINER (max-h-80 = Scroll bar appears if taller than 320px) */}
                    <div className="max-h-80 overflow-y-auto bg-white custom-scrollbar">
                        
                        {/* UNREAD TAB */}
                        {notificationTab === 'unread' && (
                            unreadList.length === 0 ? <div className="p-8 text-center text-gray-400 text-sm">No new notifications.</div> : (
                                unreadList.map((note) => (
                                    <div key={note.id} onClick={() => handleNotificationClick(note)} className="p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 flex gap-4 transition-colors group">
                                        {/* Icon Color Logic */}
                                        <div className={`p-2 h-fit rounded-full shrink-0 ${
                                            note.type === 'message' ? "bg-black text-white" : 
                                            note.type === 'alert' ? "bg-red-100 text-red-600" : 
                                            "bg-blue-100 text-blue-600"
                                        }`}>
                                            {note.type === 'message' ? <Envelope size={14} /> : note.type === 'alert' ? <ExclamationTriangle size={14} /> : <InfoCircle size={14} />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-sm text-gray-900">{note.title}</h4>
                                                <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{note.date}</span>
                                            </div>
                                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{note.content}</p>
                                        </div>
                                        <button onClick={(e) => markAsRead(e, note.id)} className="text-gray-300 hover:text-blue-600 self-center p-1" title="Mark Read"><CheckCircle size={18} /></button>
                                    </div>
                                ))
                            )
                        )}

                        {/* HISTORY TAB */}
                        {notificationTab === 'read' && (
                            readList.length === 0 ? <div className="p-8 text-center text-gray-400 text-sm">No history.</div> : (
                                readList.map((note) => (
                                    <div key={note.id} onClick={() => handleNotificationClick(note)} className="p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 flex gap-4 opacity-75 hover:opacity-100">
                                        <div className="p-2 h-fit rounded-full shrink-0 bg-gray-100 text-gray-400">
                                            {note.type === 'message' ? <Envelope size={14} /> : <Megaphone size={14} />}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm text-gray-500 line-through decoration-gray-300">{note.title}</h4>
                                            <p className="text-xs text-gray-400 mt-1 line-clamp-1">{note.content}</p>
                                        </div>
                                        <button onClick={(e) => deleteNotification(e, note.id)} className="text-gray-200 hover:text-red-500 self-center p-1"><X size={20} /></button>
                                    </div>
                                ))
                            )
                        )}
                    </div>
                    
                    <div className="p-2 bg-gray-50 text-center border-t border-gray-100">
                        {notificationTab === 'unread' && unreadList.length > 0 && <button onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))} className="text-xs font-bold text-blue-600 w-full py-1">Mark all as read</button>}
                        {notificationTab === 'read' && readList.length > 0 && <button onClick={() => setNotifications(notifications.filter(n => !n.read))} className="text-xs font-bold text-red-400 w-full py-1">Clear History</button>}
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* Rest of Dashboard (Stats, Books, etc.) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl"><Book size={24} /></div>
          <div><h3 className="text-gray-500 text-sm font-medium">Books Read</h3><p className="text-2xl font-bold text-gray-900">12</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center text-xl"><Star size={24} /></div>
          <div><h3 className="text-gray-500 text-sm font-medium">Reviews Given</h3><p className="text-2xl font-bold text-gray-900">5</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center text-xl"><Heart size={24} /></div>
          <div><h3 className="text-gray-500 text-sm font-medium">Favorites</h3><p className="text-2xl font-bold text-gray-900">8 Books</p></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100"><h2 className="text-xl font-bold text-gray-800">Continue Reading</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Book Title</th>
                <th className="p-4 font-semibold">Author</th>
                <th className="p-4 font-semibold">Progress</th>
                <th className="p-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {myLibrary.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 flex items-center gap-4"><img src={book.cover} alt={book.title} className="w-10 h-14 object-cover rounded shadow-sm" /><span className="font-semibold text-gray-800">{book.title}</span></td>
                  <td className="p-4 text-gray-600">{book.author}</td>
                  <td className="p-4"><span className={`px-3 py-1 text-xs font-bold rounded-full border ${book.progress === "Completed" ? "bg-green-50 text-green-600 border-green-200" : "bg-blue-50 text-blue-600 border-blue-200"}`}>{book.progress}</span></td>
                  <td className="p-4 text-right"><button className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">Read Now</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg relative">
                <button onClick={() => setSelectedMessage(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24} /></button>
                <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center"><Envelope size={24} /></div>
                    <div><h2 className="text-xl font-bold text-gray-900">{selectedMessage.title}</h2><p className="text-sm text-gray-500">From: {selectedMessage.sender} • {selectedMessage.date}</p></div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-gray-700 leading-relaxed mb-6 text-sm">{selectedMessage.content}</div>
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Reply to Admin</label>
                    <textarea className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none mb-4 text-sm" placeholder="Type your reply..." value={replyText} onChange={(e) => setReplyText(e.target.value)}></textarea>
                    <div className="flex justify-end gap-3"><button onClick={() => setSelectedMessage(null)} className="px-5 py-2 text-gray-500 font-medium hover:bg-gray-50 rounded-lg">Close</button><button onClick={() => {toast.success("Reply Sent!"); setSelectedMessage(null);}} className="px-5 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 flex items-center gap-2"><Reply size={18} /> Send Reply</button></div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;