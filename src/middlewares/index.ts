import express from "express";
import { get, merge } from "lodash";
import { getUserByToken } from "../db/user";

export const isAuthenticated = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["test"];
    if (!sessionToken) {
      return res.sendStatus(403);
    }
    const exisitingUser = getUserByToken(sessionToken);
    if (!exisitingUser) {
      return res.sendStatus(403);
    }
    merge(req, exisitingUser);
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
