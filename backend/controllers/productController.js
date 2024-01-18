import asyncHandler from '../middleware/asyncHandler.js';
import Product from "../model/productModel.js"

// @desc Fetch All Products 
// route /api/products
// @access public (unprotected)
const getProducts = asyncHandler (async (req, res) => {
    const products = await Product.find({});
    return res.json(products);
});

// @desc Fetch Single Product 
// route /api/products/:id
// @access public (unprotected)
const getProductById = asyncHandler (async (req, res) => {
    const product = await Product.findById(req.params.id);
    // mine approach 
    // if(product) return res.send(product)
    // return res.status(404).json({status: 404, message: "Product not found"})

    // tutorial approach, it also makes use of the errorHandler in the middleware
    if(product){
        return  res.json(product)
    }else{
        res.status(404);
        throw new Error("Resource not found")
    }
});

export {getProducts, getProductById}