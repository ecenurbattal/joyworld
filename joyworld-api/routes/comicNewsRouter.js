const express = require('express');
const router = express.Router();

const comicNewsController = require('../controllers/comicNewsController');

router.get('/',comicNewsController.getNews)

module.exports=router;