import React, { useState } from "react";
import withTitle from "../../helpers/hoc/withTitle";
import { Avatar, Box, MenuItem, TextField, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useFormik } from "formik";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api/api";
import { useSnackbar } from "notistack";
import { GetCurrentLanguage } from "../../context/LanguageContext";
import { USER_EMAIL_DOMAINS } from "../../helpers/HELPERS";

const validationSchema = yup.object({
  email: yup.string().required(<FormattedMessage id="email.required" />),
});

const ForgotPassword = () => {
  // Language
  const currentLang = GetCurrentLanguage();

  //const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      email: "",
      emailDomain: USER_EMAIL_DOMAINS[0],
    },
    validationSchema,
    onSubmit: async (datas, { resetForm }) => {
      setLoading(true);
      //api request...
      await forgotPassword({
        email: datas.email + datas.emailDomain,
        lang: currentLang.code,
      }).then((enteredMail) => {
        if (enteredMail.STATUS === "success") {
          enqueueSnackbar(
            "Mail adresinize şifre sıfırlama bağlantısı gönderilmiştir.",
            { variant: "success" }
          );
          resetForm();
        } else {
          enqueueSnackbar(enteredMail.RESPONSECODEDESC, {
            variant: "error",
          });
        }
      });
      setLoading(false);
    },
  });

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
      <Avatar sx={{ m: 1, bgcolor: "warning.main" }}>
        <MarkEmailReadIcon />
      </Avatar>
      <Typography component="h1" variant="h5" align="center">
        <FormattedMessage id="forgotPassword" />
      </Typography>
      <Box sx={{ alignSelf: "stretch", mt: 1 }}>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ width: "100%" }}>
            <TextField
              label={<FormattedMessage id="email" />}
              sx={{
                width: { xs: "50%", lg: "60%", xl: "70%" },
                "& fieldset": {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderRight: 0,
                },
              }}
              margin="normal"
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              onBeforeInput={(event) => {
                if (!/^[a-zA-Z0-9._%+-]$/.test(event.data)) {
                  event.preventDefault();
                }
              }}
            />
            <TextField
              sx={{
                width: { xs: "50%", lg: "40%", xl: "30%" },
                "& fieldset": {
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderLeft: 0,
                },
              }}
              margin="normal"
              select
              {...formik.getFieldProps("emailDomain")}
            >
              {USER_EMAIL_DOMAINS.map((e, i) => (
                <MenuItem key={i} value={e}>
                  {e}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="success"
            loading={loading}
            startIcon={<SaveIcon />}
          >
            <FormattedMessage id="resetPassword" />
          </LoadingButton>
          <Typography component="span" style={{ marginRight: "8px" }}>
            <FormattedMessage id="or" />
          </Typography>
          <Link
            variant="body2"
            color="secondary.main"
            onClick={() => {
              navigate("/login");
            }}
            style={{ cursor: "pointer" }}
          >
            <FormattedMessage id="login" />
          </Link>
        </form>
      </Box>
    </Box>
  );
};

export default withTitle(ForgotPassword, "forgotPassword");
