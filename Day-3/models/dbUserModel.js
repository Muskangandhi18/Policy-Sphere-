const sql = require("mssql");

//Fetch user by id
const UserModel = {
  getUserbyId: async (id) => {
    if (!id) throw new Error("ID parameter is required"); // Ensure id is provided

    try {
      const query = "SELECT * FROM MGUsers WHERE id = @id";
      const request = new sql.Request(); // Create a SQL request object
      request.input("id", sql.Int, id); // Bind the id parameter
      const result = await request.query(query); // Execute the query
      return result.recordset[0]; // Return the first record
    } catch (error) {
      console.error("Error in getUserbyId:", error.message);
      return error.message;
    }
  },
  // Fetch all users
  getAllUsers: async () => {
    const result = await sql.query("SELECT * FROM MGUsers");
    return result.recordset;
  },

  // Add a new user
  addUser: async (name, email, password,age,income) => {
    const query = `
      INSERT INTO MGUsers (name, email, password,age,income)
      VALUES (@name, @email, @password,@age,@income);
    `;
    const request = new sql.Request();
    request.input("name", sql.NVarChar, name);
    request.input("email", sql.NVarChar, email);
    request.input("password", sql.NVarChar, password);
    request.input("age", sql.NVarChar, age);
    request.input("income", sql.NVarChar, income);

    return request.query(query);
  },

  // Delete a user by ID
  deleteUserById: async (id) => {
    const query = `
      BEGIN TRANSACTION;

DELETE FROM MGUsers 
WHERE id = @id;

IF @@ERROR <> 0
BEGIN
    -- Attempt to delete related claims
    DELETE FROM MGClaims 
    WHERE orderId = @id;

    -- Attempt to delete from MGUserPolicy if there's a conflict
    DELETE FROM MGUserPolicy 
    WHERE id = @id;
END;

COMMIT TRANSACTION;

    `;

    const request = new sql.Request();
    request.input("id", sql.Int, id);

    return request.query(query);
  },
};

module.exports = UserModel;
