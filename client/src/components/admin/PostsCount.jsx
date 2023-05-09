import React from 'react'
import { Box, Divider, IconButton, Typography } from "@mui/material";
import FlexBetween from "components/user/FlexBetween";
import WidgetWrapper from "components/user/WidgetWrapper";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useSelector } from 'react-redux';

function PostsCount() {
  const dashboardData=useSelector((state)=>state.adminState.dashboard)
  return (
    <WidgetWrapper  >
    <Box >
        <FlexBetween >
        {/* <Topbar /> */}
        <EmailOutlinedIcon fontSize="large" />
        <Typography  variant="h4"
        //   color={dark}
          fontWeight="500">
             Total POSTS
        </Typography> 
        <Divider>
        <Box p="1rem 0">
    <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
      <Typography variant="h3" fontWeight="500" > {dashboardData?.postsCount}</Typography>
    </Box>
    
  </Box>
        </Divider>
           
    </FlexBetween>
    </Box>
    </WidgetWrapper>
  )
}

export default PostsCount