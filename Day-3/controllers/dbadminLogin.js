const sql = require('mssql'); // Import the MSSQL client
const jwt = require('jsonwebtoken'); // Import the JWT library
require('dotenv').config({ path: '../.env' }); // Load environment variables from .env file

// Define the adminLoginDb function
const adminLoginDb = async (req, res) => {
    const { email, password } = req.body; // Extract email and password from request body
    console.log(process.env.JWT_SECRET); // Log the JWT secret (for debugging purposes)

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' }); // Check for missing input
    }

    try {
        // Execute SQL query to find user with the given email and password
        const result = await sql.query`SELECT * FROM MAdmin WHERE email = ${email} AND password = ${password} AND role = 'admin'`;

        // Check if the admin user exists in the database
        if (result.recordset.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials or not an admin.' }); // Return error if not found or not admin
        }

        // Generate a JWT token with the admin data
        const admin = result.recordset[0];
        const token = jwt.sign(
            { id: admin.id, email: admin.email, role: admin.role }, // Include role in the token payload
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expiration time
        );

        // Respond with the token and admin data
        res.json({ token, admin });
    } catch (error) {
        console.error('Error in adminLoginDb:', error); // Log any errors
        res.status(500).json({ error: 'Server error.' }); // Send server error response
    }
};

module.exports = 
    adminLoginDb // Export the function
