const express = require('express');
const router = express.Router();

const exportController = require('../controllers/ExportController');
const authenticateToken = require('../middleware/authenticate'); // make sure to adjust the path according to your project structure

router.use(authenticateToken);
// Route to get all categories
router.post('/request', exportController.requestExportProduct);
// router.post('/', exportController.addImport);
router.post('/', exportController.ExportProduct);
router.get('/', exportController.getAllExports);
router.get('/search', exportController.searchExport);
router.get('/details/:ExportID', exportController.getExportDetailsById);
module.exports = router;
