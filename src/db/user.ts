import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  auth: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    token: { type: String, select: false },
  },
});

export const UserModal = mongoose.model("User", UserSchema);

export const getUser = () => UserModal.find();
export const getUserByEmail = (email: String) => UserModal.findOne({ email });
export const getUserByToken = (token: String) =>
  UserModal.findOne({
    "auth.token": token,
  });
export const getUserById = (id: String) => UserModal.findById(id);
export const deleteUserById = (id: String) =>
  UserModal.findByIdAndDelete({ _id: id });
export const updateUserById = (id: String, values: Record<string, any>) =>
  UserModal.findByIdAndUpdate(id, values);
export const createUser = (values: Record<string, any>) =>
  new UserModal(values).save().then((user) => user.toObject());
