import React, { Fragment } from "react";
import { Box, Button, Stack, styled, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

// We should export this Typograohy somewhere so we can use it in multiple places without defining them everywhere
const EnterpriseSearchTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[700],
}));

function EnterpriseContact() {
  return (
    <Fragment>
      <Box
        sx={{
          margin: "2rem 0rem",
          padding: "2rem 5rem",
          backgroundColor: "#CFD2CF",
          borderRadius: "15px",
        }}
      >
        <Stack direction="column" alignItems="flex-start" spacing={3}>
          <EnterpriseSearchTypography variant="h5">
            Ti si HR ili predstavnik IT firme?
          </EnterpriseSearchTypography>
          <EnterpriseSearchTypography>
            Registruj se i pronaci cemo za vas najbolje kandidate za poziciju
            koju trazite.
          </EnterpriseSearchTypography>
          <Box>
            <Button
              component={NavLink}
              to="/register-kompanija"
              variant="contained"
              sx={{ marginX: "3rem", paddingX: "2rem" }}
            >
              Otvori nalog kompanije
            </Button>
          </Box>
        </Stack>
      </Box>
    </Fragment>
  );
}

export default EnterpriseContact;
