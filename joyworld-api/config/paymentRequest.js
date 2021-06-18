import Iyzipay from 'iyzipay';


export const paymentRequest = (req,order) => {
    const request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: String(order._id),
        price: String(req.body.price),
        paidPrice: String(req.body.paidPrice),
        currency: Iyzipay.CURRENCY.TRY,
        enabledInstallments: [2, 3, 6, 9],
        basketId: String(order._id),
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        callbackUrl:`http://localhost:8080/payment/token`,
        // paymentCard: {
        //     cardHolderName: req.body.card.cardHolderName,
        //     cardNumber: req.body.card.cardNumber,
        //     expireMonth: req.body.card.expireMonth,
        //     expireYear: req.body.card.expireYear,
        //     cvc: req.body.card.cvc,
        //     registerCard: '0'
        // },
        buyer: {
            id: String(order.buyer),
            name: req.body.buyer.name,
            surname: req.body.buyer.surname,
            gsmNumber: req.body.buyer.gsmNumber,
            email: req.body.buyer.email,
            identityNumber: req.body.buyer.identityNumber,
            lastLoginDate: new Date(Date.now()).toLocaleString('tr').replace('/','-'),
            registrationAddress: req.body.buyer.address,
            ip: req.ip,
            city: req.body.buyer.city,
            country: req.body.buyer.country,
            zipCode: req.body.buyer.zipCode
        },
        shippingAddress: {
            contactName: req.body.buyer.name + ' ' + req.body.buyer.surname,
            city: req.body.shippingAddress.city,
            country: req.body.shippingAddress.country,
            address: req.body.shippingAddress.address,
            zipCode: req.body.shippingAddress.zipCode
        },
        billingAddress: {
            contactName: req.body.buyer.name + ' ' + req.body.buyer.surname,
            city: req.body.shippingAddress.city,
            country: req.body.shippingAddress.country,
            address: req.body.shippingAddress.address,
            zipCode: req.body.shippingAddress.zipCode
        },
        basketItems: req.body.basketItems.map((item) => (
            {...item,
            itemType:Iyzipay.BASKET_ITEM_TYPE.PHYSICAL
            }
        ))
    };
    return request;
}

export const subMerchantRequest = (req) => {
    const request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: req.body._id,
        subMerchantExternalId: req.body._id,
        subMerchantType: Iyzipay.SUB_MERCHANT_TYPE.PERSONAL,
        address: req.body.address,
        contactName: req.body.name,
        contactSurname: req.body.surname,
        email: req.body.email,
        gsmNumber:req.body.gsmNumber,
        name: req.body.companyName || `${req.body.name}'s market`,
        iban: req.body.iban,
        identityNumber: req.body.identityNumber,
        currency: Iyzipay.CURRENCY.TRY
    }
    return request;
}

    
//     const request = {
//         locale: Iyzipay.LOCALE.TR,
//         conversationId: '123456789',
//         price: '1',
//         paidPrice: '1.2',
//         currency: Iyzipay.CURRENCY.TRY,
//         basketId: 'B67832',
//         paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
//         callbackUrl: 'http://localhost:8080/payment/token', //buraya post isteği atabileceğin bir endpoint ekle, oradan kendi sayfana döndürmeye çalış.
//         enabledInstallments: [2, 3, 6, 9],
//         buyer: {
//             id: 'BY789',
//             name: 'John',
//             surname: 'Doe',
//             gsmNumber: '+905350000000',
//             email: 'email@email.com',
//             identityNumber: '74300864791',
//             lastLoginDate: '2015-10-05 12:43:35',
//             registrationDate: '2013-04-21 15:12:09',
//             registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
//             ip: '85.34.78.112',
//             city: 'Istanbul',
//             country: 'Turkey',
//             zipCode: '34732'
//         },
//         shippingAddress: {
//             contactName: 'Jane Doe',
//             city: 'Istanbul',
//             country: 'Turkey',
//             address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
//             zipCode: '34742'
//         },
//         billingAddress: {
//             contactName: 'Jane Doe',
//             city: 'Istanbul',
//             country: 'Turkey',
//             address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
//             zipCode: '34742'
//         },
//         basketItems: [
//             {
//                 id: 'BI101',
//                 name: 'Binocular',
//                 category1: 'Collectibles',
//                 category2: 'Accessories',
//                 itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
//                 price: '0.3'
//             },
//             {
//                 id: 'BI102',
//                 name: 'Game code',
//                 category1: 'Game',
//                 category2: 'Online Game Items',
//                 itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
//                 price: '0.5'
//             },
//             {
//                 id: 'BI103',
//                 name: 'Usb',
//                 category1: 'Electronics',
//                 category2: 'Usb / Cable',
//                 itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
//                 price: '0.2'
//             }
//         ]
//     };
//     return request;
// }

// {
//     "price": "1",
//     "paidPrice": "1.2",
//     "basketId": "B67832",
//     "paymentCard": {
//         "cardHolderName": "John Doe",
//         "cardNumber": "5528790000000008",
//         "expireMonth": "12",
//         "expireYear": "2030",
//         "cvc": "123"
//     },
//     "buyer": {
//         "id": "BY789",
//         "name": "John",
//         "surname": "Doe",
//         "gsmNumber": "+905350000000",
//         "email": "email@email.com",
//         "identityNumber": "74300864791",
//         "registrationAddress": "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
//         "city": "Istanbul",
//         "country": "Turkey",
//         "zipCode": "34732"
//     },
//     "shippingAddress": {
//         "contactName": "Jane Doe",
//         "city": "Istanbul",
//         "country": "Turkey",
//         "address": "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
//         "zipCode": "34742"
//     },
//     "basketItems": [
//         {
//             "id": "BI101",
//             "name": "Binocular",
//             "category": "Collectibles",
//             "itemType":"PHYSICAL",
//             "price": "0.3"
//         },
//         {
//             "id": "BI102",
//             "name": "Game code",
//             "category": "Game",
//             "itemType": "PHYSICAL",
//             "price": "0.5"
//         },
//         {
//             "id": "BI103",
//             "name": "Usb",
//             "category": "Electronics",
//             "itemType": "PHYSICAL",
//             "price": "0.2"
//         }
//     ]
// }