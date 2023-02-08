import { Button, Grid } from "@mui/material";
import React from "react";

import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";

export const LoginWithGrid = () => {
  return (
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
  );
};
