import React, { forwardRef, } from 'react';
import {
    MenuItem,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { DatePicker } from '@mui/x-date-pickers';
import * as yup from "yup";
import dayjs from 'dayjs';
import { useFormik } from "formik";




//Kimlik Tipi
const identityTypes = [
    { value: "1", label: "T.C. Kimlik Kartı" },
    { value: "2", label: "T.C. Eski Kimlik Kartı" },
    { value: "3", label: "Ehliyet" },
    { value: "4", label: "Pasaport" },
    { value: "5", label: "Diğer" },
];


//İşlem Gönderilme Nedeni 
const transactionReason = [
    { value: "1", label: "Aidat" },
    { value: "2", label: "Konut Kirası" },
    { value: "3", label: "Eğitim" },
    { value: "4", label: "Kredi Kartı Borcu" },
    { value: "5", label: "Personel Ödemeleri" },
    { value: "6", label: "İşyeri Kirası" },
    { value: "7", label: "Diğer Kiralar" },
    { value: "8", label: "e-ticaret" },
    { value: "9", label: "Diğer" },
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
    GON_MUSTERI_MI: yup.string(),
    GON_OK_VKN: yup.string(),
    GON_OK_UNVAN: yup.string(),
    GON_TK_VKN: yup.string(),
    GON_TK_UNVAN: yup.string(),
    GON_GK_AD: yup.string(),
    GON_GK_SOYAD: yup.string(),
    GON_GK_KIMLIK_TIPI: yup.string(),
    GON_GK_KIMLIK_NO: yup.string(),
    GON_GK_UYRUK: yup.string(),
    GON_ADRES: yup.string(),
    GON_ILCE_ADI: yup.string(),
    GON_POSTA_KOD: yup.string(),
    GON_IL_KOD: yup.string(),
    GON_IL_ADI: yup.string(),
    GON_TEL: yup.string(),
    GON_EPOSTA: yup.string(),
    GON_OK_HES_NO: yup.string(),
    GON_OK_EPARA: yup.string(),
    GON_OK_KART_NO: yup.string(),
    GON_BANKA_AD: yup.string(),
    GON_BANKA_KOD: yup.string(),
    GON_SUBE_AD: yup.string(),
    GON_IBAN: yup.string(),
    GON_HES_NO: yup.string(),
    GON_KREDI_KART_NO: yup.string(),
    AL_MUSTERI_MI: yup.string(),
    AL_OK_VKN: yup.string(),
    AL_OK_UNVAN: yup.string(),
    AL_GK_AD: yup.string(),
    AL_GK_SOYAD: yup.string(),
    AL_GK_KIMLIK_NO: yup.string(),
    AL_GK_UYRUK: yup.string(),
    AL_ADRES: yup.string(),
    AL_ILCE_ADI: yup.string(),
    AL_POSTA_KOD: yup.string(),
    AL_IL_KOD: yup.string(),
    AL_IL_ADI: yup.string(),
    AL_TEL: yup.string(),
    AL_EPOSTA: yup.string(),
    AL_OK_HES_NO: yup.string(),
    AL_OK_EPARA: yup.string(),
    AL_OK_KART_NO: yup.string(),
    AL_BANKA_AD: yup.string(),
    AL_BANKA_KOD: yup.string(),
    AL_SUBE_AD: yup.string(),
    AL_IBAN: yup.string(),
    AL_HES_NO: yup.string(),
    AL_KREDI_KART_NO: yup.string(),
    AL_DEBIT_KART_NO: yup.string(),
    IS_TAR: yup.string(),
    IS_SAAT: yup.string(),
    ODENME_TAR: yup.string(),
    ISLEM_IP: yup.string(),
    ISLEM_TUTAR: yup.string(),
    ASIL_TUTAR: yup.string(),
    PARA_BIRIM: yup.string(),
    BRUT_KOM_TUT: yup.string(),
    IS_GON_NEDENI: yup.string(),
    ISLEM_KNL: yup.string(),
    SUBE_VKN: yup.string(),
    SUBE_UNVAN: yup.string(),
    SUBE_IL_ADI: yup.string(),
    KUR_ACIKLAMA: yup.string(),
    MUS_ACIKLAMA: yup.string(),
    KURUM_KOD: yup.string(),
    CREATED_DATE: yup.string(),
    UPDATED_DATE: yup.string(),
    DELETED_FLAG: yup.string(),
    GNDRM_TAR: yup.string(),
    IS_SEND: yup.string(),
    TRX_ID: yup.string(),
    GON_DEBIT_KART_NO: yup.string(),
});


