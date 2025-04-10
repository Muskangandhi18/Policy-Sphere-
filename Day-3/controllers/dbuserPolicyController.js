const PolicyModel = require("../models/dbPolicyModel");
const UserPolicyModel = require("../models/dbUserPolicyModel");
const ClaimsModel = require("../models/dbClaimModel"); // Ensure ClaimsModel is imported

const UserPolicyController = {
  // Create a new UserPolicy record
  createUserPolicy: async (req, res) => {
    const {userId} = req.user
    const {policyId} = req.body
    // console.log(req.user)
    // console.log(id,policyId)
 
    try {
      await UserPolicyModel.createUserPolicy(userId, policyId);
      res.status(201).json({ message: "UserPolicy record created successfully." });
    } catch (err) {
      console.error("Error creating UserPolicy record:", err.message);
      res.status(500).json({ error: "Error creating UserPolicy record." });
    }
  },

  // Fetch all UserPolicy records
  getAllUserPolicies: async (req, res) => {
    try {
      const records = await UserPolicyModel.getAllUserPolicies();
      console.log("records", records);
      
      res.status(200).json(records);
    } catch (err) {
      console.error("Error fetching UserPolicy records:", err.message);
      res.status(500).json({ error: "Error fetching UserPolicy records." });
    }
  },

  // Fetch UserPolicy records by user ID (orderId renamed for clarity)
  getUserPolicyByOrderId: async (req, res) => {
    const { userId } = req.user;
    console.log("id here", req.user);
    

    try {
      const records = await UserPolicyModel.getUserPolicyByOrderId(userId);
      if (records.length === 0) {
        return res.status(404).json({ message: "UserPolicy records not found." });
      }

      const results = await Promise.all(
        records.map(async (item) => {
          const policy = await PolicyModel.getPolicyById(item.policyId);
          return {
            orderId: item.orderId, // Assuming `orderId` exists in the `item`
            id: item.id,           // Assuming `id` exists in the `item`
            policy: policy,   // Assuming `policy` has an `id` field
            date: item.date        // Assuming `date` exists in the `item`
          };
        })
      );
      
      console.log("results in db",results);
      
      return res.status(200).json(results);
    } catch (err) {
      console.error("Error fetching UserPolicy records:", err.message);
      res.status(500).json({ error: "Error fetching UserPolicy records." });
    }
  },

  // Update a UserPolicy record
  updateUserPolicy: async (req, res) => {
    const { orderId } = req.params;
    const { id, policyId } = req.body;

    try {
      const userExists = await UserPolicyModel.checkUserExists(id);
      if (!userExists) {
        return res.status(400).json({ error: `User with ID ${id} does not exist.` });
      }

      const policyExists = await PolicyModel.getPolicyById(policyId);
      if (!policyExists) {
        return res.status(400).json({ error: `Policy with ID ${policyId} does not exist.` });
      }

      const result = await UserPolicyModel.updateUserPolicy(orderId, id, policyId);
      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ error: `UserPolicy with orderId ${orderId} not found.` });
      }

      res.status(200).json({ message: "UserPolicy record updated successfully." });
    } catch (err) {
      console.error("Error updating UserPolicy record:", err.message);
      res.status(500).json({ error: "Error updating UserPolicy record." });
    }
  },

  // Delete a UserPolicy record
  deleteUserPolicy: async (req, res) => {
    const { policyId } = req.params;

    try {
      // Check if there are claims associated with the policy
      const claims = await ClaimsModel.getClaimById(policyId);

      if (claims && claims.length > 0) {
        // Delete associated claims first
        await ClaimsModel.deleteClaimsByPolicyId(policyId);
        console.log(`All claims for policy ID ${policyId} deleted.`);
      }

      // After deleting claims, delete the policy
      const result = await PolicyModel.deletePolicyById(policyId);

      if (result.rowsAffected[0] > 0) {
        res.status(200).json({
          message: `Policy with ID ${policyId} and its associated claims were deleted successfully.`,
        });
      } else {
        res.status(404).json({ error: `Policy with ID ${policyId} not found.` });
      }
    } catch (err) {
      console.error("Error deleting policy and claims:", err.message);
      res.status(500).json({ error: "Server Error while deleting policy." });
    }
  },
};

module.exports = UserPolicyController;
