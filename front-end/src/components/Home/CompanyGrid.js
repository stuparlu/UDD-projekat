import { Box, Grid } from "@mui/material";
import React, { Fragment } from "react";
import CompanyProfileCard from "../UI/CompanyProfileCard";

function CompanyGrid() {
  return (
    <Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={1} columnSpacing={{sm: 2, md: 3}}>
          {Array.from(Array(8)).map((_, index) => (
            <Grid item sm={4} md={3} key={index}>
              <CompanyProfileCard></CompanyProfileCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fragment>
  );
}

export default CompanyGrid;
