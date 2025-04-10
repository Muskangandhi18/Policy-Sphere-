const sql = require('mssql');

const UserPolicyModel = {
  // Create a new UserPolicy record
  createUserPolicy: async (id, policyId) => {
    const checkQuery = `
      SELECT COUNT(*) AS count
      FROM MGUserPolicy
      WHERE id = @id AND policyId = @policyId
    `;
    const insertQuery = `
      INSERT INTO MGUserPolicy (id, policyId)
      VALUES (@id, @policyId)
    `;
  
    const pool = await sql.connect();
  
    // Check if the user already has this policy
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('policyId', sql.Int, policyId)
      .query(checkQuery);
  
    if (result.recordset[0].count > 0) {
      throw new Error('User already has this policy.');
    }
  
    // Insert the new policy if not found
    return pool.request()
      .input('id', sql.Int, id)
      .input('policyId', sql.Int, policyId)
      .query(insertQuery);
  },
  
  // Fetch all UserPolicy records
  getAllUserPolicies: async () => {
    const query = 'SELECT * FROM MGUserPolicy';
    const pool = await sql.connect();
    const result = await pool.request().query(query);
    return result.recordset;
  },

  // Fetch a UserPolicy record by orderId
  getUserPolicyByOrderId: async (id) => {
    console.log("id here", id);
    
    const query = 'SELECT * FROM MGUserPolicy WHERE id=@id';
    const pool = await sql.connect();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(query);
      console.log("recordset", result.recordset);
      
    return result.recordset;
  },

  // Update a UserPolicy record
  updateUserPolicy: async (orderId, id, policyId) => {
    const query = `
      UPDATE MGUserPolicy
      SET id = @id, policyId = @policyId
      WHERE orderId = @orderId
    `;
    const pool = await sql.connect();
    return pool.request()
      .input('orderId', sql.Int, orderId)
      .input('id', sql.Int, id)
      .input('policyId', sql.Int, policyId)
      .query(query);
  },

  // Delete a UserPolicy record
  deleteUserPolicy: async (orderId) => {
    const query = 'DELETE FROM MGUserPolicy WHERE orderId = @orderId';
    const pool = await sql.connect();
    return pool.request()
      .input('orderId', sql.Int, orderId)
      .query(query);
  },

  // Check if a user exists in MGUsers
  checkUserExists: async (id) => {
    const query = 'SELECT COUNT(*) AS count FROM MGUsers WHERE id = @id';
    const pool = await sql.connect();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(query);
    return result.recordset[0].count > 0;
  },

  // Check if a policy exists in MGPolicies
  checkPolicyExists: async (policyId) => {
    const query = 'SELECT COUNT(*) AS count FROM MGPolicies WHERE policyId = @policyId';
    const pool = await sql.connect();
    const result = await pool.request()
      .input('policyId', sql.Int, policyId)
      .query(query);
    return result.recordset[0].count > 0;
  },
};

module.exports = UserPolicyModel;
