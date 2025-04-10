const express = require('express');
// const cors = require('cors');  // Import CORS
const { getPolicies, addPolicy, deletePolicy ,getPolicyById} = require('../controllers/dbpolicyController');
const isAdmin = require('../middlewares/isAdmin');
const authenticateUser = require('../middlewares/auth');

const router = express.Router();

// Define routes
router.get('/policy', getPolicies);  // Route to fetch policies
router.get('/policyId',getPolicyById);
router.post('/policy', authenticateUser, isAdmin, addPolicy); // Route to add a new policy
router.delete('/:id', authenticateUser, isAdmin, deletePolicy); // Route to delete a policy by id

module.exports = router;
