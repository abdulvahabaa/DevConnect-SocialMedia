import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setUser } from "state/userState";
import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function EditProfile({
  setIsEditProfile,
  firstName,
  lastName,
  location,
  occupation,
  isEdit = false,
  userId
}) {
  const [open, setOpen] = React.useState(false);
  const [profileData, setProfileData] = useState({
    firstName,
    lastName,
    location,
    occupation,
    oldPassword: "",
    newPassword: "",
  });
  const token = useSelector((state) => state.userState.token);
  const posts = useSelector((state) => state.userState.posts);

  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (isEdit) {
      handleClickOpen();
    }
  }, []);

  useEffect(() => {}, []);

  


  const handleEditUser = async () => {
    
    const response = await fetch(
      `http://localhost:3001/users/profile/${userId}/editProfile`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      }
    );
    
   const data = await response.json();
   console.log(data)
   dispatch(setUser({ user : data }));
  //  setUser(data)
  };

  const handleChange = (event) => {
    setProfileData({ ...profileData, [event.target.name]: event.target.value });
  };

  console.log(profileData);
  const handleClose = () => {
    setIsEditProfile(false);
    setOpen(false);
  };



  return (

    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontSize: "2rem",
            color: "#00D5FA",
          }}
        >
          {"EDIT PROFILE"}
        </DialogTitle>
        <DialogContent>
          <DialogContent>
            <form>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                required
                sx={{ mb: 2 }}
                defaultValue={profileData?.firstName}
                name="firstName"
                // value={name}
                onChange={(e) => handleChange(e)}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                defaultValue={profileData?.lastName}
                name="lastName"
                // value={name}
                onChange={(e) => handleChange(e)}
              />
              <TextField
                label="Location"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                defaultValue={profileData?.location}
                name="location"
                // value={email}
                onChange={(e) => handleChange(e)}
              />
              <TextField
                label="Occupation"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                defaultValue={profileData?.occupation}
                name="occupation"
                // value={email}
                onChange={(e) => handleChange(e)}
              />
              <TextField
                label="Old Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                name="oldPassword"
                // value={password}
                onChange={(e) => handleChange(e)}
              />
              <TextField
                label="New Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                name="newPassword"
                // value={confirmPassword}
                onChange={(e) => handleChange(e)}
              />
              <Typography sx={{ mb: 2 }}>
                Do you want to change the profile Image?
              </Typography>
              <input sx type="file" accept="image/*" />
            </form>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              alert("haiii")
              handleEditUser()
              handleClose();
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    
  );
}
