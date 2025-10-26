import { booksDir, coversDir } from "../config/uploadConfig.js";
import bookRepository from "../repositories/bookRepository.js";
import path from "path";
import fs from "fs";
import Poppler from "pdf-poppler";

// save book
export const addBook = async (req, res, next) => {
  try {
    const { gendre,title, description, price, author_id } = req.body;

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
const getUserBooks= async (req, res, next)=> {
 
  
  try {const userBooks = await bookRepository.getBooksByAuthorId(req.params.id);
  
    res.status(200).json(userBooks);
  
} catch (error) {
     res.status(500).json({ message: "Server error while fetching books" });
  
}}
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
const addFavorites= async(req,res, next) =>{
  try {
   const favoriteBook= await bookRepository.saveFavorites(req.body)
     res.status(201).json({ message: "Book added successfully in the Favorites", book: favoriteBook })
  } catch (error) {
    console.error("Error adding favorite book:", error);
    res.status(500).json({ message: "Server error while adding book" })
  }
}
//remove favorites
const deleteFavorites = async (req, res, next) => { 
  console.log('kod',req.body);
  
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

export default {deleteFavorites,getFavorites, addFavorites,deleteBook, addBook, getBooks, getUserBooks };
