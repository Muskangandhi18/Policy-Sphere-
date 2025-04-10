const ClaimsModel = require("../models/dbClaimModel");
const sql = require("mssql");

const ClaimsController = {
  // Create a new claim
  createClaim: async (req, res) => {
    // console.log("heloooooo",req)
    // console.log("Headers:", req.headers);
    console.log("Received request body:", req.body); // Debugging line

    const { orderId, description } = req.body;

    if (!orderId) {
        console.log("Missing orderId in request body.");
        return res.status(400).json({ error: "orderId is required." });
    }

    console.log("Extracted orderId:", orderId); // Log extracted orderId

    try {
        const result = await ClaimsModel.createClaim(orderId, description);
        console.log("Claim created:", result);
        res.status(201).json(result);
    } catch (err) {
        console.error("Error creating claim:", err);
        res.status(500).json({ error: err.message });
    }
},



  // Get all claims
  getAllClaims: async (req, res) => {
    try {
      const claims = await ClaimsModel.getAllClaims();
      res.json(claims);
    } catch (err) {
      console.error("Error fetching claims:", err.message);
      res.status(500).send("Server Error.");
    }
  },

  // Get claim by ID
  getClaimById: async (req, res) => {
    const { claimsId } = req.params;

    try {
      const claim = await ClaimsModel.getClaimById(claimsId);
      if (claim.length === 0) {
        res.status(404).send("Claim not found.");
      } else {
        res.json(claim[0]);
      }
    } catch (err) {
      console.error("Error fetching claim:", err.message);
      res.status(500).send("Server Error.");
    }
  },

  // Update a claim
  updateClaim: async (req, res) => {
    const { claimsId } = req.params;
    const { orderId, description, status } = req.body;

    try {
      const updates = {
        fields: [],
        values: [],
      };

      if (orderId) {
        updates.fields.push("orderId = @orderId");
        updates.values.push({ name: "orderId", type: sql.Int, value: orderId });
      }
      if (description) {
        updates.fields.push("description = @description");
        updates.values.push({
          name: "description",
          type: sql.NVarChar,
          value: description,
        });
      }
      if (status) {
        updates.fields.push("status = @status");
        updates.values.push({
          name: "status",
          type: sql.NVarChar,
          value: status,
        });
      }

      if (updates.fields.length === 0) {
        return res.status(400).send("No fields to update.");
      }

      const result = await ClaimsModel.updateClaim(claimsId, updates);

      if (result.rowsAffected[0] > 0) {
        res.send("Claim updated successfully.");
      } else {
        res.status(404).send(`Claim with ID ${claimsId} not found.`);
      }
    } catch (err) {
      console.error("Error updating claim:", err.message);
      res.status(500).send("Server Error.");
    }
  },

  // Delete a claim
  deleteClaim: async (req, res) => {
    const { claimsId } = req.params;
    console.log(claimsId)

    try {
      const result = await ClaimsModel.deleteClaim(claimsId);
      // console.log(result)
      res.send(`Claim with ID ${claimsId} deleted successfully.`);

      // if (result.rowsAffected[0] > 0) {
      //   
      //   // console.log()
      // } else {
      //   res.status(404).send(`Claim with ID ${claimsId} not found.`);
      // }
    } catch (err) {
      console.error("Error deleting claim:", err);
      res.status(500).send("Server Error.");
    }
  },
};

module.exports = ClaimsController;
