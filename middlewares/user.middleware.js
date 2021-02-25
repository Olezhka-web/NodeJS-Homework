const errorCodes = require('../constants/errorCodes.enum');
const errorMessages = require('../messages/messages');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const userId = +req.params.userId;
            const { preferL = 'en' } = req.body;

            if (userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId)) {
                throw new Error(errorMessages.INVALID_ID[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    isUserValid: (req, res, next) => {
        try {
            const {email, nickname, password, preferL = 'en'} = req.body;
            const checkEmail = email.includes('@');

            if (!email || !nickname || !password) {
                throw new Error(errorMessages.EMPTY_FIELD[preferL]);
            }

            if (!checkEmail) {
                throw new Error(errorMessages.INVALID_EMAIL[preferL]);
            }

            if (password.length < 6) {
                throw new Error(errorMessages.TOO_WEAK_PASSWORD[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
