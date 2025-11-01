import connection from "../config/db.js";

const addToLibrary = async (item) => {
    try {
        const INSERT = 'INSERT INTO library (user_id,book_id) Values (?,?)';
        const results = [];
        for (let i = 0; i < item.length; i++) {
            const result = await connection.query(INSERT, [item[i].user_id, item[i].book_id])
            results.push({ id: result.insertId, ...item });        
        }
        return results

    } catch (error) {
        console.error('Error saving book:', error);
        return null;
    }
}

const getLibray= async(userId)=>{
 try {
        const SELECT = 'SELECT * FROM library as crt join books on books.id= crt.book_id WHERE  user_id=?';
        const [book] = await connection.query(SELECT, [ userId]);        
          return book;
    } catch (error) {
        console.error('Error getting book:', error);
        throw error;
    }
}

export default { addToLibrary,getLibray }