const sql = require('mssql');

// Function to create UserPolicyTable
const createUserPolicyTable = async () => {
    const query = `
        IF NOT EXISTS (
            SELECT * 
            FROM sysobjects 
            WHERE name = 'MGUserPolicy' AND xtype = 'U'
        )
        BEGIN
            CREATE TABLE MGUserPolicy (
                orderId INT IDENTITY(1,1) PRIMARY KEY,  -- Auto-incrementing primary key
                id INT NOT NULL,                       -- Foreign key referencing MGUsers(id)
                policyId INT NOT NULL,                 -- Foreign key referencing MGPolicy(policyId)
                date DATE DEFAULT GETDATE() NOT NULL,  -- Current date
                FOREIGN KEY (id) REFERENCES MGUsers(id),
                FOREIGN KEY (policyId) REFERENCES MGPolicies(policyId)
            );
       

        END;
    `;

    try {
        await sql.query(query); // Execute the query
        console.log('UserPolicyTable created successfully!');
    } catch (err) {
        console.error('Error creating UserPolicyTable:', err.message);
    }
};

module.exports = createUserPolicyTable;
