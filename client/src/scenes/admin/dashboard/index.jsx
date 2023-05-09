import { Box } from "@mui/material";
import DailyPostsChart from "components/admin/DailyPostsChart";
import PostsAndUsersChart from "components/admin/PostsAndUsersChart";
import PostsCount from "components/admin/PostsCount";
import ReportsLineChart from "components/admin/ReportsLineChart";
import UsersCount from "components/admin/UsersCount";
import FlexBetween from "components/user/FlexBetween";

const Dashboard = () => {
  return (
    <Box sx={{ marginTop: "100px", marginLeft: "260px", marginRight: "25px" }}>
      <h1>DASHBOARD</h1>
      {/* <h3>User Block / Unblock</h3> */}
     <FlexBetween >
      <Box  >
        <UsersCount  />
        {/* <PostsCount display="flex" /> */}
      </Box>
     
      <Box  >
        <PostsCount />
      </Box>
      </FlexBetween>
      <Box mt="1rem">
        <ReportsLineChart />
      </Box>
      <Box mt="1rem">
        <PostsAndUsersChart />
      </Box>
      
      <Box mt="1rem">
        <DailyPostsChart />
      </Box>
    </Box>

  );
};

export default Dashboard;
