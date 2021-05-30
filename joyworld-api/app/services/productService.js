import Product from '../models/product.js';

export const getAllProducts = async () => {
    return await Product.find().populate({path:'createdBy',select:'username'})
}

export const getAllProductsWithoutDescription = async(queryList) => {
    const findQuery = queryList ? queryList.category ? {category:decodeURI(queryList.category)} : {} : {}
    return await Product.find(findQuery,{description:0,__v:0}).populate({path:'createdBy',select:'username'}).sort({updatedAt:-1})
}

export const createNewProduct = async (product) => {
    return await product.save();
}

export const search = async (query) => {
    return await Product.find({
        $or:[
            {title:{$regex: query, $options: 'i'}},
            //{description:{$regex: query, $options: 'i'}}
        ],
    },{description:0,__v:0}).populate({path:'createdBy',select:'username'}).sort({updatedAt:-1})
}

export const findProduct = async (id) => {
    return await Product.findById(id).populate({path:'createdBy',select:'username'})
}

export const updateProductById = async (productId,newData) => {
    return await Product.findByIdAndUpdate(productId,newData, {new:true}).populate('products')
}

export const deleteProductById = async (productId) => {
    return await Product.findByIdAndDelete(productId).populate('products');
}

