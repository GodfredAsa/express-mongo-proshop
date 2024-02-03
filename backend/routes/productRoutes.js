import express from 'express';
import { 
    // getProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    createProductReview,
    getPaginatedProducts 
} from '../controllers/productController.js';
import { protect, admin } from "../middleware/authMiddleware.js";
const router  = express.Router();
  
router.route('/')
    .get(getPaginatedProducts)
    .post(protect, admin, createProduct)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);
router.route('/:id').get(getProductById);

router.route('/paginated').get(getPaginatedProducts);

router.route('/:id/reviews').post(protect, createProductReview)


export default router;