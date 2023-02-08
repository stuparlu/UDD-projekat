import { Button, Container, Typography } from "@mui/material";
import { Fragment } from "react";
import EnterpriseContact from "../EnterpriseContact";
import InfoSearchDisplay from "../InfoSearchDisplay";

function DesktopHome(props) {
  let userType = undefined;

  if (localStorage.getItem("userData")) {
    userType = JSON.parse(localStorage.getItem("userData")).userType;
  }

  const handleClick = () => {
    window.location.replace(
      "https://localhost:8080/shopPaymentTypes/465b6b3f-d367-423c-970f-53d71b"
    );
  };

  return (
    <Fragment>
      {userType === "ADMIN" && (
        <Container
          sx={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Izaberi načine plaćanja</Typography>
          <Button
            onClick={handleClick}
            variant="contained"
            sx={{ margin: "1rem" }}
          >
            Načini plaćanja
          </Button>
        </Container>
      )}
      {userType !== "ADMIN" && (
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <InfoSearchDisplay></InfoSearchDisplay>
          <EnterpriseContact />
        </Container>
      )}
    </Fragment>
  );
}

export default DesktopHome;
