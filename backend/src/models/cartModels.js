import connection from "../config/db.js";

const createCartItemsTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT  NOT NULL,
    book_id INT  NOT NULL,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);
  `;

  try {
    await connection.query(sql);  
    console.log("Cart table checked/created.");
  } catch (err) {
    console.error("Error creating cart table:", err);
  }
};

export default { createCartItemsTable };
