import React, { forwardRef, useMemo, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import AppBreadcrumb from "../../components/layout/AppBreadcrumb";
import withTitle from "../../helpers/hoc/withTitle";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { COMakerSendRequest } from "../../api/api";
import { useSnackbar } from "notistack";

import SaveIcon from "@mui/icons-material/Save";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { GenerateRandomPassword } from "../../helpers/GenerateRandomPassword";
import { useAuth } from "../../context/AuthContext";
import InputMask from "react-input-mask";
import { USER_EMAIL_DOMAINS } from "../../helpers/HELPERS";
const validationSchema = yup.object({
  name: yup.string().required(<FormattedMessage id="name.required" />),
  surname: yup.string().required(<FormattedMessage id="surname.required" />),
  registrationNo: yup
    .string()
    .length(6, <FormattedMessage id="registrationNo.required" />)
    .required(<FormattedMessage id="registrationNo.required" />),
  phone: yup.string().required(<FormattedMessage id="phone.required" />),
  email: yup.string().required(<FormattedMessage id="email.required" />),
  username: yup
    .string()
    .min(3, <FormattedMessage id="username.min" />)
    .required(<FormattedMessage id="username.required" />),
  password: yup
    .string()
    .min(10, <FormattedMessage id="password.min" />)
    .matches(
      // eslint-disable-next-line
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Parola en az bir küçük harf, bir büyük harf, bir rakam ve bir sembol içermelidir"
    )
    .required(<FormattedMessage id="password.required" />),
  userType: yup.string().required(<FormattedMessage id="userType.required" />),
});

function UsersAdd() {
  const breadcrumb = useMemo(
    () => [
      {
        name: <FormattedMessage id="users" />,
        path: "/users",
      },
      { name: <FormattedMessage id="users.add" />, active: true },
    ],
    []
  );

  const { enqueueSnackbar } = useSnackbar();
  const { user, pageAddPermission } = useAuth();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      registrationNo: "",
      phone: "",
      email: "",
      username: "",
      password: "",
      userType: "",
      userReadonly: false,
      emailDomain: USER_EMAIL_DOMAINS[0],
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      //999 - ŞİFRE HASHLENMİYOR!!!
      await COMakerSendRequest({
        MAKER_USER_ID: user.USER_ID,
        PROCESS: "C",
        CATEGORY: "users.add",
        API_NAME: "bo_user/boCreateUser",
        REQUEST_DATA_UNIQUE_FIELD: values.username,
        MAKER_NOTE: descRef.current.value,
        REQUEST_DATA: JSON.stringify({
          USER_ID: "0",
          USERNAME: values.username,
          PASSWORD: values.password,
          NAME: values.name,
          SURNAME: values.surname,
          GSM_NO: values.phone.replace(/\D/g, ""),
          EMAIL: values.email + values.emailDomain,
          MODIFY_USER: user.USER_ID,
          USER_TYPE: values.userType,
          IS_READONLY_USER: values.userReadonly ? "1" : "0",
          REGISTRATION_NO: values.registrationNo,
        }),
        DISPLAY_DATA: JSON.stringify({
          USER_NAME: values.username,
          PASSWORD: values.password,
          NAME: values.name,
          SURNAME: values.surname,
          GSM_NO: values.phone,
          EMAIL: values.email + values.emailDomain,
          MODIFY_USER: user.USER_ID,
          USER_TYPE: values.userType,
          IS_READONLY_USER: values.userReadonly ? "1" : "0",
          REGISTRATION_NO: values.registrationNo,
        }),
      })
        .then((resp) => {
          if (resp.STATUS === "success") {
            enqueueSnackbar("Kullanıcı ekleme talebi başarıyla oluşturuldu.", {
              variant: "success",
            });
            resetForm();
            descRef.current.value = "";
          } else {
            enqueueSnackbar(resp.RESPONSECODEDESC, { variant: "error" });
          }
        })
        .finally(() => setLoading(false));
    },
  });

  //START - password section
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const RandomPassword = () => {
    formik.setFieldValue("password", GenerateRandomPassword());
  };
  //END - password section
  const descRef = useRef();

  const emailHandleChange = (e) => {
    formik.setFieldValue("email", e.target.value);
    formik.setFieldValue("username", e.target.value);
  };
  return (
    <>
      <AppBreadcrumb links={breadcrumb} />
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <TextField
              label={<FormattedMessage id="name" />}
              fullWidth
              variant="filled"
              {...formik.getFieldProps("name")}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              onBeforeInput={(event) => {
                if (!/^[a-zA-ZĞğİıÇçÖöÜüŞş\s]$/.test(event.data)) {
                  event.preventDefault();
                }
              }}
            />
            <TextField
              label={<FormattedMessage id="surname" />}
              fullWidth
              variant="filled"
              {...formik.getFieldProps("surname")}
              error={formik.touched.surname && Boolean(formik.errors.surname)}
              helperText={formik.touched.surname && formik.errors.surname}
              onBeforeInput={(event) => {
                if (!/^[a-zA-ZĞğİıÇçÖöÜüŞş\s]$/.test(event.data)) {
                  event.preventDefault();
                }
              }}
            />
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <TextField
              label={<FormattedMessage id="phone" />}
              fullWidth
              variant="filled"
              type="tel"
              {...formik.getFieldProps("phone")}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              InputProps={{
                inputComponent: PhoneMask,
              }}
            />
            <Box sx={{ width: "100%" }}>
              <TextField
                label={<FormattedMessage id="email" />}
                sx={{
                  width: { xs: "50%", lg: "60%", xl: "70%" },
                  "& .MuiFilledInput-root": {
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                }}
                variant="filled"
                name="email"
                value={formik.values.email}
                onChange={emailHandleChange}
                onBlur={formik.handleBlur}
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
                  "& .MuiFilledInput-root": {
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  },
                }}
                select
                variant="filled"
                {...formik.getFieldProps("emailDomain")}
              >
                {USER_EMAIL_DOMAINS.map((e, i) => (
                  <MenuItem key={i} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <Stack sx={{ width: { xs: "100%", lg: "50%" } }}>
              <TextField
                label={<FormattedMessage id="username" />}
                fullWidth
                variant="filled"
                {...formik.getFieldProps("username")}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
                disabled
              />
            </Stack>
            <FormGroup
              row
              sx={{
                width: { xs: "100%", lg: "50%" },
                justifyContent: "space-between",
              }}
            >
              <TextField
                label={<FormattedMessage id="password" />}
                sx={{ width: "70%" }}
                variant="filled"
                {...formik.getFieldProps("password")}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={
                  (formik.touched.password && formik.errors.password) || (
                    <FormattedMessage id="password.typeError" />
                  )
                }
                type={showPassword ? "text" : "password"}
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
              <Box sx={{ width: "30%", pl: 2 }}>
                <Button
                  variant="outlined"
                  color="info"
                  fullWidth
                  sx={{ height: "56px" }}
                  onClick={RandomPassword}
                  startIcon={<ShuffleIcon />}
                >
                  <FormattedMessage id="random" />
                </Button>
              </Box>
            </FormGroup>
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <TextField
              label={<FormattedMessage id="registrationNo" />}
              variant="filled"
              style={{ width: "34%" }}
              {...formik.getFieldProps("registrationNo")}
              error={
                formik.touched.registrationNo &&
                Boolean(formik.errors.registrationNo)
              }
              helperText={
                formik.touched.registrationNo && formik.errors.registrationNo
              }
              InputProps={{
                inputComponent: SicilNoMask,
              }}
            />
            <FormControl sx={{ width: { xs: "100%", lg: "33%" } }}>
              <FormLabel id="user-type">
                <FormattedMessage id="userType" />
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="user-type"
                value={formik.values.userType}
                onChange={(event, data) =>
                  formik.setFieldValue("userType", data)
                }
              >
                <FormControlLabel
                  value="maker"
                  control={<Radio />}
                  label="Maker"
                />
                <FormControlLabel
                  value="checker"
                  control={<Radio />}
                  label="Checker"
                />
              </RadioGroup>
              {formik.touched.userType && formik.errors.userType && (
                <FormHelperText
                  error={
                    formik.touched.userType && Boolean(formik.errors.userType)
                  }
                >
                  {formik.errors.userType}
                </FormHelperText>
              )}
            </FormControl>
            <Stack
              sx={{ width: { xs: "100%", lg: "33%" } }}
              direction="row"
              alignItems="center"
            >
              <Tooltip
                arrow
                title={<FormattedMessage id="readOnlyInfo" />}
                placement="right"
              >
                <HelpOutlineIcon color="info" sx={{ mr: 1 }} />
              </Tooltip>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.userReadonly}
                      id="userReadonly"
                      name="userReadonly"
                      onChange={formik.handleChange}
                    />
                  }
                  label={<FormattedMessage id="userReadOnly" />}
                />
              </FormGroup>
            </Stack>
          </Stack>
          <TextField
            label={<FormattedMessage id="makerNote" />}
            fullWidth
            multiline
            rows={2}
            inputRef={descRef}
          />
        </Stack>
        {pageAddPermission.status ? (
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 5 }}
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
          >
            <FormattedMessage id="save" />
          </LoadingButton>
        ) : (
          <Typography
            variant="h6"
            align="center"
            sx={{ mt: 2, color: "#808080" }}
          >
            <FormattedMessage id={pageAddPermission.message} />
          </Typography>
        )}
      </form>
    </>
  );
}

export default withTitle(UsersAdd, "users.add");

const PhoneMask = forwardRef((props, ref) => (
  <InputMask {...props} mask="+\90(999) 999 9999" inputRef={ref} />
));
const SicilNoMask = forwardRef((props, ref) => (
  <InputMask {...props} mask="999999" inputRef={ref} maskChar={""} />
));
