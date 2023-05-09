import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: {
      type:String,
      default:null,
    },
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
    commentCount: {
      type: Number,
      default: 0
    },
    report: {
      type: Array,
      default: []
    },
    status: {
      type: Boolean,
      default: true
    },
    edited: {
      type: Boolean,
      default: false
    }
  
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;