const UpdateGibPageThree = forwardRef(
    ({ datas }) => {
        const formik = useFormik({
            initialValues: {
                RECORD_TYPE: datas?.RECORD_TYPE || "",
                L_REF: datas?.L_REF || "",
                ISLEM_TURU: datas?.ISLEM_TURU || "",
                GON_MUSTERI_MI: datas?.GON_MUSTERI_MI || "",
                GON_OK_VKN: datas?.GON_OK_VKN || "",
                GON_OK_UNVAN: datas?.GON_OK_UNVAN || "",
                GON_TK_VKN: datas?.GON_TK_VKN || "",
                GON_TK_UNVAN: datas?.GON_TK_UNVAN || "",
                GON_GK_AD: datas?.GON_GK_AD || "",
                GON_GK_SOYAD: datas?.GON_GK_SOYAD || "",

                GON_GK_KIMLIK_TIPI: datas?.GON_GK_KIMLIK_TIPI || "",
                GON_GK_KIMLIK_NO: datas?.GON_GK_KIMLIK_NO || "",
                GON_GK_UYRUK: datas?.GON_GK_UYRUK || "",
                GON_ADRES: datas?.GON_ADRES || "",
                GON_ILCE_ADI: datas?.GON_ILCE_ADI || "",
                GON_POSTA_KOD: datas?.GON_POSTA_KOD || "",
                GON_IL_KOD: datas?.GON_IL_KOD || "",
                GON_IL_ADI: datas?.GON_IL_ADI || "",
                GON_TEL: datas?.GON_TEL || "",
                GON_EPOSTA: datas?.GON_EPOSTA || "",

                GON_OK_HES_NO: datas?.GON_OK_HES_NO || "",
                GON_OK_EPARA: datas?.GON_OK_EPARA || "",
                GON_OK_KART_NO: datas?.GON_OK_KART_NO || "",
                GON_BANKA_AD: datas?.GON_BANKA_AD || "",
                GON_BANKA_KOD: datas?.GON_BANKA_KOD || "",
                GON_SUBE_AD: datas?.GON_SUBE_AD || "",
                GON_IBAN: datas?.GON_IBAN || "",
                GON_HES_NO: datas?.GON_HES_NO || "",
                GON_KREDI_KART_NO: datas?.GON_KREDI_KART_NO || "",
                AL_MUSTERI_MI: datas?.AL_MUSTERI_MI || "",

                AL_OK_VKN: datas?.AL_OK_VKN || "",
                AL_OK_UNVAN: datas?.AL_OK_UNVAN || "",
                AL_GK_AD: datas?.AL_GK_AD || "",
                AL_GK_SOYAD: datas?.AL_GK_SOYAD || "",
                AL_GK_KIMLIK_NO: datas?.AL_GK_KIMLIK_NO || "",
                AL_GK_UYRUK: datas?.AL_GK_UYRUK || "",
                AL_ADRES: datas?.AL_ADRES || "",
                AL_ILCE_ADI: datas?.AL_ILCE_ADI || "",
                AL_POSTA_KOD: datas?.AL_POSTA_KOD || "",

                AL_IL_KOD: datas?.AL_IL_KOD || "",
                AL_IL_ADI: datas?.AL_IL_ADI || "",
                AL_TEL: datas?.AL_TEL || "",
                AL_EPOSTA: datas?.AL_EPOSTA || "",
                AL_OK_HES_NO: datas?.AL_OK_HES_NO || "",
                AL_OK_EPARA: datas?.AL_OK_EPARA || "",
                AL_OK_KART_NO: datas?.AL_OK_KART_NO || "",
                AL_BANKA_AD: datas?.AL_BANKA_AD || "",
                AL_BANKA_KOD: datas?.AL_BANKA_KOD || "",
                AL_SUBE_AD: datas?.AL_SUBE_AD || "",

                AL_IBAN: datas?.AL_IBAN || "",
                AL_HES_NO: datas?.AL_HES_NO || "",
                AL_KREDI_KART_NO: datas?.AL_KREDI_KART_NO || "",
                AL_DEBIT_KART_NO: datas?.AL_DEBIT_KART_NO || "",
                IS_TAR: datas?.IS_TAR ? dayjs(datas.IS_TAR) : null,
                IS_SAAT: datas?.IS_SAAT || "",
                ODENME_TAR: datas?.ODENME_TAR ? dayjs(datas.ODENME_TAR) : null,
                ISLEM_IP: datas?.ISLEM_IP || "",
                ISLEM_TUTAR: datas?.ISLEM_TUTAR || "",
                ASIL_TUTAR: datas?.ASIL_TUTAR || "",

                PARA_BIRIM: datas?.PARA_BIRIM || "",
                BRUT_KOM_TUT: datas?.BRUT_KOM_TUT || "",
                IS_GON_NEDENI: datas?.IS_GON_NEDENI || "",
                ISLEM_KNL: datas?.ISLEM_KNL || "",
                SUBE_VKN: datas?.SUBE_VKN || "",
                SUBE_UNVAN: datas?.SUBE_UNVAN || "",
                SUBE_IL_ADI: datas?.SUBE_IL_ADI || "",
                KUR_ACIKLAMA: datas?.KUR_ACIKLAMA || "",
                MUS_ACIKLAMA: datas?.MUS_ACIKLAMA || "",
                KURUM_KOD: datas?.KURUM_KOD || "",

                CREATED_DATE: datas?.CREATED_DATE ? dayjs(datas.CREATED_DATE) : null,
                UPDATED_DATE: datas?.UPDATED_DATE ? dayjs(datas.UPDATED_DATE) : null,
                DELETED_FLAG: datas?.DELETED_FLAG || "",
                GNDRM_TAR: datas?.GNDRM_TAR ? dayjs(datas.GNDRM_TAR) : null,
                IS_SEND: datas?.IS_SEND || "",
                TRX_ID: datas?.TRX_ID || "",
                GON_DEBIT_KART_NO: datas?.GON_DEBIT_KART_NO || "",
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

                    </Stack >

                    {/*Gönderen Bilgileri */}
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
                            <FormattedMessage id="senderInfo" />
                        </Typography>
                        <Stack spacing={3}>
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="GON_MUSTERI_MI"
                                    label={<FormattedMessage id="GON_MUSTERI_MI" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.GON_MUSTERI_MI}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="GON_OK_VKN"
                                    label={<FormattedMessage id="GON_OK_VKN" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.GON_OK_VKN}
                                    onChange={formik.handleChange}
                                />
                            </Stack >
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="GON_OK_UNVAN"
                                    label={<FormattedMessage id="GON_OK_UNVAN" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.GON_OK_UNVAN}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="GON_TK_VKN"
                                    label={<FormattedMessage id="GON_TK_VKN" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.GON_TK_VKN}
                                    onChange={formik.handleChange}
                                />
                            </Stack >
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="GON_TK_UNVAN"
                                    label={<FormattedMessage id="GON_TK_UNVAN" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.GON_TK_UNVAN}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="GON_GK_AD"
                                    label={<FormattedMessage id="GON_GK_AD" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.GON_GK_AD}
                                    onChange={formik.handleChange}
                                />
                            </Stack >
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="GON_GK_SOYAD"
                                    label={<FormattedMessage id="GON_GK_SOYAD" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.GON_GK_SOYAD}
                                    onChange={formik.handleChange}
                                />
                                {/* <TextField
                                    name="GON_GK_KIMLIK_TIPI"
                                    label={<FormattedMessage id="GON_GK_KIMLIK_TIPI" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.GON_GK_KIMLIK_TIPI}
                                    onChange={formik.handleChange}
                                /> */}
                                <TextField
                                    name="GON_GK_KIMLIK_TIPI"
                                    label={<FormattedMessage id="GON_GK_KIMLIK_TIPI" />}
                                    variant="filled"
                                    select
                                    fullWidth
                                    value={formik.values.GON_GK_KIMLIK_TIPI}
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
                            </Stack >
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="GON_GK_KIMLIK_NO"
                                    label={<FormattedMessage id="GON_GK_KIMLIK_NO" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.GON_GK_KIMLIK_NO}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="GON_GK_UYRUK"
                                    label={<FormattedMessage id="GON_GK_UYRUK" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.GON_GK_UYRUK}
                                    onChange={formik.handleChange}
                                />
                            </Stack >
                        </Stack>
                    </Stack>

                    {/*Gönderen Adres Bilgileri */}
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
                            <FormattedMessage id="senderAdressInfo" />
                        </Typography>
                        <Stack spacing={3}>
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="GON_ADRES"
                                    label={<FormattedMessage id="GON_ADRES" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.GON_ADRES}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="GON_ILCE_ADI"
                                    label={<FormattedMessage id="GON_ILCE_ADI" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.GON_ILCE_ADI}
                                    onChange={formik.handleChange}
                                />
                            </Stack>
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="GON_POSTA_KOD"
                                    label={<FormattedMessage id="GON_POSTA_KOD" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.GON_POSTA_KOD}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="GON_IL_KOD"
                                    label={<FormattedMessage id="GON_IL_KOD" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.GON_IL_KOD}
                                    onChange={formik.handleChange}
                                />
                            </Stack >
                            <TextField
                                name="GON_IL_ADI"
                                label={<FormattedMessage id="GON_IL_ADI" />}
                                variant="filled"
                                fullWidth
                                value={formik.values.GON_IL_ADI}
                                onChange={formik.handleChange}
                            />
                        </Stack>
                    </Stack>

                    {/*Gönderen İletişim Bilgileri */}
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
                            <FormattedMessage id="senderContactInfo" />
                        </Typography>
                        <Stack
                            spacing={3}
                            direction={{ xs: "column", md: "row" }}
                        >
                            <TextField
                                name="GON_TEL"
                                label={<FormattedMessage id="GON_TEL" />}
                                variant="filled"
                                fullWidth
                                value={formik.values.GON_TEL}
                                onChange={formik.handleChange}
                            />
                            <TextField
                                name="GON_EPOSTA"
                                label={<FormattedMessage id="GON_EPOSTA" />}
                                variant="filled"
                                fullWidth
                                value={formik.values.GON_EPOSTA}
                                onChange={formik.handleChange}
                            />
                        </Stack >
                    </Stack>

                    {/*Gönderen Finansal Bilgileri */}
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
                            <FormattedMessage id="senderFinancialInfo" />
                        </Typography>
                        <Stack spacing={3}>

                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="GON_OK_HES_NO"
                                    label={<FormattedMessage id="GON_OK_HES_NO" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.GON_OK_HES_NO}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="GON_OK_EPARA"
                                    label={<FormattedMessage id="GON_OK_EPARA" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.GON_OK_EPARA}
                                    onChange={formik.handleChange}
                                />
                            </Stack >
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="GON_OK_KART_NO"
                                    label={<FormattedMessage id="GON_OK_KART_NO" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.GON_OK_KART_NO}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="GON_BANKA_AD"
                                    label={<FormattedMessage id="GON_BANKA_AD" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.GON_BANKA_AD}
                                    onChange={formik.handleChange}
                                />
                            </Stack >
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="GON_BANKA_KOD"
                                    label={<FormattedMessage id="GON_BANKA_KOD" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.GON_BANKA_KOD}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="GON_SUBE_AD"
                                    label={<FormattedMessage id="GON_SUBE_AD" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.GON_SUBE_AD}
                                    onChange={formik.handleChange}
                                />
                            </Stack >
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="GON_IBAN"
                                    label={<FormattedMessage id="GON_IBAN" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.GON_IBAN}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="GON_HES_NO"
                                    label={<FormattedMessage id="GON_HES_NO" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.GON_HES_NO}
                                    onChange={formik.handleChange}
                                />
                            </Stack >
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="GON_KREDI_KART_NO"
                                    label={<FormattedMessage id="GON_KREDI_KART_NO" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.GON_KREDI_KART_NO}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="GON_DEBIT_KART_NO"
                                    label={<FormattedMessage id="GON_DEBIT_KART_NO" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.GON_DEBIT_KART_NO}
                                    onChange={formik.handleChange}
                                />
                            </Stack >

                        </Stack>
                    </Stack>

                    {/*Alıcı  Bilgileri */}
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
                            <FormattedMessage id="receiverInfo" />
                        </Typography>
                        <Stack spacing={3}>
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="AL_MUSTERI_MI"
                                    label={<FormattedMessage id="AL_MUSTERI_MI" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.AL_MUSTERI_MI}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="AL_OK_VKN"
                                    label={<FormattedMessage id="AL_OK_VKN" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.AL_OK_VKN}
                                    onChange={formik.handleChange}
                                />
                            </Stack >
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="AL_GK_AD"
                                    label={<FormattedMessage id="AL_GK_AD" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.AL_GK_AD}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="AL_OK_UNVAN"
                                    label={<FormattedMessage id="AL_OK_UNVAN" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.AL_OK_UNVAN}
                                    onChange={formik.handleChange}
                                />
                            </Stack >
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="AL_GK_SOYAD"
                                    label={<FormattedMessage id="AL_GK_SOYAD" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.AL_GK_SOYAD}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="AL_GK_KIMLIK_NO"
                                    label={<FormattedMessage id="AL_GK_KIMLIK_NO" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.AL_GK_KIMLIK_NO}
                                    onChange={formik.handleChange}
                                />
                            </Stack >
                            <TextField
                                name="AL_GK_UYRUK"
                                label={<FormattedMessage id="AL_GK_UYRUK" />}
                                variant="filled"
                                fullWidth
                                value={formik.values.AL_GK_UYRUK}
                                onChange={formik.handleChange}
                            />
                        </Stack>
                    </Stack>

                    {/*Alıcı Adres Bilgileri */}
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
                            <FormattedMessage id="receiverAdressInfo" />
                        </Typography>
                        <Stack spacing={3}>
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="AL_ADRES"
                                    label={<FormattedMessage id="AL_ADRES" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.AL_ADRES}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="AL_ILCE_ADI"
                                    label={<FormattedMessage id="AL_ILCE_ADI" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.AL_ILCE_ADI}
                                    onChange={formik.handleChange}
                                />
                            </Stack >
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="AL_POSTA_KOD"
                                    label={<FormattedMessage id="AL_POSTA_KOD" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.AL_POSTA_KOD}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="AL_IL_KOD"
                                    label={<FormattedMessage id="AL_IL_KOD" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.AL_IL_KOD}
                                    onChange={formik.handleChange}
                                />
                            </Stack >
                            <TextField
                                name="AL_IL_ADI"
                                label={<FormattedMessage id="AL_IL_ADI" />}
                                variant="filled"
                                fullWidth
                                value={formik.values.AL_IL_ADI}
                                onChange={formik.handleChange}
                            />
                        </Stack>
                    </Stack>

                    {/*Alıcı İletişim Bilgileri */}
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
                            <FormattedMessage id="receiverContactInfo" />
                        </Typography>
                        <Stack
                            spacing={3}
                            direction={{ xs: "column", md: "row" }}
                        >
                            <TextField
                                name="AL_TEL"
                                label={<FormattedMessage id="AL_TEL" />}
                                variant="filled"
                                fullWidth
                                value={formik.values.AL_TEL}
                                onChange={formik.handleChange}
                            />
                            <TextField
                                name="AL_EPOSTA"
                                label={<FormattedMessage id="AL_EPOSTA" />}
                                variant="filled"
                                fullWidth
                                value={formik.values.AL_EPOSTA}
                                onChange={formik.handleChange}
                            />
                        </Stack >
                    </Stack>

                    {/*Alıcı Finansal Bilgileri */}
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
                            <FormattedMessage id="receiverFinancialInfo" />
                        </Typography>
                        <Stack spacing={3}>
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="AL_OK_HES_NO"
                                    label={<FormattedMessage id="AL_OK_HES_NO" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.AL_OK_HES_NO}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="AL_OK_EPARA"
                                    label={<FormattedMessage id="AL_OK_EPARA" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.AL_OK_EPARA}
                                    onChange={formik.handleChange}
                                />
                            </Stack >
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="AL_OK_KART_NO"
                                    label={<FormattedMessage id="AL_OK_KART_NO" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.AL_OK_KART_NO}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="AL_BANKA_AD"
                                    label={<FormattedMessage id="AL_BANKA_AD" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.AL_BANKA_AD}
                                    onChange={formik.handleChange}
                                />
                            </Stack >
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="AL_BANKA_KOD"
                                    label={<FormattedMessage id="AL_BANKA_KOD" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.AL_BANKA_KOD}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="AL_SUBE_AD"
                                    label={<FormattedMessage id="AL_SUBE_AD" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.AL_SUBE_AD}
                                    onChange={formik.handleChange}
                                />
                            </Stack >
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="AL_IBAN"
                                    label={<FormattedMessage id="AL_IBAN" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.AL_IBAN}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="AL_HES_NO"
                                    label={<FormattedMessage id="AL_HES_NO" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.AL_HES_NO}
                                    onChange={formik.handleChange}
                                />
                            </Stack >
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="AL_KREDI_KART_NO"
                                    label={<FormattedMessage id="AL_KREDI_KART_NO" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.AL_KREDI_KART_NO}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="AL_DEBIT_KART_NO"
                                    label={<FormattedMessage id="AL_DEBIT_KART_NO" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.AL_DEBIT_KART_NO}
                                    onChange={formik.handleChange}
                                />
                            </Stack >
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
                                    name="IS_SAAT"
                                    label={<FormattedMessage id="IS_SAAT" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.IS_SAAT}
                                    onChange={formik.handleChange}
                                />
                            </Stack >
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <DatePicker
                                    label={<FormattedMessage id="ODENME_TAR" />}
                                    mask="__.__.____"
                                    format="DD.MM.YYYY"
                                    variant="filled"
                                    value={formik.values.ODENME_TAR}
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
                                            //     formik.touched.ODENME_TAR &&
                                            //     Boolean(formik.errors.ODENME_TAR),
                                            //   helperText:
                                            //     formik.touched.ODENME_TAR &&
                                            //     formik.errors.ODENME_TAR,
                                        },
                                    }}
                                />
                                <TextField
                                    name="ISLEM_IP"
                                    label={<FormattedMessage id="ISLEM_IP" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.ISLEM_IP}
                                    onChange={formik.handleChange}
                                />
                            </Stack >
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
                                    name="ASIL_TUTAR"
                                    label={<FormattedMessage id="ASIL_TUTAR" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.ASIL_TUTAR}
                                    onChange={formik.handleChange}
                                />
                            </Stack >
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
                            </Stack >
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                {/* <TextField
                                    name="IS_GON_NEDENI"
                                    label={<FormattedMessage id="IS_GON_NEDENI" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.IS_GON_NEDENI}
                                    onChange={formik.handleChange}
                                /> */}
                                <TextField
                                    name="IS_GON_NEDENI"
                                    label={<FormattedMessage id="IS_GON_NEDENI" />}
                                    variant="filled"
                                    select
                                    fullWidth
                                    value={formik.values.IS_GON_NEDENI}
                                    onChange={formik.handleChange}
                                >
                                    {transactionReason.map((e) => (
                                        <MenuItem
                                            key={e.value}
                                            value={e.value}>
                                            {e.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                {/* <TextField
                                    name="ISLEM_KNL"
                                    label={<FormattedMessage id="ISLEM_KNL" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.ISLEM_KNL}
                                    onChange={formik.handleChange}
                                /> */}
                                <TextField
                                    name="ISLEM_KNL"
                                    label={<FormattedMessage id="ISLEM_KNL" />}
                                    variant="filled"
                                    select
                                    fullWidth
                                    value={formik.values.ISLEM_KNL}
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
                            </Stack >
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="SUBE_VKN"
                                    label={<FormattedMessage id="SUBE_VKN" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.SUBE_VKN}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="SUBE_UNVAN"
                                    label={<FormattedMessage id="SUBE_UNVAN" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.SUBE_UNVAN}
                                    onChange={formik.handleChange}
                                />
                            </Stack >
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="SUBE_IL_ADI"
                                    label={<FormattedMessage id="SUBE_IL_ADI" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.SUBE_IL_ADI}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="KUR_ACIKLAMA"
                                    label={<FormattedMessage id="KUR_ACIKLAMA" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.KUR_ACIKLAMA}
                                    onChange={formik.handleChange}
                                />
                            </Stack >
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="MUS_ACIKLAMA"
                                    label={<FormattedMessage id="MUS_ACIKLAMA" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.MUS_ACIKLAMA}
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
                            </Stack >
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
                            </Stack >
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
                            </Stack >
                            <Stack
                                spacing={3}
                                direction={{ xs: "column", md: "row" }}
                            >
                                <TextField
                                    name="TRX_ID"
                                    label={<FormattedMessage id="TRX_ID" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.TRX_ID}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="IS_SEND"
                                    label={<FormattedMessage id="IS_SEND" />}
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.IS_SEND}
                                    onChange={formik.handleChange}
                                />
                            </Stack >

                        </Stack>
                    </Stack>

                </Stack>
            </>
        )
    }
);

export default UpdateGibPageThree;