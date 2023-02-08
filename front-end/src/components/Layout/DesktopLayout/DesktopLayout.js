import React, { Fragment } from "react";
import NavigationBar from "../../../Navigation/DesktopNavigation/NavigationBar";
import { Footer } from "../../Home/Footer";

function DesktopLayout(props) {
  return (
    <Fragment>
      <NavigationBar></NavigationBar>
      {props.children}
      <Footer></Footer>
    </Fragment>
  );
}

export default DesktopLayout;
