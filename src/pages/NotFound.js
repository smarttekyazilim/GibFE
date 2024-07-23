import { Box } from "@mui/material";
import React from "react";
import withTitle from "../helpers/hoc/withTitle";

function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "calc(100vh - 37px)",
      }}
    >
      <h1>404 Not Found</h1>
      <h2>¯\_(ツ)_/¯</h2>
    </Box>
  );
}

export default withTitle(NotFound, "404", false);
