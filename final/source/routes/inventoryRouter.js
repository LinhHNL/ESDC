const express = require('express');
const InventoryController = require('../controllers/InventoryController');
const router = express.Router();
const authenticateToken = require('../middleware/authenticate'); // make sure to adjust the path according to your project structure

router.use(authenticateToken);
router.get('/', InventoryController.getAllInventories);
router.get('/find/:name', InventoryController.findInventoryByName);
router.get('/product/:inventoryId', InventoryController.getAllProductInInventoryByID);
router.get('/:inventoryId', InventoryController.getInventoryById);
router.get('/details/:inventoryId', InventoryController.getAllProductInInventoryByID);
router.post('/', InventoryController.addInventory);
router.get('/find/:InventoryName/:Barcode/:Quantity', InventoryController.findProductInInventory);

module.exports = router;