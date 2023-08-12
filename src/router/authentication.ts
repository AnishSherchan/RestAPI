import express from "express";
import { register } from "../controller/authentication";

export default (router: express.Router) => {
  router.post("/auth/register", register);
};
