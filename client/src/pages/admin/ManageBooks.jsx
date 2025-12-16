import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Plus,
  PencilSquare,
  Trash,
  Tags,
  X,
  Link45deg,
  Magic,
  Search,
} from "react-bootstrap-icons";

const ManageBooks = () => {
  // ---------- STATES ----------
  const [categories, setCategories] = useState([
    "Fiction",
    "Non-Fiction",
    "Sci-Fi",
    "Tech",
    "History",
    "Self-Help",
  ]);

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBookModal, setShowBookModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const [currentBook, setCurrentBook] = useState({
    _id: null,
    title: "",
    author: "",
    category: "Fiction",
    cover: "",
    pdfUrl: "",
    synopsis: "",
  });

  // ---------- FETCH BOOKS ----------
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books");
        setBooks(res.data);
      } catch (err) {
        toast.error("Failed to load books");
      }
    };
    fetchBooks();
  }, []);

  // ---------- SEARCH ----------
  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author} ${book.category}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // ---------- HANDLERS ----------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBook({ ...currentBook, [name]: value });
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    if (categories.includes(newCategory)) {
      toast.error("Category already exists");
      return;
    }
    setCategories([...categories, newCategory]);
    setNewCategory("");
    toast.success("Category added");
  };

  const handleDeleteCategory = (cat) => {
    setCategories(categories.filter((c) => c !== cat));
    toast.success("Category removed");
  };

  const handleAIGenerate = () => {
    if (!currentBook.title) {
      toast.error("Enter book title first");
      return;
    }
    toast.loading("Generating...");
    setTimeout(() => {
      toast.dismiss();
      setCurrentBook((prev) => ({
        ...prev,
        synopsis: `AI generated synopsis for ${prev.title}`,
      }));
      toast.success("Synopsis generated");
    }, 1000);
  };

  const handleSaveBook = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/books",
        {
          title: currentBook.title,
          author: currentBook.author,
          category: currentBook.category,
          coverImage: currentBook.cover,
          pdfUrl: currentBook.pdfUrl,
          description: currentBook.synopsis,
        }
      );
      setBooks([...books, data]);
      toast.success("Book saved");
      setShowBookModal(false);
    } catch {
      toast.error("Failed to save book");
    }
  };

  const handleDeleteBook = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      setBooks(books.filter((b) => b._id !== id));
      toast.success("Book deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  // ---------- UI ----------
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Library Inventory</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowCategoryModal(true)}
            className="bg-white border px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Tags /> Categories
          </button>
          <button
            onClick={() => setShowBookModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <Plus /> Add Book
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search books..."
        className="w-full mb-6 p-3 rounded-lg border"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* TABLE */}
      <table className="w-full bg-white rounded-xl overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4">Book</th>
            <th className="p-4">Author</th>
            <th className="p-4">Category</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book._id} className="border-t">
              <td className="p-4 flex gap-3 items-center">
                <img
                  src={book.coverImage || book.cover}
                  alt={book.title}
                  className="w-12 h-16 object-cover rounded"
                />
                <div>
                  <div className="font-semibold">{book.title}</div>
                  <a
                    href={book.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-500 flex items-center gap-1"
                  >
                    <Link45deg /> View PDF
                  </a>
                </div>
              </td>
              <td className="p-4">{book.author}</td>
              <td className="p-4">{book.category}</td>
              <td className="p-4">
                <button
                  onClick={() => handleDeleteBook(book._id)}
                  className="text-red-600"
                >
                  <Trash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ADD BOOK MODAL */}
      {showBookModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg relative">
            <button
              onClick={() => setShowBookModal(false)}
              className="absolute top-3 right-3"
            >
              <X />
            </button>
            <h2 className="text-xl font-bold mb-4">Add Book</h2>
            <form onSubmit={handleSaveBook} className="space-y-3">
              <input name="title" placeholder="Title" className="w-full p-2 border rounded" onChange={handleInputChange} required />
              <input name="author" placeholder="Author" className="w-full p-2 border rounded" onChange={handleInputChange} required />
              <input name="cover" placeholder="Cover Image URL" className="w-full p-2 border rounded" onChange={handleInputChange} />
              <input name="pdfUrl" placeholder="PDF URL" className="w-full p-2 border rounded" onChange={handleInputChange} required />
              <select name="category" className="w-full p-2 border rounded" onChange={handleInputChange}>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <textarea name="synopsis" placeholder="Synopsis" className="w-full p-2 border rounded" onChange={handleInputChange} />
              <button type="button" onClick={handleAIGenerate} className="text-sm text-purple-600 flex items-center gap-1">
                <Magic /> Auto generate synopsis
              </button>
              <button className="w-full bg-blue-600 text-white py-2 rounded">
                Save Book
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CATEGORY MODAL */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm relative">
            <button onClick={() => setShowCategoryModal(false)} className="absolute top-3 right-3">
              <X />
            </button>
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <Tags /> Manage Categories
            </h2>
            <form onSubmit={handleAddCategory} className="flex gap-2 mb-4">
              <input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="flex-1 p-2 border rounded" />
              <button className="bg-black text-white px-3 rounded">+</button>
            </form>
            {categories.map((cat) => (
              <div key={cat} className="flex justify-between items-center mb-2">
                <span>{cat}</span>
                <button onClick={() => handleDeleteCategory(cat)} className="text-red-600">
                  <Trash />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;
