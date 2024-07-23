import {
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { forwardRef, } from 'react';
import { FormattedMessage } from 'react-intl';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';
import { useFormik } from "formik";
import * as yup from "yup";


//Kimlik Tipi
const identityTypes = [
  { value: "1", label: "T.C. Kimlik Kartı" },
  { value: "2", label: "T.C. Eski Kimlik Kartı" },
  { value: "3", label: "Ehliyet" },
  { value: "4", label: "Pasaport" },
  { value: "5", label: "Diğer" },
];

//İşlem Kanalı
const transactionChannel = [
  { value: "1", label: "Şube" },
  { value: "2", label: "Temsilci" },
  { value: "3", label: "ATM/Kiosk" },
  { value: "4", label: "Diğer ÖHS" },
  { value: "5", label: "Mobil" },
  { value: "6", label: "Web Sitesi" },
];



const validationSchema = yup.object({
  RECORD_TYPE: yup.string(),
  L_REF: yup.string(),
  ISLEM_TURU: yup.string(),
  MUSTERI_MI: yup.string(),
  HESTK_VKN: yup.string(),

  HESTK_UNVAN: yup.string(),
  HESGK_AD: yup.string(),
  HESGK_SOYAD: yup.string(),
  HESGK_KIMLIK_TIPI: yup.string(),
  HESGK_KIMLIK_NO: yup.string(),

  HESGK_UYRUK: yup.string(),
  HESGK_ILCE_ADI: yup.string(),
  HESGK_POSTA_KOD: yup.string(),
  HESGK_IL_KOD: yup.string(),
  HESGK_IL_ADI: yup.string(),

  HES_TEL: yup.string(),
  HES_EPOSTA: yup.string(),
  HES_NO: yup.string(),
  DOVIZ_TIP: yup.string(),
  KISI_AD: yup.string(),

  KISI_SOYAD: yup.string(),
  KISI_KIMLIK_TIPI: yup.string(),
  KISI_KIMLIK_NO: yup.string(),
  IS_TAR: yup.string(),
  IS_KNL: yup.string(),

  ISLEM_TUTAR: yup.string(),
  ASIL_PARA_TUTAR: yup.string(),
  PARA_BIRIM: yup.string(),
  BRUT_KOM_TUT: yup.string(),
  KURUM_KOD: yup.string(),

  TRX_ID: yup.string(),
  DELETED_FLAG: yup.string(),
  GNDRM_TAR: yup.string(),
  IS_SEND: yup.string(),
});

const UpdategibPageTwo = forwardRef(
  ({ datas }) => {
    const formik = useFormik({
      initialValues: {
        RECORD_TYPE: datas?.RECORD_TYPE || "",
        L_REF: datas?.L_REF || "",
        ISLEM_TURU: datas?.ISLEM_TURU || "",
        MUSTERI_MI: datas?.MUSTERI_MI || "",
        HESTK_VKN: datas?.HESTK_VKN || "",
        HESTK_UNVAN: datas?.HESTK_UNVAN || "",
        HESGK_AD: datas?.HESGK_AD || "",
        HESGK_SOYAD: datas?.HESGK_SOYAD || "",
        HESGK_KIMLIK_TIPI: datas?.HESGK_KIMLIK_TIPI || "",
        HESGK_KIMLIK_NO: datas?.HESGK_KIMLIK_NO || "",
        HESGK_UYRUK: datas?.HESGK_UYRUK || "",
        HESGK_ILCE_ADI: datas?.HESGK_ILCE_ADI || "",
        HESGK_POSTA_KOD: datas?.HESGK_POSTA_KOD || "",
        HESGK_IL_KOD: datas?.HESGK_IL_KOD || "",
        HESGK_IL_ADI: datas?.HESGK_IL_ADI || "",
        HES_TEL: datas?.HES_TEL || "",
        HES_EPOSTA: datas?.HES_EPOSTA || "",
        HES_NO: datas?.HES_NO || "",
        DOVIZ_TIP: datas?.DOVIZ_TIP || "",
        KISI_AD: datas?.KISI_AD || "",
        KISI_SOYAD: datas?.KISI_SOYAD || "",
        KISI_KIMLIK_TIPI: datas?.KISI_KIMLIK_TIPI || "",
        KISI_KIMLIK_NO: datas?.KISI_KIMLIK_NO || "",
        IS_TAR: datas?.IS_TAR ? dayjs(datas.IS_TAR) : null,
        IS_KNL: datas?.IS_KNL || "",
        ISLEM_TUTAR: datas?.ISLEM_TUTAR || "",
        ASIL_PARA_TUTAR: datas?.ASIL_PARA_TUTAR || "",
        PARA_BIRIM: datas?.PARA_BIRIM || "",
        BRUT_KOM_TUT: datas?.BRUT_KOM_TUT || "",
        KURUM_KOD: datas?.KURUM_KOD || "",
        TRX_ID: datas?.TRX_ID || "",
        DELETED_FLAG: datas?.DELETED_FLAG || "",
        GNDRM_TAR: datas?.GNDRM_TAR ? dayjs(datas.GNDRM_TAR) : null,
        IS_SEND: datas?.IS_SEND || "",
      },
      validationSchema,
      enableReinitialize: true,
    });

    return (
      <>
        <Stack spacing={3}>

          <Stack
            spacing={3}
            direction={{ xs: "column", md: "row" }}
          >
            <TextField
              name="RECORD_TYPE"
              label={<FormattedMessage id="RECORD_TYPE" />}
              variant="filled"
              fullWidth
              value={formik.values.RECORD_TYPE}
              onChange={formik.handleChange}
            />
            <TextField
              name="L_REF"
              label={<FormattedMessage id="L_REF" />}
              variant="filled"
              fullWidth
              disabled
              value={formik.values.L_REF}
              onChange={formik.handleChange}
            />
          </Stack>

          <Stack
            spacing={3}
            direction={{ xs: "column", md: "row" }}
          >
            <TextField
              name="ISLEM_TURU"
              label={<FormattedMessage id="ISLEM_TURU" />}
              variant="filled"
              fullWidth
              value={formik.values.ISLEM_TURU}
              onChange={formik.handleChange}
            />
          </Stack>

          {/* Müşteri Bilgileri */}
          <Stack
            sx={{
              px: 3,
              pb: "18px",
              borderRadius: "4px",
              border: "2px solid rgba(0, 0, 0, 1)",
              transition:
                "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              color: "rgba(0, 0, 0, 0.87)",
            }}
            component="fieldset"
            spacing={0}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.5rem",
                letterSpacing: "1px",
                fontWeight: "bold",
              }}
              component="legend"
            >
              <FormattedMessage id="customerInformations" />
            </Typography>
            <Stack spacing={3}>
              <Stack
                spacing={3}
                direction={{ xs: "column", md: "row" }}
              >
                <TextField
                  name="MUSTERI_MI"
                  label={<FormattedMessage id="MUSTERI_MI" />}
                  variant="filled"
                  fullWidth
                  value={formik.values.MUSTERI_MI}
                  onChange={formik.handleChange}
                />
                <TextField
                  name="HESTK_VKN"
                  label={<FormattedMessage id="HESTK_VKN" />}
                  variant="filled"
                  fullWidth
                  value={formik.values.HESTK_VKN}
                  onChange={formik.handleChange}
                />
              </Stack>
              <Stack
                spacing={3}
                direction={{ xs: "column", md: "row" }}
              >
                <TextField
                  name="HESTK_UNVAN"
                  label={<FormattedMessage id="HESTK_UNVAN" />}
                  variant="filled"
                  fullWidth
                  value={formik.values.HESTK_UNVAN}
                  onChange={formik.handleChange}
                />
                <TextField
                  name="HESGK_AD"
                  label={<FormattedMessage id="HESGK_AD" />}
                  variant="filled"
                  fullWidth
                  value={formik.values.HESGK_AD}
                  onChange={formik.handleChange}
                />
              </Stack>
              <Stack
                spacing={3}
                direction={{ xs: "column", md: "row" }}
              >
                <TextField
                  name="HESGK_SOYAD"
                  label={<FormattedMessage id="HESGK_SOYAD" />}
                  variant="filled"
                  fullWidth
                  value={formik.values.HESGK_SOYAD}
                  onChange={formik.handleChange}
                />
                {/* <TextField
                  name="HESGK_KIMLIK_TIPI"
                  label={<FormattedMessage id="HESGK_KIMLIK_TIPI" />}
                  variant="filled"
                  fullWidth
                  value={formik.values.HESGK_KIMLIK_TIPI}
                  onChange={formik.handleChange}
                /> */}
                <TextField
                  name="HESGK_KIMLIK_TIPI"
                  label={<FormattedMessage id="HESGK_KIMLIK_TIPI" />}
                  variant="filled"
                  select
                  fullWidth
                  value={formik.values.HESGK_KIMLIK_TIPI}
                  onChange={formik.handleChange}
                >
                  {identityTypes.map((e) => (
                    <MenuItem
                      key={e.value}
                      value={e.value}>
                      {e.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack
                spacing={3}
                direction={{ xs: "column", md: "row" }}
              >
                <TextField
                  name="HESGK_KIMLIK_NO"
                  label={<FormattedMessage id="HESGK_KIMLIK_NO" />}
                  variant="filled"
                  fullWidth
                  value={formik.values.HESGK_KIMLIK_NO}
                  onChange={formik.handleChange}
                />
                <TextField
                  name="HESGK_UYRUK"
                  label={<FormattedMessage id="HESGK_UYRUK" />}
                  variant="filled"
                  fullWidth
                  value={formik.values.HESGK_UYRUK}
                  onChange={formik.handleChange}
                />
              </Stack>
            </Stack>
          </Stack>

          {/* Adres Bilgileri */}
          <Stack
            sx={{
              px: 3,
              pb: "18px",
              borderRadius: "4px",
              border: "2px solid rgba(0, 0, 0, 1)",
              transition:
                "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              color: "rgba(0, 0, 0, 0.87)",
            }}
            component="fieldset"
            spacing={0}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.5rem",
                letterSpacing: "1px",
                fontWeight: "bold",
              }}
              component="legend"
            >
              <FormattedMessage id="adressInfo" />
            </Typography>
            <Stack spacing={3}>
              <Stack
                spacing={3}
                direction={{ xs: "column", md: "row" }}
              >
                <TextField
                  name="HESGK_IL_KOD"
                  label={<FormattedMessage id="HESGK_IL_KOD" />}
                  variant="filled"
                  fullWidth
                  value={formik.values.HESGK_IL_KOD}
                  onChange={formik.handleChange}
                />
                <TextField
                  name="HESGK_IL_ADI"
                  label={<FormattedMessage id="HESGK_IL_ADI" />}
                  variant="filled"
                  fullWidth
                  value={formik.values.HESGK_IL_ADI}
                  onChange={formik.handleChange}
                />
              </Stack>
              <Stack
                spacing={3}
                direction={{ xs: "column", md: "row" }}
              >
                <TextField
                  name="HESGK_ILCE_ADI"
                  label={<FormattedMessage id="HESGK_ILCE_ADI" />}
                  variant="filled"
                  fullWidth
                  value={formik.values.HESGK_ILCE_ADI}
                  onChange={formik.handleChange}
                />
                <TextField
                  name="HESGK_POSTA_KOD"
                  label={<FormattedMessage id="HESGK_POSTA_KOD" />}
                  variant="filled"
                  fullWidth
                  value={formik.values.HESGK_POSTA_KOD}
                  onChange={formik.handleChange}
                />
              </Stack>

            </Stack>
          </Stack>

          {/* İletişim Bilgileri */}
          <Stack
            sx={{
              px: 3,
              pb: "18px",
              borderRadius: "4px",
              border: "2px solid rgba(0, 0, 0, 1)",
              transition:
                "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              color: "rgba(0, 0, 0, 0.87)",
            }}
            component="fieldset"
            spacing={0}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.5rem",
                letterSpacing: "1px",
                fontWeight: "bold",
              }}
              component="legend"
            >
              <FormattedMessage id="contactInfo" />
            </Typography>
            <Stack
              spacing={3}
              direction={{ xs: "column", md: "row" }}
            >
              <TextField
                name="HES_TEL"
                label={<FormattedMessage id="HES_TEL" />}
                variant="filled"
                fullWidth
                value={formik.values.HES_TEL}
                onChange={formik.handleChange}
              />
              <TextField
                name="HES_EPOSTA"
                label={<FormattedMessage id="HES_EPOSTA" />}
                variant="filled"
                fullWidth
                value={formik.values.HES_EPOSTA}
                onChange={formik.handleChange}
              />
            </Stack>
          </Stack>

          {/* İşlem Bilgileri */}
          <Stack
            sx={{
              px: 3,
              pb: "18px",
              borderRadius: "4px",
              border: "2px solid rgba(0, 0, 0, 1)",
              transition:
                "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              color: "rgba(0, 0, 0, 0.87)",
            }}
            component="fieldset"
            spacing={0}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.5rem",
                letterSpacing: "1px",
                fontWeight: "bold",
              }}
              component="legend"
            >
              <FormattedMessage id="transactionInfo" />
            </Typography>
            <Stack spacing={3}>
              <Stack
                spacing={3}
                direction={{ xs: "column", md: "row" }}
              >
                <TextField
                  name="HES_NO"
                  label={<FormattedMessage id="HES_NO" />}
                  variant="filled"
                  fullWidth
                  value={formik.values.HES_NO}
                  onChange={formik.handleChange}
                />

                <TextField
                  name="DOVIZ_TIP"
                  label={<FormattedMessage id="DOVIZ_TIP" />}
                  variant="filled"
                  fullWidth
                  value={formik.values.DOVIZ_TIP}
                  onChange={formik.handleChange}
                />
              </Stack>
              <Stack
                spacing={3}
                direction={{ xs: "column", md: "row" }}
              >
                <TextField
                  name="KISI_AD"
                  label={<FormattedMessage id="KISI_AD" />}
                  variant="filled"
                  fullWidth
                  value={formik.values.KISI_AD}
                  onChange={formik.handleChange}
                />

                <TextField
                  name="KISI_SOYAD"
                  label={<FormattedMessage id="KISI_SOYAD" />}
                  variant="filled"
                  fullWidth
                  value={formik.values.KISI_SOYAD}
                  onChange={formik.handleChange}
                />
              </Stack>

              <Stack
                spacing={3}
                direction={{ xs: "column", md: "row" }}
              >
                <TextField
                  name="KISI_KIMLIK_TIPI"
                  label={<FormattedMessage id="KISI_KIMLIK_TIPI" />}
                  variant="filled"
                  fullWidth
                  value={formik.values.KISI_KIMLIK_TIPI}
                  onChange={formik.handleChange}
                />

                <TextField
                  name="KISI_KIMLIK_NO"
                  label={<FormattedMessage id="KISI_KIMLIK_NO" />}
                  variant="filled"
                  fullWidth
                  value={formik.values.KISI_KIMLIK_NO}
                  onChange={formik.handleChange}
                />
              </Stack>

              <Stack
                spacing={3}
                direction={{ xs: "column", md: "row" }}
              >
                <DatePicker
                  label={<FormattedMessage id="IS_TAR" />}
                  mask="__.__.____"
                  format="DD.MM.YYYY"
                  variant="filled"
                  value={formik.values.IS_TAR}
                  // onChange={(newValue) => {
                  //     setStartDate(newValue);
                  // }}
                  // minDate={
                  //     dayRange ? endDate?.subtract(dayRange, "d") : null
                  // }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: "filled",
                      //   error:
                      //     formik.touched.IS_TAR &&
                      //     Boolean(formik.errors.IS_TAR),
                      //   helperText:
                      //     formik.touched.IS_TAR &&
                      //     formik.errors.IS_TAR,
                    },
                  }}
                />

                {/* <TextField
                  name="IS_KNL"
                  label={<FormattedMessage id="IS_KNL" />}
                  variant="filled"
                  fullWidth
                  value={formik.values.IS_KNL}
                  onChange={formik.handleChange}
                /> */}
                <TextField
                  name="IS_KNL"
                  label={<FormattedMessage id="IS_KNL" />}
                  variant="filled"
                  select
                  fullWidth
                  value={formik.values.IS_KNL}
                  onChange={formik.handleChange}
                >
                  {transactionChannel.map((e) => (
                    <MenuItem
                      key={e.value}
                      value={e.value}>
                      {e.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <Stack
                spacing={3}
                direction={{ xs: "column", md: "row" }}
              >
                <TextField
                  name="ISLEM_TUTAR"
                  label={<FormattedMessage id="ISLEM_TUTAR" />}
                  variant="filled"
                  fullWidth
                value={formik.values.ISLEM_TUTAR}
                onChange={formik.handleChange}
                />

                <TextField
                  name="ASIL_PARA_TUTAR"
                  label={<FormattedMessage id="ASIL_PARA_TUTAR" />}
                  variant="filled"
                  fullWidth
                value={formik.values.ASIL_PARA_TUTAR}
                onChange={formik.handleChange}
                />
              </Stack>

              <Stack
                spacing={3}
                direction={{ xs: "column", md: "row" }}
              >
                <TextField
                  name="PARA_BIRIM"
                  label={<FormattedMessage id="PARA_BIRIM" />}
                  variant="filled"
                  fullWidth
                value={formik.values.PARA_BIRIM}
                onChange={formik.handleChange}
                />

                <TextField
                  name="BRUT_KOM_TUT"
                  label={<FormattedMessage id="BRUT_KOM_TUT" />}
                  variant="filled"
                  fullWidth
                value={formik.values.BRUT_KOM_TUT}
                onChange={formik.handleChange}
                />
              </Stack>

              <Stack
                spacing={3}
                direction={{ xs: "column", md: "row" }}
              >
                <TextField
                  name="KURUM_KOD"
                  label={<FormattedMessage id="KURUM_KOD" />}
                  variant="filled"
                  fullWidth
                value={formik.values.KURUM_KOD}
                onChange={formik.handleChange}
                />

                <TextField
                  name="TRX_ID"
                  label={<FormattedMessage id="TRX_ID" />}
                  variant="filled"
                  fullWidth
                value={formik.values.TRX_ID}
                onChange={formik.handleChange}
                />
              </Stack>

              <Stack
                spacing={3}
                direction={{ xs: "column", md: "row" }}
              >
                <TextField
                  name="DELETED_FLAG"
                  label={<FormattedMessage id="DELETED_FLAG" />}
                  variant="filled"
                  fullWidth
                value={formik.values.DELETED_FLAG}
                onChange={formik.handleChange}
                />

                <DatePicker
                  label={<FormattedMessage id="GNDRM_TAR" />}
                  mask="__.__.____"
                  format="DD.MM.YYYY"
                  variant="filled"
                  value={formik.values.GNDRM_TAR}
                  // onChange={(newValue) => {
                  //     setStartDate(newValue);
                  // }}
                  // minDate={
                  //     dayRange ? endDate?.subtract(dayRange, "d") : null
                  // }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: "filled",
                      //   error:
                      //     formik.touched.GNDRM_TAR &&
                      //     Boolean(formik.errors.GNDRM_TAR),
                      //   helperText:
                      //     formik.touched.GNDRM_TAR &&
                      //     formik.errors.GNDRM_TAR,
                    },
                  }}
                />
              </Stack>

              <Stack
                spacing={3}
                direction={{ xs: "column", md: "row" }}
              >
                <TextField
                  name="IS_SEND"
                  label={<FormattedMessage id="IS_SEND" />}
                  variant="filled"
                  fullWidth
                  value={formik.values.IS_SEND}
                  onChange={formik.handleChange}
                />
              </Stack>

            </Stack>
          </Stack>
        </Stack>
      </>
    )
  }
);

export default UpdategibPageTwo;