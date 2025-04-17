import jwt from "jsonwebtoken";
import Post from "../models/Post.mjs";
import User from "../models/User.mjs";

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
    // console.log(users)
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

export const getReports = async (req, res) => {
  try {
    const reports = await Post.find({
      $expr: { $gt: [{ $size: "$report" }, 0] },
    }).sort("-createdAt");
    console.log("", reports);
    res.status(200).json(reports);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const blockPost = async (req, res) => {
  const { postId } = req.params;
  console.log(postId);
  const post = await Post.findById(postId);
  console.log(post);
  try {
    const reports = await Post.findByIdAndUpdate(
      postId,
      {
        picturePath: "BlockedContent.jpg",
        status: false,
        description: null,
        likes: new Map(),
        comments: [],
      },
      { new: true }
    );
    console.log("Updated post:", reports);
    const reportsData = await Post.find({
      $expr: { $gt: [{ $size: "$report" }, 0] },
    }).sort("-createdAt");
    res.status(201).json(reportsData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const userAndPostCount = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const postsCount = await Post.countDocuments();
    const reportsCount = await Post.countDocuments({
      $expr: { $gt: [{ $size: "$report" }, 0] },
    });

    res.json({ usersCount, postsCount, reportsCount });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const dailyReports = async (req, res) => {
  console.log("api called Backend here");
  try {
    const lineChartUsersData = await User.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $project: {
          x: "$_id",
          y: "$count",
          _id: 0,
        },
      },
    ]);
    console.log("lineChartUsersData", lineChartUsersData);

    const lineChartPostsData = await Post.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $project: {
          x: "$_id",
          y: "$count",
          _id: 0,
        },
      },
    ]);
    console.log("PostsData", lineChartPostsData);

    const lineChartReportsData = await Post.aggregate([
      {
        $match: {
          $expr: { $gt: [{ $size: "$report" }, 0] },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%d-%m-%Y", date: "$updatedAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          x: "$_id",
          y: "$count",
          _id: 0,
        },
      },
      {
        $sort: { x: 1 },
      },
    ]);
    console.log("lineChartReporsData", lineChartReportsData);

    res.json({ lineChartReportsData, lineChartPostsData, lineChartUsersData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
