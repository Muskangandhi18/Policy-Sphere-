const express = require('express');
const UserPolicyController = require('../controllers/dbuserPolicyController');
const authenticateUser = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const router = express.Router();

// Routes for UserPolicy
router.post('/upolicy',authenticateUser, UserPolicyController.createUserPolicy);
router.get('/userPolicy',authenticateUser,isAdmin, UserPolicyController.getAllUserPolicies);
router.get('/upolicy',authenticateUser, UserPolicyController.getUserPolicyByOrderId);
router.patch('/userPolicy/:orderId',authenticateUser,isAdmin, UserPolicyController.updateUserPolicy);
router.delete('/userPolicy/:orderId',UserPolicyController.deleteUserPolicy);

module.exports = router;
