import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    adminMode: "light",
    admin: null,
    adminToken: null,
    dashboard:{usersCount:null,postsCount:null,reportsCount:null}
    // posts: [],
    // communities:[],
  };

  export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setAdminMode: (state) => {
        state.adminMode = state.adminMode === "light" ? "dark" : "light";
      },
      setAdminLogin: (state, action) => {
        state.admin = action.payload.admin;
        state.adminToken = action.payload.adminToken;
      },
      setAdminLogout: (state) => {
        state.admin = null;
        state.adminToken = null;
      },

      setAllCount: (state,action)=>{
        state.dashboard.usersCount = action.payload.dashboard.usersCount
        state.dashboard.reportsCount = action.payload.dashboard.reportsCount
        state.dashboard.postsCount = action.payload.dashboard.postsCount
      }
      
  
    },
  }
  );
  
  export const { setAdminMode, setAdminLogin, setAdminLogout,setAllCount 
 } = authSlice.actions;
  export default authSlice.reducer;