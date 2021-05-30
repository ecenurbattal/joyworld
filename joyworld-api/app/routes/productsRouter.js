import express from 'express';
import passport from 'passport';
const router = express.Router();

import {getProductsWithoutDescription, searchProducts,createProduct, getProduct, updateProduct, deleteProduct} from '../controllers/productsController.js';

router.get('/',getProductsWithoutDescription);
router.post('/',[passport.authenticate('jwt', {session: false}),createProduct]);
router.get('/search',searchProducts);
router.get('/:id',[passport.authenticate('jwt', {session: false}),getProduct])
router.patch('/:id',[passport.authenticate('jwt', {session: false}),updateProduct])
router.delete('/:id',[passport.authenticate('jwt', {session: false}),deleteProduct])

export default router;