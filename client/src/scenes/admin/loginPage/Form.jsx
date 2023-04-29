
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
  // Typography,
  // InputLabel,
  // MenuItem,
  // Select,
  // FormControl,
} from "@mui/material";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdminLogin } from "state/adminState";
// import Dropzone from "react-dropzone";
// import FlexBetween from "components/user/FlexBetween";
// import { PersonRemoveAlt1 } from "@mui/icons-material";






const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});



const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {



  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
 

 

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    console.log(loggedIn)
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setAdminLogin({
          admin: loggedIn.admin,
          adminToken: loggedIn.token,
        })
      );
      navigate("/admin/dashboard");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
   await login(values, onSubmitProps);
  
  };


  


  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema }
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        // setFieldValue,
        // resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
   
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              LOGIN
            </Button>
        
          </Box>

        </form>
      )}
    </Formik>
  );
};

export default Form;