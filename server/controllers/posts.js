import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find().sort("-createdAt");
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find().sort("-createdAt");
    await Post.updateMany({}) 
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* Delete */
export const deletePost= async (req,res) => {
  try {

    const { id } = req.params;
    const del = await Post.findByIdAndDelete(id)
    res.status(200).json(del);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const editPost = async (req, res) => {
  console.log("Edit post Api")
  try {
    console.log(req.body)
    const { postId, description, picturePath } = req.body;
    const edited= await  Post.findByIdAndUpdate(postId,{description: description, picturePath: picturePath},{new:true})
    console.log(edited)
    res.status(200).json(edited);
    
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const sendReport = async (req, res) => {
  console.log("api called")
  try {
    
    console.log(req.body)
    const { postId, userId, content } = req.body;
    const reportObj = { content, userId };
    const reports = await Post.findByIdAndUpdate(postId, { $push: { report: reportObj } });
    res.status(200).json(reports)
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while sending the report.');
  }
};
