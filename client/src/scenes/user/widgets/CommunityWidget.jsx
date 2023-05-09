import { Box,Typography, useTheme } from "@mui/material";
import Community from "components/user/Community";
// import FlexBetween from "components/user/FlexBetween";
import WidgetWrapper from "components/user/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setCommunities } from "state/userState";




const CommunityWidget = () => {
  const { palette } = useTheme();
  // const dark = palette.neutral.dark;
  // const main = palette.neutral.main;
  // const medium = palette.neutral.medium;

  const dispatch = useDispatch();
  const token = useSelector((state) => state.userState.token);
  // const communityId =useSelector((state) => state.user.id)
  const communitiesData = useSelector((state) => state.userState.communities)
console.log(communitiesData)
  const getCommunities= async ()=>{
    const response = await fetch(
      "http://localhost:3001/users/communities",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setCommunities({ communities: data }));
  }
  
  useEffect(() => {
   getCommunities();
  }, [])
  

  return (
    <WidgetWrapper>
     
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Communities you may know
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {communitiesData?.map((community) => (
          <Community
            key={community._id}
            communityId={community._id}
            name={`${community.firstName} ${community.lastName}`}
            subtitle={community.occupation}
            userPicturePath={community.picturePath}
          />
        ))}
      </Box>
      {/* <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography> */}
    </WidgetWrapper>
  );
};

export default CommunityWidget;