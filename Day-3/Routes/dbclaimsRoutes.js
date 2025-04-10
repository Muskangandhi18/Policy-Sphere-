const express = require('express');
const dbClaimsController= require('../controllers/dbClaimsController');
const authenticateUser = require('../middlewares/auth');
const isAdmin=require('../middlewares/isAdmin');
const router = express.Router();

// Route to create a claim
router.post('/create', authenticateUser,dbClaimsController.createClaim);

// Route to get all claims
router.get('/', authenticateUser,isAdmin,dbClaimsController.getAllClaims);

// Route to get claim by ID
router.get('/:claimsId', authenticateUser,dbClaimsController.getClaimById);

// Route to update a claim
router.patch('/:claimsId',authenticateUser,isAdmin, dbClaimsController.updateClaim);

// Route to delete a claim
router.delete('/:claimsId', authenticateUser,dbClaimsController.deleteClaim);

module.exports = router;
