// Backend: loginDbUser.js
const sql = require('mssql');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

const loginDbUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(process.env.JWT_SECRET);

  try {
    const result = await sql.query`SELECT * FROM MGUsers WHERE email = ${email} AND password = ${password}`;

    if (result.recordset.length === 0) {
      return res.status(401).json({ status: 'failure', message: 'Invalid credentials.' });
    }

    const userData = result.recordset[0];

    const token = jwt.sign({ userId: userData.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({
      status: 'success',
      message: 'Login successful.',
      token,
      userData,
    });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ status: 'error', message: 'Server error.', error: error.message });
  }
};

module.exports = loginDbUser;
