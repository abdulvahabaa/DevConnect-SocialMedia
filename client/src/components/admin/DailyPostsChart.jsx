import React from "react";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import FlexBetween from "components/user/FlexBetween";
import WidgetWrapper from "components/user/WidgetWrapper";

import BarChart from "./BarChart";

// import { ResponsiveTimeRange } from '@nivo/calendar'



function DailyPostsChart() {
  return (
    <WidgetWrapper>
     
      <Box m="20px">
      <Typography
          variant="h4"
          //   color={dark}
          fontWeight="500"
        >
          POSTS CHART
        </Typography>
        <Divider /> 
        {/* <Header title="Bar Chart" subtitile="Simple Bar Chart"/> */}
        <Box height="60vh">
          <BarChart />
        </Box>
      </Box>
    </WidgetWrapper>
  );
}

export default DailyPostsChart;
