import express from "express";
import multer from "multer";

import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getCommunities,
  editProfile,
} from "../controllers/users.mjs";
import { verifyToken } from "../middleware/auth.mjs";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* READ */
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/communities", verifyToken, getCommunities);
router.get("/:id", verifyToken, getUser);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.put(
  "/profile/:id/editProfile",
  verifyToken,
  upload.single("picture"),
  editProfile
);

export default router;
