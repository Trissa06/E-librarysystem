import Book from '../models/Book.js';

// Get all books
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// ✅ Get single book by ID
export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create a book
export const createBook = async (req, res) => {
    try {
        const { title, author, category, description, coverImage, pdfUrl } = req.body;
        const book = new Book({
            title, author, category, description, coverImage, pdfUrl
        });
        const createdBook = await book.save();
        res.status(201).json(createdBook);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// Delete a book
export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            await book.deleteOne();
            res.json({ message: 'Book removed' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
