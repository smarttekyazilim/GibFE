import React, { forwardRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import * as yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "../../components/LanguageSwitcher";

import IntlTranslate from "../../helpers/IntlTranslate";
import withTitle from "../../helpers/hoc/withTitle";
import { fetchLogin, checkOTP } from "../../api/api";
import { useSnackbar } from "notistack";
import { useAuth } from "../../context/AuthContext";
import { FormHelperText, Slide } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SendIcon from "@mui/icons-material/Send";
import { GetFirstPagesPath } from "../../routes/SiteLinks";
import KeyIcon from "@mui/icons-material/Key";
import { encryptData } from "../../helpers/secureData";
import { getRedirectURIFromQueryString } from "../../helpers/HELPERS";
import InputMask from "react-input-mask";
const salt = process.env.REACT_APP_CRYPTO_SECRET;

//import { sha256 } from "crypto-hash";

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

function Login() {
  const { LOGIN } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

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
      var isredirecturi = getRedirectURIFromQueryString();
      if (isredirecturi.redirect) {
        navigate(isredirecturi.to);
      } else {
        let path = GetFirstPagesPath(
          loginResp.DATA.ROLE_PERMISSION.split("-")[0]
        );
        navigate(path);
      }
    } else {
      enqueueSnackbar(otpResponse.RESPONSECODEDESC, { variant: "error" });
      setLoginResp("");
      setOtpSendSuccess(false);
      setOtp("");
    }
  };
  const formik = useFormik({
    initialValues: {
      USERNAME: "",
      PASSWORD: "",
    },
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

  const containerRef = React.useRef(null);

  return (
    <>
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
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label={IntlTranslate("rememberMe")}
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
                  <Grid container alignItems="center">
                    <Grid item xs>
                      <Link
                        variant="body2"
                        color="secondary.main"
                        onClick={() => {
                          navigate("/forgot-password");
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <FormattedMessage id="forgotPassword" />
                      </Link>
                    </Grid>
                    <Grid item>
                      <LanguageSwitcher />
                    </Grid>
                  </Grid>
                </Form>
              </FormikProvider>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
export default withTitle(Login, "login");
const OTPMask = forwardRef((props, ref) => (
  <InputMask {...props} mask="999999" inputRef={ref} />
));
