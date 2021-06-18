import express from 'express';
import passport from 'passport';
import { createPaymentRequest, createSubMerchant, paymentRetrieveRequest } from '../controllers/paymentController.js';
const router = express.Router();

router.post('/',createPaymentRequest);
router.post('/token',paymentRetrieveRequest)

router.post('/submerchant',createSubMerchant);


export default router;