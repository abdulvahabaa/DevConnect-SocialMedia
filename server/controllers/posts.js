import Post from "../models/Post.js";
import User from "../models/User.js";
import { deleteFromS3, getFromS3, uploadTos3 } from "./s3bucket.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description } = req.body;
    const user = await User.findById(userId);
    if(req.file){
      const image = await uploadTos3(req.file)
      const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        userPicturePath: user.picturePath,
        picturePath: image,
        likes: {},
        comments: [],
      });
      await newPost.save();
    }else{
      const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        userPicturePath: user.picturePath,
        likes: {},
        comments: [],
      });
      await newPost.save();
    }
   

    const posts = await Post.find().sort("-createdAt");
    const updatedPosts = [];

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const imageUrl = await getFromS3(post.picturePath);
      const usrImageUrl = await getFromS3(post.userPicturePath);

      post.set({ userPicturePath: usrImageUrl });
      post.set({ picturePath: imageUrl });

      updatedPosts.push(post.toObject());
    }
    res.status(201).json(updatedPosts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort("-createdAt");

    const updatedPosts = [];

    for (let post of posts) {
      const userImageUrl = await getFromS3(post.userPicturePath);
      if(post.picturePath){
        const postImageUrl = await getFromS3(post.picturePath);
        post.set({ picturePath: postImageUrl });
        post.set({ userPicturePath: userImageUrl });
        updatedPosts.push(post);
      }else{
        post.set({ userPicturePath: userImageUrl });
        updatedPosts.push(post);
      }
    }
    res.status(200).json(updatedPosts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    const updatedPosts = [];

    for (let post of posts) {
      const userImageUrl = await getFromS3(post.userPicturePath);
      const postImageUrl = await getFromS3(post.picturePath);
      post.set({ picturePath: postImageUrl });
      post.set({ userPicturePath: userImageUrl });
      updatedPosts.push(post);
    }
    res.status(200).json(updatedPosts);
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
    const { postId, description, picturePath } = req.body;
    const findOldImageUrl =await Post.findById(postId)
   await deleteFromS3(findOldImageUrl.picturePath);
    const updateNewImageUrl = await uploadTos3(req.file)
    console.log(updateNewImageUrl);
    


    const edited= await  Post.findByIdAndUpdate(postId,{description: description, picturePath: updateNewImageUrl},{new:true})
    console.log(edited);
    edited.set({ picturePath: edited.postImageUrl });
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
