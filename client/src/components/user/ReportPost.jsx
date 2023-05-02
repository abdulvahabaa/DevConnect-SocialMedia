// import * as React from "react";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import Slide from "@mui/material/Slide";
// import { useEffect,useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setPosts } from "state/userState";

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
//   });
  
//  export default function ReportPost({
//     postId,
//     postUserId,
//     setIsDelete,
//     isRemove = false,
//   }) {
//     const [isReport, setIsReport] = useState(false);
//     const [open, setOpen] =useState(false);
//     const token = useSelector((state) => state.userState.token);
//     const posts = useSelector((state) => state.userState.posts);
//     const dispatch = useDispatch();
//     const handleClickOpen = () => {
//       setOpen(true);
//     };
  
//     useEffect(() => {
//       if (isReport) {
//         handleClickOpen();
//       }
//     }, []);
  
//     const handleReport = async () => {
//       const response = await fetch(
//         `http://localhost:3001/admin/posts`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ userId: postUserId }),
//         }
//       );
//       await response.json();
  
//       const postData = posts.filter((post) => post._id !== postId);
//       dispatch(setPosts({ posts: postData }));
//     };
  
//     const handleClose = () => {
//       setIsReport(false);
//       setOpen(false);
//     };
  
//     return (
//       <div>
//         <Dialog
//           open={open}
//           TransitionComponent={Transition}
//           keepMounted
//           onClose={handleClose}
//           aria-describedby="alert-dialog-slide-description"
//         >
//           <DialogTitle>{"Report Post Conformation"}</DialogTitle>
//           <DialogContent>
//             <DialogContentText id="alert-dialog-slide-description">
//               Select Proper reson for REPORT this Post?
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose}>Cancel</Button>
//             <Button
//               onClick={() => {
//                 handleReport();
//                 handleClose();
//               }}
//             >
//               REPORT
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </div>
//     );
//   }
  
import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, FormControlLabel, FormLabel, Modal, Radio, RadioGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// import { reportPost } from 'api/users';




const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ReportPost({ isReported = false, setIsReport, postId,postUserId }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userState.user);
    const token = useSelector(state => state.userState.token);

    const [content, setContent] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setIsReport(false)
        setOpen(false)
    };

    useEffect(() => {
        if (isReported) {
            handleOpen()
        }
    }, [isReported])

    const handleReport = async () => {

        const formData = new FormData();

        formData.append("userId", postUserId);
        formData.append("postId", postId);
        formData.append("content", content);
        console.log(postId);

        const posts = await reportPost(formData, token);
        console.log(posts);
     
    }

   const reportPost = async (formData, token)=>{
      console.log(formData);
      console.log(token);
      let response = await fetch(`http://localhost:3001/posts/report`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });
      return response.json();
    }

    return (

        // <Wrapper>
        <Box sx={{ textAlign: 'center' }}>

            <Modal
                sx={{ marginTop: "150px" }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Report</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            // defaultValue="female"
                            value = {content}
                            onChange = {(e)=>{
                                console.log(e.target.value)
                                setContent(e.target.value)
                            }}
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="Violent or repulsive content" control={<Radio />} label="Violent or repulsive content" />
                            <FormControlLabel value="Hateful or abusive content" control={<Radio />} label="Hateful or abusive content" />
                            <FormControlLabel value="Spam or misleading" control={<Radio />} label="Spam or misleading" />
                            <FormControlLabel value="Other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>

                    {/* <textarea rows={3} cols={42} style={{ border: "none" }}
                        onChange={(e) => {
                            console.log(e.target.value)
                            setPostContent(e.target.value)

                        }}

                        value={postContent}
                        placeholder='Write something!!'
                    /> */}

                    <Button
                        onClick={() => {
                            handleReport();
                            handleClose();
                            // navigate('/');

                        }}
                    >
                        Report
                    </Button>
                </Box>

            </Modal>
        </Box>
        // </Wrapper>

    )
}

export default ReportPost

