import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.mjs";
import userRoutes from "./routes/users.mjs";
import postRoutes from "./routes/posts.mjs";
import adminRoutes from "./routes/admin.mjs";
import { register } from "./controllers/auth.mjs";


/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6001;


app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* ROUTES WITH FILES */
app.post("/api/auth/register", upload.single("picture"), register);
// app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/admin", adminRoutes);
/* MONGOOSE SETUP */

app.listen(PORT, () => {
  console.log(
    `Process ID ${process.pid}: Server running on PORT ${PORT} in Dev Mode`
  );
});
