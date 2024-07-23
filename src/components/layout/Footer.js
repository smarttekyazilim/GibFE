import { Box, Link, Typography } from "@mui/material";
import React from "react";
function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        px: 3,
        mt: "auto",
      }}
    >
      <Typography variant="body2" align="right">
        {"Copyright © "}
        <Link color="inherit" href="https://smarttekas.com.tr/">
          Smarttek AŞ
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}
export default React.memo(Footer);
