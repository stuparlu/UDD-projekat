import React, { Fragment, useState } from "react";
import { Box, InputBase, Stack, styled, Typography, Button, MenuItem, Select, Slider } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useAdvancedJobsQuery } from "../../hooks/useAdvancedJobsQuery";

const InfoSearchTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[700],
}));


function FullInfoSearchDisplay({props}) {
  const [firstNameQuery, setFirstNameQuery] = useState("");
  const [lastNameQuery, setLastNameQuery] = useState("");
  const [educationLevelQuery, setEducationLevelQuery] = useState("");
  const [cvQuery, setCVQuery] = useState("");
  const [coverQuery, setCoverQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [locationDistanceQuery, setLocationDistanceQuery] = useState("");


  const navigate = useNavigate();

  const onSuccess = (response) => {
    console.log("SUCCESS", response.data);
    // navigate("/searchSummary", {state: {data: response.data}});
  };
  
  const onError = (err) => {
    console.log("ERROR", err.response);
  };

  function handleFirstNameChange(e) {
    setFirstNameQuery(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastNameQuery(e.target.value);
  }

  function handleEducationLevelChange(e) {
    setEducationLevelQuery(e.target.value);
  }

  function handleCVChange(e) {
    setCVQuery(e.target.value);
  }

  function handleCoverChange(e) {
    setCoverQuery(e.target.value);
  }

  function handleCityChange(e) {
    setLocationQuery(e.target.value);
  }

  function handleSliderChange(e) {
    setLocationDistanceQuery(e.target.value);
  }
  const { isLoading, mutate: searchMutation } = useAdvancedJobsQuery(onSuccess, onError, firstNameQuery, lastNameQuery, educationLevelQuery, cvQuery, coverQuery, locationQuery, locationDistanceQuery);


  const MakeRequest = () => {
    console.log("Making Request", firstNameQuery, lastNameQuery, educationLevelQuery, cvQuery, coverQuery, locationQuery,locationDistanceQuery);
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
          margin: "2rem 10rem",
          padding: "2rem 2rem",
          backgroundColor: "#FFFFFF",
          borderRadius: "15px",
        }}
      >
        <InfoSearchTypography variant="h5" align="center" sx={{marginY: '1rem'}}>
          Pretrazi
        </InfoSearchTypography>
        <Stack
          component="form"
          direction="column"
          sx={{
            padding: "8px",
            marginY: "1rem",
          }}
        >
          <InputBase placeholder="Ime"  width="10rem" value={firstNameQuery} onKeyDown={useKeyPress} onChange={handleFirstNameChange}></InputBase>
          <InputBase placeholder="Prezime"  width="10rem" value={lastNameQuery} onKeyDown={useKeyPress} onChange={handleLastNameChange}></InputBase>
          <InfoSearchTypography>Stepen strucne spreme:</InfoSearchTypography>
          <Select
            width="10rem"
            labelId="label"
            id="label"
            value= {educationLevelQuery}
            placeholder="Stepen strucne spreme"
            label="Age"
            display="block"
            onChange={handleEducationLevelChange}
          >
            <MenuItem value={1}>I Stepen četiri razreda osnovne	</MenuItem>
            <MenuItem value={2}>II Stepen - osnovna škola	</MenuItem>
            <MenuItem value={3}>III Stepen - SSS srednja škola	</MenuItem>
            <MenuItem value={4}>IV Stepen - SSS srednja škola	</MenuItem>
            <MenuItem value={5}>V Stepen - VKV - SSS srednja škola	</MenuItem>
            <MenuItem value={6}>VI Stepen - VŠS viša škola	</MenuItem>
            <MenuItem value={7}>VII Fakultet</MenuItem>
            <MenuItem value={8}>VIII Doktorat</MenuItem>
          </Select>
          <InputBase placeholder="CV sadrzaj"  width="10rem" value={cvQuery} onKeyDown={useKeyPress} onChange={handleCVChange}></InputBase>
          <InputBase placeholder="Sadrzaj propratnog pisma"  width="10rem" value={coverQuery} onKeyDown={useKeyPress} onChange={handleCoverChange}></InputBase>
          <InputBase placeholder="Mesto"  width="10rem" value={locationQuery} onKeyDown={useKeyPress} onChange={handleCityChange}></InputBase>
          <Slider aria-label="Distance" valueLabelDisplay="on" marks defaultValue={0} min={0} max={500} onChange={handleSliderChange}/>
          <Button onClick={MakeRequest}>Pretraga</Button>
        </Stack>
      </Box>
    </Fragment>
  );
}

export default FullInfoSearchDisplay;
