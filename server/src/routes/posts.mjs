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
} from "../controllers/posts.mjs";
import { verifyToken } from "../middleware/auth.mjs";
import multer from "multer";


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/", verifyToken, upload.single("picture"), createPost);
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.patch("/:id/like", verifyToken, likePost);
router.patch("/report", verifyToken, upload.none(), sendReport);
router.delete("/:id/deletePost", verifyToken, deletePost);
router.put("/edit", verifyToken, upload.single("picture"), editPost);
router.get("/comments/:postId", verifyToken, getPostComments);
router.post("/:postId/commentPost", verifyToken, postComment);
router.get("/comment/reply/:parentId", verifyToken, getReplyComments);
router.post("/comment/reply", verifyToken, replyComment);
router.delete("/comment/delete/:id", verifyToken, deleteComment);

export default router;
