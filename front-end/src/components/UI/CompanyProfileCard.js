import { Box, Card, Stack, Typography } from "@mui/material";
import React from "react";

function CompanyProfileCard(props) {
  return (
    <Card sx={{ position: "relative", height: "10rem" }}>
      <Box position="absolute" top="0" left="0" borderRadius="15px" zIndex={1}>
        <Typography>Premium</Typography>
      </Box>
      <Stack direction="column" alignItems="flex-start" spacing={3} marginY="5rem">
        <Typography>Name</Typography>
      </Stack>
    </Card>
  );
}

export default CompanyProfileCard;
