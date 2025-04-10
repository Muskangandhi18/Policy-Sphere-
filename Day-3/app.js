const express = require("express");
const cors = require('cors');  // Import CORS
require("dotenv").config(); // Load environment variables from .env file
const dbRoutes = require("./Routes/dbRoutes"); // Import routes for database operations
const dbPolicyRoutes = require("./Routes/dbPolicyRoutes"); // Import routes for policy-related operations
const dbUserPolicyRoutes = require("./Routes/dbUserPolicyRoutes.js"); // Import routes for user-policy related operations
const dbclaimsRoutes = require("./Routes/dbclaimsRoutes.js"); // Import routes for claims-related operations
const connectDB = require("./config/db"); // Import the database connection function
const createPolicyTable = require('./config/policyTable'); // Import the create table function for policy table
const usersTable = require('./config/usersTable'); // Import the create table function for users table
const usersPolicy = require('./config/userPolicy.js'); // Import the create table function for user-policy table
const claimsTable = require("./config/claims.js"); // Import the create table function for claims table

const app = express();
const PORT = process.env.PORT || 5000; // Set the port for the application

// Middleware to parse JSON requests
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173', // Allow specific frontend
  methods: ['GET', 'POST', 'DELETE'],
  credentials:true
};

app.use(cors(corsOptions));



// Function to initialize the application and connect to the database
const initializeApp = async () => {
  try {
    await connectDB(); // Establish the database connection
    await usersTable(); // Create the users table
    await createPolicyTable(); // Create the policy table
    await usersPolicy(); // Create the user-policy table
    await claimsTable(); // Create the claims table
    
    // await dropTable(); // Uncomment if you need to drop the table (use with caution)
   
    console.log("Database connected successfully!");
    
    // Start the server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      // console.log("JWT_SECRET:", process.env.JWT_SECRET); // Log the JWT secret for debugging purposes
    });
  } catch (error) {
    console.error("Error initializing app:", error.message); // Log any errors during initialization
    process.exit(1); // Exit the process if DB connection fails
  }
};

// Define the routes for the application
app.use("/users", dbRoutes); // Routes for user-related operations
app.use("/policy", dbPolicyRoutes); // Routes for policy-related operations
app.use("/upolicy", dbUserPolicyRoutes); // Routes for user-policy related operations
app.use("/claims", dbclaimsRoutes); // Routes for claims-related operations

// Initialize the application
initializeApp();
