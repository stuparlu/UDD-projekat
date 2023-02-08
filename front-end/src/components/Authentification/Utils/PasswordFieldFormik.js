import React, { useState } from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment, styled, TextField } from "@mui/material";

const CustomTextField = styled(TextField)(({ theme }) => ({
  [`& fieldset`]: {
    borderRadius: 15,
  },
}));

export const PasswordFieldFormik = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <CustomTextField
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type={showPassword ? "text" : "password"}
      id="password"
      autoComplete="current-password"
      value={props.formik.values.password}
      onChange={props.formik.handleChange}
      error={
        props.formik.touched.password && Boolean(props.formik.errors.password)
      }
      helperText={props.formik.touched.password && props.formik.errors.password}
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
  );
};
