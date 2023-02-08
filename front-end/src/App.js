import "./App.css";

import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Layout from "./components/Layout/Layout";
import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const queryClient = new QueryClient();

const MuiTheme = createTheme({
  typography: {
    allVariants: {
      color: "#616161",
    },
    button: {
      textTransform: "none",
      color: "white",
    },
  },
});

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={MuiTheme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Routes>
              <Route path="/" element={<Homepage />} />
            </Routes>
          </Layout>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
