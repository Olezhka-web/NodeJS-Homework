const fs = require('fs');
const path = require('path');
const errorMessages = require('../errors/error.messages');
const {promisify} = require('util');

const readFilePromise = promisify(fs.readFile);
const writeFilePromise = promisify(fs.writeFile);

const DB = require('../db/users.txt');

module.exports = {
    allUsers: async () => {
        const readFileUsers = await readFilePromise(path.join(__dirname, '../db/users.txt'));
        return JSON.parse(readFileUsers.toString());
    },

    createUser: async (userObject, preferL) => {
        const readFileUsers = await readFilePromise(path.join(__dirname, '../db/users.txt'));
        const users = JSON.parse(readFileUsers.toString());
        const searchUser = users.find(user => user.email === userObject.email);
        if(searchUser){
            // throw new Error(errorMessages.USER_IS_REGISTER[preferL]);
            console.log('This Email Registered');
        } else{
            users.push(userObject);
            await writeFilePromise(path.join(__dirname, '../db/users.txt'), JSON.stringify(users));
        }
    },

    deleteUser: async (userId) =>{
        const readFileUsers = await readFilePromise(path.join(__dirname, '../db/users.txt'));
        const users = JSON.parse(readFileUsers.toString());
        users.splice(userId, 1);
        await writeFilePromise(path.join(__dirname, '../db/users.txt'), JSON.stringify(users));
    },

    findUserById: (userId) => {
        return DB[userId];
    }
}