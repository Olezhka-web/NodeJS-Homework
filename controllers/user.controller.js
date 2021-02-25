const userService = require('../services/user.service');
const messages = require('../messages/messages');
const errorCodes = require('../constants/errorCodes.enum');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const { preferL } = req.body;
            const ObjectQuery = req.query;

            const users = await userService.allUsers(preferL, ObjectQuery);

            res.status(errorCodes.OK).json(users);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const {email, nickname, password, preferL = 'en'} = req.body;
            const userObject = {email, nickname, password, preferL};

            await userService.createUser(userObject);

            res.status(errorCodes.CREATED).json(messages.USER_IS_CREATED[preferL]);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const { preferL = 'en' } = req.body;

            await userService.deleteUser(userId);

            res.status(errorCodes.OK).json(messages.USER_IS_DELETED[preferL]);
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message);
        }
    },
};
