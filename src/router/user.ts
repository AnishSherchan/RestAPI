import express from "express";
import { getAllUsers, deleteUser } from "../controller/users";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.get("/users/:id", isAuthenticated, deleteUser);
};
