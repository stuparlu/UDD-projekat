import React, { Fragment, useContext, useState } from "react";

// MUI
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";

// MUI ICONS
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AuthContext from "../../../../store/auth-context";

// FORMIK
import { useFormik } from "formik";
import * as yup from "yup";

// REACT ROUTER
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// REACT QUERY HOOK
import { useLoginCandidateQuery } from "../../../../hooks/useLoginQuery";

// OTHER
import { LoginWithGrid } from "../../Utils/LoginWithGrid";

import { PasswordFieldFormik } from "../../Utils/PasswordFieldFormik";
import { TextFieldFormik } from "../../Utils/TextFieldFormik";

const AuthentificationTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[700],
}));

const validationSchema = yup.object({
  username: yup
    .string("Upiši svoj username")
    // .email("Upiši validan email")
    .required("Username je obavezan"),
  password: yup.string("Upiši svoj password").required("Password je obavezan"),
  rememberMe: yup.boolean(),
});

function LoginCandidateForm() {
  const navigate = useNavigate();

  const [badLoginCredentials, setBadLoginCredentials] = useState(false);

  const authCtx = useContext(AuthContext);

  // const [showPassword, setShowPassword] = useState(false);
  // const handleClickShowPassword = () => setShowPassword(!showPassword);
  // const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      loginMutation();
      // alert(JSON.stringify(values, null, 2));
    },
  });

  const formChangedHandler = () => {
    setBadLoginCredentials(false);
  };

  // React query i axios
  const onSuccess = (response) => {
    const expirationTime = new Date(
      new Date().getTime() + +response.data.expiresIn
    );

    authCtx.login(
      response.data.accessToken,
      expirationTime,
      response.data.userType,
      response.data.username
    );

    // Zameni sa useHistory("/jobs");
    navigate("/");
  };

  const onError = (err) => {
    setBadLoginCredentials(true);
    console.log(err.response);
  };

  const { isLoading, mutate: loginMutation } = useLoginCandidateQuery(
    onSuccess,
    onError,
    formik.values.username,
    formik.values.password
  );

  return (
    <Fragment>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        marginY="1rem"
      >
        <Grid item>
          <Typography variant="h4" color="primary">
            Kandidat
          </Typography>
        </Grid>
        <Grid item textAlign="center">
          <AuthentificationTypography>Prijavi se</AuthentificationTypography>
          <Box display="flex" flexDirection="row" margin="auto">
            <AuthentificationTypography>
              Nemate nalog,&nbsp;
            </AuthentificationTypography>
            <Link component={NavLink} to="/register-kandidat" underline="none">
              registrujte se
            </Link>
          </Box>
        </Grid>
        <Grid item>
          <form
            noValidate="novalidate"
            onSubmit={formik.handleSubmit}
            onChange={formChangedHandler}
          >
            <Paper sx={{ padding: "2rem 4rem", maxWidth: "30rem" }}>
              <TextFieldFormik formik={formik} fieldTitle="username" />
              <PasswordFieldFormik formik={formik} />
              <Box
                flexDirection="row"
                display="flex"
                margin="1rem"
                alignItems="center"
              >
                <FormControlLabel
                  sx={{ flexGrow: "1" }}
                  control={
                    <Checkbox
                      checked={formik.values.rememberMe}
                      onChange={formik.handleChange}
                      color="primary"
                      value="rememberMe"
                    />
                  }
                  name="rememberMe"
                  label=<AuthentificationTypography>
                    Zapamti me
                  </AuthentificationTypography>
                />
                <Link
                  component={NavLink}
                  to="/forgot-password"
                  underline="none"
                >
                  Zaboravili ste šifru?
                </Link>
              </Box>
              <Box sx={{ position: "relative" }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isLoading}
                  sx={{
                    textTransform: "none",
                    borderRadius: "10px",
                    fontSize: "20px",
                  }}
                >
                  Prijavite se
                </Button>
                {isLoading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      margin: "auto",
                      left: 0,
                      right: 0,
                    }}
                  />
                )}
              </Box>
              {badLoginCredentials && (
                <Alert severity="error" sx={{ marginTop: "2rem" }}>
                  Tvoj e-mail ili lozinka nisu ispravni
                </Alert>
              )}
              <Divider sx={{ marginY: "2rem" }}>
                <AuthentificationTypography>ili</AuthentificationTypography>
              </Divider>
              <LoginWithGrid />
            </Paper>
          </form>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default LoginCandidateForm;
