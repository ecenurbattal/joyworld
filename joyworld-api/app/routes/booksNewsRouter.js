import express from 'express';
const router = express.Router();

import { getNews } from '../controllers/booksNewsController.js';

router.get('/',getNews)

export default router;