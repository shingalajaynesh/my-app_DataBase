import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/profile", auth, async ({ db, user }, res) => {
  const [users] = await db.query("SELECT * FROM users WHERE id = ?", [user.id]);

  return res.json({
    status: true,
    user: users[0],
  });
});

export default router;
