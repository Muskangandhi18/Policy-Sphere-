const sql = require('mssql');

const PolicyModel = {
  // Fetch all policies
  getAllPolicies: async () => {
    const result = await sql.query('SELECT * FROM MGPolicies');
    console.log(result.recordset);
    
    return result.recordset;
  },

  // Fetch a policy by its ID
  getPolicyById: async (policyId) => {
    const query = 'SELECT * FROM MGPolicies WHERE policyId = @policyId';
    const request = new sql.Request();
    request.input('policyId', sql.Int, policyId);

    const result = await request.query(query);
    
    // If the policy is found, return it, otherwise return null
    if (result.recordset.length > 0) {
      return result.recordset[0]; // Return the first matching policy
    } else {
      return null; // No policy found with that ID
    }
  },

  // Add a new policy
  addPolicy: async (policyName, premium, duration,url,details) => {
    const query = `
      INSERT INTO MGPolicies (policyName, premium, duration,url,details)
      VALUES (@policyName, @premium, @duration,@url,@details)
    `;
    const request = new sql.Request();
    request.input('policyName', sql.NVarChar, policyName);
    request.input('premium', sql.Float, premium);
    request.input('duration', sql.Int, duration);
    request.input('url', sql.NVarChar,url);
    request.input('details', sql.NVarChar, details);

    return request.query(query);
  },

  // Delete a policy by ID
  deletePolicyById: async (id) => {
    const query = 'DELETE FROM MGPolicies WHERE policyId = @id';
    const request = new sql.Request();
    request.input('id', sql.Int, id);

    return request.query(query);
  },
};

module.exports = PolicyModel;
