import express from 'express';
import passport from 'passport';
import {createOrder, updateOrder, deleteOrder} from '../controllers/orderController.js';

const router = express.Router();

router.post('/',createOrder);
router.patch('/:id', updateOrder)
router.delete('/:id',deleteOrder);

export default router;