import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import FlexBetween from "./FlexBetween";
import SendIcon from "@mui/icons-material/Send";
import BASE_URL from "utils/BASE_URL";
import { useSelector } from "react-redux";

function ReplyCommentPost({ commentId, postId, userId }) {
  const [reply, setReply] = useState();
  const [replies,setReplies] =useState([])
  const user = useSelector((state) => state.userState.user);
  const token = useSelector((state) => state.userState.token);
  const posts = useSelector((state) => state.userState.posts);

  const sendReply = async () => {
    const response = await fetch(`${BASE_URL}/posts/comment/reply`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, postId, parentId: commentId , reply,}),
    });
    const sendData = await response.json();
    setReplies([sendData, ...replies]);
  };

  return (
    <Box>
      <FlexBetween>
        <TextField
          sx={{ mb: 2 }}
          autoFocus
          margin="dense"
          label="Reply"
          type="text"
          name="reply"
          fullWidth
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
        <Button
          onClick={() => {
            sendReply();
            // handleClose();
          }}
        >
          <SendIcon />
        </Button>
      </FlexBetween>
    </Box>
  );
}

export default ReplyCommentPost;
