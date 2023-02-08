import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";

import * as yup from "yup";

const CustomTextField = styled(TextField)(({ theme }) => ({
  [`& fieldset`]: {
    borderRadius: 15,
  },
}));

const AuthentificationTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[700],
}));

const validationSchema = yup.object({
  username: yup.string("Upiši svoj username").required("Username je obavezan"),
  email: yup
    .string("Upiši svoj email")
    .email("Upiši validan email")
    .required("Email je obavezan"),
  password: yup
    .string("Upiši svoj password")
    .min(12, "Password treba da ima najmanje 12 karaktera")
    .matches(/[A-Z]/, "Password mora da ima veliko slovo")
    .matches(/[0-9]/, "Password mora da sadrži broj")
    .matches(/[^\w]/, "Password mora da sadrži simbol")
    .required("Password je obavezan"),
  repeatPassword: yup
    .string("Ponovi šifru")
    .oneOf([yup.ref("password"), null], "Password nije isti")
    .required("Polje je obavezno"),
  conditions: yup
    .boolean()
    .required("Politika privatnosti i uslovi korišćenja se moraju prihvatiti")
    .oneOf(
      [true],
      "Politika privatnosti i uslovi korišćenja se moraju prihvatiti"
    ),
  newsletter: yup.boolean(),
});

function RegisterCandidateForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleClickShowRepeatPassword = () =>
    setShowRepeatPassword(!showRepeatPassword);
  const handleMouseDownRepeatPassword = () =>
    setShowRepeatPassword(!showRepeatPassword);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      conditions: false,
      newsletter: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //OVDE NAPISI FETCH ASYNC AWAIT
      alert(JSON.stringify(values, null, 2));
    },
  });

  // const toError = formik.getFieldMeta("conditions");
  // console.log(toError);

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
          <AuthentificationTypography>Registracija</AuthentificationTypography>
          <Box display="flex" flexDirection="row" margin="auto">
            <AuthentificationTypography>
              Ako već imate nalog,&nbsp;
            </AuthentificationTypography>
            <Link component={NavLink} to="/login-kandidat" underline="none">
              prijavite se ovde
            </Link>
          </Box>
        </Grid>
        <Grid item>
          <form noValidate="novalidate" onSubmit={formik.handleSubmit}>
            <Paper sx={{ padding: "2rem 4rem", maxWidth: "30rem" }}>
              <CustomTextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
              <CustomTextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <CustomTextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box margin="1rem">
                <AuthentificationTypography>
                  Šifra mora da zadovolji sledeće uslove:
                </AuthentificationTypography>
                <Box margin="1rem">
                  <AuthentificationTypography>
                    Bar 12 karakter<br></br>Bar jedno veliko slovo<br></br>Bar
                    jedno malo slovo<br></br>Bar jedan broj ili simbol <br></br>{" "}
                    Ne sme biti ista kao email adresa
                  </AuthentificationTypography>
                </Box>
              </Box>
              <CustomTextField
                margin="normal"
                required
                fullWidth
                name="repeatPassword"
                label="Ponovi password"
                type={showRepeatPassword ? "text" : "password"}
                id="repeatPassword"
                value={formik.values.repeatPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.repeatPassword &&
                  Boolean(formik.errors.repeatPassword)
                }
                helperText={
                  formik.touched.repeatPassword && formik.errors.repeatPassword
                }
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowRepeatPassword}
                        onMouseDown={handleMouseDownRepeatPassword}
                      >
                        {showRepeatPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box flexDirection="column" display="flex" margin="1rem">
                <FormControl component="fieldset">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.conditions}
                        onChange={formik.handleChange}
                        value="conditions"
                      />
                    }
                    name="conditions"
                    label=<AuthentificationTypography>
                      Prihvatam uslove korišćenja i politiku privatnosti
                    </AuthentificationTypography>
                  />
                  {formik.touched.conditions &&
                    Boolean(formik.errors.conditions) && (
                      <FormHelperText
                        error={
                          formik.touched.conditions &&
                          Boolean(formik.errors.conditions)
                        }
                      >
                        {formik.errors.conditions}
                      </FormHelperText>
                    )}
                </FormControl>
                <FormControlLabel
                  name="newsletter"
                  control={
                    <Checkbox
                      checked={formik.values.newsletter}
                      color="primary"
                      onChange={formik.handleChange}
                    />
                  }
                  label=<AuthentificationTypography>
                    Želim da primam novosti i obaveštenja
                  </AuthentificationTypography>
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  textTransform: "none",
                  borderRadius: "10px",
                  fontSize: "20px",
                }}
              >
                Prijavite se
              </Button>
              <Divider sx={{ marginY: "2rem" }}>
                <AuthentificationTypography>ili</AuthentificationTypography>
              </Divider>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Button fullWidth variant="outlined">
                    <GoogleIcon sx={{ marginRight: "0.5rem" }} />
                    Google
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="outlined">
                    <LinkedInIcon sx={{ marginRight: "0.5rem" }} />
                    LinkedIn
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="outlined">
                    <FacebookIcon sx={{ marginRight: "0.5rem" }} />
                    Facebook
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="outlined">
                    <GitHubIcon sx={{ marginRight: "0.5rem" }} />
                    GitHub
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default RegisterCandidateForm;
