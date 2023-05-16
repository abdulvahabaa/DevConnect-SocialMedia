import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import moment from "moment/moment";
import ReplyCommentPost from "./ReplyCommentPost";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { MenuItem } from "react-pro-sidebar";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import UserImage from "./UserImage";
import { useSelector } from "react-redux";
import ReplyComment from "./ReplyComment";
import BASE_URL from "utils/BASE_URL";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

function Comment({ comment }) {
  //   const [comment, setComment] = useState();
  const [anchorEl, setAnchorEl] = useState(null); // Dropdown anchor element
  const [isReply, setIsReply] = useState(false);
  const [isReplies, setIsReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const user = useSelector((state) => state.userState.user);
  const token = useSelector((state) => state.userState.token);
  const posts = useSelector((state) => state.userState.posts);

  //   menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getReplyComments = async () => {
    const response = await fetch(
      `${BASE_URL}/posts/comment/reply/${comment._id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const replyData = await response.json();
    console.log("replyData" + replyData);
    setReplies(replyData);
  };

  return (
    <Box>
      <Box>
        <Card sx={{ mb: 2 }}>
          <CardHeader
            avatar={
              <Avatar
                {...stringAvatar(
                  `${comment.user.firstName} ${comment.user.lastName}`
                )}
              />
            }
            action={
              // <IconButton aria-label="settings">
              //   <MoreVertIcon />
              // </IconButton>
              <div>
                <IconButton aria-label="settings" onClick={handleMenuOpen}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem>
                    {/* <MenuItemIcon> */}
                    <DeleteIcon fontSize="small" />
                    {/* </MenuItemIcon> */}
                    Delete
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      setIsReply(true);
                    }}
                  >
                    {/* <MenuItemIcon> */}
                    <DeleteIcon fontSize="small" />
                    {/* </MenuItemIcon> */}
                    Reply
                  </MenuItem>
                </Menu>
              </div>
            }
            title={`${comment.user.firstName} ${comment.user.lastName}`}
            subheader={moment(comment.createdAt).format("MMMM D, YYYY")}
          />
          <CardContent
            sx={{
              paddingLeft: "75px", // Add padding to the left side
            }}
          >
            <Typography
              sx={{ fontSize: "15px" }}
              variant="body2"
              color="text.secondary"
            >
              {comment.comment}
            </Typography>
            {isReply && (
              <ReplyCommentPost
                commentId={comment._id}
                userId={user._id}
                postId={comment.post}
              />
            )}
          </CardContent>
          <IconButton
            sx={{ ml: 50 }}
            onClick={() => {
              setIsReplies(true);
              getReplyComments();
            }}
          >
            <ReplyOutlinedIcon />
          </IconButton>

          {/* {replies.map((reply)=>(
            <Box sx={{ml:6}}>
            <Comment comment={ reply }  />
            </Box>
          ))} */}
          {replies.map((reply, index) => (
            <Box sx={{ ml: 6 }} key={`reply-${index}`}>
              <Comment comment={reply} />
            </Box>
          ))}
        </Card>

        {/* <Typography >
                    {comment.comment}
                </Typography> */}
      </Box>
    </Box>
  );
}

export default Comment;
