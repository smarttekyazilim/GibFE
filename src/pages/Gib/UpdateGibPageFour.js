import React, { forwardRef } from 'react';
import {
    MenuItem,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import * as yup from "yup";
import { useFormik } from "formik";
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

//Kimlik Tipi
const identityTypes = [
    { value: "1", label: "T.C. Kimlik Kartı" },
    { value: "2", label: "T.C. Eski Kimlik Kartı" },
    { value: "3", label: "Ehliyet" },
    { value: "4", label: "Pasaport" },
    { value: "5", label: "Diğer" },
];

//Banka Tipi
const bankType = [
    { value: "1", label: "Fiziki Pos" },
    { value: "2", label: "Sanal Pos" },
    { value: "3", label: "Fiziki/Sanal" },
    { value: "4", label: "Fiziki-Seyyar EFT-POS (Mobil POS)" },
    { value: "5", label: "Fiziki-Masaüstü EFT-POS (Desktop POS)" },
    { value: "6", label: "Fiziki-Self-servis EFT-POS (Unattended POS)" },
    { value: "7", label: "Soft Pos" },
    { value: "8", label: "ATM" },
];


const validationSchema = yup.object({
    RECORD_TYPE: yup.string(),
    L_REF: yup.string(),
    ISLEM_TURU: yup.string(),
    K_SAH_TK_VKN: yup.string(),
    K_SAH_TK_UNVAN: yup.string(),
    K_SAH_GK_AD: yup.string(),
    K_SAH_GK_SOYAD: yup.string(),
    K_SAH_GK_KIMLIK_TIPI: yup.string(),
    K_SAH_GK_KIMLIK_NO: yup.string(),
    K_SAH_KART_NO: yup.string(),
    BANK_TIP: yup.string(),
    BANK_EFT_KOD: yup.string(),
    BANK_ATM_KOD: yup.string(),
    IS_TAR: yup.string(),
    ISLEM_TUTAR: yup.string(),
    ASIL_TUTAR: yup.string(),
    PARA_BIRIM: yup.string(),
    BRUT_KOM_TUT: yup.string(),
    MUS_ACIKLAMA: yup.string(),
    KUR_ACIKLAMA: yup.string(),
    KURUM_KOD: yup.string(),
    GNDRM_TAR: yup.string(),
    IS_SEND: yup.string(),
    DELETED_FLAG: yup.string(),
    TRX_ID: yup.string(),
    CREATED_DATE: yup.string(),
    UPDATED_DATE: yup.string(),
});

const UpdateGibPageFour = forwardRef(
    ({ datas }) => {

        const formik = useFormik({
            initialValues: {
                RECORD_TYPE: datas?.RECORD_TYPE || "",
                L_REF: datas?.L_REF || "",
                ISLEM_TURU: datas?.ISLEM_TURU || "",
                K_SAH_TK_VKN: datas?.K_SAH_TK_VKN || "",
                K_SAH_TK_UNVAN: datas?.K_SAH_TK_UNVAN || "",
                K_SAH_GK_AD: datas?.K_SAH_GK_AD || "",
                K_SAH_GK_SOYAD: datas?.K_SAH_GK_SOYAD || "",
                K_SAH_GK_KIMLIK_TIPI: datas?.K_SAH_GK_KIMLIK_TIPI || "",
                K_SAH_GK_KIMLIK_NO: datas?.K_SAH_GK_KIMLIK_NO || "",
                K_SAH_KART_NO: datas?.K_SAH_KART_NO || "",
                BANK_TIP: datas?.BANK_TIP || "",
                BANK_EFT_KOD: datas?.BANK_EFT_KOD || "",
                BANK_ATM_KOD: datas?.BANK_ATM_KOD || "",
                IS_TAR: datas?.IS_TAR ? dayjs(datas.IS_TAR) : null,
                ISLEM_TUTAR: datas?.ISLEM_TUTAR || "",
                ASIL_TUTAR: datas?.ASIL_TUTAR || "",
                PARA_BIRIM: datas?.PARA_BIRIM || "",
                BRUT_KOM_TUT: datas?.BRUT_KOM_TUT || "",
                MUS_ACIKLAMA: datas?.MUS_ACIKLAMA || "",
                KUR_ACIKLAMA: datas?.KUR_ACIKLAMA || "",
                KURUM_KOD: datas?.KURUM_KOD || "",
                GNDRM_TAR: datas?.GNDRM_TAR ? dayjs(datas.GNDRM_TAR) : null,
                IS_SEND: datas?.IS_SEND || "",
                DELETED_FLAG: datas?.DELETED_FLAG || "",
                TRX_ID: datas?.TRX_ID || "",
                CREATED_DATE: datas?.CREATED_DATE ? dayjs(datas.CREATED_DATE) : null,
                UPDATED_DATE: datas?.UPDATED_DATE ? dayjs(datas.UPDATED_DATE) : null,
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
                    </Stack >
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

                    {/*Kart Sahibi Bilgileri */}
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
                            <FormattedMessage id="cardHolderInfo" />
                        </Typography>
                        <Stack spacing={3} >
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="K_SAH_TK_VKN"
                                    label={<FormattedMessage id="K_SAH_TK_VKN" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.K_SAH_TK_VKN}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="K_SAH_TK_UNVAN"
                                    label={<FormattedMessage id="K_SAH_TK_UNVAN" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.K_SAH_TK_UNVAN}
                                    onChange={formik.handleChange}
                                />
                            </Stack>
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="K_SAH_GK_AD"
                                    label={<FormattedMessage id="K_SAH_GK_AD" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.K_SAH_GK_AD}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="K_SAH_GK_SOYAD"
                                    label={<FormattedMessage id="K_SAH_GK_SOYAD" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.K_SAH_GK_SOYAD}
                                    onChange={formik.handleChange}
                                />
                            </Stack>
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                {/* <TextField
                                    name="K_SAH_GK_KIMLIK_TIPI"
                                    label={<FormattedMessage id="K_SAH_GK_KIMLIK_TIPI" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.K_SAH_GK_KIMLIK_TIPI}
                                    onChange={formik.handleChange}
                                /> */}
                                <TextField
                                    name="K_SAH_GK_KIMLIK_TIPI"
                                    label={<FormattedMessage id="K_SAH_GK_KIMLIK_TIPI" />}
                                    variant="filled"
                                    select
                                    fullWidth
                                    value={formik.values.K_SAH_GK_KIMLIK_TIPI}
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
                                    name="K_SAH_GK_KIMLIK_NO"
                                    label={<FormattedMessage id="K_SAH_GK_KIMLIK_NO" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.K_SAH_GK_KIMLIK_NO}
                                    onChange={formik.handleChange}
                                />
                            </Stack>
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="K_SAH_KART_NO"
                                    label={<FormattedMessage id="K_SAH_KART_NO" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.K_SAH_KART_NO}
                                    onChange={formik.handleChange}
                                />
                            </Stack>
                        </Stack>
                    </Stack>

                    {/*Banka Bilgileri */}
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
                            <FormattedMessage id="bankInfo" />
                        </Typography>
                        <Stack spacing={3}>
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                {/* <TextField
                                    name="BANK_TIP"
                                    label={<FormattedMessage id="BANK_TIP" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.BANK_TIP}
                                    onChange={formik.handleChange}
                                /> */}
                                <TextField
                                    name="BANK_TIP"
                                    label={<FormattedMessage id="BANK_TIP" />}
                                    variant="filled"
                                    select
                                    fullWidth
                                    value={formik.values.BANK_TIP}
                                    onChange={formik.handleChange}
                                >
                                    {bankType.map((e) => (
                                        <MenuItem
                                            key={e.value}
                                            value={e.value}>
                                            {e.label}
                                        </MenuItem>
                                    ))}
                                </TextField>


                                <TextField
                                    name="BANK_EFT_KOD"
                                    label={<FormattedMessage id="BANK_EFT_KOD" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.BANK_EFT_KOD}
                                    onChange={formik.handleChange}
                                />
                            </Stack>
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="BANK_ATM_KOD"
                                    label={<FormattedMessage id="BANK_ATM_KOD" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.BANK_ATM_KOD}
                                    onChange={formik.handleChange}
                                />
                            </Stack>
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
                                <TextField
                                    name="ISLEM_TUTAR"
                                    label={<FormattedMessage id="ISLEM_TUTAR" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.ISLEM_TUTAR}
                                    onChange={formik.handleChange}
                                />
                            </Stack>
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="ASIL_TUTAR"
                                    label={<FormattedMessage id="ASIL_TUTAR" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.ASIL_TUTAR}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="PARA_BIRIM"
                                    label={<FormattedMessage id="PARA_BIRIM" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.PARA_BIRIM}
                                    onChange={formik.handleChange}
                                />
                            </Stack>
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="BRUT_KOM_TUT"
                                    label={<FormattedMessage id="BRUT_KOM_TUT" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.BRUT_KOM_TUT}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="MUS_ACIKLAMA"
                                    label={<FormattedMessage id="MUS_ACIKLAMA" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.MUS_ACIKLAMA}
                                    onChange={formik.handleChange}
                                />
                            </Stack>
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="KUR_ACIKLAMA"
                                    label={<FormattedMessage id="KUR_ACIKLAMA" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.KUR_ACIKLAMA}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="KURUM_KOD"
                                    label={<FormattedMessage id="KURUM_KOD" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.KURUM_KOD}
                                    onChange={formik.handleChange}
                                />
                            </Stack>
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
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
                                <TextField
                                    name="IS_SEND"
                                    label={<FormattedMessage id="IS_SEND" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.IS_SEND}
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
                            </Stack>
                        </Stack>
                    </Stack>

                </Stack>
            </>
        )
    }
);

export default UpdateGibPageFour;