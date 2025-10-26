import connection from "../config/db.js";


const createBookTable = async () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS books (
      id INT AUTO_INCREMENT PRIMARY KEY,
      gendre VARCHAR(255),
      title VARCHAR(255) NOT NULL,
      cover_image VARCHAR(255),
      description TEXT NOT NULL,
      author_id INT NOT NULL,
      file_path VARCHAR(255) NOT NULL,
      price DECIMAL(10,2),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

   try {
    await connection.query(sql);  
    console.log("Book table checked/created.");
  } catch (err) {
    console.error("Error creating book table:", err);
  }
};

export default { createBookTable };
