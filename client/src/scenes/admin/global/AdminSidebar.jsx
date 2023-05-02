import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ListItemText from "@mui/material/ListItemText";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import MailIcon from "@mui/icons-material/Mail";
import Topbar from "./Topbar";
import { useNavigate } from "react-router-dom";

const drawerWidth = 230;

export default function AdminSidebar() {
  const navigate = useNavigate();
  const values = [
    { text: "Dashboard", navigate: "/admin/dashboard" },
    { text: "Users", navigate: "/admin/user" },
    { text: "Posts", navigate: "/admin/posts" },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        // sx={{border:'1px solid red'}}
      >
        <Topbar/>
      </AppBar>
      <Drawer 
        variant="permanent"
      
        sx={{
          
          width: drawerWidth,
          flexShrink: 0,
          position:'absolute',
          zIndex:0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", marginTop: "20px" }}>
          <List >
            {values.map((value, index) => (
              <ListItem key={value.text}   onClick={() => {
                navigate(value.navigate);
              }} >
                <ListItemButton
                
                >
                  <ListItemIcon>
                    {value.text === "Dashboard" && <GridViewRoundedIcon />}
                    {value.text === "Users" && <PeopleOutlineIcon />}
                    {value.text === "Posts" && <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={value.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box>
         
    </Box>
  );
}
