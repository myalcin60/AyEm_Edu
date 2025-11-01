import express from "express";
import bookController from "../controllers/bookController.js";
import { upload } from "../config/uploadConfig.js";

const router = express.Router();

router.post('/add-book', upload.single("bookFile"), bookController.addBook);
router.get('/books', bookController.getBooks)
router.get('/books/details/:id', bookController.getBookById);
router.get('/books/:id', bookController.getUserBooks);
router.delete('/books/delete/:id', bookController.deleteBook)
router.post('/favorites', bookController.addFavorites)
router.delete('/favorites', bookController.deleteFavorites)
router.get('/favorites/:id', bookController.getFavorites)
router.get('/books/preview/:id', bookController.preview)
router.get('/books/view/:id', bookController.view)


export default router;