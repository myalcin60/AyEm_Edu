import path from 'path';
import dotenv from 'dotenv';

// .env dosyasının tam yolu
dotenv.config({ path: path.resolve('C:/Users/yalci/Desktop/AyEm_Edu/backend/.env') });


import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

console.log('Connexion établie avec MySQL');

export default connection;