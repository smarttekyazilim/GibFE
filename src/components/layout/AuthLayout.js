import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <Grid container component="main" sx={{ height: "100vh" }}
        >
            <Grid
                item
                sm={12}
                md={5}
                component={Paper}
                elevation={6}
                square
                sx={{ display: "flex", flexDirection: "column", height: "inherit" }}
            >
                <Box
                    boxShadow={1}
                    sx={{
                        backgroundColor: "primary.main",
                        color: "#fff",
                        padding: ".25rem",
                        height: { xs: "56px", sm: "64px" },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Typography
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: { xs: 35, sm: 40 },
                            fontSize: "1.25rem"
                        }}
                    >
                        GİB
                    </Typography>
                </Box>
                <Box
                    sx={{
                        mb: 2,
                        mx: 4,
                        flexGrow: "1",
                    }}
                >
                    <Outlet />
                </Box>
            </Grid>
            <Grid
                item
                sm={false}
                sx={{
                    backgroundRepeat: "no-repeat",
                    backgroundColor: (t) => t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
        </Grid>
    )
};

export default AuthLayout;