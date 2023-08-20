"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.updateUserById = exports.deleteUserById = exports.getUserById = exports.getUserByToken = exports.getUserByEmail = exports.getUser = exports.UserModal = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    auth: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        token: { type: String, select: false },
    },
});
exports.UserModal = mongoose_1.default.model("User", UserSchema);
const getUser = () => exports.UserModal.find();
exports.getUser = getUser;
const getUserByEmail = (email) => exports.UserModal.findOne({ email });
exports.getUserByEmail = getUserByEmail;
const getUserByToken = (token) => exports.UserModal.findOne({
    "auth.token": token,
});
exports.getUserByToken = getUserByToken;
const getUserById = (id) => exports.UserModal.findById(id);
exports.getUserById = getUserById;
const deleteUserById = (id) => exports.UserModal.findByIdAndDelete({ _id: id });
exports.deleteUserById = deleteUserById;
const updateUserById = (id, values) => exports.UserModal.findByIdAndUpdate(id, values);
exports.updateUserById = updateUserById;
const createUser = (values) => new exports.UserModal(values).save().then((user) => user.toObject());
exports.createUser = createUser;
//# sourceMappingURL=user.js.map