import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Search, Fire, GraphUpArrow, InfoCircle, PlayFill } from 'react-bootstrap-icons';


const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState("All");

 const [books, setBooks] = useState([]);

useEffect(() => {
    const fetchBooks = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/books');
            setBooks(data);
        } catch (error) {
            console.log(error);
        }
    };
    fetchBooks();
}, []);

  const categories = ["All", "Fiction", "Self-Help", "Business", "Tech", "Sci-Fi", "Psychology"];

  const openBookDetails = (bookId) => {
    navigate(`/dashboard/book/${bookId}`);
  };

  // --- FIXED FUNCTION ---
  const handleRead = (e, bookId) => {
    e.stopPropagation(); 
    // This now points to the correct URL that works in your app
    navigate(`/dashboard/read/${bookId}`); 
  };

  // 1. Trending Logic
  const trendingBooks = books.filter(b => b.isTrending);

  // 2. Main Search Logic
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === "All" || book.category === activeTab;

    return searchTerm ? matchesSearch : (matchesSearch && matchesCategory);
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      
      {/* Search Header */}
      <div className="bg-gray-900 rounded-3xl p-8 mb-10 text-white shadow-xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-gray-700 opacity-20 rounded-full blur-3xl -mr-16 -mt-16"></div>
         <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Find your next great read</h1>
            <div className="relative flex items-center bg-white rounded-xl shadow-lg overflow-hidden p-1">
                <Search className="absolute left-4 text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Search by title, author, or category..." 
                    className="w-full py-3 pl-12 pr-4 text-gray-700 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
         </div>
      </div>

      {/* CONDITIONAL RENDERING: Hide these sections if searching */}
      {!searchTerm && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 animate-fade-in-up">
            
            {/* Trending Section */}
            <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                    <Fire className="text-orange-500" size={24} />
                    <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                    {trendingBooks.map((book) => (
                        <div key={book._id} onClick={() => openBookDetails(book._id)} className="min-w-[160px] cursor-pointer group">
                            <img src={book.coverImage} alt={book.title} className="w-full h-60 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300" />
                            <h3 className="font-bold text-gray-900 mt-3 truncate">{book.title}</h3>
                            <p className="text-sm text-gray-500">{book.author}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Most Read Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                    <GraphUpArrow className="text-blue-600" size={20} />
                    <h2 className="text-xl font-bold text-gray-900">Most Read</h2>
                </div>
                <div className="space-y-4">
                    {books.slice(0, 3).map((book, index) => (
                        <div key={book._id} onClick={() => openBookDetails(book._id)} className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                            <span className="text-2xl font-bold text-gray-300 w-6">#{index + 1}</span>
                            <img src={book.coverImage} alt={book.title} className="w-12 h-16 object-cover rounded-md shadow-sm" />
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm">{book.title}</h4>
                                <p className="text-xs text-gray-500">{book.reads} reads</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
      )}

      {/* Main Grid / Search Results */}
      <div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
                {searchTerm ? `Results for "${searchTerm}"` : "Explore Collection"}
            </h2>
            
            {/* Hide Tabs if searching */}
            {!searchTerm && (
                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2">
                    {categories.map((cat) => (
                        <button 
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                                activeTab === cat 
                                ? "bg-gray-900 text-white shadow-md" 
                                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredBooks.map((book) => (
                <div key={book._id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group">
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10 rounded-2xl flex flex-col justify-center items-center gap-3 backdrop-blur-sm">
                        
                        {/* DETAILS BUTTON */}
                        <button onClick={() => openBookDetails(book._id)} className="bg-white text-black px-6 py-2 rounded-full font-bold flex items-center gap-2 transform hover:scale-105 transition-all">
                            <InfoCircle /> Details
                        </button>

                        {/* READ BUTTON (Fixed to use handleRead) */}
                        <button 
                            onClick={(e) => handleRead(e, book._id)} 
                            className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 transform hover:scale-105 transition-all"
                        >
                            <PlayFill /> Read
                        </button>

                    </div>
                    <div className="h-64 overflow-hidden rounded-xl mb-4 bg-gray-100 flex justify-center items-center relative">
                        <img src={book.coverImage} alt={book.title} className="h-full object-cover shadow-md" />
                        <span className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold shadow-sm">{book.category}</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 truncate">{book.title}</h3>
                        <p className="text-sm text-gray-500">{book.author}</p>
                    </div>
                </div>
            ))}
        </div>
        
        {filteredBooks.length === 0 && (
            <div className="text-center py-20 text-gray-400">
                <p>No books found matching your search.</p>
            </div>
        )}
      </div>

    </div>
  );
};

export default Home;