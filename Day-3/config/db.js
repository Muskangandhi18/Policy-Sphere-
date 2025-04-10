const sql = require('mssql');

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,

  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev/self-signed certs
  },
};

let pool;

const connectDB = async () => {
  try {
    if (!pool) {
      pool = await sql.connect(sqlConfig);
      console.log('Connected to SQL Server');
    }
    return pool;
  } catch (err) {
    console.error('Database connection error:', err.message);
    throw err;
  }
};

module.exports = connectDB;
