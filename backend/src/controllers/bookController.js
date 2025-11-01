import { booksDir, coversDir } from "../config/uploadConfig.js";
import bookRepository from "../repositories/bookRepository.js";
import path from "path";
import fs from "fs";
import Poppler from "pdf-poppler";

//view Book
const view = async (req, res) => {
   try {
    const [book] = await bookRepository.getBookById(req.params.id);
    if (!book || !book[0]) return res.status(404).json({ error: "Book not found" });

    // Mutlak path oluştur
   
    const filePath = path.join(process.cwd(), book[0].file_path);

    console.log("PDF Path:", filePath);

    if (!fs.existsSync(filePath)) return res.status(404).json({ error: "File not found" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline"); // Görüntüle, indir: hayır
    res.setHeader("Cache-Control", "no-store");     // tarayıcı cache engeli

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching book" });
  }
}

//previw
export const preview = async (req, res) => {

  try {
    const [book] = await bookRepository.getBookById(req.params.id)
    res.json(book[0].file_path);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching book" });
  }

}
// save book
export const addBook = async (req, res, next) => {
  try {
    const { gendre, title, description, price, author_id } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = `/uploads/books/${req.file.filename}`;
    let coverPath = null;

    // PDF’in ilk sayfasını kapak olarak oluştur
    try {
      const pdfFilePath = path.join(booksDir, req.file.filename);
      const coverImagePrefix = `${Date.now()}_cover`;

      await Poppler.convert(pdfFilePath, {
        format: 'jpeg',
        out_dir: coversDir,
        out_prefix: coverImagePrefix,
        page: 1
      });

      // Gerçek dosya adını bul
      const files = fs.readdirSync(coversDir);
      const generatedCover = files.find(f => f.startsWith(coverImagePrefix) && f.endsWith('.jpg'));

      if (generatedCover) {
        coverPath = `/uploads/covers/${generatedCover}`;
      }

    } catch (err) {
      console.warn("Cover image could not be generated, continuing without it.", err);
      coverPath = null;
    }

    const newBook = {
      gendre: gendre.trim(),
      title: title.trim(),
      cover_image: coverPath,
      description,
      author_id,
      price: parseFloat(price),
      file_path: filePath,
    };

    const savedBook = await bookRepository.saveBook(newBook);
    res.status(201).json({ message: "Book added successfully", book: savedBook });

  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Server error while adding book" });
  }
};

//get all books
const getBooks = async (req, res, next) => {
  try {
    const allBooks = await bookRepository.getBooks();


    res.status(200).json(allBooks);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching books" });
  }
};
// get books by user id
const getUserBooks = async (req, res, next) => {


  try {
    const userBooks = await bookRepository.getBooksByAuthorId(req.params.id);

    res.status(200).json(userBooks);

  } catch (error) {
    res.status(500).json({ message: "Server error while fetching books" });

  }
}
//get book by id
const getBookById = async (req, res) => {
  try {
    const book = await bookRepository.getBookById(req.params.id);
    res.status(200).json(book)
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching book" });
  }
}
// delete book by id
const deleteBook = async (req, res, next) => {
  try {
    await bookRepository.deleteBookById(req.params.id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting book" });
  }
};

// addFavorites
const addFavorites = async (req, res, next) => {
  try {
    const favoriteBook = await bookRepository.saveFavorites(req.body)
    res.status(201).json({ message: "Book added successfully in the Favorites", book: favoriteBook })
  } catch (error) {
    console.error("Error adding favorite book:", error);
    res.status(500).json({ message: "Server error while adding book" })
  }
}
//remove favorites
const deleteFavorites = async (req, res, next) => {
  console.log('kod', req.body);

  try {
    await bookRepository.removeFavorites(req.body);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting book" });
  }
};
//getFavorites
const getFavorites = async (req, res, next) => {
  try {
    const allBooks = await bookRepository.getFavorites(req.params.id);
    res.status(200).json(allBooks);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching books" });
  }
};

export default {
  preview, view,
  deleteFavorites, getFavorites,
  addFavorites, deleteBook, addBook,
  getBooks, getUserBooks, getBookById
};
