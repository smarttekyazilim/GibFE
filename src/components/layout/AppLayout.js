import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import HeaderMenu from "./HeaderMenu";
// import LogoIcon from "../../assets/logo-icon.svg";
export default function AppLayout() {
  return (
    <HeaderMenu>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          flexGrow: 1,
          // backgroundImage: `url(${LogoIcon})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto 70vh",
          backgroundPosition: "center",
          width: "calc(100% - 320px)",
        }}
      >
        <Box component="main" sx={{ px: 3, mt: 10, mb: 3 }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </HeaderMenu>
  );
}
