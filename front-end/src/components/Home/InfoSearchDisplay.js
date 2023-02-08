import React, { Fragment, useState } from "react";
import { Box, InputBase, Paper, styled, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useJobsQuery } from "../../hooks/useJobsQuery";

const InfoSearchTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[700],
}));


function InfoSearchDisplay() {
  const [searchQuery, setSearchQuery] = useState("");

  const onSuccess = (response) => {
    console.log("SUCCESS", response);
  };
  
  const onError = (err) => {
    console.log("ERROR", err.response);
  };
  
  function handleChange(e) {
    setSearchQuery(e.target.value);
  }

  const { isLoading, mutate: searchMutation } = useJobsQuery(onSuccess, onError, searchQuery);


  const MakeRequest = () => {
    console.log("Making Request", searchQuery);
    searchMutation();
    console.log(isLoading);
    console.log(searchMutation);
  }
  
  const useKeyPress = (e) => {
    if(e.keyCode == 13){
      console.log("ENTER");
      MakeRequest();
    }
  };

  return (
    <Fragment>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          margin: "2rem 0rem",
          padding: "2rem 5rem",
          backgroundColor: "#CFD2CF",
          borderRadius: "15px",
        }}
      >
        <InfoSearchTypography variant="h5" align="center" sx={{marginY: '1rem'}}>
          Najveća baza IT poslova i iskustava o IT poslodavcima u Srbiji
        </InfoSearchTypography>
        <Paper
          component="form"
          elevation={5}
          sx={{
            padding: "8px",
            marginY: "1rem",
            width: "20rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <SearchIcon sx={{ marginX: "8px" }}></SearchIcon>
          <InputBase placeholder="Search" sx={{ flexGrow: 1 }} onKeyDown={useKeyPress} onChange={handleChange} value={searchQuery}></InputBase>
        </Paper>
        <InfoSearchTypography variant="body1" align="center" sx={{}}>
          Istraži IT kompanije kod nas!
        </InfoSearchTypography>
      </Box>
    </Fragment>
  );
}

export default InfoSearchDisplay;
