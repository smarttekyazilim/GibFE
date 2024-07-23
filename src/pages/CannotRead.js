import { Box, Typography } from "@mui/material";
import React from "react";
import withTitle from "../helpers/hoc/withTitle";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
function CannotRead() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "calc(100vh - 37px)",
        px: 5,
      }}
    >
      <VisibilityOffIcon sx={{ fontSize: "48px" }} color="primary" />
      <h1>
        <FormattedMessage id="cannotRead" />
      </h1>
      <Box textAlign="center">
        <Typography
          component={Link}
          to="/roles/update-user-role"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            fontSize: "1.25rem",
            color: "primary.main",
            ":hover": { color: "secondary.main" },
          }}
        >
          <FormattedMessage id="updateUserRole" />
          <LaunchIcon />
        </Typography>{" "}
        <Typography
          sx={{
            fontSize: "1.25rem",
          }}
          variant="body"
        >
          <FormattedMessage id="cannotRead.description" />
        </Typography>
      </Box>
    </Box>
  );
}

export default withTitle(CannotRead, "cannotRead");
