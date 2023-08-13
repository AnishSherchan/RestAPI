import express from "express";
import { getUserByEmail, createUser, getUser } from "../db/user";
import { random, authentication } from "../helpers";

export const userDetail = async (
  req: express.Request,
  res: express.Response
) => {
  const { email } = req.body;
  try {
    const user: any = await getUserByEmail(email);
    return res.status(200).json(user).end();
  } catch (error) {
    return res.status(400);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select(
      "+auth.salt +auth.password"
    );

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.auth.salt, password);
    if (user.auth.password !== expectedHash) {
      return res.sendStatus(403);
    }

    const salt = random();
    user.auth.token = authentication(salt, user._id.toString());
    await user.save();
    res.cookie("test", user.auth.token, { domain: "localhost", path: "/" });
    return res.status(200).json(user).end();
  } catch (error) {
    return res.status(400);
  }
};

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
