"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOwner = exports.isAuthenticated = void 0;
const lodash_1 = require("lodash");
const user_1 = require("../db/user");
const isAuthenticated = async (req, res, next) => {
    try {
        const sessionToken = req.cookies["test"];
        if (!sessionToken) {
            return res.sendStatus(403);
        }
        const existingUser = await (0, user_1.getUserByToken)(sessionToken);
        if (!existingUser) {
            return res.sendStatus(403);
        }
        (0, lodash_1.merge)(req, { identity: existingUser });
        return next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.isAuthenticated = isAuthenticated;
const isOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const currentUserId = (0, lodash_1.get)(req, "identity._id");
        if (!currentUserId) {
            return res.sendStatus(400);
        }
        if (currentUserId.toString() !== id) {
            return res.sendStatus(403);
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.isOwner = isOwner;
//# sourceMappingURL=index.js.map