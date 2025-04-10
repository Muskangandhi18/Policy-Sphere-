const sql = require('mssql');

const createPoliciesTable = async () => {
    const query = `
        IF NOT EXISTS (
            SELECT * 
            FROM sysobjects 
            WHERE name = 'MGPolicies' AND xtype = 'U'
        )
        BEGIN
            CREATE TABLE MGPolicies (
                policyId INTEGER IDENTITY(1,1) PRIMARY KEY,
                policyName NVARCHAR(255) NOT NULL,
                premium FLOAT NOT NULL,
                duration INT NOT NULL,
                url NVARCHAR(255) NOT NULL,
                details NVARCHAR(1000) NOT NULL
            );
        END;
    `;

    try {
        await sql.query(query); // Execute the query
        console.log('Policy Table created successfully!');
    } catch (err) {
        console.error('Error creating Policies table:', err.message);
    }
};

module.exports = createPoliciesTable;
