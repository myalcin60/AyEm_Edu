import multer from "multer";
import path from "path";
import fs from "fs";

export const booksDir = path.join(process.cwd(), "uploads/books");
if (!fs.existsSync(booksDir)) fs.mkdirSync(booksDir, { recursive: true });

export const coversDir = path.join(process.cwd(), "uploads/covers");
if (!fs.existsSync(coversDir)) fs.mkdirSync(coversDir, { recursive: true });

// Multer storage ayarı
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, booksDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9]/g, "_");
    cb(null, Date.now() + "_" + cleanName + ext);
  },
});

// Sadece PDF dosyalarına izin ver
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

export const upload = multer({ storage, fileFilter });
