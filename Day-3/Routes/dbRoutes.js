const express = require('express');
// const cors = require('cors');  // Import CORS
const { getAllUsers, addUser, deleteUser, getUserById } = require('../controllers/dbController');
const { validateUser } = require("../middlewares/validateUser");
const adminLogindb = require('../controllers/dbadminLogin');
const loginUser = require('../controllers/loginDb');
const authenticateUser = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

// Enable CORS
// router.use(cors());

router.get('/user', authenticateUser, getUserById);  // Route to fetch users for user
router.get('/', authenticateUser, isAdmin, getAllUsers);  // Route to fetch users for admin
router.post('/signUp', validateUser, addUser); // Route to add a new user
router.delete('/:id',authenticateUser, deleteUser); // Delete a user by ID
router.post("/adminlogin", adminLogindb); 
router.post("/login", loginUser); 

module.exports = router;
