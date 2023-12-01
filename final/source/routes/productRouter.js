const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const base64ToImageMiddleware = require('../middleware/base64ToImageMiddleware'); // make sure to adjust the path according to your project structure
const authenticateToken = require('../middleware/authenticate'); // make sure to adjust the path according to your project structure

router.use(authenticateToken);
// Route to get a list of products
router.get('/', ProductController.getProducts);
router.get('/add', ProductController.getPageAddProduct);
router.get('/editproduct/:productID', ProductController.getEditPageProduct);
router.get('/getsearch', ProductController.getProductsSearch);

// Route to add a new product
router.post('/',base64ToImageMiddleware, ProductController.addProduct);

// Route to get product by ID
router.get('/details/:productID', ProductController.getProductByID);
router.get('/search', ProductController.searchProducts);

// Route to update a product
router.put('/', base64ToImageMiddleware, ProductController.updateProduct);
router.delete('/:productID', ProductController.deleteProduct);
module.exports = router;
