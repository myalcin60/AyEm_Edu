import express, { Router } from "express";
import libraryController from "../controllers/libraryController.js";

import { upload } from "../config/uploadConfig.js";

const router = express.Router();

router.post('/library',  libraryController.saveToLibaray)
router.get('/library/:id', libraryController.getLibraryByUserId)


export default router