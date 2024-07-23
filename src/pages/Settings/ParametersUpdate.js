import React, { forwardRef, useImperativeHandle } from "react";
import { FormattedMessage } from "react-intl";

import { useFormik } from "formik";
import * as yup from "yup";
import { MenuItem, Stack, TextField } from "@mui/material";
import { TimeField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
const validationSchema = yup.object({
  key: yup.string().required(<FormattedMessage id="params.key.required" />),
  value: yup.string().required(<FormattedMessage id="params.value.required" />),
  description: yup.string(),
  category: yup.string(),
});
const ParametersUpdate = forwardRef(({ datas, categories = [] }, ref) => {
  const formik = useFormik({
    initialValues: {
      key: datas?.KEY || "",
      value: datas?.VALUE || "",
      description: datas?.DESCRIPTION || "",
      category: datas?.CATEGORY || "",
    },
    validationSchema,
  });

  useImperativeHandle(ref, () => {
    return { datas: formik.values, errors: formik.errors };
  });
  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <TextField
          label={<FormattedMessage id="params.key" />}
          fullWidth
          variant="filled"
          {...formik.getFieldProps("key")}
          error={formik.touched.key && Boolean(formik.errors.key)}
          helperText={formik.touched.key && formik.errors.key}
          disabled
        />
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <TextField
          label={<FormattedMessage id="category" />}
          fullWidth
          variant="filled"
          select
          {...formik.getFieldProps("category")}
          error={formik.touched.category && Boolean(formik.errors.category)}
          helperText={formik.touched.category && formik.errors.category}
          disabled={formik.values.category === "PROTECTION_ACCOUNT"}
        >
          <MenuItem value="">
            <i>Yok</i>
          </MenuItem>
          {categories.map((e, i) => (
            <MenuItem key={i} value={e.id}>
              {e.id}
            </MenuItem>
          ))}
        </TextField>
        {formik.values.category === "PROTECTION_ACCOUNT" ? (
          <TimeField
            label={<FormattedMessage id="params.value" />}
            fullWidth
            variant="filled"
            value={dayjs(formik.values.value, "HH:mm")}
            onChange={(newVal) => formik.setFieldValue("value", newVal)}
            error={formik.touched.value && Boolean(formik.errors.value)}
            helperText={formik.touched.value && formik.errors.value}
            format="HH:mm"
          />
        ) : (
          <TextField
            label={<FormattedMessage id="params.value" />}
            fullWidth
            variant="filled"
            {...formik.getFieldProps("value")}
            error={formik.touched.value && Boolean(formik.errors.value)}
            helperText={formik.touched.value && formik.errors.value}
          />
        )}
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <TextField
          label={<FormattedMessage id="params.desc" />}
          fullWidth
          variant="filled"
          {...formik.getFieldProps("description")}
          multiline
          rows={2}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
      </Stack>
    </Stack>
  );
});

export default ParametersUpdate;
