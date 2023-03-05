import React, { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputBase,
  InputLabel,
  Paper,
  Stack,
  styled,
  MenuItem,
  Select,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const candidateCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: "0.2rem 0.4rem",
  borderRadius: "10px",
}));

function getCVForId(id) {
  console.log(id);
  const url = `http://localhost:8086/search/getCvByID/${id}`;
  fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/pdf",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.blob();
      }
    })
    .catch((error) => {
      console.error(error);
    })
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cv.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
}

function getCoverForId(id) {
  console.log(id);
  const url = `http://localhost:8086/search/getCoverByID/${id}`;
  fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/pdf",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.blob();
      }
    })
    .catch((error) => {
      console.error(error);
    })
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cover_letter.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
}

function SearchSummaryPage({ props }) {
  const { state } = useLocation();
  console.log("Entered ", state.data);

  return (
    <Fragment>
      <Container sx={{ padding: "2rem 0rem" }}>
        {state.data.map((candidate) => (
          <Card
            sx={{
              position: "relative",
              borderRadius: "15px",
              margin: "1rem 0rem",
            }}
          >
            <Box
              padding="1rem"
              display="flex"
              flexDirection="row"
              flexWrap="nowrap"
              justifyContent="flex-start"
            >
              <Stack direction="row">
                <Box paddingX="1rem" width="20rem">
                  <Stack direction="column" spacing={1}>
                    <Typography variant="h5">
                      {candidate.first_name + " " + candidate.last_name}
                    </Typography>
                    <Stack direction="column">
                      <Typography
                        color="primary"
                        sx={{ paddingRight: "1rem", fontWeight: "bold" }}
                      >
                        {candidate.country +
                          ", " +
                          candidate.city +
                          ", " +
                          candidate.address}
                      </Typography>
                      <Typography variant="body2">
                        {"Oblast rada: " + candidate.field_of_work}
                      </Typography>
                      <Typography variant="body2">
                        {"Stepen strucne spreme: " + candidate.education_level}
                      </Typography>
                      <Typography>
                        <Link
                          to="javascript:void(0)"
                          onClick={() =>
                            (window.location = "mailto:" + candidate.email)
                          }
                        >
                          {candidate.email}
                        </Link>
                      </Typography>
                    </Stack>
                    <Typography variant="h6">{candidate.seniority}</Typography>
                  </Stack>
                </Box>
                <Box sx={{ margin: "0rem 4rem", width: "15rem"}}>
                  <Typography variant="h6">Opis:</Typography>
                  <Typography variant="body2">{candidate.highlight}</Typography>
                </Box>
                <Box sx={{ margin: "0rem 4rem", padding:"1rem 0rem"}} spacing={1}>
                  <Stack direction="column">
                    <Button
                      margin="2rem"
                      variant="contained"
                      sx={{width: "6rem", height: "6rem"}}
                      onClick={() => {
                        getCVForId(candidate.id);
                      }}
                    >
                      Pogledaj CV
                    </Button>
                  </Stack>
                </Box>
                <Box sx={{ margin: "0rem 1rem", padding:"1rem 0rem"}} spacing={1}>
                  <Stack direction="column">
                    <Button
                      margin="2rem"
                      variant="contained"
                      sx={{width: "6rem", height: "6rem"}}
                      onClick={() => {
                        getCoverForId(candidate.id);
                      }}
                    >
                      Pogledaj pismo preporuke
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Card>
        ))}
      </Container>
    </Fragment>
  );
}

export default SearchSummaryPage;
