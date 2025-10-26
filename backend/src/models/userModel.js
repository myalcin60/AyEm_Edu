import connection from "../config/db.js";

const createUserTable = async() => {
  const sql = `
   CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(20) PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(250) UNIQUE NOT NULL,
  password VARCHAR(250) NOT NULL,
  role VARCHAR(50) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); `;
try {
    await connection.query(sql);  
    console.log("User table checked/created.");
  } catch (err) {
    console.error("Error creating user table:", err);
  }
};

export default { createUserTable};