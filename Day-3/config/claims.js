const sql = require('mssql');

// Function to create ClaimsTable
const claimsTable = async () => {
    const query = `
    IF NOT EXISTS (
        SELECT * 
        FROM sysobjects 
        WHERE name = 'MGClaims' AND xtype = 'U'
    )
    BEGIN
        CREATE TABLE MGClaims (
            claimsId INT IDENTITY(1,1) PRIMARY KEY, 
            orderId INT NOT NULL,
            description NVARCHAR(500) NOT NULL,
            status NVARCHAR(20) NOT NULL DEFAULT 'pending',
            FOREIGN KEY (orderId) REFERENCES MGUserPolicy(orderId)
        );
    END;
    `;

    try {
        await sql.query(query); // Execute the query
        console.log('Claims table created successfully!');
    } catch (err) {
        console.error('Error creating ClaimsTable:', err.message);
    }
};

module.exports = claimsTable;
