import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    // profilePicturePath:{
    //     type:String,
       
    // },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post',
        required:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    },
    likes:{
        type: Map,
        of: Boolean,
        default : {}
    },
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        },
    ],

    edited: {
        type: Boolean,
        default: false
    }
},
{timestamps: true}
)




export const Comment = mongoose.model('Comment', CommentSchema);