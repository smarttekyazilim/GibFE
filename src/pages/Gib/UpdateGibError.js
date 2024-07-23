import React, { forwardRef } from 'react';
import {
    Stack,
    TextField
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import * as yup from "yup";
import { useFormik } from "formik";
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';


const validationSchema = yup.object({
    FORM_TYPE: yup.string(),
    CODE: yup.string(),
    MESSAGE: yup.string(),
    ERROR_DATE: yup.string(),
});

const UpdateGibError = forwardRef(
    ({ datas }) => {
        const formik = useFormik({
            initialValues: {
                FORM_TYPE: datas?.FORM_TYPE || "",
                CODE: datas?.CODE || "",
                MESSAGE: datas?.MESSAGE || "",
                ERROR_DATE: datas?.ERROR_DATE ? dayjs(datas.ERROR_DATE) : null,
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
                            name="FORM_TYPE"
                            label={<FormattedMessage id="FORM_TYPE" />}
                            variant="filled"
                            fullWidth
                            value={formik.values.FORM_TYPE}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            name="CODE"
                            label={<FormattedMessage id="CODE" />}
                            variant="filled"
                            fullWidth
                            value={formik.values.CODE}
                            onChange={formik.handleChange}
                        />
                    </Stack>
                    <Stack
                        spacing={3}
                        direction={{ xs: "column", md: "row" }}
                    >
                        <TextField
                            name="MESSAGE"
                            label={<FormattedMessage id="MESSAGE" />}
                            variant="filled"
                            fullWidth
                            value={formik.values.MESSAGE}
                            onChange={formik.handleChange}
                        />
                        <DatePicker
                            label={<FormattedMessage id="ERROR_DATE" />}
                            mask="__.__.____"
                            format="DD.MM.YYYY"
                            variant="filled"
                            disabled
                            value={formik.values.ERROR_DATE}
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
                                    //     formik.touched.ERROR_DATE &&
                                    //     Boolean(formik.errors.ERROR_DATE),
                                    //   helperText:
                                    //     formik.touched.ERROR_DATE &&
                                    //     formik.errors.ERROR_DATE,
                                },
                            }}
                        />
                    </Stack>
                </Stack>
            </>
        )
    }
)

export default UpdateGibError;