const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Get the Authorization header
  console.log(req.headers);
  

  // Check if the header is missing or improperly formatted
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Access denied. No token provided or invalid format." });
  }

  const token = authHeader.split(" ")[1]; 
  console.log("Token Received:", token); 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    // req.data = decoded;
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message); // Debug verification error
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

module.exports = authenticateUser;
