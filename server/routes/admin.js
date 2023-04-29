import express from "express";
import { adminLogin, blockUser, getPosts, getUsers } from "../controllers/admin.js"
import { verifyToken } from "../middleware/adminAuth.js";

const router = express.Router();

// Login
router.post("/login",adminLogin)
router.get("/users",getUsers)
router.patch("/users/block/:userId",blockUser)
router.get("/posts",getPosts)


export default router;