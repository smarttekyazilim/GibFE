import React, { useEffect, useState } from "react";
import withTitle from "../../helpers/hoc/withTitle";
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password";
import { FormattedMessage } from "react-intl";
import { Form, FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { changePassword } from "../../api/api";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { decryptData } from "../../helpers/secureData";
import { useAuth } from "../../context/AuthContext";
const salt = process.env.REACT_APP_CRYPTO_SECRET;

const validationSchema = yup.object({
  CURRENT_PASSWORD: yup
    .string()
    .min(10, <FormattedMessage id="password.min" />)
    .matches(
      // eslint-disable-next-line
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Parola en az bir küçük harf, bir büyük harf, bir rakam ve bir sembol içermelidir"
    )
    .required(<FormattedMessage id="currentPassword.required" />),
  NEW_PASSWORD: yup
    .string()
    .min(10, <FormattedMessage id="password.min" />)
    .matches(
      // eslint-disable-next-line
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Parola en az bir küçük harf, bir büyük harf, bir rakam ve bir sembol içermelidir"
    )
    .required(<FormattedMessage id="newPassword.required" />),
  NEW_PASSWORD_AGAIN: yup
    .string()
    .oneOf(
      [yup.ref("NEW_PASSWORD")],
      <FormattedMessage id="newPasswordsNotMatch" />
    )
    .required(<FormattedMessage id="newPasswordAgain.required" />),
});

function ChangePassword() {
  //START - EĞER MÜŞTERİ KART İZLEME EKRANINDAN GELİNDİYSE USERI SETLE
  const [searchParams] = useSearchParams();
  const [userInfos, setUserInfos] = useState({
    USER_ID: "",
    TOKEN: "",
    RESPCODE: "",
  });
  useEffect(() => {
    if (searchParams.get("user")) {
      setUserInfos(
        decryptData(decodeURIComponent(searchParams.get("user")), salt)
      );
    }
  }, [searchParams]);
  //END - EĞER MÜŞTERİ KART İZLEME EKRANINDAN GELİNDİYSE USERI SETLE

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      CURRENT_PASSWORD: "",
      NEW_PASSWORD: "",
      NEW_PASSWORD_AGAIN: "",
    },
    validationSchema,
    onSubmit: async (datas) => {
      if (userInfos.USER_ID === "") {
        enqueueSnackbar(
          "Kullanıcı bilgilerini getirilirken bir hata oluştu. Daha sonra tekrar deneyin",
          {
            variant: "error",
          }
        );
        return;
      }
      setLoading(true);
      //const pass = await sha256(datas.PASSWORD);
      //999 - ŞİFRE HASHLENMİYOR!!!
      let source =
        userInfos.RESPCODE === "803"
          ? "userPasswordExpired"
          : userInfos.RESPCODE === "808"
          ? "userFirstLogin"
          : "userChangePassword";
      await changePassword({
        USER_ID: userInfos.USER_ID,
        OLD_PASSWORD: datas.CURRENT_PASSWORD,
        NEW_PASSWORD: datas.NEW_PASSWORD,
        CREATE_USER_ID: user?.USER_ID || userInfos.USER_ID,
        SOURCE: source,
        TOKEN: userInfos.TOKEN,
        //PASSWORD: pass
      })
        .then((loginResponse) => {
          if (loginResponse.STATUS === "success") {
            enqueueSnackbar(
              "Şifre başarıyla değiştirildi. Tekrar giriş yapınız.",
              { variant: "success" }
            );
            navigate("/login");
          } else {
            enqueueSnackbar(loginResponse.RESPONSECODEDESC, {
              variant: "error",
            });
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

  const [showPasswords, setShowPasswords] = useState({
    CURRENT_PASSWORD: false,
    NEW_PASSWORD: false,
    NEW_PASSWORD_AGAIN: false,
  });
  const handleShowPassword = (name) => {
    setShowPasswords((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
        <PasswordIcon />
      </Avatar>
      <Typography component="h1" variant="h5" align="center">
        <FormattedMessage id="changePassword" />
      </Typography>
      <Typography component="h2" variant="subtitle1" sx={{ my: 2 }}>
        <FormattedMessage id="password.typeError" />
      </Typography>
      <Box sx={{ alignSelf: "stretch", mt: 1 }}>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              autoComplete="current-password"
              type={showPasswords.CURRENT_PASSWORD ? "text" : "password"}
              label={<FormattedMessage id="currentPassword" />}
              {...getFieldProps("CURRENT_PASSWORD")}
              error={Boolean(
                touched.CURRENT_PASSWORD && errors.CURRENT_PASSWORD
              )}
              helperText={touched.CURRENT_PASSWORD && errors.CURRENT_PASSWORD}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleShowPassword("CURRENT_PASSWORD")}
                      edge="end"
                    >
                      {showPasswords.CURRENT_PASSWORD ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              autoComplete="new-password"
              type={showPasswords.NEW_PASSWORD ? "text" : "password"}
              label={<FormattedMessage id="newPassword" />}
              {...getFieldProps("NEW_PASSWORD")}
              error={Boolean(touched.NEW_PASSWORD && errors.NEW_PASSWORD)}
              helperText={touched.NEW_PASSWORD && errors.NEW_PASSWORD}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleShowPassword("NEW_PASSWORD")}
                      edge="end"
                    >
                      {showPasswords.NEW_PASSWORD ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              autoComplete="new-password-again"
              type={showPasswords.NEW_PASSWORD_AGAIN ? "text" : "password"}
              label={<FormattedMessage id="newPasswordAgain" />}
              {...getFieldProps("NEW_PASSWORD_AGAIN")}
              error={Boolean(
                touched.NEW_PASSWORD_AGAIN && errors.NEW_PASSWORD_AGAIN
              )}
              helperText={
                touched.NEW_PASSWORD_AGAIN && errors.NEW_PASSWORD_AGAIN
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleShowPassword("NEW_PASSWORD_AGAIN")}
                      edge="end"
                    >
                      {showPasswords.NEW_PASSWORD_AGAIN ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
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
              color="success"
              loading={loading}
              startIcon={<SaveIcon />}
            >
              <FormattedMessage id="save" />
            </LoadingButton>
          </Form>
        </FormikProvider>
      </Box>
    </Box>
  );
}

export default withTitle(ChangePassword, "changePassword");
