import { styled, TextField } from "@mui/material";
import React from "react";

const CustomTextField = styled(TextField)(({ theme }) => ({
  [`& fieldset`]: {
    borderRadius: 15,
  },
}));

export const TextFieldFormik = (props) => {
  const capitalizedTitle =
    props.fieldTitle.charAt(0).toUpperCase() + props.fieldTitle.slice(1);

  return (
    <CustomTextField
      margin="normal"
      required
      fullWidth
      id={props.fieldTitle}
      label={capitalizedTitle}
      name={props.fieldTitle}
      autoComplete={props.fieldTitle}
      autoFocus
      value={props.formik.values[props.fieldTitle]}
      onChange={props.formik.handleChange}
      error={
        props.formik.touched[props.fieldTitle] &&
        Boolean(props.formik.errors[props.fieldTitle])
      }
      helperText={
        props.formik.touched[props.fieldTitle] &&
        props.formik.errors[props.fieldTitle]
      }
    />
  );
};
