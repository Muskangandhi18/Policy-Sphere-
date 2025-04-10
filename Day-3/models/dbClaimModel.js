const sql = require('mssql');
const connectDB = require('../config/db');

const ClaimsModel = {
  createClaim: async (orderId, description) => {
    try {
        console.log("Received orderId:", orderId); // Log to check if orderId is null

        if (!orderId) {
            throw new Error("orderId is required but received null or undefined.");
        }

        const pool = await connectDB();
        const checkQuery = 'SELECT COUNT(*) AS count FROM MGClaims WHERE orderId = @orderId';
        const checkResult = await pool.request()
            .input('orderId', sql.Int, orderId)
            .query(checkQuery);

        if (checkResult.recordset[0].count > 0) {
            return `Claim with Order Id ${orderId} already exists.`;
        }

        const insertQuery = `
            INSERT INTO MGClaims (orderId, description)
            VALUES (@orderId, @description)
        `;
        await pool.request()
            .input('orderId', sql.Int, orderId)
            .input('description', sql.NVarChar, description)
            .query(insertQuery);

        return { message: 'Claim created successfully.' };
    } catch (err) {
        console.error('Error in createClaim:', err.message);
        throw err;
    }
},

  getAllClaims: async () => {
    try {
      const pool = await connectDB();
      const query = 'SELECT * FROM MGClaims';
      const result = await pool.request().query(query);
      return result.recordset;
    } catch (err) {
      console.error('Error in getAllClaims:', err.message);
      throw err;
    }
  },

  getClaimById: async (claimsId) => {
    try {
      const pool = await connectDB();
      const query = 'SELECT * FROM MGClaims WHERE claimsId = @claimsId';
      const result = await pool.request()
        .input('claimsId', sql.Int, claimsId)
        .query(query);

      if (result.recordset.length === 0) {
        throw new Error(`Claim with ID ${claimsId} not found.`);
      }

      return result.recordset[0];
    } catch (err) {
      console.error('Error in getClaimById:', err.message);
      throw err;
    }
  },

  updateClaim: async (claimsId, updates) => {
    try {
      const pool = await connectDB();

      const fields = Object.keys(updates)
        .map((key) => `${key} = @${key}`)
        .join(', ');

      if (!fields) {
        throw new Error('No fields provided for update.');
      }

      const query = `
        UPDATE MGClaims
        SET ${fields}
        WHERE claimsId = @claimsId
      `;

      const request = pool.request().input('claimsId', sql.Int, claimsId);
      Object.entries(updates).forEach(([key, value]) => {
        request.input(key, typeof value === 'string' ? sql.NVarChar : sql.Int, value);
      });

      const result = await request.query(query);

      if (result.rowsAffected[0] === 0) {
        throw new Error(`Claim with ID ${claimsId} not found.`);
      }

      return { message: 'Claim updated successfully.' };
    } catch (err) {
      console.error('Error in updateClaim:', err.message);
      throw err;
    }
  },

  deleteClaim: async (claimsId) => {
    try {
      const pool = await connectDB();
      const query = 'DELETE FROM MGClaims WHERE claimsId = @claimsId';
      const result = await pool.request()
        .input('claimsId', sql.Int, claimsId)
        .query(query);

      if (result.rowsAffected[0] === 0) {
        throw new Error(`Claim with ID ${claimsId} not found.`);
      }

      return { message: `Claim with ID ${claimsId} deleted successfully.` };
    } catch (err) {
      console.error('Error in deleteClaim:', err.message);
      throw err;
    }
  },
};

module.exports = ClaimsModel;
