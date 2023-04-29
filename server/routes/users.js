import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getCommunities,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/communities",verifyToken,getCommunities)
router.get("/:id", verifyToken, getUser);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);


export default router;