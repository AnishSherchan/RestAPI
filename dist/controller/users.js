"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getAllUsers = void 0;
const user_1 = require("../db/user");
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await (0, user_1.getUser)();
        return res.status(200).json(allUsers).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.getAllUsers = getAllUsers;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await (0, user_1.deleteUserById)(id);
        return res.status(200).json(response).end();
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};
exports.deleteUser = deleteUser;
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username } = req.body;
        if (!username) {
            return res.sendStatus(403);
        }
        const user = await (0, user_1.getUserById)(id);
        user.username = username;
        user.save();
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};
exports.updateUser = updateUser;
//# sourceMappingURL=users.js.map