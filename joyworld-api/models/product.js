const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {type:String,required:true},
    description: {type:String},
    images: [
        {
            type:Image
        }
    ],
    price: {type:Number,required:true},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {type:String,required:true}
}, {timestamps:true});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;