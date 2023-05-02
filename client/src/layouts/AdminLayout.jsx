import React, {  } from "react";
import { Box, } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminSidebar from "scenes/admin/global/AdminSidebar";

const AdminLayout = () => {
  return (
    <Box width="100%" height="100%">
      <Box width="100%"  zIndex={1} sx={{ position: "fixed" }}>
        <AdminSidebar />
      </Box>
      <Box flexGrow={1}>
        <Outlet sx={{ m: 5 }} />
      </Box>
    </Box>
  );
};

export default AdminLayout;
