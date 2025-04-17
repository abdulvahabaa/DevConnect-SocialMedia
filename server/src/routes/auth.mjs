import express from "express";
import { login } from "../controllers/auth.mjs";

const router = express.Router();

router.post("/login", login);

export default router;
