import React, { Fragment } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material";
import DesktopLayout from "./DesktopLayout/DesktopLayout";
import PhoneLayout from "./PhoneLayout/PhoneLayout";

const MyBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  width: "100vw",
}));

function Layout(props) {
  return (
    <Fragment>
      <MyBox
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
      >
        <DesktopLayout>{props.children}</DesktopLayout>
      </MyBox>
      <MyBox
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
      >
        <PhoneLayout>{props.children}</PhoneLayout>
      </MyBox>
    </Fragment>
  );
}

export default Layout;
