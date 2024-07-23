import React, { forwardRef, } from 'react';
import {
    MenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useFormik } from "formik";
import * as yup from "yup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';



//Kimlik Tipi
const identityTypes = [
    { value: "1", label: "T.C. Kimlik Kartı" },
    { value: "2", label: "T.C. Eski Kimlik Kartı" },
    { value: "3", label: "Ehliyet" },
    { value: "4", label: "Pasaport" },
    { value: "5", label: "Diğer" },
];

//Hesap Tipi
const accountType = [
    { value: "1", label: "Ön Ödemeli Kart No" },
    { value: "2", label: "Ek Kart" },
    { value: "3", label: "Telefon Numarası" },
    { value: "4", label: "E-posta Adresi" },
    { value: "5", label: "Müşteri No" },
    { value: "6", label: "TCKN" },
    { value: "7", label: "e-para" },
    { value: "8", label: "Temsilci" },
    { value: "9", label: "Ödeme Hesabı" },
];

//Hesap Durumu
const accountStatus = [
    { value: "1", label: "Yeni Kayıt" },
    { value: "2", label: "Güncelleme" },
    { value: "3", label: "İptal" },
    { value: "4", label: "Kapanan" },
];

//Kart Durumu
const cardStatus = [
    { value: "1", label: "Yeni Kayıt" },
    { value: "2", label: "Güncelleme" },
    { value: "3", label: "İptal" },
    { value: "4", label: "Kapanan" },
];


