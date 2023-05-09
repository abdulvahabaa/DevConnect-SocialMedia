import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  // ShareOutlined,
} from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import EditPost from "components/user/EditPost";
import DeletePost from "components/user/DeletePost";
import ReportPost from "components/user/ReportPost";
import FlexBetween from "components/user/FlexBetween";
import Friend from "components/user/Friend";
import WidgetWrapper from "components/user/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost,} from "state/userState";

const PostWidget = ({
  
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  // const options = ["Edit", "Delete"];
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isReport,setIsReport] = useState(false)
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userState.token);
  // const posts = useSelector((state) => state.userState.posts);
  const user = useSelector((state) => state.userState.user);
  const loggedInUserId = useSelector((state) => state.userState.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      {isUpdate && (
        <EditPost
          setIsUpdate={setIsUpdate}
          postId={postId}
          postUserId={postUserId}
          name={name}
          description={description}
          picturePath={picturePath}
          userPicturePath={userPicturePath}
          isEdit={true}
        />
      )}
      {isDelete && (
        <DeletePost
          setIsDelete={setIsDelete}
          postId={postId}
          postUserId={postUserId}
          isRemove={true}
        />
      )}
      {isReport && (
        <ReportPost
        setIsReport={setIsReport}
        postId={postId}
        postUserId={postUserId}
       
        isReported={true}
        />
      )}

      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={picturePath}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        {/* <IconButton> */}
          {/* <ShareOutlined /> */}

          <div>
            {[
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>,
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                }}
              >
                {user._id === postUserId ? (
                  <div>
                    <MenuItem
                      onClick={() => {
                        setIsUpdate(true);
                        handleClose();
                      }}
                    >
                      Edit
                    </MenuItem>

                    <MenuItem
                    sx={{color:"red"}}
                      onClick={() => {
                        setIsDelete(true);
                     
                        handleClose();
                      }}
                    >
                      Delete
                    </MenuItem>
                    
                  </div>
                ) : (
                  <MenuItem sx={{color:"yellow"}} onClick={()=>{
                    setIsReport(true)
                    console.log(isReport);
                    handleClose()
                  }}>Report</MenuItem>
                )}
             
                {/* <MenuItem  onClick={handleClose}>Report</MenuItem> */}
              </Menu>,
            ]}
          </div>
        {/* </IconButton> */}
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
