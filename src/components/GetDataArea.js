import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormattedMessage } from "react-intl";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
//date picker
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import { HideCardNumber, TCKNCheck } from "../helpers/HELPERS";
import ReactInputMask from "react-input-mask";
import { dateConverter } from "../helpers/dateHelpers";
import { LoadingButton } from "@mui/lab";
import { useAuth } from "../context/AuthContext";
const defaultDates = {
  start: dayjs()
    .subtract(7, "day")
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .set("ms", 0),
  end: dayjs()
    .set("hour", 23)
    .set("minute", 59)
    .set("second", 59)
    .set("ms", 999),
};
function GetDataArea({
  HandleSearchClick,
  HandleDeleteClick,
  timeSelect = false,
  dateFilter = true,
  btnRef,
  deleteRef,
  children,
  searchButtonText = "search",
  startIcon = <SearchIcon />,
  searchIconAtTitle = true,
  title = "search.criters",
  pMaxDate = null,
  inputsShow = { tckn: false, walletNo: false, cardNo: false, iref: false },
  inputsSize = 3,
  inputsPlacement = "before",
  defaultExpanded = true,
  defaultValue = {
    tckn: "",
    walletNo: "",
    cardNo: "",
    iref: "",
  },
  dateFilterInputsSize = 3,
  pStartDate = "-",
  pEndDate = "-",
  disableWeekends = false,
  dayRange = null,
  allowEmpty = false,
  showDeleteButton = true,
  showSearchButton = true,
  readOnly = false
}) {
  const { mimCallCustomer } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(
    pStartDate === "-" ? defaultDates.start : pStartDate
  );
  const [endDate, setEndDate] = useState(
    pEndDate === "-" ? defaultDates.end : pEndDate
  );
  const [tckn, setTckn] = useState(
    mimCallCustomer ? mimCallCustomer.PROFILE.TCKN : ""
  );
  const [tcknError, setTcknError] = useState("");
  const [walletNo, setWalletNo] = useState("");
  const [walletNoError, setWalletNoError] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [cardNoError, setCardNoError] = useState("");
  const [iref, setIref] = useState("");
  const [irefError, setIrefError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Object.values(inputsShow).some((t) => t) &&
      [walletNo, tckn, cardNo, iref].every(
        (a) => a.toString().replace(/\D/g, "") === ""
      ) &&
      !allowEmpty
    ) {
      enqueueSnackbar(<FormattedMessage id="cannotEmpty" />, {
        variant: "warning",
      });
      return;
    }
    if (tckn && !TCKNCheck(tckn.toString())) {
      setTcknError(<FormattedMessage id="invalidTCKN" />);
      return;
    } else {
      setTcknError("");
    }
    if (walletNo && walletNo.toString().replace(/\D/g, "").length !== 12) {
      setWalletNoError(<FormattedMessage id="walletNoLengthError" />);
      return;
    } else {
      setWalletNoError("");
    }
    if (cardNo && cardNo.toString().replace(/\D/g, "").length !== 16) {
      setCardNoError(<FormattedMessage id="cardNoLengthError" />);
      return;
    } else {
      setCardNoError("");
    }
    if (iref && iref.toString().replace(/\D/g, "").length !== 12) {
      setIrefError(<FormattedMessage id="irefNoError" />);
      return;
    } else {
      setIrefError("");
    }
    if (disableWeekends) {
      if (isWeekend(startDate) || isWeekend(endDate)) {
        enqueueSnackbar(
          "Bu işlem için haftasonunda olan bir gün seçemezsiniz",
          {
            variant: "warning",
          }
        );
        return;
      }
    }

    if (pMaxDate) {
      if (endDate > pMaxDate) {
        enqueueSnackbar(
          `Bitiş Tarihi ${dateConverter(
            pMaxDate.toISOString(),
            "isoFull"
          )} tarihinden ileride olamaz`,
          { variant: "warning" }
        );
        return;
      }
    }
    if (dayRange) {
      if (timeSelect) {
        if (
          startDate < endDate?.subtract(dayRange + 1, "d") ||
          endDate > startDate?.add(dayRange + 1, "d")
        ) {
          enqueueSnackbar(
            `Başlangıç ve Bitiş Tarihleri arasında en fazla ${dayRange} gün olabilir`,
            { variant: "warning" }
          );
          return;
        }
      } else {
        if (
          startDate < endDate?.subtract(dayRange, "d") ||
          endDate > startDate?.add(dayRange, "d")
        ) {
          enqueueSnackbar(
            `Başlangıç ve Bitiş Tarihleri arasında en fazla ${dayRange} gün olabilir`,
            { variant: "warning" }
          );
          return;
        }
      }
    }
    setLoading(true);
    HandleSearchClick(startDate, endDate, tckn, walletNo, cardNo, iref).then(() =>
      setLoading(false)
    );
  };

  const handleDelete = useCallback(() => {
    setLoading(false);
    setStartDate(pStartDate === "-" ? defaultDates.start : pStartDate);
    setEndDate(pEndDate === "-" ? defaultDates.end : pEndDate);
    setTckn(mimCallCustomer ? mimCallCustomer.PROFILE.TCKN : "");
    setTcknError("");
    setWalletNo("");
    setWalletNoError("");
    setCardNo("");
    setCardNoError("");
    setIref("");
    setIrefError("");
    HandleDeleteClick();
  }, [HandleDeleteClick, pStartDate, pEndDate, mimCallCustomer]);
  useEffect(() => {
    if (defaultValue?.tckn) {
      setTckn(defaultValue?.tckn.toString());
    }
    if (defaultValue?.cardNo) {
      setCardNo(defaultValue?.cardNo.toString());
    }
    if (defaultValue?.walletNo) {
      setWalletNo(defaultValue?.walletNo.toString());
    }
    if (defaultValue?.iref) {
      setIref(defaultValue?.iref.toString());
    }
  }, [defaultValue]);
  return (
    <Box sx={{ width: "100%" }}>
      <Accordion
        defaultExpanded={defaultExpanded}
        sx={{
          backgroundColor: "rgba(26, 66, 138,0.1)",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="get-data-accordion"
        >
          {searchIconAtTitle === true && (
            <SearchIcon color="inherit" sx={{ fontSize: 30 }} />
          )}

          <Typography
            sx={{ ml: 2, fontSize: "1.25rem" }}
            color="inherit"
            fontWeight={500}
          >
            <FormattedMessage id={title} />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {dateFilter &&
                (timeSelect ? (
                  <>
                    <Grid xs={12} lg={dateFilterInputsSize}>
                      <DateTimePicker
                        label={<FormattedMessage id="startDate" />}
                        mask="__.__.____ __:__"
                        format="DD.MM.YYYY HH:mm"
                        value={startDate}
                        onChange={(newValue) => {
                          setStartDate(newValue);
                        }}
                        ampm={false}
                        maxDateTime={endDate}
                        minDateTime={
                          dayRange ? endDate?.subtract(dayRange + 1, "d") : null
                        }
                        slotProps={{
                          textField: { size: "small", fullWidth: true },
                        }}
                        shouldDisableDate={
                          disableWeekends
                            ? (date) => date.day() === 0 || date.day() === 6
                            : null
                        }
                      />
                    </Grid>
                    <Grid xs={12} lg={dateFilterInputsSize}>
                      <DateTimePicker
                        label={<FormattedMessage id="endDate" />}
                        value={endDate}
                        mask="__.__.____ __:__"
                        format="DD.MM.YYYY HH:mm"
                        onChange={(newValue) => {
                          setEndDate(newValue);
                        }}
                        ampm={false}
                        minDateTime={startDate}
                        maxDateTime={
                          pMaxDate
                            ? pMaxDate
                            : dayRange
                              ? startDate?.add(dayRange + 1, "d")
                              : null
                        }
                        slotProps={{
                          textField: { size: "small", fullWidth: true },
                        }}
                        shouldDisableDate={
                          disableWeekends
                            ? (date) => date.day() === 0 || date.day() === 6
                            : null
                        }
                      />
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid xs={12} lg={dateFilterInputsSize}>
                      <DatePicker
                        label={<FormattedMessage id="startDate" />}
                        mask="__.__.____"
                        format="DD.MM.YYYY"
                        value={startDate}
                        onChange={(newValue) => {
                          setStartDate(newValue);
                        }}
                        maxDate={endDate}
                        minDate={
                          dayRange ? endDate?.subtract(dayRange, "d") : null
                        }
                        slotProps={{
                          textField: { size: "small", fullWidth: true },
                        }}
                        shouldDisableDate={
                          disableWeekends
                            ? (date) => date.day() === 0 || date.day() === 6
                            : null
                        }
                      />
                    </Grid>
                    <Grid xs={12} lg={dateFilterInputsSize}>
                      <DatePicker
                        label={<FormattedMessage id="endDate" />}
                        value={endDate}
                        mask="__.__.____"
                        format="DD.MM.YYYY"
                        onChange={(newValue) => {
                          setEndDate(newValue);
                        }}
                        minDate={startDate}
                        maxDate={
                          pMaxDate
                            ? pMaxDate
                            : dayRange
                              ? startDate?.add(dayRange, "d")
                              : null
                        }
                        slotProps={{
                          textField: { size: "small", fullWidth: true },
                        }}
                        shouldDisableDate={
                          disableWeekends
                            ? (date) => date.day() === 0 || date.day() === 6
                            : null
                        }
                      />
                    </Grid>
                  </>
                ))}

              {inputsPlacement === "after" && children}
              {inputsShow.tckn && (
                <Grid xs={12} lg={inputsSize}>
                  <TextField
                    fullWidth
                    size="small"
                    label={<FormattedMessage id="tckn" />}
                    value={tckn}
                    onChange={(e) => setTckn(e.target.value)}
                    disabled={
                      [walletNo, cardNo, iref].some((e) => e !== "") ||
                      mimCallCustomer !== null
                    }
                    InputProps={{
                      inputComponent: TCKNMask,
                    }}
                    error={Boolean(tcknError)}
                    helperText={tcknError}
                  />
                </Grid>
              )}
              {inputsShow.walletNo && (
                <Grid xs={12} lg={inputsSize}>
                  <TextField
                    fullWidth
                    size="small"
                    label={<FormattedMessage id="walletNo" />}
                    value={walletNo}
                    onChange={(e) => setWalletNo(e.target.value)}
                    disabled={
                      [tckn, cardNo, iref].some((e) => e !== "") ||
                      mimCallCustomer !== null
                    }
                    InputProps={{
                      inputComponent: WalletNoMask,
                    }}
                    error={Boolean(walletNoError)}
                    helperText={walletNoError}
                  />
                </Grid>
              )}
              {inputsShow.cardNo && (
                <Grid xs={12} lg={inputsSize}>
                  {defaultValue.cardNo ? (
                    <TextField
                      fullWidth
                      size="small"
                      label={<FormattedMessage id="cardNo" />}
                      value={HideCardNumber(cardNo)}
                      disabled={
                        [walletNo, tckn, iref].some((e) => e !== "") ||
                        mimCallCustomer !== null
                      }
                      InputProps={{
                        inputComponent: FilledCardNoMask,
                        readOnly: readOnly,
                      }}
                      error={Boolean(cardNoError)}
                      helperText={cardNoError}
                    />
                  ) : (
                    <TextField
                      fullWidth
                      size="small"
                      label={<FormattedMessage id="cardNo" />}
                      value={cardNo}
                      onChange={(e) => setCardNo(e.target.value)}
                      disabled={
                        [walletNo, tckn].some((e) => e !== "") ||
                        mimCallCustomer !== null
                      }
                      InputProps={{
                        inputComponent: CardNoMask,
                        readOnly: readOnly,
                      }}
                      error={Boolean(cardNoError)}
                      helperText={cardNoError}
                    />
                  )}
                </Grid>
              )}
              {inputsShow.iref && (
                <Grid xs={12} lg={inputsSize}>
                  <TextField
                    fullWidth
                    size="small"
                    label={<FormattedMessage id="iref" />}
                    value={iref}
                    onChange={(e) => setIref(e.target.value)}
                    disabled={
                      [tckn, walletNo, cardNo].some((e) => e !== "") ||
                      mimCallCustomer !== null
                    }
                    // InputProps={{
                    //   inputComponent: WalletNoMask,
                    // }}
                    error={Boolean(irefError)}
                    helperText={irefError}
                  />
                </Grid>
              )}
              {inputsPlacement === "before" && children}

              <Grid xs={12}>
                <ButtonGroup size="small" fullWidth aria-label="action buttons">
                  <LoadingButton
                    type="submit"
                    ref={btnRef}
                    variant="contained"
                    color="secondary"
                    startIcon={startIcon}
                    loading={loading}
                    style={{ display: showSearchButton ? 'inline-flex' : 'none' }}
                  >
                    <FormattedMessage id={searchButtonText} />
                  </LoadingButton>
                  <Button
                    ref={deleteRef}
                    onClick={handleDelete}
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    style={{ display: showDeleteButton ? 'inline-flex' : 'none' }}
                  >
                    <FormattedMessage id="clear" />
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </form>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default React.memo(GetDataArea);
const TCKNMask = forwardRef((props, ref) => (
  <ReactInputMask {...props} mask="99999999999" inputRef={ref} />
));
const WalletNoMask = forwardRef((props, ref) => (
  <ReactInputMask {...props} mask="999999999999" inputRef={ref} />
));
const CardNoMask = forwardRef((props, ref) => (
  <ReactInputMask {...props} mask="9999-9999-9999-9999" inputRef={ref} />
));
const FilledCardNoMask = forwardRef((props, ref) => (
  <ReactInputMask
    {...props}
    mask="9999-\*\*\*\*-\*\*\*\*-9999"
    inputRef={ref}
  />
));
function isWeekend(date) {
  return date && (date.day() === 6 || date.day() === 0);
}
