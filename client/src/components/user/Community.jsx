// import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { setCommunities } from "state/userState";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Community = ({ communityId, name, subtitle, userPicturePath }) => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { _id } = useSelector((state) => state.userState.user);
  // const token = useSelector((state) => state.userState.token);
  // const communities = useSelector((state) => state.userState.user.friends);

  const { palette } = useTheme();
  // const primaryLight = palette.primary.light;
  // const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  // const isCommunity = communities?.find((community) => community._id === communityId);
//   // const isFriend = friends.includes(friendId)

  // const patchCommunity = async () => {
  //   const response = await fetch(
  //     `http://localhost:3001/users/${_id}/${communityId}`,
  //     {
  //       method: "PATCH",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const data = await response.json();
  //   dispatch(setCommunities({ communities: data }));
  // };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${communityId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {/* {_id != communityId && <><IconButton
        onClick={() => patchCommunity()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isCommunity ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
        
      </IconButton></>} */}
    </FlexBetween>
  );
};

export default Community;