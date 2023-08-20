"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../controller/users");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.get("/users", users_1.getAllUsers);
    router.delete("/users/:id", middlewares_1.isAuthenticated, middlewares_1.isOwner, users_1.deleteUser);
    router.patch("/users/:id", middlewares_1.isAuthenticated, middlewares_1.isOwner, users_1.updateUser);
};
//# sourceMappingURL=user.js.map