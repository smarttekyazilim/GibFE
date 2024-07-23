import React, { forwardRef, useRef, useState } from "react";
import * as yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InputMask from "react-input-mask";
import KeyIcon from "@mui/icons-material/Key";
import LoadingButton from "@mui/lab/LoadingButton";
import { Form, FormikProvider, useFormik } from "formik";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SendIcon from "@mui/icons-material/Send";
import { checkOTP, fetchLogin } from "../../api/api";
import { encryptData } from "../../helpers/secureData";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { useAuth } from "../../context/AuthContext";
import {
  Alert,
  Avatar,
  Box,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  Slide,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import IntlTranslate from "../../helpers/IntlTranslate";

const salt = process.env.REACT_APP_CRYPTO_SECRET;
const validationSchema = yup.object({
  USERNAME: yup
    .string()
    .required(<FormattedMessage id="username.login.required" />),
  PASSWORD: yup
    .string()
    .min(10, <FormattedMessage id="password.min" />)
    .matches(
      // eslint-disable-next-line
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Parola en az bir küçük harf, bir büyük harf, bir rakam ve bir sembol içermelidir"
    )
    .required(<FormattedMessage id="password.required" />),
});
function LoginBasic({ setLoginOpen, currentUserName }) {
  const { LOGIN } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  //login işlemi
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpSendSuccess, setOtpSendSuccess] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [loginResp, setLoginResp] = useState("");
  const otpOnSubmit = async (e) => {
    e.preventDefault();
    if (otp.toString().replace(/\D/g, "").length !== 6) {
      setOtpError(<FormattedMessage id="otpLength.error" />);
      return;
    }
    setOtpError("");
    const otpResponse = await checkOTP({
      OTP: otp,
      GSM_NO: loginResp.DATA.GSM_NO,
      APPREF: loginResp.APPREF,
      TOKEN: loginResp.TOKEN,
    });
    if (otpResponse.STATUS === "success") {
      LOGIN(loginResp);
      setLoginOpen(false);
    } else {
      enqueueSnackbar(otpResponse.RESPONSECODEDESC, { variant: "error" });
      setLoginResp("");
      setOtpSendSuccess(false);
      setOtp("");
    }
  };
  const formik = useFormik({
    initialValues: {
      USERNAME: currentUserName,
      PASSWORD: "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (datas) => {
      setLoading(true);
      //const pass = await sha256(datas.PASSWORD);
      //999 - ŞİFRE HASHLENMİYOR!!!
      await fetchLogin({
        USERNAME: datas.USERNAME,
        PASSWORD: datas.PASSWORD,
        //PASSWORD: pass
      })
        .then((loginResponse) => {
          if (loginResponse.STATUS === "success") {
            setLoginResp(loginResponse);
            setOtpSendSuccess(true);
          } else if (
            loginResponse.STATUS === "error" &&
            (loginResponse.RESPONSECODE === "803" ||
              loginResponse.RESPONSECODE === "808")
          ) {
            //şifresini değiştirmesi gerekir. 42 gün doldu.
            let temp = encryptData(
              {
                USER_ID: loginResponse.DATA.USER_ID,
                TOKEN: loginResponse.TOKEN,
                RESPCODE: loginResponse.RESPONSECODE,
              },
              salt
            );
            navigate(`/change-password?user=${encodeURIComponent(temp)}`);
          } else if (
            loginResponse.STATUS === "error" &&
            loginResponse.RESPONSECODE === "807"
          ) {
            navigate("/removeSimBlock");
          } else {
            enqueueSnackbar(
              loginResponse.RESPONSECODEDESC || loginResponse.MESSAGE,
              {
                variant: "error",
              }
            );
          }
        })
        .catch((err) => {
          enqueueSnackbar(err.message, {
            variant: "error",
          });
        })
        .finally(() => setLoading(false));
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const containerRef = useRef(null);

  //login işlemi
  return (
    <>
      <Snackbar
        open={true}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="info">
          <FormattedMessage id="idleLogout" />
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          height: "100%",
        }}
        ref={containerRef}
      >
        {otpSendSuccess ? (
          <Slide
            direction="left"
            in={otpSendSuccess}
            container={containerRef.current}
            mountOnEnter
            unmountOnExit
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#0288d1" }}>
                <KeyIcon />
              </Avatar>
              <Typography component="h1" variant="h5" align="center">
                <FormattedMessage id="enterOTP" />
              </Typography>
              <Box sx={{ mt: 1, width: "100%" }}>
                <form onSubmit={otpOnSubmit}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    variant="standard"
                    color="info"
                    placeholder="******"
                    sx={{
                      "& input": {
                        fontFamily: "monospace",
                        textAlign: "center",
                        fontSize: "2rem",
                        letterSpacing: "1rem",
                      },
                    }}
                    InputProps={{
                      inputComponent: OTPMask,
                    }}
                    error={Boolean(otpError)}
                  />
                  {otpError && (
                    <FormHelperText variant="standard" error>
                      {otpError}
                    </FormHelperText>
                  )}

                  <LoadingButton
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    color="info"
                    loading={loading}
                    endIcon={<SendIcon />}
                    type="submit"
                  >
                    <FormattedMessage id="send" />
                  </LoadingButton>
                </form>
              </Box>
            </Box>
          </Slide>
        ) : (
          <>
            <Avatar sx={{ m: 1, bgcolor: "#1a1a1a" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" align="center">
              <FormattedMessage id="login" />
            </Typography>
            <Box sx={{ alignSelf: "stretch", mt: 1 }}>
              <FormikProvider value={formik}>
                <Form onSubmit={handleSubmit}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="text"
                    label={IntlTranslate("username.login")}
                    {...getFieldProps("USERNAME")}
                    error={Boolean(touched.USERNAME && errors.USERNAME)}
                    helperText={touched.USERNAME && errors.USERNAME}
                    disabled
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    autoComplete="current-password"
                    type={showPassword ? "text" : "password"}
                    label={IntlTranslate("password")}
                    {...getFieldProps("PASSWORD")}
                    error={Boolean(touched.PASSWORD && errors.PASSWORD)}
                    helperText={touched.PASSWORD && errors.PASSWORD}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    color="secondary"
                    loading={loading}
                    endIcon={<ArrowForwardIcon />}
                  >
                    <FormattedMessage id="login" />
                  </LoadingButton>
                </Form>
              </FormikProvider>
              <Typography variant="body2" display="inline">
                <FormattedMessage id="loginBasicDesc" />
              </Typography>
              <Link
                variant="body2"
                color="secondary.main"
                onClick={() => {
                  setLoginOpen(false);
                  navigate("/login", { replace: true });
                }}
                style={{ cursor: "pointer" }}
              >
                <FormattedMessage id="login2" />
              </Link>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}

export default LoginBasic;
const OTPMask = forwardRef((props, ref) => (
  <InputMask {...props} mask="999999" inputRef={ref} />
));
