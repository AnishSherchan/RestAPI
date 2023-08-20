import express from "express";
import { getUser, deleteUserById } from "../db/user";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const allUsers = await getUser();
    return res.status(200).json(allUsers).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const response = await deleteUserById(id);
    return res.status(200).json(response).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
