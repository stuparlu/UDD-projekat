import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  MenuItem,
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

const CustomTextField = styled(TextField)(({ theme }) => ({
  [`& fieldset`]: {
    borderRadius: 15,
  },
}));

const companySizes = [
  {
    value: "<20",
    label: "<20",
  },
  {
    value: "21-50",
    label: "21-50",
  },
  {
    value: "51-100",
    label: "51-100",
  },
  {
    value: "101-250",
    label: "101-250",
  },
  {
    value: "251-500",
    label: "251-500",
  },
  {
    value: "501-1000",
    label: "501-1000",
  },
  {
    value: ">1001",
    label: ">1001",
  },
];

const AuthentificationTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[700],
}));

function RegisterCompanyForm() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [city, setCity] = useState("");

  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };

  const [size, setSize] = useState("");

  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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
            Kompanija
          </Typography>
        </Grid>
        <Grid item textAlign="center">
          <AuthentificationTypography>
            Registracija kompanije
          </AuthentificationTypography>
          <Box display="flex" flexDirection="row" margin="auto">
            <AuthentificationTypography>
              Ako već imate nalog,&nbsp;
            </AuthentificationTypography>
            <Link component={NavLink} to="/login-kompanija" underline="none">
              prijavite se ovde
            </Link>
          </Box>
        </Grid>
        <Grid item>
          <Paper sx={{ padding: "2rem 4rem", maxWidth: "30rem" }}>
            <CustomTextField
              margin="normal"
              required
              fullWidth
              id="companyName"
              label="Naziv kompanije"
              name="companyName"
              autoFocus
            />
            <CustomTextField
              margin="normal"
              required
              fullWidth
              id="pib"
              label="PIB"
              name="pib"
            />
            <CustomTextField
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Telefon kompanije"
              name="phoneNumber"
            />
            <CustomTextField
              margin="normal"
              required
              fullWidth
              id="serialNumber"
              label="Poštanski broj"
              name="serialNumber"
            />
            <CustomTextField
              margin="normal"
              required
              fullWidth
              id="city"
              select
              label="Grad"
              value={city}
              name="city"
              onChange={handleChangeCity}
            >
              {/* DODAJ SVE GRADOVE DA MOGU DA SE IZABERU KROZ NEKU DINAMICKU LISTU */}
              <MenuItem key={"Beograd"} value={"Beograd"}>
                Beograd
              </MenuItem>
              <MenuItem key={"Novi Sad"} value={"Novi Sad"}>
                Novi Sad
              </MenuItem>
              <MenuItem key={"Niš"} value={"Niš"}>
                Niš
              </MenuItem>
            </CustomTextField>
            <CustomTextField
              margin="normal"
              required
              fullWidth
              id="addressCompany"
              label="Adresa kompanije"
              name="addressCompany"
            />
            <AuthentificationTypography margin="1rem 1rem 0rem 1rem">
              Lični podaci
            </AuthentificationTypography>
            <Divider></Divider>
            <CustomTextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Ime"
              name="name"
            />
            <CustomTextField
              margin="normal"
              required
              fullWidth
              id="surname"
              label="Prezime"
              name="surname"
            />
            <AuthentificationTypography margin="1rem 1rem 0rem 1rem">
              Dodatne informacije
            </AuthentificationTypography>
            <Divider></Divider>
            <CustomTextField
              margin="normal"
              required
              fullWidth
              id="sizeCompany"
              select
              label="Veličina kompanije"
              value={size}
              name="sizeCompany"
              onChange={handleChangeSize}
            >
              {/* DODAJ SVE GRADOVE DA MOGU DA SE IZABERU KROZ NEKU DINAMICKU LISTU */}
              {companySizes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </CustomTextField>
            <AuthentificationTypography margin="1rem 1rem 0rem 1rem">
              Podaci za pristup
            </AuthentificationTypography>
            <Divider></Divider>
            <CustomTextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
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
            <Box margin="1rem">
              <AuthentificationTypography>
                Šifra mora da zadovolji sledeće uslove:
              </AuthentificationTypography>
              <Box margin="1rem">
                <AuthentificationTypography>
                  Bar 8 karakter<br></br>Bar jedno veliko slovo<br></br>Bar
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
              label="Repeat password"
              type="password"
              id="repeatPassword"
            />
            <Box flexDirection="column" display="flex" margin="1rem">
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Prihvatam uslove korišćenja i politiku privatnosti"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Prihvatam da primam novosti i obaveštenja"
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
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default RegisterCompanyForm;
