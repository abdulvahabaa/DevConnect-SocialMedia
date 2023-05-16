import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useEffect } from "react";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state/userState";
import BASE_URL from "utils/BASE_URL";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
  Typography,
  responsiveFontSizes,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FlexBetween from "./FlexBetween";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { MenuItem } from "react-pro-sidebar";
import { Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UserImage from "./UserImage";
import ReplyCommentPost from "./ReplyCommentPost";
import Comment from "./Comment";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CommentBox({ postId, postUserId, setIsComment, isCmnt = false, }) {
  const [anchorEl, setAnchorEl] = useState(null); // Dropdown anchor element

  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState();
  const [isReply, setIsReply] = useState(false);
  const user = useSelector((state) => state.userState.user);
  const token = useSelector((state) => state.userState.token);
  const posts = useSelector((state) => state.userState.posts);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (isCmnt) {
      handleClickOpen();
    }
  }, []);

  const handleClose = () => {
    setIsComment(false);
    setOpen(false);
  };

 

 
  const sendComment = async () => {
    const response = await fetch(`${BASE_URL}/posts/${postId}/commentPost`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user._id, comment }),
    });
    const sendData = await response.json();
    setComments([sendData, ...comments]);
  };

  const getComments = async () => {
    const response = await fetch(`${BASE_URL}/posts/comments/${postId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const commentData = await response.json();
    console.log("commentData" + commentData);
    setComments(commentData);
  };

  const handleDeleteComment = async (commentId) => {
    // Implement your delete comment logic here
    console.log("Deleting comment with ID:", commentId);
    const response = await fetch(`${BASE_URL}/psots/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await response.json();
  };

  const handleReplyComment = async (commentId) => {
    console.log(commentId);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md" // Set the desired maximum width
        PaperProps={{
          style: {
            width: "40%", // Set the desired width of the modal
          },
        }}
      >
        <DialogTitle>{"COMMENTS & REPLAY"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            what do you want to comment on this post?
          </DialogContentText>
          <FlexBetween>
            <TextField
              sx={{ mb: 2 }}
              autoFocus
              margin="dense"
              label="Comment"
              type="text"
              name="comment"
              fullWidth
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              onClick={() => {
                sendComment();
                // handleClose();
              }}
            >
              <SendIcon />
            </Button>
          </FlexBetween>
          {comments?.map((comment) => (
           <Comment comment={comment} />
          ))}
          {/* <TextField
            margin="dense"
            label="Reply"
            type="text"
            fullWidth
            // value={reply}
            // onChange={(e) => setReply(e.target.value)}
          /> */}
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button
            onClick={() => {
              // handleComment();
              handleClose();
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CommentBox;
