const express = require('express');
const reportController = require('../controllers/ReportController');
const authenticateToken = require('../middleware/authenticate'); // make sure to adjust the path according to your project structure

const router = express.Router();
router.use(authenticateToken);
router.get('/statusProduct', reportController.ReportStatusOfProduct);
router.get('/topImport', reportController.getTopProductImport);
router.get('/topExport', reportController.getTopProductExport);
module.exports = router;