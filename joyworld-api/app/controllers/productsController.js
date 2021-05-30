import errorMessages from '../../config/errorMessages.js';
import {ErrorHandler} from '../helpers/error.js';
import catchAsync from '../utils/catchAsync.js';
import Product from '../models/product.js';
import { createNewProduct, deleteProductById, findProduct, getAllProducts, getAllProductsWithoutDescription, search, updateProductById } from '../services/productService.js';
import { deleteProductFromUser, findUserById, updateUserById } from '../services/userService.js';

export const getProducts = catchAsync(async(req,res,next) => {
    try {
        const products = await getAllProducts();
        res.status(200).json({
            message:'Products fetched successfully',
            data:products,
        });
    } catch(error) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
});

export const getProductsWithoutDescription = catchAsync(async(req,res,next) => {
    try {
        const products = await getAllProductsWithoutDescription(req.query);
        res.status(200).json({
            message:'Products fetched successfully',
            data:products
        });
    } catch(error) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
})

export const createProduct = catchAsync(async(req,res,next) => {
    try {
        const newProduct = new Product(req.body)
        const user = await findUserById(req.body.createdBy);
        if(!user) return next(new ErrorHandler(404,errorMessages.USER_NOT_FOUND));
        const product = await createNewProduct(newProduct);
        user.products.push(product._id);
        await updateUserById(user._id,user);
        res.status(200).json({
            message:'Product created successfully',
            data:product
        });
    } catch(error) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
})

export const searchProducts = catchAsync(async(req,res,next) => {
    try {
        const products = await search(req.query.query);
        res.status(200).json({
            message:'Products fetched successfully',
            data:products,
        });
    } catch(error) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
});


export const getProduct = catchAsync(async(req,res,next) => {
    try {
        const product = await findProduct(req.params.id)
        if(product){
            res.status(200).json({
                message:'Product fetched successfully',
                data:product
            });
        } else {
            return next(new ErrorHandler(404,errorMessages.PRODUCT_NOT_FOUND))
        }
    } catch(error) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
});


export const updateProduct = catchAsync(async(req,res,next) => {
    try {
        const product = await findProduct(req.params.id);
        if(product){
            const newData = req.body;
            const updatedProduct = await updateProductById(product.id,newData);
            res.status(200).json({
                message:'Product updated successfully',
                data:updatedProduct,
            })
        } else {
            return next(new ErrorHandler(404,errorMessages.PRODUCT_NOT_FOUND));
        }
    } catch(error) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
})

export const deleteProduct = catchAsync(async(req,res,next) => {
    try {
        const product = await findProduct(req.params.id);
        if(product) {
            const productId = product._id;
            const deletedProduct = await deleteProductById(productId);
            await deleteProductFromUser(product.createdBy,productId)
            res.status(200).json({
                message:'Product deleted successfully',
                data:deletedProduct,
            })
        } else {
            return next(new ErrorHandler(404,errorMessages.POST_NOT_FOUND));
        }
    } catch(error) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
})