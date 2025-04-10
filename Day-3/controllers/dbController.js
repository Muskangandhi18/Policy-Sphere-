const UserModel = require('../models/dbUserModel');
const client = require('../client'); // For caching
  const UserController = {
    getUserById: async (req, res) => {
      // const userId = req.params.userId;
      const tokenData = req.user;

      try {

            const user = await UserModel.getUserbyId(tokenData.id); // Convert id to integer

            console.log("userData:",user);
            
            if (!user) {
              return res.status(404).send(`User with ID ${id} not found.`);
              
            }
            res.json(user); // Send the user data as response
          }
          // res.json("Invalid User ID")
      catch (err) {
          // console.error('Error fetching user:', err.message);
          res.status(500).send('Server Error');
      }
  },
  // Fetch and display user data for admin 
  getAllUsers: async (req, res) => {
    try {
      const cachedData = await client.get('userData');
      if (!cachedData) {
        const users = await UserModel.getAllUsers();
        await client.set('userData', JSON.stringify(users, null, 2));
        res.json(users);
      } else {
        res.json(JSON.parse(cachedData));
      }
    } catch (err) {
      console.error('Error fetching users:', err.message);
      res.status(500).send('Server Error');
    }
  },

  // Add a new user
  addUser: async (req, res) => {
    const { name, email, password,age,income } = req.body;
  
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
  
    try {
      await UserModel.addUser(name, email, password,age,income);
      res.status(201).json({ message: 'User added successfully' }); // Consistent JSON response
    } catch (err) {
      console.error('Error adding user:', err.message);
      res.status(500).json({ error: 'Server Error' }); // Consistent JSON response
    }
  },  

  // Delete a user by ID
  deleteUser: async (req, res) => {
    const user = req.user;
    const id = user.id;

    try {
      const result = await UserModel.deleteUserById(id);

      if (result.rowsAffected[0] > 0) {
        res.send(`User with ID ${id} deleted successfully.`);
      } else {
        res.status(404).send(`User with ID ${id} not found.`);
      }
    } catch (err) {
      console.error('Error deleting user:', err.message);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = UserController;
