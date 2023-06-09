import express from "express";
import {
  adminLogin,
  blockPost,
  blockUser,
  dailyReports,
  getReports,
  getUsers,
  userAndPostCount,
} from "../controllers/admin.js";

import { verifyToken } from "../middleware/adminAuth.js";

const router = express.Router();

// Login
router.post("/login", adminLogin);
router.get("/users", getUsers);
router.patch("/users/block/:userId", blockUser);
router.get("/posts", getReports);
router.get("/piechart", userAndPostCount);
router.get("/linechart", dailyReports);
// updatae
router.patch("/posts/block/:postId", blockPost);

export default router;
