import express from "express";
import { userDetail, login, register } from "../controller/authentication";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.get("/auth/User", userDetail);
};
