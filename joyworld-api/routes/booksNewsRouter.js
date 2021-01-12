const express = require('express');
const router = express.Router();

const booksNewsController = require('../controllers/booksNewsController');

router.get('/',booksNewsController.getNews)

module.exports=router;