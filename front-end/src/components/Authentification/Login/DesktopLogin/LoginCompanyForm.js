import {
  Box,
  Button,
  Checkbox,
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
import React, { useState } from "react";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const CustomTextField = styled(TextField)(({ theme }) => ({
  [`& fieldset`]: {
    borderRadius: 15,
  },
}));

const AuthentificationTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[700],
}));

function LoginCompanyForm() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
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
          Kompanija
        </Typography>
      </Grid>
      <Grid item textAlign="center">
        <AuthentificationTypography>Prijavi se</AuthentificationTypography>
        <Box display="flex" flexDirection="row" margin="auto">
          <AuthentificationTypography>
            Nemate nalog,&nbsp;
          </AuthentificationTypography>
          <Link component={NavLink} to="/register-kompanija" underline="none">
            registrujte se
          </Link>
        </Box>
      </Grid>
      <Grid item>
        <Paper sx={{ padding: "2rem 4rem", maxWidth: "30rem" }}>
          <CustomTextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
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
          <Box
            flexDirection="row"
            display="flex"
            margin="1rem"
            alignItems="center"
          >
            <FormControlLabel
              sx={{ flexGrow: "1" }}
              control={<Checkbox value="remember" color="primary" />}
              label="Zapamti me"
            />
            <Link component={NavLink} to="/forgot-password" underline="none">
              Zaboravili ste šifru?
            </Link>
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              textTransform: "capitalize",
              borderRadius: "10px",
              fontSize: "20px",
            }}
          >
            Prijavite se
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LoginCompanyForm;
