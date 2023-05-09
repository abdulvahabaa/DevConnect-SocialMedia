import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state/userState";
import PostWidget from "./PostWidget";
import axios from "axios"

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.userState.posts);
  const token = useSelector((state) => state.userState.token);

  const getPosts = async () => {
    const response = await axios.get("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setPosts({ posts: response.data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {      
      getUserPosts();
    } else {      
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {Array.isArray(posts) && posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments
        },index) => (
          <PostWidget
          key={`${_id}-${index}`}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </div>
  );
};

export default PostsWidget;
