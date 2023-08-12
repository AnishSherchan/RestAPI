import express from "express";
import { getUserByEmail, createUser } from "../db/user";
import { random, authentication } from "../helpers";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.sendStatus(400);
    }
    const exisitingUser = await getUserByEmail(email);
    if (exisitingUser) {
      return res.sendStatus(400);
    }
    const salt = random();
    const user = await createUser({
      email,
      username,
      auth: {
        salt,
        password: authentication(salt, password),
      },
    });
    return res.status(200).json(user).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};
