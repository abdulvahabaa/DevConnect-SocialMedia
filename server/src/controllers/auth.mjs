import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.mjs";
import { getFromS3, uploadTos3 } from "../utils/s3bucket.mjs";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    // console.log("req.body");
    // console.log("req.body", req.body);
    // console.log("req.file", req.file);
    // console.log("req.file.buffer", req.file.buffer);
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      accountType,
      location,
      occupation,
    } = req.body;

    const image = await uploadTos3(req.file);
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath: image,
      friends,
      location,
      accountType,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => { 
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) return res.status(400).json({ msg: "User does not exist. " });
    
    if (user.status === false) {
      return res.status(401).json({
        msg: "Your account has been blocked. Please contact support.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const imageUrl = await getFromS3(user.picturePath);
    user.set({ picturePath: imageUrl });
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
