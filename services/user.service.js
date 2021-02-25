const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const errorMessages = require('../messages/messages');

const readFilePromise = promisify(fs.readFile);
const writeFilePromise = promisify(fs.writeFile);

module.exports = {
    allUsers: async (preferL, ObjectQuery) => {
        const { email, nickname } = ObjectQuery;
        const readFileUsers = await readFilePromise(path.join(__dirname, '../db/users.txt'));

        if (readFileUsers.toString() === '') {
            throw new Error(errorMessages.NO_USER[preferL]);
        }

        if (email) {
            const array = JSON.parse(readFileUsers.toString());
            const searchEmail = array.filter((value) => value.email === email);
            if (searchEmail) {
                return searchEmail;
            }
            throw new Error(errorMessages.NO_EMAIL[preferL]);
        }

        if (nickname) {
            const array = JSON.parse(readFileUsers.toString());
            const searchNickname = array.filter((value) => value.nickname === nickname);

            if (searchNickname) {
                return searchNickname;
            }
            throw new Error(errorMessages.NO_NICKNAME[preferL]);
        }
        return JSON.parse(readFileUsers.toString());
    },

    createUser: async (userObject) => {
        const readFileUsers = await readFilePromise(path.join(__dirname, '../db/users.txt'));
        if (readFileUsers.toString() === '') {
            const users = [];
            users.push(userObject);

            return writeFilePromise(path.join(__dirname, '../db/users.txt'), JSON.stringify(users));
        }
        const users = JSON.parse(readFileUsers.toString());
        const searchUser = users.find((user) => user.email === userObject.email);

        if (searchUser) {
            throw new Error(errorMessages.USER_IS_REGISTER[userObject.preferL]);
        } else {
            users.push(userObject);

            await writeFilePromise(path.join(__dirname, '../db/users.txt'), JSON.stringify(users));
        }
    },

    deleteUser: async (userId) => {
        const readFileUsers = await readFilePromise(path.join(__dirname, '../db/users.txt'));
        const users = JSON.parse(readFileUsers.toString());
        users.splice(userId, 1);

        await writeFilePromise(path.join(__dirname, '../db/users.txt'), JSON.stringify(users));
    },
};
