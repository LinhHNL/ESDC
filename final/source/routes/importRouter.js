const express = require('express');
const router = express.Router();

const importController = require('../controllers/ImportControler');
const authenticateToken = require('../middleware/authenticate'); // make sure to adjust the path according to your project structure

router.use(authenticateToken);
// Route to get all categories
router.post('/request', importController.requestImportProduct);
router.post('/', importController.addImport);
router.get('/', importController.getAllImports);
router.get('/search', importController.searchImport);
router.get('/details/:importID', importController.getImportDetailsById);
module.exports = router;
