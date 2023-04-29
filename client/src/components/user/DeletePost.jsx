import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state/userState";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeletePost({
  postId,
  postUserId,
  setIsDelete,
  isRemove = false,
}) {
  const [open, setOpen] = React.useState(false);
  const token = useSelector((state) => state.userState.token);
  const posts = useSelector((state) => state.userState.posts);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (isRemove) {
      handleClickOpen();
    }
  }, []);

  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/deletePost`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: postUserId }),
      }
    );
    await response.json();

    const postData = posts.filter((post) => post._id !== postId);
    dispatch(setPosts({ posts: postData }));
  };

  const handleClose = () => {
    setIsDelete(false);
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Post Conformation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to Delete this Post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={() => {
              handleDelete();
              handleClose();
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
