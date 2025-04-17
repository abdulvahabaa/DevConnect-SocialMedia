import Post from "../models/Post.js";
import { Comment } from "../models/comment.js";
import User from "../models/User.js";
import { deleteFromS3, getFromS3, uploadTos3 } from "./s3bucket.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description } = req.body;
    const user = await User.findById(userId);
    if (req.file) {
      const image = await uploadTos3(req.file);
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
    } else {
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
      if (!post.status) {
        continue;
      }

      const userImageUrl = await getFromS3(post.userPicturePath);
      if (post.picturePath) {
        const postImageUrl = await getFromS3(post.picturePath);
        post.set({ picturePath: postImageUrl });
        post.set({ userPicturePath: userImageUrl });
        updatedPosts.push(post);
      } else {
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
    const userImageUrl = await getFromS3(post.userPicturePath);
    const postImageUrl = await getFromS3(post.picturePath);
    updatedPost.set({ picturePath: postImageUrl });
    updatedPost.set({ userPicturePath: userImageUrl });

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* Delete */
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const del = await Post.findByIdAndDelete(id);
    res.status(200).json(del);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const editPost = async (req, res) => {
  console.log("Edit post Api");
  try {
    const { postId, description, picturePath } = req.body;
    const findOldImageUrl = await Post.findById(postId);
    await deleteFromS3(findOldImageUrl.picturePath);
    const updateNewImageUrl = await uploadTos3(req.file);
    console.log(updateNewImageUrl);

    const edited = await Post.findByIdAndUpdate(
      postId,
      { description: description, picturePath: updateNewImageUrl },
      { new: true }
    );
    console.log(edited);
    edited.set({ picturePath: edited.postImageUrl });
    res.status(200).json(edited);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const sendReport = async (req, res) => {
  console.log("api called");
  try {
    console.log(req.body);
    const { postId, userId, content } = req.body;
    const reportObj = { content, userId };
    const reports = await Post.findByIdAndUpdate(postId, {
      $push: { report: reportObj },
    });
    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while sending the report.");
  }
};

export const postComment = async (req, res) => {
  console.log("HEllo HEre");
  try {
    const { postId } = req.params;
    console.log("heyyy reached");
    const { comment, userId } = req.body;
    console.log(req.body);
    let user = await User.findById(userId).select("-password");

    const postComment = await new Comment({
      comment: comment,
      post: postId,
      user: userId,
    }).save();

    postComment.user = user;
    const userImageUrl = await getFromS3(postComment.user.picturePath);
    postComment.user.set({ picturePath: userImageUrl });
    console.log("postComment");
    console.log(postComment);
    console.log("postComment");
    res.status(200).json(postComment);
  } catch (error) {
    res.status(400).json({ message: error.mssage });
  }
};

export const getPostComments = async (req, res) => {
  console.log("HELLO MY DEAR FRIEND");
  try {
    console.log("reached");
    const { postId } = req.params;
    console.log(postId);
    const comments = await Comment.find({
      post: postId,
      parentComment: { $exists: false },
    })
      .populate("user", "-password")
      .sort("-createdAt")
      .lean();
    console.log(comments);
    for (let comment of comments) {
      console.log("PicturePath HEre", comment.user.picturePath);
      const userImageUrl = await getFromS3(comment.user.picturePath);
      console.log("userImageUrl", userImageUrl);
      comment.user.picturePath = userImageUrl;

      console.log("comment.user.picturePath Here", comment.user.picturePath);
    }

    // console.log(comments);
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getReplyComments = async (req, res) => {
  try {
    const { parentId } = req.params;
    console.log(parentId);
    const replyComments = await Comment.find({ parentComment: parentId })
      .populate("replies")
      .populate("user", "-password")
      .sort("-createdAt")
      .lean();
    console.log(replyComments);

    res.status(200).json(replyComments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const replyComment = async (req, res) => {
  try {
    const { postId, parentId, reply, userId } = req.body;
    console.log(req.body);
    let user = await User.findById(userId).select("-password");
    const replyComment = new Comment({
      comment: reply,
      parentComment: parentId,
      post: postId,
      user: userId,
    });
    await replyComment.save();
    replyComment.user = user;
    console.log(replyComment);

    let commentUpdate = await Comment.findOneAndUpdate(
      { _id: parentId },
      { $push: { replies: replyComment._id } },
      { new: true }
    );
    res.status(200).json(replyComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    let { id } = req.params;

    const { postId, userId } = req.body;

    let comment = await Comment.findById(id);
    let replyComment = await Comment.findOne({ parentComment: id });

    while (replyComment) {
      console.log("reached");
      let current = id;
      while (current) {
        console.log("reached in current");
        let com = await Comment.findOne({ parentComment: current });
        if (com == null) {
          await Comment.deleteOne({ _id: id });
          break;
        }
        current = com._id;
        await Comment.deleteOne({ _id: com._id });
      }
      replyComment = await Comment.findOne({ parentComment: id });
    }

    let commentDelete = await Comment.deleteOne({ _id: id });

    if (commentDelete.deletedCount === 0) throw new Error("Comment not found");

    let comments = "";

    let commentsData = await Comment.find({
      post: postId,
      parentComment: { $exists: false },
    })
      .populate("user", "-password")
      .sort("-createdAt")
      .lean();

    res.status(200).json(commentsData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
