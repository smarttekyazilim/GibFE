import React, { forwardRef, useImperativeHandle } from "react";
import { FormattedMessage } from "react-intl";

import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InputMask from "react-input-mask";
import { USER_EMAIL_DOMAINS } from "../../helpers/HELPERS";

const validationSchema = yup.object({
  name: yup.string().required(<FormattedMessage id="name.required" />),
  surname: yup.string().required(<FormattedMessage id="surname.required" />),
  phone: yup.string().required(<FormattedMessage id="phone.required" />),
  email: yup.string().required(<FormattedMessage id="email.required" />),
  username: yup
    .string()
    .min(3, <FormattedMessage id="username.min" />)
    .required(<FormattedMessage id="username.required" />),
  userType: yup.string().required(<FormattedMessage id="userType.required" />),
  registrationNo: yup
    .string()
    .length(6, <FormattedMessage id="registrationNo.required" />)
    .required(<FormattedMessage id="registrationNo.required" />),
});

const UserUpdate = forwardRef(({ datas }, ref) => {
  const formik = useFormik({
    initialValues: {
      name: datas?.NAME || "",
      surname: datas?.SURNAME || "",
      phone: datas?.GSM_NO || "",
      email: datas?.EMAIL?.split("@")[0] || "",
      username: datas?.USER_NAME || "",
      userType: datas?.USER_TYPE || "",
      userReadonly: datas?.IS_READONLY_USER === "EVET" ? true : false || false,
      makerDesc: "",
      registrationNo: datas?.REGISTRATION_NO || "",
      emailDomain: USER_EMAIL_DOMAINS.includes(
        `@${datas?.EMAIL?.split("@")[1]}`
      )
        ? `@${datas?.EMAIL?.split("@")[1]}`
        : USER_EMAIL_DOMAINS[0],
    },
    validationSchema,
  });
  useImperativeHandle(ref, () => {
    return {
      datas: formik.values,
      errors: formik.errors,
    };
  });

  const emailHandleChange = (e) => {
    formik.setFieldValue("email", e.target.value);
    formik.setFieldValue("username", e.target.value);
  };
  return (
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
        <TextField
          label={<FormattedMessage id="username" />}
          fullWidth
          variant="filled"
          {...formik.getFieldProps("username")}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          disabled
        />
        <TextField
          label={<FormattedMessage id="registrationNo" />}
          fullWidth
          variant="filled"
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
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <FormControl sx={{ width: { xs: "100%", lg: "50%" } }}>
          <FormLabel id="user-type">
            <FormattedMessage id="userType" />
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="user-type"
            value={formik.values.userType}
            onChange={(event, data) => formik.setFieldValue("userType", data)}
          >
            <FormControlLabel value="maker" control={<Radio />} label="Maker" />
            <FormControlLabel
              value="checker"
              control={<Radio />}
              label="Checker"
            />
          </RadioGroup>
          {formik.touched.userType && formik.errors.userType && (
            <FormHelperText
              error={formik.touched.userType && Boolean(formik.errors.userType)}
            >
              {formik.errors.userType}
            </FormHelperText>
          )}
        </FormControl>
        <Stack
          sx={{ width: { xs: "100%", lg: "50%" } }}
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
        {...formik.getFieldProps("makerDesc")}
      />
    </Stack>
  );
});

export default UserUpdate;

const PhoneMask = forwardRef((props, ref) => (
  <InputMask {...props} mask="+\90(999) 999 9999" inputRef={ref} />
));
const SicilNoMask = forwardRef((props, ref) => (
  <InputMask {...props} mask="999999" inputRef={ref} maskChar={""} />
));
