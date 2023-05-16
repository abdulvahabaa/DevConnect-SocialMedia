import express from "express";
import {
  createPost,
  deleteComment,
  deletePost,
  editPost,
  getFeedPosts,
  getPostComments,
  getReplyComments,
  getUserPosts,
  likePost,
  postComment,
  replyComment,
  sendReport,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* FILE STORAGE */
const router = express.Router();
// create post
router.post("/", verifyToken, upload.single("picture"), createPost);

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/report", verifyToken, upload.none(), sendReport);

/* Delete */
router.delete("/:id/deletePost", verifyToken, deletePost);

/* Edit*/
router.put("/edit", verifyToken, upload.single("picture"), editPost);

router.get("/comments/:postId", verifyToken, getPostComments);
router.post("/:postId/commentPost", verifyToken, postComment);
router.get("/comment/reply/:parentId", verifyToken, getReplyComments);
router.post("/comment/reply", verifyToken, replyComment);
router.delete("/comment/delete/:id", verifyToken, deleteComment);

export default router;
