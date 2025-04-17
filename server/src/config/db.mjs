import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGO_DB_URI;

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("\nProcess ID:", process.pid, "- Using Cached Connection\n");
    return mongoose.connection;
  }

  try {
    console.log(
      "\nProcess ID:",
      process.pid,
      "- Establishing New Connection -",
      new Date().toISOString(),
      "\n"
    );

    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 6,
    });

    console.log("Connection to MongoDB established successfully");
    return mongoose.connection;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};

export default connectToDatabase;