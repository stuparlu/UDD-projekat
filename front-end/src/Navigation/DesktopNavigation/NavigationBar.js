import { NavLink } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Paper,
  InputBase,
  MenuItem,
  Avatar,
  IconButton,
} from "@mui/material";
import React, { Fragment, useContext } from "react";

import SearchIcon from "@mui/icons-material/Search";

import HoverMenu from "material-ui-popup-state/HoverMenu";

import {
  usePopupState,
  bindMenu,
  bindHover,
  bindTrigger,
} from "material-ui-popup-state/hooks";

import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import AuthContext from "../../store/auth-context";

function NavigationBar() {
  const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });
  const profilePopupState = usePopupState({
    variant: "popover",
    popuId: "profileMenu",
  });

  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    //POZOVI KAD SE PRITISNE LOGOUT
    profilePopupState.close();
    authCtx.logout();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Button component={NavLink} to="/" variant="text">
            <Typography variant="h5">Agency</Typography>
          </Button>
          <Box sx={{ flexGrow: 1 }}>
            <Button component={NavLink} to="/poslovi" variant="text">
              <Typography variant="body1">Poslovi</Typography>
            </Button>
            <Button component={NavLink} to="/kompanije" variant="text">
              <Typography variant="body1">Kompanije</Typography>
            </Button>
          </Box>
          {isLoggedIn && (
            <Button
              variant="contained"
              component={NavLink}
              to="/unajmi-nas"
              sx={{ textTransform: "none" }}
            >
              Unajmi nas
            </Button>
          )}
          <Paper
            component="form"
            variant="outlined"
            sx={{
              margin: "2px 16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <SearchIcon sx={{ marginX: "8px" }} />
            <InputBase placeholder="Pretraži kompanije"></InputBase>
          </Paper>
          {!isLoggedIn && (
            <Fragment>
              <Button variant="contained" {...bindHover(popupState)}>
                Login
                <KeyboardArrowDownOutlinedIcon
                  sx={{ marginLeft: "0.5rem", marginRight: "-0.5rem" }}
                />
              </Button>
              <HoverMenu {...bindMenu(popupState)}>
                <MenuItem
                  component={NavLink}
                  to="/register-kandidat"
                  onClick={popupState.close}
                >
                  Kao kandidat
                </MenuItem>
                <MenuItem
                  component={NavLink}
                  to="/register-kompanija"
                  onClick={popupState.close}
                >
                  Kao poslodavac
                </MenuItem>
              </HoverMenu>
            </Fragment>
          )}
          {isLoggedIn && (
            <>
              <IconButton
                sx={{ padding: 0 }}
                {...bindTrigger(profilePopupState)}
              >
                <Avatar></Avatar>
              </IconButton>
              <HoverMenu {...bindMenu(profilePopupState)}>
                <MenuItem
                  component={NavLink}
                  // Dodaj tacno odredjeni id profila posle /profil :id
                  to="/profil"
                  onClick={profilePopupState.close}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={logoutHandler}>Log out</MenuItem>
              </HoverMenu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavigationBar;
