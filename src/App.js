import { LanguageProvider } from "./context/LanguageContext";
import SiteRoutes from "./routes/SiteRoutes";
import { SnackbarProvider } from "notistack";
import { useSnackbar } from "notistack";

import "./App.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "./context/AuthContext";
import { GlobalProvider } from "./context/GlobalContext";
import { useIdleTimer } from "react-idle-timer";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/tr";
import LoginBasic from "./pages/Auth/LoginBasic";
const PROJECT_TYPE = process.env.REACT_APP_PROJECT_TYPE;
const NOT_IN_ROUTES_FOR_AUTO_SIGNOUT = [
  "/login",
  "/change-password",
  "/removeSimBlock",
];
function App() {


  //kullanıcı 6 dakika boşta kaldığında otomatik logout yapılması
  const { IdleLogout } = useAuth();

  
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  
  const handleClose = (status = "Y") => {
    setOpen(false);
    if (status === "Y") {
      activate();
    } else {
      onIdle();
    }
  };



  const onIdle = () => {
    setOpen(false);
    if (
      !NOT_IN_ROUTES_FOR_AUTO_SIGNOUT.includes(window.location.pathname) &&
      PROJECT_TYPE !== "dev"
    ) {
      IdleLogout((username) => {
        setUserName(username);
        setLoginOpen(true);
      });
    }
  };
  const onPrompt = () => {
    if (
      !NOT_IN_ROUTES_FOR_AUTO_SIGNOUT.includes(window.location.pathname) &&
      PROJECT_TYPE !== "dev" &&
      !loginOpen
    ) {
      setOpen(true);
    }
  };
  const { activate } = useIdleTimer({
    onIdle,
    onPrompt,
    timeout: 1000 * 60 * 6, //6 dakika GELİŞTİRME ORTAMI İÇİN 1 SAAT YAPILDI
    promptBeforeIdle: 1000 * 10, //10 saniye
    throttle: 500,
  });
  //kullanıcı 6 dakika boşta kaldığında otomatik logout yapılması
  return (
    <LanguageProvider>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        action={(key) => <SnackbarCloseButton snackbarKey={key} />}
      >
        <GlobalProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
            <Dialog
              open={open}
              onClose={() => handleClose()}
              aria-describedby="idle-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="idle-dialog-description">
                  <FormattedMessage id="idleDesc" />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleClose()}
                >
                  <FormattedMessage id="yes" />
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleClose("N")}
                >
                  <FormattedMessage id="no" />
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog open={loginOpen}>
              <DialogContent>
                <LoginBasic
                  currentUserName={userName}
                  setLoginOpen={setLoginOpen}
                />
              </DialogContent>
            </Dialog>
            <SiteRoutes />
          </LocalizationProvider>
        </GlobalProvider> 
      </SnackbarProvider>
    </LanguageProvider>
  );
}

export default App;

const SnackbarCloseButton = ({ snackbarKey }) => {
  const { closeSnackbar } = useSnackbar();
  return (
    <IconButton
      size="small"
      color="inherit"
      onClick={() => closeSnackbar(snackbarKey)}
    >
      <CloseIcon />
    </IconButton>
  );
};
