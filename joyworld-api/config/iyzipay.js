import Iyzipay from 'iyzipay';
import dotenv from 'dotenv';

dotenv.config();

const iyzipay = new Iyzipay({
    apiKey: process.env.IYZIPAY_API_KEY,
    secretKey: process.env.IYZIPAY_SECRET_KEY,
    uri: process.env.IYZIPAY_URI,
});

export default iyzipay;