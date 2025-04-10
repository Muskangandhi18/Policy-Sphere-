const PolicyModel = require('../models/dbPolicyModel');

const PolicyController = {
  // Fetch all policies
  getPolicies: async (req, res) => {
    try {
      const policies = await PolicyModel.getAllPolicies(); // Fetch policies directly from the database
      res.json(policies);
    } catch (err) {
      console.error('Error fetching policies:', err.message);
      res.status(500).send('Server Error');
    }
  },

  // Fetch a single policy by its ID
  getPolicyById: async (req, res) => {
    const { policyId } = req.params; // Get policyId from request parameters

    try {
      const policy = await PolicyModel.getPolicyById(policyId); // Fetch the policy directly from the database

      if (!policy) {
        return res.status(404).json({ error: 'Policy not found' });
      }

      res.json(policy); // Return the fetched policy data
    } catch (err) {
      console.error('Error fetching policy by ID:', err.message);
      res.status(500).send('Server Error');
    }
  },

  // Add a new policy
  addPolicy: async (req, res) => {
    const { policyName, premium, duration ,url,details} = req.body;

    if (!policyName || !premium || !duration|| !url||!details ){
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (premium <= 0) {
      return res.status(400).json({ error: 'Premium must be positive' });
    
      
    }

    if (duration <= 0) {
      return res.status(400).json({ error: 'Duration must be a positive integer' });
    }

    try {
      await PolicyModel.addPolicy(policyName, premium, duration,url,details); // Insert the new policy into the database
      res.status(201).json({ message: 'Policy added successfully' });
    } catch (err) {
      console.error('Error adding policy:', err.message);
      res.status(500).send('Server Error');
    }
  },

  // Delete a policy by ID
  deletePolicy: async (req, res) => {
    const { id } = req.params;

    try {
      const result = await PolicyModel.deletePolicyById(id); // Delete the policy by ID

      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ error: 'Policy not found' });
      }

      res.status(200).json({ message: 'Policy deleted successfully' });
    } catch (err) {
      console.error('Error deleting policy:', err.message);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = PolicyController;
