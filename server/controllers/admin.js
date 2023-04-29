import jwt from "jsonwebtoken";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const adminLogin = async (req, res) => {
  try {
    console.log("?????????????????????????");
    console.log(req.body);
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ id: email }, process.env.ADMIN_JWT_SECRET);
      res.status(200).json({ token, admin: true });
    } else {
      res.status(400).json({ message: "incorrect email or password" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort("-createdAt");
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const blockUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  try {
    if (user.status === true) {
      const block = await User.updateOne({ _id: userId }, { status: false });
      const result = await User.find();
      res.status(201).json(result);
    } else {
      const unBlock = await User.updateOne({ _id: userId }, { status: true });
      const result = await User.find();
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPosts = async (req,res)=>{
   try {
     const posts = await Post.find().sort("-createdAt");
     res.status(200).json(posts);
   } catch (error) {
    res.status(404).json({ message: error.message });
    }
   
}