import connection from '../config/db.js'

const addToCart = async (item) => {
    try {
        const INSERT = 'INSERT INTO cart_items (user_id,book_id) Values (?,?)';
        const result = await connection.query(INSERT, [item.userId, item.bookId])
        return { id: result.insertId, ...item };
    } catch (error) {
        console.error('Error saving book:', error);
        return null;
    }
}

//remove item from cart
const removeCartitems = async (item) => {
    console.log(item);
    
    try {
        const DELETE = 'DELETE FROM cart_items WHERE book_id = ? and user_id=?';
        await connection.query(DELETE, [item.bookId, item.userId]);
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
}
// check control cart
const getItemById = async (bookId, userId) => {
    try {
        const SELECT = 'SELECT * FROM cart_items WHERE book_id = ? and user_id=?';
        const [book] = await connection.query(SELECT, [bookId, userId]);
          return book;
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
}
// user cart check
const getItemByUserId = async ( userId) => {
    try {
        const SELECT = 'SELECT * FROM cart_items as crt join books on books.id= crt.book_id WHERE  user_id=?';
        const [book] = await connection.query(SELECT, [ userId]);        
          return book;
    } catch (error) {
        console.error('Error getting book:', error);
        throw error;
    }
}

//remove item from cart


export default { addToCart, removeCartitems, getItemById, getItemByUserId }