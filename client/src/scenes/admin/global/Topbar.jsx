import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Button,
  Card,
} from "@mui/material";

import {
  
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, } from "react-redux";
import { setAdminMode, setAdminLogout } from "../../../state/adminState";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/user/FlexBetween";

const Topbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
//   const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  // const fullName = `${user.firstName} ${user.lastName}`;
  return (
    <Card sx={{border:"1px solid red"}} zIndex={2}>
      <Box
        style={
          !isNonMobileScreens
            ? {
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: "start",
                gap: "4rem",
              }
            : {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }
        }
        padding="1rem 6%"
        backgroundColor={alt}
      >
        <FlexBetween gap="1.75rem">
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
            onClick={() => navigate("/admin")}
            sx={{
              "&: hover": {
                color: dark,
                cursor: "pointer",
              },
            }}
          >
            Admin DevConnect
          </Typography>

          {/* {isNonMobileScreens && (
                    <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )} */}
        </FlexBetween>

        {/* Desktop nav */}
        {isNonMobileScreens ? (
          <FlexBetween gap="2rem">
            {/* <Button onClick={()=>{navigate(`/profile/${user._id}`)}}>profile</Button> */}
            <Button
              onClick={() => {
                navigate("/admin/user");
              }}
            >
              Users
            </Button>
            <Button
              onClick={() => {
                navigate("/admin/posts");
              }}
            >
              Posts
            </Button>

            <IconButton onClick={() => dispatch(setAdminMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode />
              )}
            </IconButton>
            <Message />
            <Notifications />
            <Help />
            <FormControl variant="standard" value="admin">
              <Select
                value="admin"
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value="admin">
                  <Typography>admin</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setAdminLogout())}>
                  Logout
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        )}

        {/* Mobile nav */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            position="fixed"
            left="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="300px"
            backgroundColor={background}
          >
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>

            {/* menu items */}
            <FlexBetween
              gap="3rem"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <IconButton onClick={() => dispatch(setAdminMode())}>
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode />
                )}
              </IconButton>
              <Message />
              <Notifications />
              <Help />

              <FormControl variant="standard" value="admin">
                <Select
                  value="admin"
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value="admin">
                    <Typography>admin</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setAdminLogout())}>
                    Logout
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default Topbar;
