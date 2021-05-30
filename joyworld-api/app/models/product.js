import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type:String
    },
    images: [
        {
            type:String
        }
    ],
    price: {
        type:Number,
        required:true
    },
    count: {
        type:Number,
        required:true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {type:String,required:true}
}, {timestamps:true});

const Product = mongoose.model('Product',productSchema);

export default Product;