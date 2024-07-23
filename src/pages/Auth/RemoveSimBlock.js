import React, { useEffect, useState } from "react";
import withTitle from "../../helpers/hoc/withTitle";
import { Avatar, Box, TextField, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  userSimBlockSendMail,
  userSimBlockVerifyOTPAndRemoveSimBlock,
} from "../../api/api";
import { LoadingButton } from "@mui/lab";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import SendIcon from "@mui/icons-material/Send";

const validationSchema = yup.object({
  USER_DATA: yup
    .string()
    .required(<FormattedMessage id="currentPassword.required" />),
});

function RemoveSimBlock() {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  //epostadaki linkten appref ile geliyorsa kontrolü
  const [searchParams] = useSearchParams();
  const [otpInserting, setOtpInserting] = useState(false);
  const [appref, setAppref] = useState("");
  useEffect(() => {
    if (searchParams.has("a")) {
      setOtpInserting(true);
      setAppref(searchParams.get("a"));
    }
  }, [searchParams]);

  const formik = useFormik({
    initialValues: {
      USER_DATA: "",
      OTP: "",
    },
    validationSchema,
    onSubmit: async (datas, { resetForm }) => {
      setLoading(true);
      if (otpInserting) {
        await userSimBlockVerifyOTPAndRemoveSimBlock({
          USER_DATA: datas.USER_DATA,
          OTP: datas.OTP,
          APPREF: appref,
        })
          .then((resp) => {
            if (resp.STATUS === "success") {
              enqueueSnackbar(
                "Sim blokeniz başarıyla kaldırıldı. Tekrar giriş yapınız.",
                { variant: "success" }
              );
              resetForm();
              navigate("/login");
            } else {
              enqueueSnackbar(resp.RESPONSECODEDESC, {
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
      } else {
        await userSimBlockSendMail({
          USER_DATA: datas.USER_DATA,
          PAGE_URL: window.location.origin,
        })
          .then((resp) => {
            if (resp.STATUS === "success") {
              enqueueSnackbar(
                "Doğrulama kodu e-postanıza başarıyla gönderildi. E-postanızı kontrol ediniz.",
                { variant: "success" }
              );
              resetForm();
              navigate("/login");
            } else {
              enqueueSnackbar(resp.RESPONSECODEDESC, {
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
      }
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
      <Avatar sx={{ m: 1, bgcolor: "info.main" }}>
        <RemoveCircleRoundedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" align="center">
        <FormattedMessage id="removeSimBlock" />
      </Typography>
      <Typography
        component="h2"
        variant="subtitle1"
        sx={{ my: 2, textAlign: "center" }}
      >
        <FormattedMessage
          id={`removeSimBlock.desc${otpInserting ? "2" : "1"}`}
        />
      </Typography>
      <Box sx={{ alignSelf: "stretch", mt: 1 }}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            margin="normal"
            label={<FormattedMessage id="usernameOrEmail" />}
            fullWidth
            variant="filled"
            {...formik.getFieldProps("USER_DATA")}
            error={
              formik.touched.usernameOrEmail &&
              Boolean(formik.errors.usernameOrEmail)
            }
            helperText={
              formik.touched.usernameOrEmail && formik.errors.usernameOrEmail
            }
          />
          {otpInserting && (
            <TextField
              margin="normal"
              fullWidth
              placeholder="******"
              variant="standard"
              {...formik.getFieldProps("OTP")}
              color="info"
              sx={{
                "& input": {
                  fontFamily: "monospace",
                  textAlign: "center",
                  fontSize: "2rem",
                  letterSpacing: "1rem",
                },
              }}
              onBeforeInput={(event) => {
                if (
                  event.target.value.length >= 6 ||
                  !/[0-9]/.test(event.data)
                ) {
                  event.preventDefault();
                }
              }}
            />
          )}
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="info"
            loading={loading}
            startIcon={
              otpInserting ? <RemoveCircleRoundedIcon /> : <SendIcon />
            }
          >
            <FormattedMessage id={otpInserting ? "removeSimBlock" : "send"} />
          </LoadingButton>
        </form>
      </Box>
    </Box>
  );
}

export default withTitle(RemoveSimBlock, "removeSimBlock");
