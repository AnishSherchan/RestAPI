"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = exports.userDetail = void 0;
const user_1 = require("../db/user");
const helpers_1 = require("../helpers");
const userDetail = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await (0, user_1.getUserByEmail)(email);
        if (!user) {
            return res.sendStatus(400);
        }
        return res.status(200).json(user).end();
    }
    catch (error) {
        return res.status(400);
    }
};
exports.userDetail = userDetail;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.sendStatus(400);
        }
        const user = await (0, user_1.getUserByEmail)(email).select("+auth.salt +auth.password");
        if (!user) {
            return res.sendStatus(400);
        }
        const expectedHash = (0, helpers_1.authentication)(user.auth.salt, password);
        if (user.auth.password !== expectedHash) {
            return res.sendStatus(403);
        }
        const salt = (0, helpers_1.random)();
        user.auth.token = (0, helpers_1.authentication)(salt, user._id.toString());
        await user.save();
        res.cookie("test", user.auth.token, { domain: "localhost", path: "/" });
        return res.status(200).json(user).end();
    }
    catch (error) {
        return res.status(400);
    }
};
exports.login = login;
const register = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.sendStatus(400);
        }
        const exisitingUser = await (0, user_1.getUserByEmail)(email);
        if (exisitingUser) {
            return res.sendStatus(400);
        }
        const salt = (0, helpers_1.random)();
        const user = await (0, user_1.createUser)({
            email,
            username,
            auth: {
                salt,
                password: (0, helpers_1.authentication)(salt, password),
            },
        });
        return res.status(200).json(user).end();
    }
    catch (error) {
        return res.sendStatus(400);
    }
};
exports.register = register;
//# sourceMappingURL=authentication.js.map