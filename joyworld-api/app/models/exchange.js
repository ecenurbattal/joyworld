import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const exchangeSchema = new Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    targetProduct:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    bidder:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    offeredProduct: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    note:{
        type:String,
        trim:true,
    },
    status:{
        type:String
    }
},{timestamps:true});

const Exchange = mongoose.model('Exchange',exchangeSchema)

export default Exchange;