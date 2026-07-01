import express from "express";
import { getUsers } from "../models/users.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  const users = await getUsers(req.db);
  res.status(200).send({
    users,
  });
});

export default router;
