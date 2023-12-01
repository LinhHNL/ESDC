const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

const authenticateToken = require('../middleware/authenticate'); // make sure to adjust the path according to your project structure
router.use(authenticateToken);
// Route to get all categories
router.get('/addcategory', CategoryController.getAddCategoryPage);
router.get('/editcategory/:categoryId', CategoryController.getEditCategoryPage);
router.get('/', CategoryController.getAllCategories);

// Route to get a category by ID
router.get('/:categoryId', CategoryController.getCategoryById);

// Route to add a new category
router.post('/', CategoryController.addCategory);

// Route to update a category by ID
router.put('/', CategoryController.updateCategory);


module.exports = router;
