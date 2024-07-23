import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  TextField,
  Typography,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { forwardRef, useCallback, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Unstable_Grid2";
import { FormattedMessage } from "react-intl";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import { LoadingButton } from "@mui/lab";
//import LayersClearRoundedIcon from "@mui/icons-material/LayersClearRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactInputMask from "react-input-mask";
import { useFormik } from "formik";
import { GetCustomerCardTracking, GetWalletList } from "../api/api";
import { CurrencyFormat, HideCardNumber, TCKNCheck } from "../helpers/HELPERS";
import { useSnackbar } from "notistack";
import { dateConverter } from "../helpers/dateHelpers";
import { useAuth } from "../context/AuthContext";

function FindCardWallet({
  type = "card",
  CardWalletSelected,
  HandleDeleteClick,
}) {
  const { mimCallCustomer } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [customer, setCustomer] = useState({});
  const formik = useFormik({
    initialValues: {
      tckn: mimCallCustomer ? mimCallCustomer.PROFILE.TCKN : "",
      walletNo: "",
      cardNo: "",
    },
    onSubmit: async (values) => {
      if (
        Object.values(values).every(
          (e) => e.toString().replace(/\D/g, "") === ""
        )
      ) {
        Object.keys(values).forEach((e) =>
          formik.setFieldError(e, <FormattedMessage id="cannotEmpty" />)
        );
        return;
      }
      if (values.tckn && !TCKNCheck(values.tckn.toString())) {
        formik.setFieldError("tckn", <FormattedMessage id="invalidTCKN" />);
        return;
      } else {
        formik.setFieldError("tckn", "");
      }
      if (
        values.walletNo &&
        values.walletNo.toString().replace(/\D/g, "").length !== 12
      ) {
        formik.setFieldError("walletNo", <FormattedMessage id="cannotEmpty" />);
        return;
      } else {
        formik.setFieldError("walletNo", "");
      }
      if (
        values.cardNo &&
        values.cardNo.toString().replace(/\D/g, "").length !== 16
      ) {
        formik.setFieldError("cardNo", <FormattedMessage id="cannotEmpty" />);
        return;
      } else {
        formik.setFieldError("cardNo", "");
      }
      setLoading(true);
      if (type === "card") {
        await GetCustomerCardTracking({
          CARD_NO: values.cardNo.toString().replace(/\D/g, ""),
          TCKN: values.tckn,
          WALLET_NO: values.walletNo,
        }).then((resp) => {
          if (resp.STATUS === "success") {
            setCustomer(resp.CUSTOMER_DATA);
            setData(
              resp.DATA.map((e, i) => ({
                id: i,
                CARD_NO: e.kartNo,
                DISPLAY_CARD_NO: HideCardNumber(e.kartNo),
                WALLET_NO: e.cuzdanID,
                CUSTOMER_NO: e.ziraatPayMusteriNo,
                EMBOSS_NAME: e.kartEmboss,
                PRODUCT_DESC: e.kartProductAdi,
                CARD_TYPE: e.kartStili,
                STATUS: `${e.kartStatusu} - ${e.kartStatuAciklama}`,
                SUB_STATUS: `${e.kartAltStatusu} - ${e.kartAltStatuAciklama}`,
                CARD_CREATE_DATE: e.kartGirisTarihi,
                CARD_CLOSE_DATE: e.kartKapamaTarihi,
              }))
            );
          } else {
            setData([]);
            setCustomer({});
            enqueueSnackbar(resp.RESPONSECODEDESC || resp.MESSAGE, {
              variant: "error",
            });
          }
        });
      } else if (type === "wallet") {
        await GetWalletList({
          TCKN: values.tckn,
          WALLET_NO: values.walletNo,
        }).then((resp) => {
          if (resp.STATUS === "success") {
            if (resp.DATA.length === 0) {
              enqueueSnackbar(`Cüzdan bulunamadı.`, {
                variant: "warning",
              });
            } else {
              setData(
                resp.DATA.map((e, i) => ({
                  id: i,
                  WALLET_NO: e.WALLET_NO,
                  FIRST_NAME: e.FIRST_NAME,
                    // e.WALLET_TYPE === 1
                    //   ? e.FIRST_NAME
                    //   : e.BOUNDED_USER_FIRST_NAME,
                  LAST_NAME: e.LAST_NAME,
                    // e.WALLET_TYPE === 1
                    //   ? e.LAST_NAME
                    //   : e.BOUNDED_USER_LAST_NAME,
                  WALLET_NAME: e.WALLET_NAME,
                  WALLET_STATUS: e.STATUS === "ONAYDA" ? "Açık" : "Kapalı",
                  WALLET_TYPE: e.WALLET_TYPE === 1 ? "Asıl" : "Ortak",
                  WALLET_BALANCE: e.BALANCE,
                }))
              );
            }
          } else {
            setData([]);
            setCustomer({});
            enqueueSnackbar(resp.RESPONSECODEDESC || resp.MESSAGE, {
              variant: "error",
            });
          }
        });
      }

      setLoading(false);
    },
  });

  //datas
  const handleDelete = useCallback(() => {
    formik.resetForm();
    setLoading(false);
    setCustomer({});
    setData([]);
    setSelected("");
    HandleDeleteClick();
  }, [formik, HandleDeleteClick]);

  const [selected, setSelected] = useState("");
  const handleSelect = (e) => {
    setSelected(e.target.value);
    let currentData = data.find(
      (t) => t.id.toString() === e.target.value.toString()
    );
    CardWalletSelected({
      fromLink: true,
      CARD_NO: currentData?.CARD_NO || "",
      WALLET_NO: currentData?.WALLET_NO || "",
      ...(type === "wallet" && {
        FIRST_NAME: currentData.FIRST_NAME,
        LAST_NAME: currentData.LAST_NAME,
      }),
      ...customer,
    });
  };
  return (
    <Box sx={{ width: "100%", mb: 3, boxShadow: 8, borderRadius: ".75rem" }}>
      <Accordion
        sx={{
          backgroundColor: "rgba(26, 66, 138,0.24)",
          borderRadius: "inherit !important",
        }}
        elevation={0}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="get-data-accordion"
        >
          <PersonSearchRoundedIcon color="inherit" sx={{ fontSize: 30 }} />
          <Typography
            sx={{ ml: 2, fontSize: "1.25rem" }}
            color="inherit"
            fontWeight={500}
          >
            <FormattedMessage id={`customerGet.${type}`} />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid xs={12} lg={6}>
                <TextField
                  fullWidth
                  size="small"
                  label={<FormattedMessage id="tckn" />}
                  {...formik.getFieldProps("tckn")}
                  InputProps={{
                    inputComponent: TCKNMask,
                  }}
                  disabled={
                    [formik.values.walletNo, formik.values.cardNo].some(
                      (e) => e !== ""
                    ) || mimCallCustomer !== null
                  }
                  error={formik.touched.tckn && Boolean(formik.errors.tckn)}
                  helperText={formik.touched.tckn && formik.errors.tckn}
                />
              </Grid>
              {type === "card" ? (
                <Grid xs={12} lg={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label={<FormattedMessage id="cardNo" />}
                    {...formik.getFieldProps("cardNo")}
                    InputProps={{
                      inputComponent: CardNoMask,
                    }}
                    disabled={
                      [formik.values.tckn, formik.values.walletNo].some(
                        (e) => e !== ""
                      ) || mimCallCustomer !== null
                    }
                    error={
                      formik.touched.cardNo && Boolean(formik.errors.cardNo)
                    }
                    helperText={formik.touched.cardNo && formik.errors.cardNo}
                  />
                </Grid>
              ) : (
                <Grid xs={12} lg={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label={<FormattedMessage id="walletNo" />}
                    {...formik.getFieldProps("walletNo")}
                    InputProps={{
                      inputComponent: WalletNoMask,
                    }}
                    disabled={
                      [formik.values.tckn, formik.values.cardNo].some(
                        (e) => e !== ""
                      ) || mimCallCustomer !== null
                    }
                    error={
                      formik.touched.walletNo && Boolean(formik.errors.walletNo)
                    }
                    helperText={
                      formik.touched.walletNo && formik.errors.walletNo
                    }
                  />
                </Grid>
              )}
              <Grid xs={12}>
                <ButtonGroup size="small" fullWidth aria-label="action buttons">
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    color="secondary"
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SearchRoundedIcon />}
                  >
                    <FormattedMessage id="search" />
                  </LoadingButton>
                  <Button
                    onClick={handleDelete}
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                  >
                    <FormattedMessage id="clear" />
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </form>
          {type === "card" ? (
            <TableContainer
              sx={{
                maxHeight: "500px",
                mt: 3,
                backgroundColor: "#fff",
                borderRadius: ".75rem",
              }}
            >
              <Table size="small" aria-label="cards-result" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell align="left" padding="checkbox"></TableCell>
                    <TableCell>
                      <FormattedMessage id="cardNo" />
                    </TableCell>
                    <TableCell>
                      <FormattedMessage id="walletNo" />
                    </TableCell>
                    <TableCell>
                      <FormattedMessage id="customerNo" />
                    </TableCell>
                    <TableCell>
                      <FormattedMessage id="embossName" />
                    </TableCell>
                    <TableCell>
                      <FormattedMessage id="productDescription" />
                    </TableCell>
                    <TableCell>
                      <FormattedMessage id="cardType" />
                    </TableCell>
                    <TableCell>
                      <FormattedMessage id="status" />
                    </TableCell>
                    <TableCell>
                      <FormattedMessage id="subStatus" />
                    </TableCell>
                    <TableCell>
                      <FormattedMessage id="cardEntryDate" />
                    </TableCell>
                    <TableCell>
                      <FormattedMessage id="cardClosingDate" />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((e, i) => (
                    <TableRow
                      key={i}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                      hover
                      selected={selected.toString() === e.id.toString()}
                      aria-checked={selected.toString() === e.id.toString()}
                    >
                      <TableCell align="left" padding="checkbox">
                        <Radio
                          size="small"
                          value={e.id.toString()}
                          onChange={handleSelect}
                          checked={selected.toString() === e.id.toString()}
                          name="selected-card"
                          inputProps={{ "aria-label": e.id.toString() }}
                        />
                      </TableCell>
                      <TableCell>{e.DISPLAY_CARD_NO}</TableCell>
                      <TableCell>{e.WALLET_NO}</TableCell>
                      <TableCell>{e.CUSTOMER_NO}</TableCell>
                      <TableCell>{e.EMBOSS_NAME}</TableCell>
                      <TableCell>{e.PRODUCT_DESC}</TableCell>
                      <TableCell>{e.CARD_TYPE}</TableCell>
                      <TableCell>{e.STATUS}</TableCell>
                      <TableCell>{e.SUB_STATUS}</TableCell>
                      <TableCell>
                        {dateConverter(
                          e.CARD_CREATE_DATE,
                          "dateonly",
                          "dotdate"
                        )}
                      </TableCell>
                      <TableCell>
                        {dateConverter(
                          e.CARD_CLOSE_DATE,
                          "dateonly",
                          "dotdate"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <TableContainer
              sx={{
                maxHeight: "500px",
                mt: 3,
                backgroundColor: "#fff",
                borderRadius: ".75rem",
              }}
            >
              <Table size="small" aria-label="wallets-result" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell align="left" padding="checkbox"></TableCell>
                    <TableCell>
                      <FormattedMessage id="walletNo" />
                    </TableCell>
                    <TableCell>
                      <FormattedMessage id="walletOwnerNameSurname" />
                    </TableCell>
                    <TableCell>
                      <FormattedMessage id="walletName" />
                    </TableCell>
                    <TableCell>
                      <FormattedMessage id="walletStatus" />
                    </TableCell>
                    <TableCell>
                      <FormattedMessage id="walletType" />
                    </TableCell>
                    <TableCell align="right">
                      <FormattedMessage id="balance" />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((e, i) => (
                    <TableRow
                      key={i}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                      hover
                      selected={selected.toString() === e.id.toString()}
                      aria-checked={selected.toString() === e.id.toString()}
                    >
                      <TableCell align="left" padding="checkbox">
                        <Radio
                          size="small"
                          value={e.id.toString()}
                          onChange={handleSelect}
                          checked={selected.toString() === e.id.toString()}
                          name="selected-wallet"
                          inputProps={{ "aria-label": e.id.toString() }}
                        />
                      </TableCell>
                      <TableCell>{e.WALLET_NO}</TableCell>
                      <TableCell>{`${e?.FIRST_NAME || ""} ${
                        e?.LAST_NAME || ""
                      }`}</TableCell>
                      <TableCell>{e.WALLET_NAME}</TableCell>
                      <TableCell>{e.WALLET_STATUS}</TableCell>
                      <TableCell>{e.WALLET_TYPE === 1 ? "Asıl" : "Ortak"}</TableCell>
                      <TableCell align="right">
                        {CurrencyFormat(e.WALLET_BALANCE)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default React.memo(FindCardWallet);
const TCKNMask = forwardRef((props, ref) => (
  <ReactInputMask {...props} mask="99999999999" inputRef={ref} />
));
const WalletNoMask = forwardRef((props, ref) => (
  <ReactInputMask {...props} mask="999999999999" inputRef={ref} />
));
const CardNoMask = forwardRef((props, ref) => (
  <ReactInputMask {...props} mask="9999-9999-9999-9999" inputRef={ref} />
));
