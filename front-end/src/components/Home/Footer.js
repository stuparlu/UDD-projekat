import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export const Footer = () => {
  return (
    <Fragment>
      <Box backgroundColor="white" paddingX="3rem">
        <Stack direction="row" spacing={2} display="flex" paddingY="1rem">
          <Stack display="flex" justifyContent="flex-start" flexGrow="1">
            <Button
              component={NavLink}
              to="/"
              variant="text"
              sx={{ maxWidth: "5rem" }}
              disableRipple
            >
              <Typography variant="h5">Agency</Typography>
            </Button>
            <Box maxWidth="25rem">
              <Typography flexWrap="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </Box>
          </Stack>
          <Stack alignItems="flex-start" flexGrow="1">
            <Button component={NavLink} to="/" variant="text" disableRipple>
              <Typography variant="body1">O nama</Typography>
            </Button>
            <Button component={NavLink} to="/" variant="text" disableRipple>
              <Typography variant="body1">Za programere</Typography>
            </Button>
            <Button component={NavLink} to="/" variant="text" disableRipple>
              <Typography variant="body1">Za kompanije</Typography>
            </Button>
            <Button component={NavLink} to="/" variant="text" disableRipple>
              <Typography variant="body1">Uslovi korišćenja</Typography>
            </Button>
            <Button component={NavLink} to="/" variant="text" disableRipple>
              <Typography variant="body1">Politika privatnosti</Typography>
            </Button>
            <Button component={NavLink} to="/" variant="text" disableRipple>
              <Typography variant="body1">Kontakt</Typography>
            </Button>
          </Stack>
          <Stack flexGrow="1">
            <Typography>Na kojim smo mrežama</Typography>
            <Stack direction="row" spacing={1} marginY="0.5rem">
              <FacebookRoundedIcon fontSize="large" />
              <InstagramIcon fontSize="large" />
              <TwitterIcon fontSize="large" />
              <LinkedInIcon fontSize="large" />
              <WhatsAppIcon fontSize="large" />
            </Stack>
          </Stack>
        </Stack>
        <Box marginY="1rem">
          <Typography>© 2022 Made in Serbia.</Typography>
          <Box maxWidth="30rem">
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};
