import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "scenes/user/homePage";
import LoginPage from "scenes/user/loginPage";
import ProfilePage from "scenes/user/profilePage";
import LoginPageAdmin from "scenes/admin/loginPage";
// import Topbar from "scenes/admin/global/Topbar";
import AdminLayout from "layouts/AdminLayout";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import Dashboard from "scenes/admin/dashboard";
// import Navbar from "scenes/user/navbar";
import UserManagement from "components/admin/UserManagement";
import PostManagement from "components/admin/PostManagement";
// import { ColorModeContext, useMode } from "themeAdmin";

function App() {
  const mode = useSelector((state) => state.userState.mode);
  const adminMode = useSelector((state) => state.adminState.adminMode )
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode,adminMode]);
  const isAuth = Boolean(useSelector((state) => state.userState.token ));
  const isAdminAuth = Boolean (useSelector((state) => state.adminState.adminToken));


  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={!isAuth ? <LoginPage /> : <Navigate to="/home" />} />
            
            {/* <Route element={isAuth ?<Navbar />: <Navigate to="/" />}> */}

            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" /> } />
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" /> } />
            
            {/* </Route> */}
            
          </Routes>
           
          <Routes>
            <Route path="/admin" element={!isAdminAuth ? <LoginPageAdmin /> : <Navigate to ="/admin/dashboard" />} />
            <Route element={isAdminAuth ?<AdminLayout /> : <Navigate to="/admin" /> }>
            <Route path="/admin/dashboard" element={isAdminAuth ? <Dashboard /> : <Navigate to="/admin" />} />
            <Route path="/admin/user" element={isAdminAuth ? <UserManagement /> : <Navigate to="/admin" />} />
            <Route path="/admin/posts" element={isAdminAuth ? <PostManagement /> : <Navigate to="/admin" />} />
            </Route>
          
          
          </Routes>
          
        </ThemeProvider>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
