import express from "express";
import Book from "../models/Book.js";
import {
  getBooks,
  getBookById,
  createBook,
  deleteBook,
} from "../controllers/bookController.js";

const router = express.Router();

// CRUD
router.route("/")
  .get(getBooks)
  .post(createBook);

router.route("/:id")
  .get(getBookById)
  .delete(deleteBook);

// ✅ PDF STREAM (WORKING)
router.get("/stream/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book || !book.pdfUrl) {
      return res.status(404).json({ message: "PDF not found" });
    }

    const filePath = `${process.cwd()}/uploads/pdfs/${book.pdfUrl}`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline");

    res.sendFile(filePath);
  } catch (error) {
    console.error("STREAM ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
