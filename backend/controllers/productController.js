import asyncHandler from '../middleware/asyncHandler.js';
import Product from "../model/productModel.js"
import User from '../model/userModel.js';


// NB: if page number is provided then returns paginated data else all data 
// @desc Fetch All Products 
// route GET /api/products
// @access public (unprotected) | Public 
const getPaginatedProducts = asyncHandler (async (req, res) => {
    const pageNumber = req.query.pageNumber;
    // search by case insensitive word
    const keyword = req.query.keyword ? {name: {$regex: req.query.keyword, $options: 'i'}} : {}
    if(pageNumber){
        const pageSize = 2;
        // the query is used to get query param from the url 
        const page = Number(req.query.pageNumber) || 1;

        const count  = await Product.countDocuments({...keyword});
        const products = await Product
            .find({...keyword})
            .limit(pageSize)
            .skip(pageSize * (page - 1))

            // console.log(products);
        return res.json({
            products,
            page,
            pages: Math.ceil(count / pageSize) 
        });
    }else{
        const allProducts = await Product.find({});
        res.status(200).json(allProducts)
    }
    
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
});// @desc Fetch All Products 
// route POST /api/products
// @access public (unprotected) | Public 
const createProduct = asyncHandler (async (req, res) => {
    const user = await User.findById(req.body.id);
    if(user){
        const product = new Product({
            name: 'Sample name',
            price: 0,
            user: user._id,
            image: '/images/sample.jpg',
            brand: 'sample brand',
            category: 'sample category',
            countInStock: 0,
            numReviews: 0,
            description: 'sample description'
           });
           const createdProduct = await product.save();
           res.status(201).json(createdProduct);
    }else{
        res.status(404)
        throw new Error("User not found")
    }
});


const updateProduct = asyncHandler (async (req, res) => {
    const product = await Product.findById(req.body.productId);

    if(product){
    //    update product here 
        res.json({
            message: "Update product"
        })
    }else{
        res.status(404)
        throw new Error("Product not found ")
    }
});


const deleteProduct = asyncHandler (async (req, res) => {
    const product = await Product.findByIdAndDelete(req.body.productId);
    console.log(product);
    if(product){
    //    update product here 
        res.json({
            message: "deleting product"
        })
    }else{
        res.status(404)
        throw new Error(" product not found")
    }
});

// create a new review 
// POST /api/products/:id/reviews
// private
// WAS NOT WORKING THOUGH BUT FOCUS ON THE LOGIC AND IMPLEMENTATION
const createProductReview = asyncHandler (async (req, res) => {
    console.log('================================');
    console.log(req, 'bbbkbkbkjbkj');
    console.log('================================');

    const {rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if(product){
        const alreadyReviewed = product.reviews.find((review)=> review.user.toString() === req.user._id.toString());
        if(alreadyReviewed){
            res.status(400);
            throw new Error("Product already reviewed")
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
        await product.save();

        res.status(201).json({message: "Product reviewed "});
    }else{
        res.status(404);
        throw new Error("Resource not found")
    }
});



export {
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct,
    createProductReview,
    getPaginatedProducts
}