import React, { useState } from "react";
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
import { useSnackbar } from "notistack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../api/api";

const validationSchema = yup.object({
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

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const APPREF = searchParams.get("reset");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      NEW_PASSWORD: "",
      NEW_PASSWORD_AGAIN: "",
    },
    validationSchema,
    onSubmit: async (datas) => {
      setLoading(true);
      await resetPassword({
        NEW_PASSWORD: datas.NEW_PASSWORD,
        APPREF,
      }).then((loginResponse) => {
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
      });
      setLoading(false);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  const [showPasswords, setShowPasswords] = useState({
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
    <>
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
          <FormattedMessage id="resetPassword" />
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
    </>
  );
};

export default withTitle(ResetPassword, "resetPassword");
