import connection from "../config/db.js";

const saveBook = async (book) => {
    try {
        const INSERT = 'INSERT INTO books (gendre,title, cover_image, description,author_id, file_path, price) VALUES (?,?, ?, ?,?,?, ?)';
        const result = await connection.query(INSERT, [book.gendre, book.title, book.cover_image, book.description, book.author_id, book.file_path, book.price]);
        return { id: result.insertId, ...book };
    } catch (error) {
        console.error('Error saving book:', error);
        return null;
    }
}

const getBooks = async () => {
    try {
        const SELECT='SELECT books.*, users.`lastName`,users.`firstName` from books JOIN users ON books.author_id = users.id';
         //const SELECT='SELECT * FROM books';
        const books = await connection.query(SELECT);
        return books;
    } catch (error) {
        console.error('Error saving book:', error);
        return null;
    }
}

const getBooksByAuthorId= async (author_id)=>{
    try {
        const SELECT = 'SELECT * FROM books WHERE author_id = ?';
        const books = await connection.query(SELECT, [author_id]);
        return books;   
    } catch (error) {
        console.error('Error saving book:', error);
        return null;
    }
}
const deleteBookById = async (bookId) => {
    try {
        const DELETE = 'DELETE FROM books WHERE id = ?';    
        await connection.query(DELETE, [bookId]);
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
};
//saveFavorites
const saveFavorites =async (favorite)=>{
    try {    
         const INSERT = 'INSERT INTO favorites (user_id,book_id) Values (?,?)';
         const result = await connection.query(INSERT ,[favorite.userId, favorite.bookId])
         return { id: result.insertId, ...favorite };
    } catch (error) {
          console.error('Error saving book:', error);
        return null;
    }
}
//getFavorites
const getFavorites = async (userId) => {
    try {
       // const SELECT='SELECT * FROM favorites where user_id=?';
       const SELECT='SELECT * from favorites JOIN users ON favorites.user_id = users.id JOIN books ON favorites.book_id =books.id WHERE users.id=?';
        const books = await connection.query(SELECT, userId);
        return books;
    } catch (error) {
        console.error('Error saving book:', error);
        return null;
    }
}
//remove favorites
const removeFavorites=async (favorite)=>{
    try {
        const DELETE = 'DELETE FROM favorites WHERE book_id = ? and user_id=?';    
        await connection.query(DELETE, [favorite.bookId, favorite.userId]);
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
}
export default {removeFavorites,getFavorites,saveFavorites,deleteBookById, saveBook,getBooks, getBooksByAuthorId };