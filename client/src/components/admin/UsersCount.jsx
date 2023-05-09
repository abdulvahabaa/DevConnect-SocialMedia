import React from 'react'
import { LocationOnOutlined, ManageAccountsOutlined, WorkOutlineOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import FlexBetween from "components/user/FlexBetween";
import WidgetWrapper from "components/user/WidgetWrapper";
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { useSelector } from 'react-redux';

function UsersCount() {
  const dashboardData=useSelector((state)=>state.adminState.dashboard)
  return (
    <WidgetWrapper  >
        <Box >
            <FlexBetween >
            {/* <Topbar /> */}
            <GroupAddOutlinedIcon fontSize="large" />
            <Typography  variant="h4"
            //   color={dark}
              fontWeight="500">
                Total USERS
            </Typography> 
            <Divider>
            <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <Typography variant="h3" fontWeight="500" >{dashboardData?.usersCount}</Typography>
        </Box>
        
      </Box>
            </Divider>
               
        </FlexBetween>
        </Box>
        </WidgetWrapper>
    


 
);
  
}

export default UsersCount