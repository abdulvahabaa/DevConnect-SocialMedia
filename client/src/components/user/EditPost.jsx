import React from "react";
import { useEffect, useState } from "react";

import Backdrop from "@mui/material/Backdrop";

import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

// import {
//   EditOutlined,
//   DeleteOutlined,
//   AttachFileOutlined,
//   GifBoxOutlined,
//   ImageOutlined,
//   MicOutlined,
//   MoreHorizOutlined,
// } from "@mui/icons-material";
import {
  Box,
  // useMediaQuery,
  Typography,
  InputBase,
  Button,
  // Divider,
  // useTheme,
  // IconButton,
} from "@mui/material";
// import FlexBetween from "components/user/FlexBetween";
// import Dropzone from "react-dropzone";
// import UserImage from "components/user/UserImage";
// import WidgetWrapper from "components/user/WidgetWrapper";

import { useDispatch, useSelector } from "react-redux";
import { setPost,  } from "state/userState";
// import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function EditPost({
  setIsUpdate,
  postId,
  description,
  picturePath,
  isEdit = false,
  postUserId,
  name,
  userPicturePath,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const dispatch = useDispatch();
  const [desc, setDesc] = useState(description);
  // const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(picturePath);
  // const [post, setPost] = useState("");
  // const { palette } = useTheme();
  // const { _id } = useSelector((state) => state.userState.user);
  const token = useSelector((state) => state.userState.token);
  // const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  // const mediumMain = palette.neutral.mediumMain;
  // const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    // formData.append("userId", _id);
    formData.append("description", desc);
    formData.append("postId", postId);

    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:3001/posts/edit`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    console.log(posts);
    dispatch(setPost({ post: posts }));
    setImage(null);
    // setPost("");
  };

  return (
    <div>
      <Button onClick={handleOpen}></Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => {
          // setOpen(false)
          setIsUpdate(false);
          handleClose();
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Edit Posts
            </Typography>
            <InputBase
              type="text"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />

            <InputBase
              type="file"
              file={image}
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            ></InputBase>
            <Button
              type="submit"
              onClick={() => {
                handlePost();
                setIsUpdate(false);
                handleClose();
              }}
            >
              Submit
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default EditPost;
