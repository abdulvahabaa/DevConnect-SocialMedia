import express from "express";
import {
  adminLogin,
  blockPost,
  blockUser,
  dailyReports,
  getReports,
  getUsers,
  userAndPostCount,
} from "../controllers/admin.mjs";

import { verifyToken } from "../middleware/adminAuth.mjs";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/users", getUsers);
router.patch("/users/block/:userId", blockUser);
router.get("/posts", getReports);
router.get("/piechart", userAndPostCount);
router.get("/linechart", dailyReports);
router.patch("/posts/block/:postId", blockPost);

export default router;
