import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  StarFill, Star, Share, PlayFill,
  ArrowLeft, PersonCircle, Send, Robot
} from 'react-bootstrap-icons';
import toast from 'react-hot-toast';
import axios from 'axios';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ SAME STATE AS BEFORE
  const [book, setBook] = useState(null);

  const [reviews, setReviews] = useState([
    { id: 1, user: "Alice Johnson", rating: 5, comment: "Life changing book!", date: "2 days ago" },
    { id: 2, user: "Mark Spenser", rating: 4, comment: "Great but a bit repetitive.", date: "1 week ago" },
  ]);

  const [activeTab, setActiveTab] = useState('overview');
  const [newComment, setNewComment] = useState("");
  const [userRating, setUserRating] = useState(0);

  // ✅ ONLY LOGIC CHANGE (FETCH REAL BOOK)
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/books/${id}`);

        // 🔴 IMPORTANT: map backend fields to frontend design fields
        setBook({
          ...res.data,
          id: res.data._id,               // keeps your old logic working
          cover: res.data.coverImage,     // keeps thumbnail design same
          backdrop: res.data.coverImage,  // keeps backdrop SAME as before
        });
      } catch {
        toast.error("Failed to load book");
      }
    };
    fetchBook();
  }, [id]);

  // ⏳ SAME LOADING UI AS BEFORE
  if (!book) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  // ✅ SAME FUNCTION
  const handleRead = () => {
    navigate(`/dashboard/read/${book.id}`);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (userRating === 0) return toast.error("Select rating");
    if (!newComment.trim()) return toast.error("Write a comment");

    setReviews([
      { id: reviews.length + 1, user: "You", rating: userRating, comment: newComment, date: "Just now" },
      ...reviews
    ]);
    setNewComment("");
    setUserRating(0);
  };

  // 🔒 BELOW THIS = YOUR ORIGINAL JSX (UNCHANGED)
  return (
    <div className="bg-gray-50 min-h-screen w-full relative pb-10">

      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-20 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="h-80 w-full relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-10"></div>
        <img src={book.backdrop} className="w-full h-full object-cover" />
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-32 relative z-20">
        <div className="flex flex-col md:flex-row gap-8">

          <img
            src={book.cover}
            className="w-64 rounded-xl shadow-2xl border-4 border-white"
          />

          <div className="flex-1 text-white md:pt-10 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-gray-900 md:text-white">
              {book.title}
            </h1>
            <p className="text-xl text-gray-700 md:text-gray-200 mb-6">
              by {book.author}
            </p>

            <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
              <div className="flex items-center gap-1 bg-yellow-400 px-3 py-1 rounded-lg font-bold">
                <StarFill /> 4.8
              </div>
              <span className="text-gray-300">300 Pages</span>
            </div>

            <div className="flex gap-4 justify-center md:justify-start">
              <button
                onClick={handleRead}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2"
              >
                <PlayFill /> Read Now
              </button>
              <button className="p-3 rounded-xl bg-white/10">
                <Share />
              </button>
            </div>
          </div>
        </div>

        {/* TABS (UNCHANGED) */}
        <div className="mt-12">
          <div className="flex gap-8 border-b mb-6">
            <button onClick={() => setActiveTab('overview')} className="font-bold">
              Overview
            </button>
            <button onClick={() => setActiveTab('reviews')} className="font-bold">
              Reviews ({reviews.length})
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-purple-600 font-bold text-xs">
                <Robot /> AI Generated Synopsis
              </div>
              <p className="text-gray-700 text-lg">{book.description}</p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {reviews.map(r => (
                  <div key={r.id} className="bg-white p-6 rounded-xl shadow-sm">
                    <h4 className="font-bold">{r.user}</h4>
                    <p className="text-gray-600">{r.comment}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold mb-4">Leave a Review</h3>
                <form onSubmit={handleSubmitReview}>
                  <div className="flex gap-2 mb-4">
                    {[1,2,3,4,5].map(star => (
                      <button key={star} type="button" onClick={() => setUserRating(star)}>
                        <StarFill className={userRating >= star ? "text-yellow-400" : "text-gray-300"} />
                      </button>
                    ))}
                  </div>
                  <textarea
                    className="w-full p-3 border rounded-xl mb-4"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                    <button
                    className="w-full bg-black text-white py-3 rounded-xl
                                flex items-center justify-center gap-2"
                    >
                    <Send size={16} />
                    Post Review
                    </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