const validationSchema = yup.object({
    RECORD_TYPE: yup.string(),
    L_REF: yup.string(),
    ISLEM_TURU: yup.string(),
    HSTK_VKN: yup.string(),
    HSTK_UNVAN: yup.string(),
    HSGK_AD: yup.string(),
    HSGK_SOYAD: yup.string(),
    HSGK_KIMLIK_TIPI: yup.string(),
    HSGK_KIMLIK_NO: yup.string(),
    HSGK_UYRUK: yup.string(),
    HSGK_ADRES: yup.string(),
    HSGK_ILCE_ADI: yup.string(),
    HSGK_POSTA_KOD: yup.string(),
    HSGK_IL_KOD: yup.string(),
    HSGK_IL_ADI: yup.string(),
    HS_TEL: yup.string(),
    HS_EPOSTA: yup.string(),
    HES_NO: yup.string(),
    DOVIZ_TIP: yup.string(),
    HSP_TIP: yup.string(),
    HSP_DURUM: yup.string(),
    HSP_ACLS_TAR: yup.string(),
    HSP_KPNS_TAR: yup.string(),
    HSP_BAKIYE: yup.string(),
    HSP_BAKIYE_TARIHI: yup.string(),
    HSP_KART_DURUM: yup.string(),
    HSP_KART_ACLS_TAR: yup.string(),
    HSP_KART_KPNS_TAR: yup.string(),
    HSP_KART_NO: yup.string(),
    KURUM_KOD: yup.string(),
    CREATED_DATE: yup.string(),
    UPDATED_DATE: yup.string(),
    GNDRM_TARIHI: yup.string(),
    IS_SEND: yup.string(),
});
const UpdateGibPageOne = forwardRef(
    ({ datas }) => {
        const formik = useFormik({
            initialValues: {
                RECORD_TYPE: datas?.RECORD_TYPE || "",
                L_REF: datas?.L_REF || "",
                ISLEM_TURU: datas?.ISLEM_TURU || "",
                HSTK_VKN: datas?.HSTK_VKN || "",
                HSTK_UNVAN: datas?.HSTK_UNVAN || "",
                HSGK_AD: datas?.HSGK_AD || "",
                HSGK_SOYAD: datas?.HSGK_SOYAD || "",
                HSGK_KIMLIK_TIPI: datas?.HSGK_KIMLIK_TIPI || "",
                HSGK_KIMLIK_NO: datas?.HSGK_KIMLIK_NO || "",
                HSGK_UYRUK: datas?.HSGK_UYRUK || "",
                HSGK_ADRES: datas?.HSGK_ADRES || "",
                HSGK_ILCE_ADI: datas?.HSGK_ILCE_ADI || "",
                HSGK_POSTA_KOD: datas?.HSGK_POSTA_KOD || "",
                HSGK_IL_KOD: datas?.HSGK_IL_KOD || "",
                HSGK_IL_ADI: datas?.HSGK_IL_ADI || "",
                HS_TEL: datas?.HS_TEL || "",
                HS_EPOSTA: datas?.HS_EPOSTA || "",
                HES_NO: datas?.HES_NO || "",
                DOVIZ_TIP: datas?.DOVIZ_TIP || "",
                HSP_TIP: datas?.HSP_TIP || "",
                HSP_DURUM: datas?.HSP_DURUM || "",
                HSP_ACLS_TAR: datas?.HSP_ACLS_TAR ? dayjs(datas.HSP_ACLS_TAR) : null,
                HSP_KPNS_TAR: datas?.HSP_KPNS_TAR ? dayjs(datas.HSP_KPNS_TAR) : null,
                HSP_BAKIYE: datas?.HSP_BAKIYE || "",
                HSP_BAKIYE_TARIHI: datas?.HSP_BAKIYE_TARIHI ? dayjs(datas.HSP_BAKIYE_TARIHI) : null,
                HSP_KART_DURUM: datas?.HSP_KART_DURUM || "",
                HSP_KART_ACLS_TAR: datas?.HSP_KART_ACLS_TAR ? dayjs(datas.HSP_KART_ACLS_TAR) : null,
                HSP_KART_KPNS_TAR: datas?.HSP_KART_KPNS_TAR ? dayjs(datas.HSP_KART_KPNS_TAR) : null,
                HSP_KART_NO: datas?.HSP_KART_NO || "",
                KURUM_KOD: datas?.KURUM_KOD || "",
                CREATED_DATE: datas?.CREATED_DATE ? dayjs(datas.CREATED_DATE) : null,
                UPDATED_DATE: datas?.UPDATED_DATE ? dayjs(datas.UPDATED_DATE) : null,
                GNDRM_TARIHI: datas?.GNDRM_TARIHI ? dayjs(datas.GNDRM_TARIHI) : null,
                IS_SEND: datas?.IS_SEND || "",
            },
            validationSchema,
            enableReinitialize: true,
        });
        return (
            <>
                <Stack spacing={3} >

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
                    <TextField
                        name="ISLEM_TURU"
                        label={<FormattedMessage id="ISLEM_TURU" />}
                        variant="filled"
                        fullWidth
                        value={formik.values.ISLEM_TURU}
                        onChange={formik.handleChange}
                    />

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
                                    name="HSTK_VKN"
                                    label={<FormattedMessage id="HSTK_VKN" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.HSTK_VKN}
                                    onChange={formik.handleChange}
                                />

                                <TextField
                                    name="HSTK_UNVAN"
                                    label={<FormattedMessage id="HSTK_UNVAN" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.HSTK_UNVAN}
                                    onChange={formik.handleChange}
                                />
                            </Stack>
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="HSGK_AD"
                                    label={<FormattedMessage id="HSGK_AD" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.HSGK_AD}
                                    onChange={formik.handleChange}
                                />

                                <TextField
                                    name="HSGK_SOYAD"
                                    label={<FormattedMessage id="HSGK_SOYAD" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.HSGK_SOYAD}
                                    onChange={formik.handleChange}
                                />
                            </Stack>
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                {/* <TextField
                                    name="HSGK_KIMLIK_TIPI"
                                    label={<FormattedMessage id="HSGK_KIMLIK_TIPI" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.HSGK_KIMLIK_TIPI}
                                    onChange={formik.handleChange}
                                /> */}

                                <TextField
                                    name="HSGK_KIMLIK_TIPI"
                                    label={<FormattedMessage id="HSGK_KIMLIK_TIPI" />}
                                    variant="filled"
                                    select
                                    fullWidth
                                    value={formik.values.HSGK_KIMLIK_TIPI}
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

                                <TextField
                                    name="HSGK_KIMLIK_NO"
                                    label={<FormattedMessage id="HSGK_KIMLIK_NO" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.HSGK_KIMLIK_NO}
                                    onChange={formik.handleChange}
                                />
                            </Stack>
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="HSGK_UYRUK"
                                    label={<FormattedMessage id="HSGK_UYRUK" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.HSGK_UYRUK}
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
                            <TextField
                                name="HSGK_ADRES"
                                label={<FormattedMessage id="HSGK_ADRES" />}
                                variant="filled"
                                fullWidth
                                value={formik.values.HSGK_ADRES}
                                onChange={formik.handleChange}
                            />

                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="HSGK_ILCE_ADI"
                                    label={<FormattedMessage id="HSGK_ILCE_ADI" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.HSGK_ILCE_ADI}
                                    onChange={formik.handleChange}
                                />

                                <TextField
                                    name="HSGK_POSTA_KOD"
                                    label={<FormattedMessage id="HSGK_POSTA_KOD" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.HSGK_POSTA_KOD}
                                    onChange={formik.handleChange}

                                />
                            </Stack>
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="HSGK_IL_KOD"
                                    label={<FormattedMessage id="HSGK_IL_KOD" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.HSGK_IL_KOD}
                                    onChange={formik.handleChange}
                                />

                                <TextField
                                    name="HSGK_IL_ADI"
                                    label={<FormattedMessage id="HSGK_IL_ADI" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.HSGK_IL_ADI}
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
                                name="HS_TEL"
                                label={<FormattedMessage id="HS_TEL" />}
                                variant="filled"
                                fullWidth
                                value={formik.values.HS_TEL}
                                onChange={formik.handleChange}
                            />

                            <TextField
                                name="HS_EPOSTA"
                                label={<FormattedMessage id="HS_EPOSTA" />}
                                variant="filled"
                                fullWidth
                                value={formik.values.HS_EPOSTA}
                                onChange={formik.handleChange}
                            />
                        </Stack>
                    </Stack>

                    {/* Hesap Bilgileri */}
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
                            <FormattedMessage id="accountInfo" />
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
                                {/* <TextField
                                    name="HSP_TIP"
                                    label={<FormattedMessage id="HSP_TIP" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.HSP_TIP}
                                    onChange={formik.handleChange}
                                /> */}
                                <TextField
                                    name="HSP_TIP"
                                    label={<FormattedMessage id="HSP_TIP" />}
                                    variant="filled"
                                    select
                                    fullWidth
                                    value={formik.values.HSP_TIP}
                                    onChange={formik.handleChange}
                                >
                                    {accountType.map((e) => (
                                        <MenuItem
                                            key={e.value}
                                            value={e.value}>
                                            {e.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                {/* <TextField
                                    name="HSP_DURUM"
                                    label={<FormattedMessage id="HSP_DURUM" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.HSP_DURUM}
                                    onChange={formik.handleChange}
                                /> */}
                                <TextField
                                    name="HSP_DURUM"
                                    label={<FormattedMessage id="HSP_DURUM" />}
                                    variant="filled"
                                    fullWidth
                                    select
                                    value={formik.values.HSP_DURUM}
                                    onChange={formik.handleChange}
                                >
                                    {accountStatus.map((e) => (
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
                                <DatePicker
                                    label={<FormattedMessage id="HSP_ACLS_TAR" />}
                                    mask="__.__.____"
                                    format="DD.MM.YYYY"
                                    value={formik.values.HSP_ACLS_TAR}
                                    // onChange={(newValue) => {
                                    //     formik.setFieldValue("HSP_ACLS_TAR", newValue)
                                    // }}
                                    // minDate={
                                    //     dayRange ? endDate?.subtract(dayRange, "d") : null
                                    // }
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            variant: "filled",
                                            //   error:
                                            //     formik.touched.HSP_ACLS_TAR &&
                                            //     Boolean(formik.errors.HSP_ACLS_TAR),
                                            //   helperText:
                                            //     formik.touched.HSP_ACLS_TAR &&
                                            //     formik.errors.HSP_ACLS_TAR,
                                        },
                                    }}
                                />

                                <DatePicker
                                    label={<FormattedMessage id="HSP_KPNS_TAR" />}
                                    mask="__.__.____"
                                    format="DD.MM.YYYY"
                                    variant="filled"
                                    value={formik.values.HSP_KPNS_TAR}
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
                                            //     formik.touched.HSP_KPNS_TAR &&
                                            //     Boolean(formik.errors.HSP_KPNS_TAR),
                                            //   helperText:
                                            //     formik.touched.HSP_KPNS_TAR &&
                                            //     formik.errors.HSP_KPNS_TAR,
                                        },
                                    }}
                                />
                            </Stack>
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="HSP_BAKIYE"
                                    label={<FormattedMessage id="HSP_BAKIYE" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.HSP_BAKIYE}
                                    onChange={formik.handleChange}
                                />

                                <DatePicker
                                    label={<FormattedMessage id="HSP_BAKIYE_TARIHI" />}
                                    mask="__.__.____"
                                    format="DD.MM.YYYY"
                                    variant="filled"
                                    value={formik.values.HSP_BAKIYE_TARIHI}
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
                                            //     formik.touched.HSP_BAKIYE_TARIHI &&
                                            //     Boolean(formik.errors.HSP_BAKIYE_TARIHI),
                                            //   helperText:
                                            //     formik.touched.HSP_BAKIYE_TARIHI &&
                                            //     formik.errors.HSP_BAKIYE_TARIHI,
                                        },
                                    }}
                                />
                            </Stack>
                        </Stack>
                    </Stack>

                    {/* Kart Bilgileri */}
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
                            <FormattedMessage id="cardInformations" />
                        </Typography>
                        <Stack spacing={3}>
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                {/* <TextField
                                    name="HSP_KART_DURUM"
                                    label={<FormattedMessage id="HSP_KART_DURUM" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.HSP_KART_DURUM}
                                    onChange={formik.handleChange}
                                /> */}
                                <TextField
                                    name="HSP_KART_DURUM"
                                    label={<FormattedMessage id="HSP_KART_DURUM" />}
                                    variant="filled"
                                    select
                                    fullWidth
                                    value={formik.values.HSP_KART_DURUM}
                                    onChange={formik.handleChange}
                                >
                                    {cardStatus.map((e) => (
                                        <MenuItem
                                            key={e.value}
                                            value={e.value}>
                                            {e.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    name="HSP_KART_NO"
                                    label={<FormattedMessage id="HSP_KART_NO" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.HSP_KART_NO}
                                    onChange={formik.handleChange}
                                />
                            </Stack>
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <DatePicker
                                    label={<FormattedMessage id="HSP_KART_ACLS_TAR" />}
                                    mask="__.__.____"
                                    format="DD.MM.YYYY"
                                    variant="filled"
                                    value={formik.values.HSP_KART_ACLS_TAR}
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
                                            //     formik.touched.HSP_KART_ACLS_TAR &&
                                            //     Boolean(formik.errors.HSP_KART_ACLS_TAR),
                                            //   helperText:
                                            //     formik.touched.HSP_KART_ACLS_TAR &&
                                            //     formik.errors.HSP_KART_ACLS_TAR,
                                        },
                                    }}
                                />

                                <DatePicker
                                    label={<FormattedMessage id="HSP_KART_KPNS_TAR" />}
                                    mask="__.__.____"
                                    format="DD.MM.YYYY"
                                    variant="filled"
                                    value={formik.values.HSP_KART_KPNS_TAR}
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
                                            //     formik.touched.HSP_KART_KPNS_TAR &&
                                            //     Boolean(formik.errors.HSP_KART_KPNS_TAR),
                                            //   helperText:
                                            //     formik.touched.HSP_KART_KPNS_TAR &&
                                            //     formik.errors.HSP_KART_KPNS_TAR,
                                        },
                                    }}
                                />
                            </Stack>
                        </Stack>
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

                        <DatePicker
                            label={<FormattedMessage id="CREATED_DATE" />}
                            mask="__.__.____"
                            format="DD.MM.YYYY"
                            variant="filled"
                            value={formik.values.CREATED_DATE}
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
                                    //     formik.touched.CREATED_DATE &&
                                    //     Boolean(formik.errors.CREATED_DATE),
                                    //   helperText:
                                    //     formik.touched.CREATED_DATE &&
                                    //     formik.errors.CREATED_DATE,
                                },
                            }}
                        />
                    </Stack>
                    <Stack
                        spacing={3}
                        direction={{ xs: "column", md: "row" }}
                    >
                        <DatePicker
                            label={<FormattedMessage id="UPDATED_DATE" />}
                            mask="__.__.____"
                            format="DD.MM.YYYY"
                            variant="filled"
                            value={formik.values.UPDATED_DATE}
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
                                    //     formik.touched.UPDATED_DATE &&
                                    //     Boolean(formik.errors.UPDATED_DATE),
                                    //   helperText:
                                    //     formik.touched.UPDATED_DATE &&
                                    //     formik.errors.UPDATED_DATE,
                                },
                            }}
                        />
                        <DatePicker
                            label={<FormattedMessage id="GNDRM_TARIHI" />}
                            mask="__.__.____"
                            format="DD.MM.YYYY"
                            variant="filled"
                            value={formik.values.GNDRM_TARIHI}
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
                                    //     formik.touched.GNDRM_TARIHI &&
                                    //     Boolean(formik.errors.GNDRM_TARIHI),
                                    //   helperText:
                                    //     formik.touched.GNDRM_TARIHI &&
                                    //     formik.errors.GNDRM_TARIHI,
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

                </Stack >
            </>
        )
    }
);

export default UpdateGibPageOne;