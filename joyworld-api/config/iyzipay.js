import Iyzipay from 'iyzipay';
import dotenv from 'dotenv';

dotenv.config();

const iyzipay = new Iyzipay({
    apiKey: process.env.IYZIPAY_API_KEY,
    secretKey: process.env.IYZIPAY_SECRET_KEY,
    uri: process.env.IYZIPAY_URI,
});

export default iyzipay;


// export const paymentCreate = async (request) => {
//     await iyzipay.payment.create(request, function (err, result) {
//        return {result,err}
//     })
// }



// iyzipay.payment.create(request, function (err, result) {
//     console.log(err, result);
//     done();
// });