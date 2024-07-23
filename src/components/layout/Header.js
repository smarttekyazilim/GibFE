import React, { useCallback, useState } from "react";
// import ZiraatPayLogoWhite from "../../assets/ziraatpay-logo-white.png";
// import ZiraatPayLogoRed from "../../assets/ziraatpay-logo-red.png";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { drawerWidth } from "./HeaderMenu";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Chip, ListItemIcon, Menu, MenuItem } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CreateIcon from "@mui/icons-material/Create";
import CheckIcon from "@mui/icons-material/Check";
import { CheckAllowedHomePage } from "../../helpers/HELPERS";
import CallIcon from "@mui/icons-material/Call";
import Button from "@mui/material/Button";

const ROLE_OBJ = {
  maker: {
    label: "Maker",
    icon: <CreateIcon color="inherit" />,
    bgcolor: "#e10514",
    textColor: "#fff",
    chipColor: "#1a1a1a",
    // logo: ZiraatPayLogoWhite,
  },
  checker: {
    label: "Checker",
    icon: <CheckIcon color="inherit" />,
    bgcolor: "#fff",
    textColor: "#1a1a1a",
    chipColor: "#e10514",
    // logo: ZiraatPayLogoRed,
  },
  null: {
    bgcolor: "#e10514",
    textColor: "#fff",
    // logo: ZiraatPayLogoWhite,
  },
};
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function Header({ open, handleDrawerOpen }) {
  const { LOGOUT } = useAuth();

  const { user, role, pages, mimCallCustomer } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const openProfileDropdown = Boolean(anchorEl);
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  //logout
  const navigate = useNavigate();
  const handleLogout = useCallback(() => {
    LOGOUT(() => navigate("/login"));
  }, [LOGOUT, navigate]);
  const handleProfile = useCallback(() => navigate("/profile"), [navigate]);
  return (
    <>
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: ROLE_OBJ[role]?.bgcolor,
          color: ROLE_OBJ[role]?.textColor,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: { xs: 1, sm: 5 },
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            noWrap
            component="a"
            href={CheckAllowedHomePage(pages)}
            height={{ xs: 35, sm: 40 }}
          >
            {/* <img
              src={ROLE_OBJ[role]?.logo}
              alt="Ziraat Pay Logo"
              style={{ height: "inherit" }}
            /> */}
          </Typography>
          {mimCallCustomer && (
            <Button
              onClick={() =>
                navigate(`/callCenter?customer=${mimCallCustomer.callStr}`)
              }
              size="small"
              variant="contained"
              startIcon={<CallIcon />}
              color="success"
              sx={{ ml: 1 }}
            >
              Aramaya Dön
            </Button>
          )}
          {user && (
            <Box
              sx={{
                marginLeft: "auto",
                fontSize: {
                  xs: "10px",
                  sm: "unset",
                  display: "flex",
                  alignItems: "center",
                },
              }}
            >
              {role && (
                <Chip
                  variant="outlined"
                  size="small"
                  sx={{
                    color: ROLE_OBJ[role]?.chipColor,
                    borderColor: ROLE_OBJ[role]?.chipColor,
                  }}
                  label={ROLE_OBJ[role]?.label}
                  icon={ROLE_OBJ[role]?.icon}
                />
              )}
              <Typography fontWeight="bold" variant="span" sx={{ ml: 1 }}>
                {user.NAME} {user.SURNAME}
              </Typography>
            </Box>
          )}

          <IconButton
            sx={{ marginLeft: user ? 1 : "auto" }}
            color="inherit"
            aria-label="settings"
            onClick={handleProfileClick}
            aria-controls={openProfileDropdown ? "settings-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openProfileDropdown ? "true" : undefined}
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        id="settings-menu"
        open={openProfileDropdown}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <FormattedMessage id="profile" />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <FormattedMessage id="logout" />
        </MenuItem>
      </Menu>
    </>
  );
}

export default React.memo(Header);
