import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    cart:[{
        qty:{
            type:Number
        },
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    }],
    payment:{
        type:String
    },
    status:{
        type:String
    },
    isRated:{
        type:Boolean
    }
},{timestamps:true});

const Order = mongoose.model('Order',orderSchema)

export default Order;