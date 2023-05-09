import React from 'react'
import { Box, Divider, IconButton, Typography } from "@mui/material";
import FlexBetween from "components/user/FlexBetween";
import WidgetWrapper from "components/user/WidgetWrapper";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import LineChart from './LineChart';



function ReportsLineChart() {
  return (
    <WidgetWrapper>
     
      <Box m="20px">
      <Typography
          variant="h4"
          //   color={dark}
          fontWeight="500"
        >
         Daily Reports CHART
        </Typography>
        <Divider />
        {/* <Header title="Bar Chart" subtitile="Simple Bar Chart"/> */}
        <Box height="60vh">
          <LineChart/>
        </Box>
      </Box>
    </WidgetWrapper>
  )
}

export default ReportsLineChart