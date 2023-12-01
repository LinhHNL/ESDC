const express = require('express');
const userController = require('../controllers/UserController');
const base64ToImageMiddleware = require('../middleware/base64ToImageMiddleware'); // make sure to adjust the path according to your project structure
const authenticateToken = require('../middleware/authenticate'); // make sure to adjust the path according to your project structure

const router = express.Router();


router.get('/login', userController.loginPage);
router.get('/login/auth', userController.firstLoginsPage);
router.get('/forgotPassword', userController.forgotPasswordPage);
router.get('/signout', userController.signOut);
router.post('/login', userController.login);
router.get('/createUser',authenticateToken, userController.createUserPage);
router.get('/editUser/:id',authenticateToken, userController.editUserPage);
router.get('/profilePage',authenticateToken, userController.profilePage);

router.put('/updateEmployee',authenticateToken,base64ToImageMiddleware, userController.updateEmployee);
router.post('/createUser',authenticateToken,base64ToImageMiddleware,userController.createUser);
router.put('/forgotPassword', userController.forgotPassword);
router.put('/login/auth',  userController.confirmLoginFirstOrForgotPassword);

router.put('/changePassword',authenticateToken , userController.changePassword);
router.put('/changeAvatar', authenticateToken,base64ToImageMiddleware, userController.changeAvatar);
router.put('/updateStatus',authenticateToken ,userController.updateStatus);
router.get('/getEmployees' ,authenticateToken,userController.getAllEmployees);
router.get('/getEmployee', authenticateToken,userController.getEmployee);

module.exports = router;
