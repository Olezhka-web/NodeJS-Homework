const userService = require('../services/user.service');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.allUsers();
            console.log(users);
            res.json(users);
        } catch (e) {
            res.status(418).json(e.message);
        }
    },

    createUser: async (req, res) => {
        await userService.createUser(req.body);

        res.status(201).json('USERS IS CREATED');
    },

    deleteUser: async (req, res) =>{
        const { userId } = req.params;
        await userService.deleteUser(userId);
        res.status(404).json('USER DELETED');
    },

    getSingleUser: (req, res) => {
        const { userId } = req.params;

        const user = userService.findUserById(userId);

        res.json(user);
    }
}