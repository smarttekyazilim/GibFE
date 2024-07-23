import {
  Alert,
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { FormattedMessage } from "react-intl";
import { useMemo, useState } from "react";
import { GetAllPageNames } from "../../routes/SiteLinks";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";
import DeleteIcon from "@mui/icons-material/Delete";
import DesktopWindowsRoundedIcon from "@mui/icons-material/DesktopWindowsRounded";
import PhoneAndroidRoundedIcon from "@mui/icons-material/PhoneAndroidRounded";
import { dateConverter } from "../../helpers/dateHelpers";
import {
  CurrencyFormat,
  generateIcon,
  gsmNoFormatter,
} from "../../helpers/HELPERS";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import LaunchIcon from "@mui/icons-material/Launch";
import Draggable from "react-draggable";
import CloseIcon from "@mui/icons-material/Close";
import MRTTable from "../../components/MRTTable";
import IntlTranslate from "../../helpers/IntlTranslate";
import { DYSGetFile } from "../../api/api";
import { convertBase64ToFile } from "../../helpers/ToBase64";
import { saveAs } from "file-saver";
import { useSnackbar } from "notistack";
import DownloadIcon from "@mui/icons-material/Download";

const CRUDS_DEF = {
  C: {
    label: "access.create",
    icon: <AddCircleIcon />,
    color: "success",
  },
  R: {
    label: "access.read",
    icon: <VisibilityIcon />,
    color: "info",
  },
  U: {
    label: "access.update",
    icon: <ReplayCircleFilledIcon />,
    color: "warning",
  },
  D: {
    label: "access.delete",
    icon: <DeleteIcon />,
    color: "error",
  },
};
const WALLET_STATUS_DEF = {
  Y: {
    label: "hasNoBlock",
    icon: <CheckRoundedIcon />,
    color: "success",
  },
  N: {
    label: "hasBlock",
    icon: <ClearRoundedIcon />,
    color: "error",
  },
};
const UserDetails = (data) => {
  const {
    NAME: name,
    SURNAME: surname,
    GSM_NO: phone,
    EMAIL: email,
    USER_NAME: username,
    USER_TYPE: userType,
    IS_READONLY_USER: userReadonly,
    REGISTRATION_NO: registrationNo,
  } = JSON.parse(data);
  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <TextField
          label={<FormattedMessage id="name" />}
          fullWidth
          variant="filled"
          value={name}
        />
        <TextField
          label={<FormattedMessage id="surname" />}
          fullWidth
          variant="filled"
          value={surname}
        />
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <TextField
          label={<FormattedMessage id="phone" />}
          fullWidth
          variant="filled"
          type="tel"
          value={phone}
        />
        <TextField
          label={<FormattedMessage id="email" />}
          fullWidth
          variant="filled"
          type="email"
          value={email}
        />
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <TextField
          label={<FormattedMessage id="username" />}
          fullWidth
          variant="filled"
          value={username}
          disabled
        />
        <TextField
          label={<FormattedMessage id="registrationNo" />}
          fullWidth
          variant="filled"
          value={registrationNo}
        />
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <FormControl sx={{ width: { xs: "100%", lg: "50%" } }}>
          <FormLabel id="user-type">
            <FormattedMessage id="userType" />
          </FormLabel>
          <RadioGroup row aria-labelledby="user-type" value={userType}>
            <FormControlLabel value="maker" control={<Radio />} label="Maker" />
            <FormControlLabel
              value="checker"
              control={<Radio />}
              label="Checker"
            />
          </RadioGroup>
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
                <Checkbox checked={userReadonly === "1" ? true : false} />
              }
              label={<FormattedMessage id="userReadOnly" />}
            />
          </FormGroup>
        </Stack>
      </Stack>
    </Stack>
  );
};

const RoleDetails = (data) => {
  const {
    SCOPE: roleScope,
    ROLE_NAME: roleName,
    ROLE_PERMISSION: rolePermission,
    SECURITY_LEVEL_PAGES,
  } = JSON.parse(data);

  const allPages = useMemo(() => GetAllPageNames(), []);

  //START - güvenlik seviyesi ekranları
  const [currentTab, setCurrentTab] = useState(0);
  function tabAreaProps(index) {
    return {
      id: `mim-tab-${index}`,
      "aria-controls": `mim-tabpanel-${index}`,
    };
  }
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`mim-tabpanel-${index}`}
        aria-labelledby={`mim-tab-${index}`}
        {...other}
      >
        {value === index && children}
      </div>
    );
  }
  //END - güvenlik seviyesi ekranları
  return (
    <>
      <Stack spacing={3}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <TextField
            label={<FormattedMessage id="roleScope" />}
            fullWidth
            variant="filled"
            value={roleScope}
            disabled={roleScope === "MIM"}
          />
          <TextField
            label={<FormattedMessage id="roleName" />}
            fullWidth
            variant="filled"
            value={roleName}
          />
        </Stack>
        <Box>
          <FormControlLabel
            control={<Switch checked={roleScope === "MIM"} />}
            label={<FormattedMessage id="isMimRole" />}
          />
        </Box>
        {roleScope === "MIM" && (
          <Stack
            spacing={3}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.06)",
              px: ".75rem",
              py: "1rem",
              borderRadius: "4px",
            }}
          >
            <Stack direction="row" alignItems="center">
              <Typography variant="h5">
                <FormattedMessage id="securityLevelPagesTitle" />
              </Typography>
              <Tooltip
                arrow
                title={<FormattedMessage id="securityLevelPagesDesc" />}
                placement="left"
              >
                <HelpOutlineIcon color="info" sx={{ ml: "auto" }} />
              </Tooltip>
            </Stack>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={currentTab}
                onChange={(e, newVal) => {
                  setCurrentTab(newVal);
                }}
                aria-label="security level page permission tabs"
                variant="fullWidth"
              >
                <Tab
                  {...tabAreaProps(0)}
                  label={<FormattedMessage id="securityLevel.0" />}
                />
                <Tab
                  {...tabAreaProps(1)}
                  label={<FormattedMessage id="securityLevel.1" />}
                />
                <Tab
                  {...tabAreaProps(2)}
                  label={<FormattedMessage id="securityLevel.2" />}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={currentTab} index={0}>
              <Grid container spacing={0}>
                {allPages.map((item) => (
                  <Grid key={item.id} xs={12} sm={6} md={4} lg={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={SECURITY_LEVEL_PAGES[0].includes(item.id)}
                        />
                      }
                      label={<FormattedMessage id={item.label} />}
                    />
                  </Grid>
                ))}
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={currentTab} index={1}>
              <Grid container spacing={0}>
                {allPages.map((item) => (
                  <Grid key={item.id} xs={12} sm={6} md={4} lg={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={SECURITY_LEVEL_PAGES[1].includes(item.id)}
                        />
                      }
                      label={<FormattedMessage id={item.label} />}
                    />
                  </Grid>
                ))}
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={currentTab} index={2}>
              <Grid container spacing={0}>
                {allPages.map((item) => (
                  <Grid key={item.id} xs={12} sm={6} md={4} lg={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={SECURITY_LEVEL_PAGES[2].includes(item.id)}
                        />
                      }
                      label={<FormattedMessage id={item.label} />}
                    />
                  </Grid>
                ))}
              </Grid>
            </CustomTabPanel>
          </Stack>
        )}

        <TableContainer component={Paper}>
          <Table size="small" aria-label="role permissions">
            <TableHead>
              <TableRow>
                <TableCell>Sayfa Adı</TableCell>
                <TableCell>Erişimler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rolePermission &&
                rolePermission.split(",").map((item, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <b>
                        <FormattedMessage
                          id={
                            allPages.find((e) => e.id === item.split("-")[0])
                              .label
                          }
                        />
                      </b>
                    </TableCell>
                    <TableCell>
                      {item
                        .split("-")[1]
                        .split("")
                        .map((e, i) => (
                          <Chip
                            key={i}
                            size="small"
                            label={<FormattedMessage id={CRUDS_DEF[e].label} />}
                            icon={CRUDS_DEF[e].icon}
                            color={CRUDS_DEF[e].color}
                            sx={{ mr: 1 }}
                          />
                        ))}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
};

const UserRoleDetails = (data) => {
  const { rolesList, TO_USER_ID } = JSON.parse(data);
  return (
    <>
      <Stack spacing={3}>
        <TextField
          label={<FormattedMessage id="user" />}
          fullWidth
          variant="filled"
          value={TO_USER_ID}
        />
        <TableContainer
          component={Paper}
          elevation={6}
          sx={{ maxHeight: "500px", mt: 3 }}
        >
          <Table size="small" aria-label="User Role Update List" stickyHeader>
            <TableHead sx={{ backgroundColor: "#dbdbdb" }}>
              <TableRow>
                <TableCell>
                  <FormattedMessage id="roleName" />
                </TableCell>
                <TableCell>
                  <FormattedMessage id="process" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rolesList.map((e, i) => (
                <TableRow
                  key={i}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell>{e.ROLE_ID}</TableCell>
                  <TableCell>
                    <Chip
                      label={<FormattedMessage id={e.PROCESS_TYPE} />}
                      color={e.PROCESS_TYPE === "add" ? "success" : "error"}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
};

const FeeDetails = (data) => {
  const {
    isCreateProcess = "N",
    PRODUCT_NAME: products,
    FEE_GROUP_NAME: feeGroup,
    PROCESS_TYPE: processType,
    TRX_CODE,
    COUNTRY: country,
    SHOW_TO_CUSTOMER: showCustomer,
    CUSTOMER_NUMBER: customerNo,
    CUSTOMER_STATUS: customerStatus,
    START_DATE: startDate,
    END_DATE: endDate,
    MIN_FEE: minAmount,
    MAX_FEE: maxAmount,
    SHOW_ON_MOBILE: showOnMobile,
    MOBILE_SHOW_PRIORITY: mobileShowPriority,
    SHOW_ON_WEB: showOnWeb,
    WEB_SHOW_PRIORITY: webShowPriority,
    FEE_NAME: feeName,
    FEE_DESC: feeDesc,
    BATCH_ONLINE: batchOnline,
  } = JSON.parse(data);

  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        {isCreateProcess === "Y" ? (
          <>
            <Autocomplete
              multiple
              value={products}
              fullWidth
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    size="small"
                  />
                ))
              }
              readOnly
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={<FormattedMessage id="products" />}
                  variant="filled"
                />
              )}
            />
            <Autocomplete
              multiple
              value={feeGroup}
              fullWidth
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    size="small"
                  />
                ))
              }
              readOnly
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={<FormattedMessage id="feeGroup" />}
                  variant="filled"
                />
              )}
            />
          </>
        ) : (
          <>
            <TextField
              label={<FormattedMessage id="products" />}
              variant="filled"
              value={products}
              fullWidth
            />
            <TextField
              label={<FormattedMessage id="feeGroup" />}
              variant="filled"
              value={feeGroup}
              fullWidth
            />
          </>
        )}
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <TextField
          label={<FormattedMessage id="processType" />}
          select
          variant="filled"
          fullWidth
          value={processType}
        >
          <MenuItem value="YI,YD">Tümü</MenuItem>
          <MenuItem value="YI">YI - Yurt İçi</MenuItem>
          <MenuItem value="YD">YD - Yurt Dışı</MenuItem>
        </TextField>
        <Autocomplete
          multiple
          value={country ? country?.split(",") : []}
          fullWidth
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip label={option} {...getTagProps({ index })} size="small" />
            ))
          }
          readOnly
          renderInput={(params) => (
            <TextField
              {...params}
              label={<FormattedMessage id="country" />}
              variant="filled"
            />
          )}
        />
      </Stack>
      <Stack
        sx={{
          px: 3,
          pb: "18px",
          borderRadius: "4px",
          border: "2px solid rgba(0, 0, 0, 1)",
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
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
          <FormattedMessage id="trxTypeSelection" />
        </Typography>
        <Autocomplete
          multiple
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip label={option} {...getTagProps({ index })} size="small" />
            ))
          }
          value={TRX_CODE}
          fullWidth
          sx={{ mt: 2 }}
          readOnly
          renderInput={(params) => (
            <TextField
              {...params}
              label={<FormattedMessage id="feeTrxLabel" />}
              variant="filled"
            />
          )}
        />
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <TextField
          label={<FormattedMessage id="startDate" />}
          fullWidth
          variant="filled"
          value={dateConverter(startDate)}
        />
        <TextField
          label={<FormattedMessage id="endDate" />}
          fullWidth
          variant="filled"
          value={dateConverter(endDate)}
        />
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <TextField
          label={<FormattedMessage id="customerNo" />}
          variant="filled"
          sx={{ width: { xs: "100%", md: "35%" } }}
          value={customerNo}
        />
        <FormControl sx={{ width: { xs: "100%", md: "40%" } }}>
          <FormLabel id="customer-status-label">
            <FormattedMessage id="customerStatus" />
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="customer-status-label"
            name="customer-status-group"
            value={customerStatus}
          >
            <FormControlLabel
              value="Y,N"
              control={<Radio />}
              label={<FormattedMessage id="all" />}
            />
            <FormControlLabel
              value="Y"
              control={<Radio />}
              label={<FormattedMessage id="verified" />}
            />
            <FormControlLabel
              value="N"
              control={<Radio />}
              label={<FormattedMessage id="unverified" />}
            />
          </RadioGroup>
        </FormControl>
        <FormControlLabel
          sx={{ width: { xs: "100%", md: "25%" } }}
          control={<Checkbox checked={showCustomer === "Y" ? true : false} />}
          label={<FormattedMessage id="showCustomer" />}
        />
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <TextField
          label={<FormattedMessage id="minAmount" />}
          variant="filled"
          fullWidth
          value={minAmount}
          InputProps={{
            endAdornment: <InputAdornment position="end">TL</InputAdornment>,
          }}
        />
        <TextField
          label={<FormattedMessage id="maxAmount" />}
          variant="filled"
          fullWidth
          value={maxAmount}
          InputProps={{
            endAdornment: <InputAdornment position="end">TL</InputAdornment>,
          }}
        />
      </Stack>
      <Alert
        sx={{
          display: [showOnMobile, showOnWeb].every((e) => e === "N") && "none",
        }}
        severity="info"
      >
        <FormattedMessage id="showPriorityInfo" />
      </Alert>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <Stack direction="column" width={{ xs: "100%", md: "50%" }}>
          <div>
            <PhoneAndroidRoundedIcon color="secondary" sx={{ mr: 2 }} />
            <FormControlLabel
              sx={{ mb: 2 }}
              control={<Switch checked={showOnMobile === "Y" ? true : false} />}
              label={<FormattedMessage id="showOnMobile" />}
            />
          </div>
          <TextField
            sx={{
              display: showOnMobile === "N" && "none",
            }}
            label={<FormattedMessage id="mobileShowPriority" />}
            variant="filled"
            fullWidth
            value={mobileShowPriority}
          />
        </Stack>
        <Stack direction="column" width={{ xs: "100%", md: "50%" }}>
          <div>
            <DesktopWindowsRoundedIcon color="secondary" sx={{ mr: 2 }} />
            <FormControlLabel
              sx={{ mb: 2 }}
              control={<Switch checked={showOnWeb === "Y" ? true : false} />}
              label={<FormattedMessage id="showOnWeb" />}
            />
          </div>
          <TextField
            sx={{
              display: showOnWeb === "N" && "none",
            }}
            label={<FormattedMessage id="webShowPriority" />}
            variant="filled"
            fullWidth
            value={webShowPriority}
          />
        </Stack>
      </Stack>
      <Stack
        sx={{
          px: 3,
          pb: "18px",
          borderRadius: "4px",
          border: "2px solid rgba(0, 0, 0, 1)",
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
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
          <FormattedMessage id="feeListing" />
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{ mt: 2 }}
          spacing={3}
        >
          <TextField
            label={<FormattedMessage id="feeName" />}
            variant="filled"
            fullWidth
            value={feeName}
          />
          <TextField
            multiline
            rows={1}
            label={<FormattedMessage id="feeDesc" />}
            variant="filled"
            fullWidth
            value={feeDesc}
          />
        </Stack>
      </Stack>
      <Stack>
        <Box>
          <FormControl sx={{ width: { xs: "100%", md: "40%" } }}>
            <FormLabel id="batch-online-label">
              <FormattedMessage id="batchOnline" />
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="batch-online-label"
              name="batch-online-group"
              value={batchOnline}
            >
              <FormControlLabel value="O" control={<Radio />} label="Online" />
              <FormControlLabel value="B" control={<Radio />} label="Batch" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Stack>
    </Stack>
  );
};

const FeesDetails = (data) => {
  const {
    FEE_GROUP_NAME,
    RATIO,
    FEE_GROUP_PARENT_NAME,
    FEE_GROUP_PARENT_RATIO,
    SQL_TEXT,
  } = JSON.parse(data);
  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <TextField
          label={<FormattedMessage id="feeGroupName" />}
          variant="filled"
          fullWidth
          value={FEE_GROUP_NAME}
        />
        <TextField
          label={<FormattedMessage id="ratio" />}
          variant="filled"
          fullWidth
          value={RATIO}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <TextField
          label={<FormattedMessage id="FEE_GROUP_PARENT_NAME" />}
          variant="filled"
          fullWidth
          value={FEE_GROUP_PARENT_NAME}
        />
        <TextField
          label={<FormattedMessage id="FEE_GROUP_PARENT_RATIO" />}
          variant="filled"
          fullWidth
          value={FEE_GROUP_PARENT_RATIO}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
      </Stack>
      <Stack>
        <TextField
          fullWidth
          multiline
          variant="filled"
          rows={4}
          label="SQL..."
          value={SQL_TEXT}
        />
      </Stack>
    </Stack>
  );
};

const ProductDetails = (data) => {
  const {
    PRODUCT_NAME,
    PRODUCT_DESCRIPTION,
    PRODUCT_FEE_TYPE,
    CONDITIONS,
    OTHER_FEE,
    OF_PRODUCT_FEE_TYPE,
    OF_PRICE,
    OF_RATIO,
  } = JSON.parse(data);
  const MULTI_CONDITIONS = [
    "cardBalanceStatus",
    "recurringCharge",
    "refund",
    "transactionAmount",
  ];
  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <TextField
          label={<FormattedMessage id="productName" />}
          variant="filled"
          fullWidth
          value={PRODUCT_NAME}
        />
        <TextField
          select
          label={<FormattedMessage id="productFeeType" />}
          variant="filled"
          fullWidth
          value={PRODUCT_FEE_TYPE}
          id="productFeeType"
        >
          <MenuItem value="free">
            <FormattedMessage id="productFeeType.free" />
          </MenuItem>
          <MenuItem value="fixedPrice">
            <FormattedMessage id="productFeeType.fixedPrice" />
          </MenuItem>
          <MenuItem value="fixedRatio">
            <FormattedMessage id="productFeeType.fixedRatio" />
          </MenuItem>
          <MenuItem value="priceAndRatio">
            <FormattedMessage id="productFeeType.priceAndRatio" />
          </MenuItem>
          <MenuItem value="overTranAmount">
            <FormattedMessage id="productFeeType.overTranAmount" />
          </MenuItem>
          <MenuItem value="multipleConditions">
            <FormattedMessage id="productFeeType.multipleConditions" />
          </MenuItem>
        </TextField>
      </Stack>
      <Stack spacing={3}>
        <TextField
          multiline
          rows={2}
          label={<FormattedMessage id="productDescription" />}
          variant="filled"
          fullWidth
          value={PRODUCT_DESCRIPTION}
        />
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        {PRODUCT_FEE_TYPE === "overTranAmount" && (
          <>
            <TextField
              label={<FormattedMessage id="transactionAmount" />}
              variant="filled"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">TL</InputAdornment>
                ),
              }}
              type="number"
              inputProps={{
                step: ".01",
              }}
              placeholder="5000"
              value={CONDITIONS[0].TRANSACTION_AMOUNT}
            />
            <TextField
              select
              label={<FormattedMessage id="transactionOperator" />}
              variant="filled"
              fullWidth
              value={CONDITIONS[0].TRANSACTION_OPERATOR}
            >
              <MenuItem value="=">
                <b>
                  <FormattedMessage id="equal" />
                </b>
                {" (=)"}
              </MenuItem>
              <MenuItem value=">">
                <b>
                  <FormattedMessage id="greater" />
                </b>
                {" (>)"}
              </MenuItem>
              <MenuItem value=">=">
                <b>
                  <FormattedMessage id="greaterEqual" />
                </b>
                {" (>=)"}
              </MenuItem>
              <MenuItem value="<">
                <b>
                  <FormattedMessage id="less" />
                </b>
                {" (<)"}
              </MenuItem>
              <MenuItem value="<=">
                <b>
                  <FormattedMessage id="lessEqual" />
                </b>
                {" (<=)"}
              </MenuItem>
            </TextField>
          </>
        )}
        {(PRODUCT_FEE_TYPE === "fixedPrice" ||
          PRODUCT_FEE_TYPE === "priceAndRatio" ||
          PRODUCT_FEE_TYPE === "overTranAmount") && (
            <TextField
              label={<FormattedMessage id="price" />}
              variant="filled"
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">TL</InputAdornment>,
              }}
              type="number"
              inputProps={{
                step: ".01",
              }}
              placeholder="15,90"
              value={CONDITIONS[0].PRICE}
            />
          )}
        {(PRODUCT_FEE_TYPE === "fixedRatio" ||
          PRODUCT_FEE_TYPE === "priceAndRatio" ||
          PRODUCT_FEE_TYPE === "overTranAmount") && (
            <TextField
              label={<FormattedMessage id="ratio" />}
              variant="filled"
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              type="number"
              inputProps={{
                step: ".01",
              }}
              placeholder="1,04"
              value={CONDITIONS[0].RATIO}
            />
          )}
      </Stack>
      <Stack
        mt={5}
        direction="column"
        sx={{
          display: PRODUCT_FEE_TYPE !== "multipleConditions" && "none",
          backgroundColor: "#ededed",
        }}
        spacing={3}
      >
        {CONDITIONS.map((item, index) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              alignItems: { xs: "center", md: "flex-end" },
              justifyContent: "space-between",
              paddingBottom: 3,
              borderBottom: "1px solid rgba(0,0,0,0.12)",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              {index + 1}.
            </Typography>
            {/* KOŞUL TİPİ */}
            <TextField
              label={<FormattedMessage id="conditionType" />}
              select
              variant="standard"
              fullWidth
              sx={{ ml: { xs: 0, md: 3 }, mt: { xs: 3, md: 0 } }}
              value={item.CONDITION_TYPE}
            >
              {MULTI_CONDITIONS.map((e) => (
                <MenuItem key={e} value={e}>
                  <FormattedMessage id={e} />
                </MenuItem>
              ))}
            </TextField>
            {/* TEKRAR ADEDİ */}
            <TextField
              fullWidth
              variant="standard"
              sx={{
                ml: { xs: 0, md: 3 },
                mt: { xs: 3, md: 0 },
                display: item.CONDITION_TYPE !== "recurringCharge" && "none",
              }}
              label={<FormattedMessage id="repeatCount" />}
              id="REPEAT_COUNT"
              name="REPEAT_COUNT"
              value={item.REPEAT_COUNT}
            />
            {/* İŞLEM TUTARI */}
            <TextField
              fullWidth
              variant="standard"
              sx={{
                ml: { xs: 0, md: 3 },
                mt: { xs: 3, md: 0 },
                display:
                  item.CONDITION_TYPE !== "transactionAmount" &&
                  item.CONDITION_TYPE !== "refund" &&
                  "none",
              }}
              label={<FormattedMessage id="transactionAmount" />}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">TL</InputAdornment>
                ),
              }}
              type="number"
              inputProps={{
                step: ".01",
              }}
              placeholder="5000"
              id="TRANSACTION_AMOUNT"
              name="TRANSACTION_AMOUNT"
              value={item.TRANSACTION_AMOUNT}
            />
            {/* İŞLEM OPERATÖRÜ */}
            <TextField
              fullWidth
              variant="standard"
              sx={{
                ml: { xs: 0, md: 3 },
                mt: { xs: 3, md: 0 },
                display: item.CONDITION_TYPE === "refund" && "none",
              }}
              select
              label={<FormattedMessage id="transactionOperator" />}
              id="TRANSACTION_OPERATOR"
              name="TRANSACTION_OPERATOR"
              value={item.TRANSACTION_OPERATOR}
            >
              <MenuItem value="=">
                <b>
                  <FormattedMessage id="equal" />
                </b>
                {" (=)"}
              </MenuItem>
              <MenuItem value=">">
                <b>
                  <FormattedMessage id="greater" />
                </b>
                {" (>)"}
              </MenuItem>
              <MenuItem value=">=">
                <b>
                  <FormattedMessage id="greaterEqual" />
                </b>
                {" (>=)"}
              </MenuItem>
              <MenuItem value="<">
                <b>
                  <FormattedMessage id="less" />
                </b>
                {" (<)"}
              </MenuItem>
              <MenuItem value="<=">
                <b>
                  <FormattedMessage id="lessEqual" />
                </b>
                {" (<=)"}
              </MenuItem>
              <MenuItem value="IN">
                <b>
                  <FormattedMessage id="in" />
                </b>
                {" (IN)"}
              </MenuItem>
              <MenuItem value="NOT IN">
                <b>
                  <FormattedMessage id="notIn" />
                </b>
                {" (NOT IN)"}
              </MenuItem>
            </TextField>
            {/* ZAMAN TEKRARI */}
            <TextField
              fullWidth
              variant="standard"
              sx={{
                ml: { xs: 0, md: 3 },
                mt: { xs: 3, md: 0 },
                display: item.CONDITION_TYPE !== "recurringCharge" && "none",
              }}
              select
              label={<FormattedMessage id="timeRepeat" />}
              id="TIME_REPEAT"
              name="TIME_REPEAT"
              value={item.TIME_REPEAT}
            >
              <MenuItem value="7">
                <FormattedMessage id="every.7" />
              </MenuItem>
              <MenuItem value="14">
                <FormattedMessage id="every.14" />
              </MenuItem>
              <MenuItem value="30">
                <FormattedMessage id="every.30" />
              </MenuItem>
              <MenuItem value="60">
                <FormattedMessage id="every.60" />
              </MenuItem>
              <MenuItem value="90">
                <FormattedMessage id="every.90" />
              </MenuItem>
              <MenuItem value="180">
                <FormattedMessage id="every.180" />
              </MenuItem>
              <MenuItem value="365">
                <FormattedMessage id="every.365" />
              </MenuItem>
            </TextField>
            {/* İADE ZAMANI */}
            <TextField
              fullWidth
              variant="standard"
              sx={{
                ml: { xs: 0, md: 3 },
                mt: { xs: 3, md: 0 },
                display: item.CONDITION_TYPE !== "refund" && "none",
              }}
              select
              label={<FormattedMessage id="refundTime" />}
              id="REFUND_TIME"
              name="REFUND_TIME"
              value={item.REFUND_TIME}
            >
              <MenuItem value="after_card_activation">
                <FormattedMessage id="afterCardActivation" />
              </MenuItem>
              <MenuItem value="after_first_transaction">
                <FormattedMessage id="afterFirstTransaction" />
              </MenuItem>
            </TextField>
            {/* FİYAT */}
            <TextField
              fullWidth
              variant="standard"
              sx={{
                ml: { xs: 0, md: 3 },
                mt: { xs: 3, md: 0 },
                display:
                  item.CONDITION_TYPE !== "transactionAmount" &&
                  item.CONDITION_TYPE !== "recurringCharge" &&
                  item.CONDITION_TYPE !== "refund" &&
                  "none",
              }}
              label={
                <FormattedMessage
                  id={
                    item.CONDITION_TYPE === "refund" ? "refundAmount" : "price"
                  }
                />
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">TL</InputAdornment>
                ),
              }}
              type="number"
              inputProps={{
                step: ".01",
              }}
              placeholder="2,89"
              id="PRICE"
              name="PRICE"
              value={item.PRICE}
            />
            {/* ORAN */}
            <TextField
              fullWidth
              variant="standard"
              sx={{
                ml: { xs: 0, md: 3 },
                mt: { xs: 3, md: 0 },
                display:
                  item.CONDITION_TYPE !== "transactionAmount" &&
                  item.CONDITION_TYPE !== "refund" &&
                  "none",
              }}
              label={
                <FormattedMessage
                  id={
                    item.CONDITION_TYPE === "refund" ? "refundRatio" : "ratio"
                  }
                />
              }
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              type="number"
              inputProps={{
                step: ".01",
              }}
              placeholder="1,04"
              id="RATIO"
              name="RATIO"
              value={item.RATIO}
            />
            <IconButton
              disabled
              aria-label="delete condition"
              color="error"
              size="small"
              sx={{
                ml: { xs: 0, md: 3 },
                mt: { xs: 3, md: 0 },
              }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Box>
        ))}
      </Stack>
      <Stack
        sx={{
          px: 3,
          pb: "18px",
          borderRadius: "4px",
          border: "1px solid rgba(0, 0, 0, 1)",
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
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
          <FormattedMessage id="OTHER_FEE" />
        </Typography>
        <FormControlLabel
          control={<Checkbox checked={OTHER_FEE} />}
          label={<FormattedMessage id="OTHER_FEE" />}
        />
        {OTHER_FEE && (
          <Stack direction={{ xs: "column", md: "row" }} mt={2} spacing={2}>
            <TextField
              select
              label={<FormattedMessage id="OFProductFeeType" />}
              variant="filled"
              fullWidth
              value={OF_PRODUCT_FEE_TYPE}
            >
              <MenuItem value="fixedPrice">
                <FormattedMessage id="productFeeType.fixedPrice" />
              </MenuItem>
              <MenuItem value="fixedRatio">
                <FormattedMessage id="productFeeType.fixedRatio" />
              </MenuItem>
              <MenuItem value="priceAndRatio">
                <FormattedMessage id="productFeeType.priceAndRatio" />
              </MenuItem>
            </TextField>
            {OF_PRODUCT_FEE_TYPE !== "fixedRatio" && (
              <TextField
                label={<FormattedMessage id="OFPrice" />}
                variant="filled"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">TL</InputAdornment>
                  ),
                }}
                type="number"
                inputProps={{
                  step: ".01",
                }}
                placeholder="15,90"
                value={OF_PRICE}
              />
            )}
            {OF_PRODUCT_FEE_TYPE !== "fixedPrice" && (
              <TextField
                label={<FormattedMessage id="OFRatio" />}
                variant="filled"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                type="number"
                inputProps={{
                  step: ".01",
                }}
                placeholder="1,04"
                value={OF_RATIO}
              />
            )}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

const CardStatusDetails = (data) => {
  const {
    cardStatus,
    cardProcess,
    walletCard,
    cardDetails,
    cardRenew,
    cardBrand,
    ADDRESS,
  } = JSON.parse(data);

  return (
    <Grid container spacing={3}>
      <Grid xs={12}>
        <Stack
          sx={{
            p: 3,
            borderRadius: "4px",
            border: "1px solid rgba(0, 0, 0, 1)",
            transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            color: "rgba(0, 0, 0, 0.87)",
          }}
          component="fieldset"
          spacing={2}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.25rem",
              letterSpacing: ".5px",
              fontWeight: "bold",
            }}
            component="legend"
          >
            <FormattedMessage id="customerCardInformations" />
          </Typography>
          <Stack
            direction={{ xs: "column", md: "row" }}
            sx={{ marginTop: "0 !important" }}
            spacing={2}
          >
            <TextField
              fullWidth
              size="small"
              label={<FormattedMessage id="customerNameSurname" />}
              value={`${cardDetails.FIRST_NAME} ${cardDetails.LAST_NAME}`}
              disabled
            />
            <TextField
              fullWidth
              size="small"
              label={<FormattedMessage id="cardNo" />}
              value={cardDetails.CARD_NO}
              disabled
            />
            <TextField
              fullWidth
              size="small"
              label={<FormattedMessage id="cardEmbossDate" />}
              value={dateConverter(
                cardDetails.kartBasimTarihi,
                "dateonly",
                "dotdate"
              )}
              disabled
            />
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              fullWidth
              size="small"
              label={<FormattedMessage id="walletName" />}
              value={cardDetails?.WALLET_NAME || ""}
              disabled
            />
            <TextField
              fullWidth
              size="small"
              label={<FormattedMessage id="walletNo" />}
              value={cardDetails?.WALLET_NO}
              disabled
            />
          </Stack>
        </Stack>
      </Grid>
      <Grid xs={12}>
        <Stack
          sx={{
            p: 3,
            borderRadius: "4px",
            border: "1px solid rgba(0, 0, 0, 1)",
            transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            color: "rgba(0, 0, 0, 0.87)",
          }}
          component="fieldset"
          spacing={2}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.25rem",
              letterSpacing: ".5px",
              fontWeight: "bold",
            }}
            component="legend"
          >
            <FormattedMessage id="cardRenew" />
          </Typography>
          <Stack
            direction={{ xs: "column", md: "row" }}
            sx={{ marginTop: "0 !important" }}
            spacing={2}
          >
            <FormControl fullWidth>
              <FormLabel id="card-renew-label">
                <FormattedMessage id="willCardRenewal" />
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="card-renew-label"
                name="card-renew"
                value={cardRenew}
              >
                <FormControlLabel
                  value="Y"
                  control={<Radio />}
                  label={<FormattedMessage id="yes" />}
                />
                <FormControlLabel
                  value="N"
                  control={<Radio />}
                  label={<FormattedMessage id="no" />}
                />
              </RadioGroup>
            </FormControl>
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <FormControl fullWidth disabled={cardRenew === "N"}>
              <FormLabel id="card-brand-label">
                <FormattedMessage id="cardBrand" />
              </FormLabel>
              <FormGroup row aria-labelledby="card-brand-label">
                <FormControlLabel
                  control={<Checkbox checked={cardBrand === "V"} />}
                  label="VISA"
                />
                <FormControlLabel
                  control={<Checkbox checked={cardBrand === "M"} />}
                  label="Mastercard"
                />
                <FormControlLabel
                  control={<Checkbox checked={cardBrand === "B"} />}
                  label="Troy"
                />
              </FormGroup>
            </FormControl>
            <TextField
              label={<FormattedMessage id="cardSendingAddress" />}
              fullWidth
              multiline
              rows={2}
              variant="filled"
              value={ADDRESS || ""}
              disabled={cardRenew === "N"}
            />
          </Stack>
        </Stack>
      </Grid>
      <Grid xs={12}>
        <Stack
          sx={{
            p: 3,
            borderRadius: "4px",
            border: "1px solid rgba(0, 0, 0, 1)",
            transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            color: "rgba(0, 0, 0, 0.87)",
          }}
          component="fieldset"
          spacing={2}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.25rem",
              letterSpacing: ".5px",
              fontWeight: "bold",
            }}
            component="legend"
          >
            <FormattedMessage id="status" />
          </Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              label={<FormattedMessage id="currentCardStatus" />}
              fullWidth
              variant="filled"
              value={`${cardDetails.kartStatusu} - ${cardDetails.kartStatuAciklama}`}
              disabled
            />
            <TextField
              label={<FormattedMessage id="currentCardSubStatus" />}
              fullWidth
              variant="filled"
              value={
                cardDetails.kartAltStatusu
                  ? `${cardDetails.kartAltStatusu} - ${cardDetails.kartAltStatuAciklama}`
                  : ""
              }
              disabled
            />
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              label={<FormattedMessage id="newCardStatus" />}
              fullWidth
              variant="filled"
              value={cardStatus?.STATUS_DESC}
            />

            <TextField
              label={<FormattedMessage id="newCardSubStatus" />}
              fullWidth
              variant="filled"
              value={cardStatus?.SUB_STATUS_DESC}
            />
          </Stack>
        </Stack>
      </Grid>
      <Grid xs={12}>
        <Stack
          sx={{
            p: 3,
            borderRadius: "4px",
            border: "1px solid rgba(0, 0, 0, 1)",
            transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            color: "rgba(0, 0, 0, 0.87)",
          }}
          component="fieldset"
          spacing={2}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.25rem",
              letterSpacing: ".5px",
              fontWeight: "bold",
            }}
            component="legend"
          >
            <FormattedMessage id="changeWallet" />
          </Typography>
          <Stack
            direction={{ xs: "column", md: "row" }}
            sx={{ marginTop: "0 !important" }}
            spacing={2}
          >
            <TextField
              label={<FormattedMessage id="wallets" />}
              fullWidth
              variant="filled"
              value={walletCard?.NEW_WALLET_NO || ""}
            />
          </Stack>
        </Stack>
      </Grid>
      <Grid xs={12}>
        <Stack
          sx={{
            p: 3,
            borderRadius: "4px",
            border: "1px solid rgba(0, 0, 0, 1)",
            transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            color: "rgba(0, 0, 0, 0.87)",
          }}
          component="fieldset"
          spacing={2}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.25rem",
              letterSpacing: ".5px",
              fontWeight: "bold",
            }}
            component="legend"
          >
            <FormattedMessage id="processLimits" />
          </Typography>
          <Stack
            direction={{ xs: "column", md: "row" }}
            sx={{ marginTop: "0 !important" }}
            spacing={2}
          >
            <TableContainer
              component={Paper}
              elevation={6}
              sx={{ maxHeight: "500px" }}
            >
              <Table size="small" aria-label="Process Limit List" stickyHeader>
                <TableHead sx={{ backgroundColor: "#dbdbdb" }}>
                  <TableRow>
                    <TableCell>
                      <FormattedMessage id="process" />
                    </TableCell>
                    <TableCell>
                      <FormattedMessage id="transactionCode" />
                    </TableCell>
                    <TableCell>
                      <FormattedMessage id="transactionSubcode" />
                    </TableCell>
                    <TableCell>
                      <FormattedMessage id="processType" />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cardProcess.map((e, i) => (
                    <TableRow
                      key={i}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                      hover
                    >
                      <TableCell>
                        <Chip
                          label={
                            <FormattedMessage
                              id={e.UPDATE_TYPE === "I" ? "add" : "remove"}
                            />
                          }
                          color={e.UPDATE_TYPE === "I" ? "success" : "error"}
                        />
                      </TableCell>
                      <TableCell>{e.PROCESS_CODE}</TableCell>
                      <TableCell>{e.PROCESS_SUB_CODE}</TableCell>
                      <TableCell>
                        {e.PROCESS_TYPE === "YI"
                          ? "YI - Yurt İçi"
                          : e.PROCESS_TYPE === "YD"
                            ? "YD - Yurt Dışı"
                            : "YI - Yurt İçi ve YD - Yurt Dışı"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

const CustomerStatusDetails = (data) => {
  const { TCKN, STATUS_DESC, cardDetails, DESCRIPTION } = JSON.parse(data);

  return (
    <Grid container spacing={3}>
      <Grid xs={12} lg={4}>
        <TextField
          fullWidth
          size="small"
          label={<FormattedMessage id="tckn" />}
          value={TCKN}
          disabled
        />
      </Grid>
      <Grid xs={12} lg={4}>
        <TextField
          fullWidth
          size="small"
          label={<FormattedMessage id="walletNo" />}
          value={cardDetails.WALLET_NO}
          disabled
        />
      </Grid>
      <Grid xs={12} lg={4}>
        <TextField
          fullWidth
          size="small"
          label={<FormattedMessage id="cardNo" />}
          value={cardDetails.CARD_NO}
          disabled
        />
      </Grid>
      <Grid xs={12} lg={4}>
        <TextField
          fullWidth
          size="small"
          label={<FormattedMessage id="customerNameSurname" />}
          value={`${cardDetails.FIRST_NAME} ${cardDetails.LAST_NAME}`}
          disabled
        />
      </Grid>
      <Grid xs={12} lg={4}>
        <TextField
          fullWidth
          size="small"
          label={<FormattedMessage id="customerNo" />}
          value={cardDetails.CUSTOMER_ID}
          disabled
        />
      </Grid>
      <Grid xs={12} lg={4}>
        <TextField
          fullWidth
          size="small"
          label={<FormattedMessage id="boCustomerStatus" />}
          value={cardDetails.STATUS}
          disabled
        />
      </Grid>
      <Grid xs={12} lg={6}>
        <TextField
          fullWidth
          size="small"
          label={<FormattedMessage id="currentDesc" />}
          value={cardDetails.OLD_DESC}
          disabled
        />
      </Grid>
      <Grid xs={12} lg={6}>
        <TextField
          fullWidth
          size="small"
          label={<FormattedMessage id="statusChangeDate" />}
          value={dateConverter(cardDetails.STATUS_CHANGE_DATE)}
          disabled
        />
      </Grid>
      <Grid xs={12} mt={2}>
        <TextField
          label={<FormattedMessage id="boNewCustomerStatus" />}
          fullWidth
          variant="filled"
          value={STATUS_DESC.desc}
        />
      </Grid>
      <Grid xs={12} mt={2}>
        <TextField
          label={<FormattedMessage id="newDesc" />}
          fullWidth
          variant="filled"
          multiline
          rows={2}
          value={DESCRIPTION}
        />
      </Grid>
    </Grid>
  );
};

const ParametersDetails = (data) => {
  const { KEY, VALUE, DESCRIPTION, CATEGORY, USER } = JSON.parse(data);

  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <TextField
          label={<FormattedMessage id="params.key" />}
          fullWidth
          variant="filled"
          value={KEY}
          disabled
        />
        <TextField
          label={<FormattedMessage id="user" />}
          fullWidth
          variant="filled"
          value={USER}
        />
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <TextField
          label={<FormattedMessage id="category" />}
          fullWidth
          variant="filled"
          value={CATEGORY}
        />
        <TextField
          label={<FormattedMessage id="params.value" />}
          fullWidth
          variant="filled"
          value={VALUE}
        />
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <TextField
          label={<FormattedMessage id="params.desc" />}
          fullWidth
          variant="filled"
          value={DESCRIPTION}
          multiline
          rows={2}
        />
      </Stack>
    </Stack>
  );
};

const NotificationPoolDetails = (data) => {
  const { POOL_CODE, POOL_NAME } = JSON.parse(data);
  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <TextField
          label={<FormattedMessage id="poolName" />}
          fullWidth
          variant="filled"
          value={POOL_NAME}
        />
        <TextField
          label={<FormattedMessage id="poolCode" />}
          fullWidth
          variant="filled"
          value={POOL_CODE}
        />
      </Stack>
    </Stack>
  );
};

const ComplaintReplyDetails = (data) => {
  const { MESSAGE, COMM_PREF, CLOSE_CODE } = JSON.parse(data);

  return (
    <>
      <Paper elevation={6} sx={{ p: 2, mb: 2 }}>
        <TextField
          multiline
          rows={2}
          label={<FormattedMessage id="DESCRIPTION" />}
          fullWidth
          value={MESSAGE}
          inputProps={{ style: { resize: "vertical" } }}
        />
      </Paper>
      <Paper elevation={6} sx={{ p: 2, mb: 2 }}>
        <Typography fontWeight="bold" letterSpacing="1px" pb={2}>
          <FormattedMessage id="contactPreference" />
        </Typography>
        <FormControlLabel
          control={<Radio checked disableRipple />}
          label={COMM_PREF}
        />
      </Paper>
      <Box>
        <TextField
          select
          fullWidth
          label={<FormattedMessage id="complaintCloseCode" />}
          value={CLOSE_CODE}
        >
          <MenuItem value="1">Dosyalandı</MenuItem>
          <MenuItem value="2">İptal</MenuItem>
          <MenuItem value="3">Cevaplandı</MenuItem>
        </TextField>
      </Box>
    </>
  );
};

const LimitDetails = (data) => {
  const {
    CUSTOMER_TYPE,
    BALANCE_LIMIT_MAX,
    TRANSFER_LIMIT_MAX,
    DAILY_LIMIT_MAX,
    MONTHLY_LIMIT_MAX,
    ANNUAL_LIMIT_MAX,
    DAILY_TRAN_COUNT_LIMIT,
    MOTHLY_TRAN_COUNT_LIMIT,
    ANNUAL_TRAN_COUNT_LIMIT,
    WALLET_NO,
    TRX_TYPE_GROUP_NAME,
    TRX_TYPE_GROUP_DESC,
    TRX_TYPE_GROUP_DAILY_DESC,
    TRX_TYPE_GROUP_MONTHLY_DESC,
    IS_VISIBLE,
    IS_BALANCE,
    IS_GENERAL_LIMIT,
    trxCode,
  } = JSON.parse(data);

  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <Box sx={{ width: { xs: "100%", md: "33%" } }}>
          <FormControlLabel
            control={<Checkbox checked={IS_VISIBLE === "Y" ? true : false} />}
            label={<FormattedMessage id="isVisible" />}
          />
        </Box>
        <Box sx={{ width: { xs: "100%", md: "33%" } }}>
          <FormControlLabel
            control={
              <Switch checked={IS_GENERAL_LIMIT === "Y" ? true : false} />
            }
            label={<FormattedMessage id="isGeneralLimit" />}
          />
        </Box>
        {IS_GENERAL_LIMIT === "Y" ? (
          <TextField
            select
            label={<FormattedMessage id="CUSTOMER_TYPE" />}
            sx={{ width: { xs: "100%", md: "34%" } }}
            variant="filled"
            value={CUSTOMER_TYPE}
          >
            <MenuItem value="csty00">DOĞRULANMIŞ</MenuItem>
            <MenuItem value="csty01">DOĞRULANMAMIŞ</MenuItem>
          </TextField>
        ) : (
          <TextField
            label={<FormattedMessage id="WALLET_NO" />}
            sx={{ width: { xs: "100%", md: "34%" } }}
            variant="filled"
            value={WALLET_NO}
          />
        )}
      </Stack>
      <Stack
        sx={{
          px: 3,
          pb: "18px",
          borderRadius: "4px",
          border: "2px solid rgba(0, 0, 0, 1)",
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
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
          <FormattedMessage id="trxTypeSelection" />
        </Typography>
        <Box>
          <FormControlLabel
            control={<Switch checked={IS_BALANCE === "Y"} />}
            label={<FormattedMessage id="enterBalanceLimit" />}
          />
        </Box>
        <Autocomplete
          multiple
          value={trxCode}
          fullWidth
          sx={{ mt: 2 }}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip label={option} {...getTagProps({ index })} size="small" />
            ))
          }
          readOnly
          disabled={IS_BALANCE === "Y"}
          renderInput={(params) => (
            <TextField
              {...params}
              label={<FormattedMessage id="limitTrxLabel" />}
              variant="filled"
            />
          )}
        />
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        {IS_BALANCE !== "Y" && (
          <TextField
            label={<FormattedMessage id="TRANSFER_LIMIT_MAX" />}
            fullWidth
            variant="filled"
            value={TRANSFER_LIMIT_MAX}
            InputProps={{
              endAdornment: <InputAdornment position="end">TL</InputAdornment>,
            }}
          />
        )}
        {IS_BALANCE === "Y" && (
          <TextField
            label={<FormattedMessage id="BALANCE_LIMIT_MAX" />}
            fullWidth
            variant="filled"
            value={BALANCE_LIMIT_MAX}
            InputProps={{
              endAdornment: <InputAdornment position="end">TL</InputAdornment>,
            }}
          />
        )}
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <TextField
          label={<FormattedMessage id="TRX_TYPE_GROUP_NAME" />}
          fullWidth
          variant="filled"
          value={TRX_TYPE_GROUP_NAME}
        />
        <TextField
          multiline
          label={<FormattedMessage id="TRX_TYPE_GROUP_DESC" />}
          fullWidth
          variant="filled"
          value={TRX_TYPE_GROUP_DESC}
        />
      </Stack>
      <Grid container spacing={3}>
        {IS_BALANCE !== "Y" && (
          <Grid xs={12} xl={4}>
            <Stack
              sx={{
                p: 3,
                borderRadius: "4px",
                border: "1px solid rgba(0, 0, 0, 1)",
                transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                color: "rgba(0, 0, 0, 0.87)",
                width: "100%",
              }}
              component="fieldset"
              spacing={0}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.25rem",
                  letterSpacing: ".5px",
                  fontWeight: "bold",
                }}
                component="legend"
              >
                <Box
                  boxShadow={1}
                  sx={{
                    display: "inline-flex",
                    width: "32px",
                    height: "32px",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 1,
                    backgroundColor: "secondary.main",
                    color: "#fff",
                    p: 1,
                    fontSize: ".75rem",
                    borderRadius: ".25rem",
                  }}
                >
                  1
                </Box>
                <FormattedMessage id="DAILY_LIMIT_MAX" />
              </Typography>
              <Stack
                direction="column"
                sx={{ marginTop: "0 !important" }}
                spacing={3}
              >
                <TextField
                  label={<FormattedMessage id="totalTranAmount" />}
                  fullWidth
                  variant="filled"
                  value={DAILY_LIMIT_MAX}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">TL</InputAdornment>
                    ),
                  }}
                />
                {IS_GENERAL_LIMIT === "Y" && (
                  <TextField
                    label={<FormattedMessage id="totalTranCount" />}
                    fullWidth
                    variant="filled"
                    value={DAILY_TRAN_COUNT_LIMIT}
                    placeholder={!DAILY_TRAN_COUNT_LIMIT ? "Sınırsız" : ""}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">adet</InputAdornment>
                      ),
                    }}
                  />
                )}
                <TextField
                  label={<FormattedMessage id="TRX_TYPE_GROUP_DAILY_DESC" />}
                  fullWidth
                  variant="filled"
                  value={TRX_TYPE_GROUP_DAILY_DESC}
                />
              </Stack>
            </Stack>
          </Grid>
        )}

        {(IS_BALANCE !== "Y" ||
          (IS_GENERAL_LIMIT === "Y" && CUSTOMER_TYPE === "csty01")) && (
            <Grid xs={12} xl={4}>
              <Stack
                sx={{
                  p: 3,
                  borderRadius: "4px",
                  border: "1px solid rgba(0, 0, 0, 1)",
                  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  color: "rgba(0, 0, 0, 0.87)",
                  width: "100%",
                }}
                component="fieldset"
                spacing={0}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1.25rem",
                    letterSpacing: ".5px",
                    fontWeight: "bold",
                  }}
                  component="legend"
                >
                  <Box
                    boxShadow={1}
                    sx={{
                      display: "inline-flex",
                      width: "32px",
                      height: "32px",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 1,
                      backgroundColor: "secondary.main",
                      color: "#fff",
                      p: 1,
                      fontSize: ".75rem",
                      borderRadius: ".25rem",
                    }}
                  >
                    30
                  </Box>
                  <FormattedMessage id="MONTHLY_LIMIT_MAX" />
                </Typography>
                <Stack
                  direction="column"
                  sx={{ marginTop: "0 !important" }}
                  spacing={3}
                >
                  <TextField
                    label={<FormattedMessage id="totalTranAmount" />}
                    fullWidth
                    variant="filled"
                    value={MONTHLY_LIMIT_MAX}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">TL</InputAdornment>
                      ),
                    }}
                  />
                  {IS_GENERAL_LIMIT === "Y" && IS_BALANCE !== "Y" && (
                    <TextField
                      label={<FormattedMessage id="totalTranCount" />}
                      fullWidth
                      variant="filled"
                      value={MOTHLY_TRAN_COUNT_LIMIT}
                      placeholder={!MOTHLY_TRAN_COUNT_LIMIT ? "Sınırsız" : ""}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">adet</InputAdornment>
                        ),
                      }}
                    />
                  )}
                  {IS_BALANCE !== "Y" && (
                    <TextField
                      label={
                        <FormattedMessage id="TRX_TYPE_GROUP_MONTHLY_DESC" />
                      }
                      fullWidth
                      variant="filled"
                      value={TRX_TYPE_GROUP_MONTHLY_DESC}
                    />
                  )}
                </Stack>
              </Stack>
            </Grid>
          )}

        {IS_BALANCE !== "Y" && (
          <Grid xs={12} xl={4}>
            <Stack
              sx={{
                p: 3,
                borderRadius: "4px",
                border: "1px solid rgba(0, 0, 0, 1)",
                transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                color: "rgba(0, 0, 0, 0.87)",
                width: "100%",
              }}
              component="fieldset"
              spacing={0}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.25rem",
                  letterSpacing: ".5px",
                  fontWeight: "bold",
                }}
                component="legend"
              >
                <Box
                  boxShadow={1}
                  sx={{
                    display: "inline-flex",
                    width: "32px",
                    height: "32px",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 1,
                    backgroundColor: "secondary.main",
                    color: "#fff",
                    p: 1,
                    fontSize: ".75rem",
                    borderRadius: ".25rem",
                  }}
                >
                  365
                </Box>
                <FormattedMessage id="ANNUAL_LIMIT_MAX" />
              </Typography>
              <Stack
                direction="column"
                sx={{ marginTop: "0 !important" }}
                spacing={3}
              >
                <TextField
                  label={<FormattedMessage id="totalTranAmount" />}
                  fullWidth
                  variant="filled"
                  value={ANNUAL_LIMIT_MAX}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">TL</InputAdornment>
                    ),
                  }}
                />
                {IS_GENERAL_LIMIT === "Y" && (
                  <TextField
                    label={<FormattedMessage id="totalTranCount" />}
                    fullWidth
                    variant="filled"
                    value={ANNUAL_TRAN_COUNT_LIMIT}
                    placeholder={!ANNUAL_TRAN_COUNT_LIMIT ? "Sınırsız" : ""}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">adet</InputAdornment>
                      ),
                    }}
                  />
                )}
              </Stack>
            </Stack>
          </Grid>
        )}
      </Grid>
    </Stack>
  );
};

//FeeGroupCustomerDetails
const FeeGroupCustomerDetails = (data) => {
  const {
    customer,
    FEE_GROUP_CUSTOMER_LIST,
    FEE_GROUPS,
    SQL_TEXT,
    EXCEL_DATAS,
  } = JSON.parse(data);


  if (!customer || !FEE_GROUP_CUSTOMER_LIST ) {
    return (
      <Box>
        <Stack
          component="fieldset"
          spacing={2}
        >
          <TextField
            fullWidth
            multiline
            disabled
            variant="filled"
            rows={4}
            label="SQL..."
            value={SQL_TEXT}
          />

          <TableContainer
            component={Paper}
            elevation={6}
            sx={{ maxHeight: "500px", mt: 3 }}
          >
            <Table size="small" aria-label="Fee Group List" stickyHeader>
              <TableHead sx={{ backgroundColor: "#dbdbdb" }}>
                <TableRow>
                  <TableCell>
                    <FormattedMessage id="process" />
                  </TableCell>
                  <TableCell>
                    <FormattedMessage id="feeGroup" />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {FEE_GROUPS.map((e, i) => (
                  <TableRow
                    key={i}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                    hover
                  >
                    <TableCell>
                      {/* <Chip
                        label={
                          <FormattedMessage
                            id={e.PROCESS === "I" ? "add" : "remove"}
                          />
                        }
                        color={e.PROCESS === "I" ? "success" : "error"}
                      /> */}
                      <Chip
                        label={<FormattedMessage id="add" />}
                        color="success"
                      />
                    </TableCell>
                    <TableCell>{e.label}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </Stack>
      </Box>);

  } else if (!FEE_GROUPS || !SQL_TEXT ) {
    return (
      <Box>
        {Object.keys(customer).length > 0 && (
          <Stack
            sx={{
              mt: 3,
              p: 3,
              borderRadius: "4px",
              border: "2px solid rgba(0, 0, 0, 1)",
              transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              color: "rgba(0, 0, 0, 0.87)",
            }}
            component="fieldset"
            spacing={2}
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
            <Grid
              container
              direction="row"
              sx={{ marginTop: "0 !important" }}
              spacing={2}
            >
              <Grid xs={12} md={3}>
                <Box p={1} sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                  <Typography fontWeight="bold">
                    <FormattedMessage id="tckn" />
                  </Typography>
                  <Typography pl={4}>{customer.TCKN}</Typography>
                </Box>
              </Grid>
              <Grid xs={12} md={3}>
                <Box p={1} sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                  <Typography fontWeight="bold">
                    <FormattedMessage id="customerNo" />
                  </Typography>
                  <Typography pl={4}>{customer.CUSTOMER_ID}</Typography>
                </Box>
              </Grid>
              <Grid xs={12} md={3}>
                <Box p={1} sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                  <Typography fontWeight="bold">
                    <FormattedMessage id="phone" />
                  </Typography>
                  <Typography pl={4}>
                    {gsmNoFormatter(customer.GSM_NO)}
                  </Typography>
                </Box>
              </Grid>
              <Grid xs={12} md={3}>
                <Box p={1} sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                  <Typography fontWeight="bold">
                    <FormattedMessage id="email" />
                  </Typography>
                  <Typography pl={4}>{customer.EMAIL}</Typography>
                </Box>
              </Grid>
              <Grid xs={12}>
                <Box p={1} sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                  <Typography fontWeight="bold" component="span">
                    <FormattedMessage id="currentFeeGroups" />
                  </Typography>
                  {customer.FEE_GROUPS.map((e, i) => (
                    <Chip
                      key={i}
                      label={`${e.id} - ${e.label} | ${e.ratio}`}
                      sx={{ mx: 1 }}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Stack>
        )}

        <TableContainer
          component={Paper}
          elevation={6}
          sx={{ maxHeight: "500px", mt: 3 }}
        >
          <Table size="small" aria-label="Fee Group List" stickyHeader>
            <TableHead sx={{ backgroundColor: "#dbdbdb" }}>
              <TableRow>
                <TableCell>
                  <FormattedMessage id="process" />
                </TableCell>
                <TableCell>
                  <FormattedMessage id="feeGroup" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {FEE_GROUP_CUSTOMER_LIST.map((e, i) => (
                <TableRow
                  key={i}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                  hover
                >
                  <TableCell>
                    <Chip
                      label={
                        <FormattedMessage
                          id={e.PROCESS === "I" ? "add" : "remove"}
                        />
                      }
                      color={e.PROCESS === "I" ? "success" : "error"}
                    />
                  </TableCell>
                  <TableCell>{e.FEE_GROUP_NAME}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  } 
  else if (EXCEL_DATAS && (!customer || !FEE_GROUP_CUSTOMER_LIST || !FEE_GROUPS || !SQL_TEXT)) {
    return (
      <Box>
        <Stack
          component="fieldset"
          spacing={2}
        >
          <Box p={1} sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <Typography fontWeight="bold">
              <FormattedMessage id="batchExcelUploaded" />
            </Typography>
          </Box>
        </Stack>
      </Box>
    );
  }
};

const WalletAddBlockDetails = (data) => {
  const {
    selectedWallets,
    blockReason,
    DOCS,
    BLOCK_TYPE,
    BLOCK_AMOUNT,
    BLOCK_END_DATE,
    DECISION_AUTHORY,
    DECISION_NO,
    DECISION_DATE,
    SEIZURE_AMOUNT,
    BLOCK_DESC,
  } = JSON.parse(data);
  //cüzdandaki blokeleri göster butonu
  const [popupWalletNo, setPopupWalletNo] = useState(""); // popupda seçilen cüzdanın nosu label
  const [openBlocksDialog, setOpenBlocksDialog] = useState(false); //popup aç kapa
  const [openBlocksHistoryDialog, setOpenBlocksHistoryDialog] = useState(false); //popup aç kapa
  const showBlocks = (walletNo) => {
    setPopupWalletNo(walletNo);
    setOpenBlocksDialog(true);
  };
  const showBlocksHistory = (walletNo) => {
    setPopupWalletNo(walletNo);
    setOpenBlocksHistoryDialog(true);
  };
  //cüzdandaki blokeleri göster butonu

  const { enqueueSnackbar } = useSnackbar();
  const GetDoc = (docId) => {
    //format "dosyaadı<|-|>dosyatipi<|-|>documentId"
    let docFile = docId.split("<|-|>");
    DYSGetFile({
      DOCUMENTID: docFile[2],
    }).then((resp) => {
      if (resp.STATUS === "success") {
        //base64ü indir
        let file = convertBase64ToFile(
          `data:${docFile[1]};base64,${resp.DATA}`,
          docFile[0]
        );
        saveAs(file, docFile[0]);
      } else {
        enqueueSnackbar(resp.RESPONSECODEDESC || resp.MESSAGE, {
          variant: "error",
        });
        return;
      }
    });
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography
            align="center"
            mt={3}
            mb={1}
            fontWeight="bold"
            variant="h2"
            fontSize="1.5rem"
          >
            <FormattedMessage id="walletList" />
          </Typography>
          <TableContainer
            component={Paper}
            elevation={6}
            sx={{
              maxHeight: "500px",
            }}
          >
            <Table size="small" aria-label="wallets-list" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: "rgba(26, 66, 138,0.1)" }}>
                    <FormattedMessage id="walletNo" />
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "rgba(26, 66, 138,0.1)" }}
                    align="right"
                  >
                    <FormattedMessage id="balance" />
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "rgba(26, 66, 138,0.1)" }}>
                    <FormattedMessage id="cardNo" />
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "rgba(26, 66, 138,0.1)" }}>
                    <FormattedMessage id="walletCreateDate" />
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "rgba(26, 66, 138,0.1)" }}>
                    <FormattedMessage id="walletBlockStatus" />
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "rgba(26, 66, 138,0.1)" }}
                    align="right"
                  >
                    <FormattedMessage id="blockHistory" />
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "rgba(26, 66, 138,0.1)" }}
                    align="right"
                  >
                    <FormattedMessage id="showBlocksOnWallet" />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedWallets.map((e, i) => (
                  <TableRow
                    key={i}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                    hover
                  >
                    <TableCell>{e.WALLET_NO}</TableCell>
                    <TableCell align="right">{e.WALLET_BALANCE}</TableCell>
                    <TableCell>{e.CARD_NO}</TableCell>
                    <TableCell>{e.WALLET_CREATE_DATE}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={
                          <FormattedMessage
                            id={WALLET_STATUS_DEF[e.WALLET_STATUS].label}
                          />
                        }
                        color={WALLET_STATUS_DEF[e.WALLET_STATUS].color}
                        icon={WALLET_STATUS_DEF[e.WALLET_STATUS].icon}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        color="secondary"
                        onClick={() => showBlocksHistory(e.WALLET_NO)}
                      >
                        <LaunchIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        color="info"
                        onClick={() => showBlocks(e.WALLET_NO)}
                      >
                        <LaunchIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid xs={12}>
          <TextField
            fullWidth
            label={<FormattedMessage id="blockReason" />}
            value={blockReason.label}
            variant="filled"
          />
        </Grid>
        <Grid xs={12}>
          {DOCS ? (
            <Button size="small" color="info" onClick={() => GetDoc(DOCS)}>
              <FormattedMessage id="downloadFile" />
            </Button>
          ) : (
            <FormattedMessage id="noFile2" />
          )}
        </Grid>
        <Grid xs={12} md={6}>
          <FormControl>
            <FormLabel id="block-type-label">
              <FormattedMessage id="blockType" />
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="block-type-label"
              name="block-type-group"
              value={BLOCK_TYPE}
            >
              {blockReason?.BLOCK_TYPES.includes("KISMİ") && (
                <FormControlLabel
                  value="KISMİ"
                  control={<Radio />}
                  label={<FormattedMessage id="partial" />}
                />
              )}
              {blockReason?.BLOCK_TYPES.includes("BORÇ") && (
                <FormControlLabel
                  value="BORÇ"
                  control={<Radio />}
                  label={<FormattedMessage id="debt" />}
                />
              )}
              {blockReason?.BLOCK_TYPES.includes("ALACAK") && (
                <FormControlLabel
                  value="ALACAK"
                  control={<Radio />}
                  label={<FormattedMessage id="recaivable" />}
                />
              )}
            </RadioGroup>
          </FormControl>
        </Grid>
        {BLOCK_TYPE === "KISMİ" && (
          <Grid xs={12} md={6}>
            <TextField
              value={BLOCK_AMOUNT}
              label={<FormattedMessage id="blockAmount" />}
              variant="filled"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">TL</InputAdornment>
                ),
              }}
            />
          </Grid>
        )}
        <Grid xs={12} md={6}>
          <TextField
            label={<FormattedMessage id="blockEndDate" />}
            fullWidth
            variant="filled"
            value={dateConverter(BLOCK_END_DATE, "dateseventeen", "dotdate")}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            label={<FormattedMessage id="decisionAuthority" />}
            fullWidth
            variant="filled"
            value={DECISION_AUTHORY}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            label={<FormattedMessage id="decisionNo" />}
            fullWidth
            variant="filled"
            value={DECISION_NO}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            label={<FormattedMessage id="decisionDate" />}
            fullWidth
            variant="filled"
            value={dateConverter(DECISION_DATE, "dateseventeen", "dotdate")}
          />
        </Grid>
        {blockReason?.FORECLOSURE_SHOW && (
          <Grid xs={12} md={6}>
            <TextField
              label={<FormattedMessage id="seizureAmount" />}
              variant="filled"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">TL</InputAdornment>
                ),
              }}
              value={SEIZURE_AMOUNT}
            />
          </Grid>
        )}
        <Grid xs={12}>
          <TextField
            label={<FormattedMessage id="blockDesc" />}
            fullWidth
            multiline
            rows={2}
            variant="filled"
            value={BLOCK_DESC}
          />
        </Grid>
      </Grid>
      <Dialog
        open={openBlocksDialog}
        onClose={() => setOpenBlocksDialog(false)}
        fullWidth
        maxWidth="lg"
        scroll="paper"
        aria-labelledby="blocks-on-wallet-dialog"
        PaperComponent={PaperComponent}
      >
        <DialogTitle style={{ cursor: "move" }} id="blocks-on-wallet-dialog">
          <FormattedMessage
            id="blocksOnWallet"
            values={{ walletNo: popupWalletNo }}
          />
          <IconButton
            aria-label="close dialog"
            onClick={() => setOpenBlocksDialog(false)}
            sx={{
              position: "absolute",
              right: 14,
              top: 12,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pb: 2 }}>
          <MRTTable
            enableActions={false}
            data={
              selectedWallets
                .find((e) => e.WALLET_NO === popupWalletNo)
                ?.BLOCK_LIST.filter((e) => e.IS_BLOCK_ACTIVE === "Y").length > 0
                ? selectedWallets
                  .find((e) => e.WALLET_NO === popupWalletNo)
                  .BLOCK_LIST.filter((e) => e.IS_BLOCK_ACTIVE === "Y")
                  .map((e, i) => ({
                    id: i + 1,
                    WALLET_NO: e.WALLET_NO,
                    BLOCK_TYPE: e.BLOCK_TYPE,
                    BLOCK_REASON_NAME: e.BLOCK_REASON_NAME,
                    BLOCK_AMOUNT: e.BLOCK_AMOUNT,
                    BLOCK_END_DATE: e.BLOCK_END_DATE,
                    DOCS: e.DOCS,
                    DECISION_AUTHORY: e.DECISION_AUTHORY,
                    DECISION_NO: e.DECISION_NO,
                    DECISION_DATE: e.DECISION_DATE,
                    SEIZURE_AMOUNT: e.SEIZURE_AMOUNT,
                    BLOCK_DESC: e.BLOCK_DESC,
                    BLOCK_CREATE_DATE: e.BLOCK_CREATE_DATE,
                    CREATE_USER: e.CREATE_USER,
                    MODIFY_DATE: e.MODIFY_DATE,
                    MODIFY_USER: e.MODIFY_USER,
                    BLOCK_REMOVE_DESC: e.BLOCK_REMOVE_DESC,
                  }))
                : []
            }
            columns={[
              {
                accessorKey: "WALLET_NO",
                header: IntlTranslate("walletNo"),
                size: 230,
              },
              {
                accessorKey: "BLOCK_TYPE",
                header: IntlTranslate("blockType"),
              },
              {
                accessorKey: "BLOCK_REASON_NAME",
                header: IntlTranslate("blockReason"),
                size: 200,
              },
              {
                accessorKey: "BLOCK_AMOUNT",
                header: IntlTranslate("blockAmount"),
                muiTableBodyCellProps: {
                  align: "right",
                },
              },
              {
                accessorKey: "BLOCK_END_DATE",
                header: IntlTranslate("blockEndDate"),
                size: 260,
                sortingFn: "dotDSort",
              },
              {
                accessorKey: "DOCS",
                header: IntlTranslate("docs"),
                Cell: (params) => {
                  let val = params.cell.getValue();
                  if (val) {
                    return (
                      <IconButton
                        size="small"
                        color="info"
                        onClick={() => GetDoc(val)}
                      >
                        <DownloadIcon fontSize="inherit" />
                      </IconButton>
                    );
                  } else {
                    return (
                      <i>
                        <FormattedMessage id="noFile2" />
                      </i>
                    );
                  }
                },
              },
              {
                accessorKey: "DECISION_AUTHORY",
                header: IntlTranslate("decisionAuthority"),
              },
              {
                accessorKey: "DECISION_NO",
                header: IntlTranslate("decisionNo"),
              },
              {
                accessorKey: "DECISION_DATE",
                header: IntlTranslate("decisionDate"),
                sortingFn: "dotDSort",
              },
              {
                accessorKey: "SEIZURE_AMOUNT",
                header: IntlTranslate("seizureAmount"),
                muiTableBodyCellProps: {
                  align: "right",
                },
              },
              {
                accessorKey: "BLOCK_CREATE_DATE",
                header: IntlTranslate("blockDate"),
                sortingFn: "dotDHSort",
              },
              {
                accessorKey: "CREATE_USER",
                header: IntlTranslate("blockCreateUser"),
                size: 240,
              },
              {
                accessorKey: "BLOCK_DESC",
                header: IntlTranslate("blockDesc"),
                size: 220,
              },
              {
                accessorKey: "MODIFY_DATE",
                header: IntlTranslate("blockRemoveDate"),
                size: 240,
                sortingFn: "dotDHSort",
              },
              {
                accessorKey: "MODIFY_USER",
                header: IntlTranslate("blockRemoveUser"),
              },
              {
                accessorKey: "BLOCK_REMOVE_DESC",
                header: IntlTranslate("blockRemoveDesc"),
                size: 280,
              },
            ]}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={openBlocksHistoryDialog}
        onClose={() => setOpenBlocksHistoryDialog(false)}
        fullWidth
        maxWidth="lg"
        scroll="paper"
        aria-labelledby="blocks-on-wallet-history-dialog"
        PaperComponent={PaperHistoryComponent}
      >
        <DialogTitle
          style={{ cursor: "move" }}
          id="blocks-on-wallet-history-dialog"
        >
          <FormattedMessage
            id="blocksOnWalletHistory"
            values={{ walletNo: popupWalletNo }}
          />
          <IconButton
            aria-label="close-dialog"
            onClick={() => setOpenBlocksHistoryDialog(false)}
            sx={{
              position: "absolute",
              right: 14,
              top: 12,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pb: 2 }}>
          <MRTTable
            enableActions={false}
            data={
              selectedWallets.find((e) => e.WALLET_NO === popupWalletNo)
                ?.BLOCK_LIST.length > 0
                ? selectedWallets
                  .find((e) => e.WALLET_NO === popupWalletNo)
                  .BLOCK_LIST.map((e, i) => ({
                    id: i + 1,
                    WALLET_NO: e.WALLET_NO,
                    BLOCK_TYPE: e.BLOCK_TYPE,
                    BLOCK_REASON_NAME: e.BLOCK_REASON_NAME,
                    BLOCK_AMOUNT: e.BLOCK_AMOUNT,
                    BLOCK_END_DATE: e.BLOCK_END_DATE,
                    DOCS: e.DOCS,
                    DECISION_AUTHORY: e.DECISION_AUTHORY,
                    DECISION_NO: e.DECISION_NO,
                    DECISION_DATE: e.DECISION_DATE,
                    SEIZURE_AMOUNT: e.SEIZURE_AMOUNT,
                    BLOCK_DESC: e.BLOCK_DESC,
                    BLOCK_CREATE_DATE: e.BLOCK_CREATE_DATE,
                    CREATE_USER: e.CREATE_USER,
                    MODIFY_DATE: e.MODIFY_DATE,
                    MODIFY_USER: e.MODIFY_USER,
                    BLOCK_REMOVE_DESC: e.BLOCK_REMOVE_DESC,
                    IS_BLOCK_ACTIVE: e.IS_BLOCK_ACTIVE,
                  }))
                : []
            }
            columns={[
              {
                accessorKey: "IS_BLOCK_ACTIVE",
                header: IntlTranslate("isBlockEnd"),
                size: 220,
                Cell: (params) =>
                  generateIcon(params.cell.getValue() === "Y" ? "N" : "Y"),
              },
              {
                accessorKey: "WALLET_NO",
                header: IntlTranslate("walletNo"),
                size: 230,
              },
              {
                accessorKey: "BLOCK_TYPE",
                header: IntlTranslate("blockType"),
              },
              {
                accessorKey: "BLOCK_REASON_NAME",
                header: IntlTranslate("blockReason"),
                size: 200,
              },
              {
                accessorKey: "BLOCK_AMOUNT",
                header: IntlTranslate("blockAmount"),
                muiTableBodyCellProps: {
                  align: "right",
                },
              },
              {
                accessorKey: "BLOCK_END_DATE",
                header: IntlTranslate("blockEndDate"),
                size: 260,
                sortingFn: "dotDSort",
              },
              {
                accessorKey: "DOCS",
                header: IntlTranslate("docs"),
                Cell: (params) => {
                  let val = params.cell.getValue();
                  if (val) {
                    return (
                      <IconButton
                        size="small"
                        color="info"
                        onClick={() => GetDoc(val)}
                      >
                        <DownloadIcon fontSize="inherit" />
                      </IconButton>
                    );
                  } else {
                    return (
                      <i>
                        <FormattedMessage id="noFile2" />
                      </i>
                    );
                  }
                },
              },
              {
                accessorKey: "DECISION_AUTHORY",
                header: IntlTranslate("decisionAuthority"),
              },
              {
                accessorKey: "DECISION_NO",
                header: IntlTranslate("decisionNo"),
              },
              {
                accessorKey: "DECISION_DATE",
                header: IntlTranslate("decisionDate"),
                sortingFn: "dotDSort",
              },
              {
                accessorKey: "SEIZURE_AMOUNT",
                header: IntlTranslate("seizureAmount"),
                muiTableBodyCellProps: {
                  align: "right",
                },
              },
              {
                accessorKey: "BLOCK_CREATE_DATE",
                header: IntlTranslate("blockDate"),
                sortingFn: "dotDHSort",
              },
              {
                accessorKey: "CREATE_USER",
                header: IntlTranslate("blockCreateUser"),
                size: 240,
              },
              {
                accessorKey: "BLOCK_DESC",
                header: IntlTranslate("blockDesc"),
                size: 220,
              },
              {
                accessorKey: "MODIFY_DATE",
                header: IntlTranslate("blockRemoveDate"),
                size: 240,
                sortingFn: "dotDHSort",
              },
              {
                accessorKey: "MODIFY_USER",
                header: IntlTranslate("blockRemoveUser"),
              },
              {
                accessorKey: "BLOCK_REMOVE_DESC",
                header: IntlTranslate("blockRemoveDesc"),
                size: 280,
              },
            ]}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

const WalletRemoveBlockDetails = (data) => {
  const { selectedBlocks, BLOCK_DESC } = JSON.parse(data);
  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Typography
          align="center"
          mb={1}
          fontWeight="500"
          variant="h2"
          fontSize="1.25rem"
        >
          <FormattedMessage id="selectedWalletsBlocks" />
        </Typography>
        <TableContainer
          component={Paper}
          elevation={3}
          sx={{
            maxHeight: "600px",
          }}
        >
          <Table
            size="small"
            aria-label="blocks-on-selected-wallets-list"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: "#ededed" }}>
                  <FormattedMessage id="walletNo" />
                </TableCell>
                <TableCell sx={{ backgroundColor: "#ededed" }}>
                  <FormattedMessage id="blockType" />
                </TableCell>
                <TableCell sx={{ backgroundColor: "#ededed" }}>
                  <FormattedMessage id="blockReason" />
                </TableCell>
                <TableCell align="right" sx={{ backgroundColor: "#ededed" }}>
                  <FormattedMessage id="blockAmount" />
                </TableCell>
                <TableCell sx={{ backgroundColor: "#ededed" }}>
                  <FormattedMessage id="blockDate" />
                </TableCell>
                <TableCell sx={{ backgroundColor: "#ededed" }}>
                  <FormattedMessage id="blockEndDate" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedBlocks.length > 0 ? (
                selectedBlocks.map((e, i) => (
                  <TableRow
                    key={i}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell>{e.WALLET_NO}</TableCell>
                    <TableCell>{e.BLOCK_TYPE}</TableCell>
                    <TableCell>{e.BLOCK_REASON_NAME}</TableCell>
                    <TableCell align="right">{e.BLOCK_AMOUNT}</TableCell>
                    <TableCell>{e.BLOCK_CREATE_DATE}</TableCell>
                    <TableCell>{e.BLOCK_END_DATE}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={7}>
                    <FormattedMessage id="noWalletSelected" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid xs={12}>
        <TextField
          label={<FormattedMessage id="blockRemoveDesc" />}
          fullWidth
          multiline
          rows={2}
          variant="filled"
          value={BLOCK_DESC}
        />
      </Grid>
    </Grid>
  );
};

const CardApplicationDetails = (data) => {
  const {
    IS_DIGITAL_CARD,
    WALLET_INFO: e,
    ADDRESS,
    IS_WALLET_OWNER,
  } = JSON.parse(data);
  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <TableContainer component={Paper} elevation={3}>
          <Table
            size="small"
            aria-label="card-application-wallet-detail"
            stickyHeader
          >
            <TableHead>
              <TableRow>
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
              <TableRow>
                <TableCell>{e.WALLET_NO}</TableCell>
                <TableCell>{`${e?.FIRST_NAME || ""} ${e?.LAST_NAME || ""
                  }`}</TableCell>
                <TableCell>{e.WALLET_NAME}</TableCell>
                <TableCell>{e.WALLET_STATUS}</TableCell>
                <TableCell>{e.WALLET_TYPE}</TableCell>
                <TableCell align="right">
                  {CurrencyFormat(e.WALLET_BALANCE)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid xs={12}>
        <FormControl>
          <FormLabel id="cardProduct">
            <FormattedMessage id="cardProduct" />
          </FormLabel>
          <RadioGroup row aria-labelledby="cardProduct" value={IS_DIGITAL_CARD}>
            <FormControlLabel
              value="Y"
              control={<Radio />}
              label={<FormattedMessage id="ZiraatPayDigitalCard" />}
            />
            <FormControlLabel
              value="N"
              control={<Radio />}
              label={<FormattedMessage id="ZiraatPayCard" />}
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      {e.WALLET_TYPE === "Bağlı" && (
        <Grid xs={12}>
          <FormControl>
            <FormLabel id="isWalletOwner">
              <FormattedMessage id="isWalletOwner" />
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="isWalletOwner"
              value={IS_WALLET_OWNER}
            >
              <FormControlLabel
                value="Y"
                control={<Radio />}
                label={<FormattedMessage id="isWalletOwner.Y" />}
              />
              <FormControlLabel
                value="N"
                control={<Radio />}
                label={<FormattedMessage id="isWalletOwner.N" />}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      )}
      <Grid xs={12}>
        <TextField
          label={<FormattedMessage id="cardSendingAddress" />}
          fullWidth
          multiline
          rows={2}
          variant="filled"
          value={ADDRESS || ""}
          disabled={IS_DIGITAL_CARD === "Y"}
        />
      </Grid>
    </Grid>
  );
};

const FinancialCareCancelDetails = (data) => {
  const {
    TCKN,
    TYPE,
    CARD_NO,
    WALLET_CONTROL_TYPE,
    WALLET_NO,
    REAL_AMOUNT,
    CHARGED_AMOUNT,
    DESCRIPTION,
  } = JSON.parse(data);

  return (
    <Stack spacing={3}>
      <Box style={{ padding: '20px' }} sx={{ boxShadow: 3 }}>
        <Stack spacing={3}>
          {/* Borç/Alacak */}
          <FormControl>
            <FormLabel id="debtCredit">
              <FormattedMessage id="debtCredit" />
            </FormLabel>
            <RadioGroup
              value={TYPE}
              row
              aria-labelledby="debtCredit"
              name="debt-credit"
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label={<FormattedMessage id="debt" />}
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label={<FormattedMessage id="credit" />}
              />
            </RadioGroup>
          </FormControl>

          {/* Cüzdan Kontrol Tipi */}
          {TYPE === 1 && (
            <FormControl>
              <FormLabel id="walletControlType">
                <FormattedMessage id="walletControlType" />
              </FormLabel>
              <RadioGroup
                value={WALLET_CONTROL_TYPE}
                row
                aria-labelledby="debtCredit"
                name="debt-credit"
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label={<FormattedMessage id="allWallets" />}
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label={<FormattedMessage id="cardLinkedWallet" />}
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label={<FormattedMessage id="selectedWallet" />}
                />
              </RadioGroup>
            </FormControl>
          )}
        </Stack>

        <Stack spacing={3}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            {TCKN && <TextField
              name="tckn"
              label={<FormattedMessage id="tckn" />}
              variant="filled"
              fullWidth
              value={TCKN?.toString()}
              InputProps={{
                readOnly: true,
              }}
            />}

            {CARD_NO && <TextField
              name="cardNo"
              label={<FormattedMessage id="cardNo" />}
              variant="filled"
              fullWidth
              value={CARD_NO}
              InputProps={{
                readOnly: true,
              }}
            />}

            {WALLET_NO && <TextField
              name="walletNo"
              label={<FormattedMessage id="walletNo" />}
              variant="filled"
              fullWidth
              value={WALLET_NO}
              InputProps={{
                readOnly: true,
              }}
            />}
          </Stack>

          <TextField
            name="amount"
            label={<FormattedMessage id="amount" />}
            variant="filled"
            fullWidth
            type="number"
            value={REAL_AMOUNT}
            InputProps={{
              readOnly: true,
            }}
          />

          <TextField
            name="chargedAmount"
            label={<FormattedMessage id="chargedAmount" />}
            variant="filled"
            fullWidth
            type="number"
            value={CHARGED_AMOUNT}
            InputProps={{
              readOnly: true,
            }}
          />

          <TextField
            multiline
            rows={2}
            name="explain"
            label={<FormattedMessage id="explain" />}
            fullWidth
            value={DESCRIPTION}
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
          />
        </Stack>
      </Box>
    </Stack>
  );
};

const FinancialCareAddDetails = (data) => {
  /* const {
    TCKN,
    TYPE,
    CARD_NO,
    WALLET_CONTROL_TYPE,
    WALLET_NO,
    REAL_AMOUNT,
    CHARGED_AMOUNT,
    DESCRIPTION,
  } = JSON.parse(data); */

  const requestData = JSON.parse(data)

  return (
    <Stack spacing={3}>
      {requestData?.map((item, index) => <Box key={index} style={{ padding: '20px' }} sx={{ boxShadow: 3 }}>
        <Stack spacing={3}>
          {/* Borç/Alacak */}
          <FormControl>
            <FormLabel id="debtCredit">
              <FormattedMessage id="debtCredit" />
            </FormLabel>
            <RadioGroup
              value={item.TYPE}
              row
              aria-labelledby="debtCredit"
              name="debt-credit"
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label={<FormattedMessage id="debt" />}
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label={<FormattedMessage id="credit" />}
              />
            </RadioGroup>
          </FormControl>

          {/* Cüzdan Kontrol Tipi */}
          {item.TYPE === 1 && (
            <FormControl>
              <FormLabel id="walletControlType">
                <FormattedMessage id="walletControlType" />
              </FormLabel>
              <RadioGroup
                value={item.WALLET_CONTROL_TYPE}
                row
                aria-labelledby="debtCredit"
                name="debt-credit"
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label={<FormattedMessage id="allWallets" />}
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label={<FormattedMessage id="cardLinkedWallet" />}
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label={<FormattedMessage id="selectedWallet" />}
                />
              </RadioGroup>
            </FormControl>
          )}
        </Stack>

        <Stack spacing={3}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            {item.TCKN && <TextField
              name="tckn"
              label={<FormattedMessage id="tckn" />}
              variant="filled"
              fullWidth
              value={item.TCKN?.toString()}
              InputProps={{
                readOnly: true,
              }}
            />}

            {item.CARD_NUMBER && <TextField
              name="cardNo"
              label={<FormattedMessage id="cardNo" />}
              variant="filled"
              fullWidth
              value={item.CARD_NUMBER}
              InputProps={{
                readOnly: true,
              }}
            />}

            {item.WALLET_NUMBER && <TextField
              name="walletNo"
              label={<FormattedMessage id="walletNo" />}
              variant="filled"
              fullWidth
              value={item.WALLET_NUMBER}
              InputProps={{
                readOnly: true,
              }}
            />}
          </Stack>

          <TextField
            name="amount"
            label={<FormattedMessage id="amount" />}
            variant="filled"
            fullWidth
            type="number"
            value={item.REAL_AMOUNT}
            InputProps={{
              readOnly: true,
            }}
          />

          <TextField
            multiline
            rows={2}
            name="explain"
            label={<FormattedMessage id="explain" />}
            fullWidth
            value={item.DESCRIPTION}
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
          />
        </Stack>
      </Box>)}
    </Stack>
  )
};

const ChannelDesingDetails = (data) => {
  const {
    CAMPAIGN_ID,
    CHANNEL_START_DATE,
    CHANNEL_END_DATE,
    SQL_TEXT,
    SEND_START_HOUR,
    SEND_END_HOUR,
    SHOW_TYPE,
    SHOW_COUNT,
    DETAIL,
    TERMS,
    PUSH_CONTENT,
    SMS_CONTENT,
    EMAIL_CONTENT,
    PUSH_EMAIL_CONTENT,
    PUSH_SMS_CONTENT
  } = JSON.parse(data);

  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <TextField
          name="campaignId"
          label={<FormattedMessage id="campaignId" />}
          variant="filled"
          fullWidth
          value={CAMPAIGN_ID}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          name="SQL..."
          label={<FormattedMessage id="SQL..." />}
          variant="filled"
          fullWidth
          value={SQL_TEXT}
          InputProps={{
            readOnly: true,
          }}
        />
      </Stack>


      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <TextField
          name="channelShowStartDate"
          label={<FormattedMessage id="channelShowStartDate" />}
          variant="filled"
          fullWidth
          value={dateConverter(CHANNEL_START_DATE, "dateseventeen", "dotdate")}
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          name="channelShowEndDate"
          label={<FormattedMessage id="channelShowEndDate" />}
          variant="filled"
          fullWidth
          value={dateConverter(CHANNEL_END_DATE, "dateseventeen", "dotdate")}
          InputProps={{
            readOnly: true,
          }}
        />
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <TextField
          name="startHour"
          label={<FormattedMessage id="startHour" />}
          variant="filled"
          fullWidth
          value={SEND_START_HOUR}
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          name="endHour"
          label={<FormattedMessage id="endHour" />}
          variant="filled"
          fullWidth
          value={SEND_END_HOUR}
          InputProps={{
            readOnly: true,
          }}
        />
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <TextField
          name="showType"
          label={<FormattedMessage id="showType" />}
          variant="filled"
          fullWidth
          value={SHOW_TYPE}
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          name="showCount"
          label={<FormattedMessage id="showCount" />}
          variant="filled"
          fullWidth
          value={SHOW_COUNT}
          InputProps={{
            readOnly: true,
          }}
        />
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <TextField
          multiline
          rows={2}
          name="detail"
          label={<FormattedMessage id="detail" />}
          fullWidth
          value={DETAIL}
          variant="filled"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          multiline
          rows={2}
          name="conditions"
          label={<FormattedMessage id="conditions" />}
          fullWidth
          value={TERMS}
          variant="filled"
          InputProps={{
            readOnly: true,
          }}
        />
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <TextField
          multiline
          rows={2}
          name="smsMessageText"
          label={<FormattedMessage id="smsMessageText" />}
          fullWidth
          value={SMS_CONTENT}
          variant="filled"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          multiline
          rows={2}
          name="emailMessageText"
          label={<FormattedMessage id='emailMessageText' />}
          fullWidth
          value={EMAIL_CONTENT}
          variant="filled"
          InputProps={{
            readOnly: true,
          }}
        />
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <TextField
          multiline
          rows={2}
          name="pushMessageText"
          label={<FormattedMessage id="pushMessageText" />}
          fullWidth
          value={PUSH_CONTENT}
          variant="filled"
          InputProps={{
            readOnly: true,
          }}
        />
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <TextField
          multiline
          rows={2}
          name="pushSmailMessageText"
          label={<FormattedMessage id="pushSmailMessageText" />}
          fullWidth
          value={PUSH_SMS_CONTENT}
          variant="filled"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          multiline
          rows={2}
          name="pushEmailMessageText"
          label={<FormattedMessage id='pushEmailMessageText' />}
          fullWidth
          value={PUSH_EMAIL_CONTENT}
          variant="filled"
          InputProps={{
            readOnly: true,
          }}
        />
      </Stack>
    </Stack>
  );
};

const UpdateNotificationManagement = (data) => {
  const {
    TEMPLATE_NAME_PUSH,
    NOTIFICATION_TYPE,
    MIN_AMOUNT,
    MAX_AMOUNT,
    IS_SMS_ON,
    IS_PUSH_ON,
    IS_EMAIL_VERIFIED_ON,
    IS_EMAIL_UNVERIFIED_ON,
    IF_PUSH_OFF_SMS,
    IF_PUSH_OFF_EMAIL_VERIFIED,
    IF_PUSH_OFF_EMAIL_UNVERIFIED,
  } = JSON.parse(data);

  // console.log("TEMPLATE_NAME_PUSH:", TEMPLATE_NAME_PUSH)
  // console.log("NOTIFICATION_TYPE:", NOTIFICATION_TYPE)
  // console.log("MIN_AMOUNT:", MIN_AMOUNT)
  // console.log("MAX_AMOUNT:", MAX_AMOUNT)
  // console.log("IS_SMS_ON:", IS_SMS_ON)
  // console.log("IS_PUSH_ON:", IS_PUSH_ON)
  // console.log("IS_EMAIL_VERIFIED_ON:", IS_EMAIL_VERIFIED_ON)
  // console.log("IS_EMAIL_UNVERIFIED_ON:", IS_EMAIL_UNVERIFIED_ON)
  // console.log("IF_PUSH_OFF_SMS:", IF_PUSH_OFF_SMS)
  // console.log("IF_PUSH_OFF_EMAIL_VERIFIED:", IF_PUSH_OFF_EMAIL_VERIFIED)
  // console.log("IF_PUSH_OFF_EMAIL_UNVERIFIED:", IF_PUSH_OFF_EMAIL_UNVERIFIED)

  const rows = [
    {
      TEMPLATE_NAME_PUSH,
      NOTIFICATION_TYPE,
      MIN_AMOUNT,
      MAX_AMOUNT,
      IS_SMS_ON,
      IS_PUSH_ON,
      IS_EMAIL_VERIFIED_ON,
      IS_EMAIL_UNVERIFIED_ON,
      IF_PUSH_OFF_SMS,
      IF_PUSH_OFF_EMAIL_VERIFIED,
      IF_PUSH_OFF_EMAIL_UNVERIFIED,
    }
  ];


  return (
    <Stack spacing={3}>
      <TableContainer
        component={Paper}
        elevation={6}
        sx={{ maxHeight: "500px", mt: 3 }}
      >
        <Table size="small" aria-label="User Role Update List" stickyHeader>
          <TableHead sx={{ backgroundColor: "#dbdbdb" }}>
            <TableRow>
              <TableCell>
                <FormattedMessage id="templateName" />
              </TableCell>
              <TableCell>
                <FormattedMessage id="notificationTitle" />
              </TableCell>
              <TableCell>
                <FormattedMessage id="min_Amount" />
              </TableCell>
              <TableCell>
                <FormattedMessage id="max_Amount" />
              </TableCell>
              <TableCell>
                <FormattedMessage id="channelType.sms" />
              </TableCell>
              <TableCell>
                <FormattedMessage id="channelType.push" />
              </TableCell>
              <TableCell>
                <FormattedMessage id="channelType_confirmedEmail" />
              </TableCell>
              <TableCell>
                <FormattedMessage id="channelType_unconfirmedEmail" />
              </TableCell>
              <TableCell>
                <FormattedMessage id="pushNotPermitted_sms" />
              </TableCell>
              <TableCell>
                <FormattedMessage id="pushNotPermitted_confirmedEmail" />
              </TableCell>
              <TableCell>
                <FormattedMessage id="pushNotPermitted_unconfirmedEmail" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((e, i) => (
              <TableRow key={i}>
                <TableCell>{e.TEMPLATE_NAME_PUSH}</TableCell>
                <TableCell>{e.NOTIFICATION_TYPE}</TableCell>
                <TableCell>{e.MIN_AMOUNT}</TableCell>
                <TableCell>{e.MAX_AMOUNT}</TableCell>
                <TableCell>{generateIcon(e.IS_SMS_ON === "Y" ? "Y" : "N")}</TableCell>
                <TableCell>{generateIcon(e.IS_PUSH_ON === "Y" ? "Y" : "N")}</TableCell>
                <TableCell>{generateIcon(e.IS_EMAIL_VERIFIED_ON === "Y" ? "Y" : "N")}</TableCell>
                <TableCell>{generateIcon(e.IS_EMAIL_UNVERIFIED_ON === "Y" ? "Y" : "N")}</TableCell>
                <TableCell>{generateIcon(e.IF_PUSH_OFF_SMS === "Y" ? "Y" : "N")}</TableCell>
                <TableCell>{generateIcon(e.IF_PUSH_OFF_EMAIL_VERIFIED === "Y" ? "Y" : "N")}</TableCell>
                <TableCell>{generateIcon(e.IF_PUSH_OFF_EMAIL_UNVERIFIED === "Y" ? "Y" : "N")}</TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>
    </Stack>);
};


const CATEGORY_DETAIL_DEF = [
  { category: "users", process: "C", component: UserDetails },
  { category: "users.add", process: "C", component: UserDetails },
  { category: "roles", process: "C", component: RoleDetails },
  { category: "roles.add", process: "C", component: RoleDetails },
  { category: "updateUserRole", process: "C", component: UserRoleDetails },
  { category: "fee", process: "C", component: FeeDetails },
  { category: "fee.add", process: "C", component: FeeDetails },
  { category: "fees", process: "C", component: FeesDetails },
  { category: "fees.add", process: "C", component: FeesDetails },
  { category: "products", process: "C", component: ProductDetails },
  { category: "products.add", process: "C", component: ProductDetails },
  { category: "cardStatusUpdate", process: "U", component: CardStatusDetails },
  {
    category: "customerStatusUpdate",
    process: "U",
    component: CustomerStatusDetails,
  },
  {
    category: "parameters",
    process: "U",
    component: ParametersDetails,
  },
  {
    category: "notificationPool",
    process: "C",
    component: NotificationPoolDetails,
  },
  {
    category: "notificationPool.add",
    process: "C",
    component: NotificationPoolDetails,
  },
  {
    category: "complaintNotifications",
    process: "C",
    component: ComplaintReplyDetails,
  },
  {
    category: "limit",
    process: "C",
    component: LimitDetails,
  },
  {
    category: "limit.add",
    process: "C",
    component: LimitDetails,
  },
  {
    category: "feeGroupCustomer.add",
    process: "U",
    component: FeeGroupCustomerDetails,
  },
  {
    category: "walletAddBlock",
    process: "C",
    component: WalletAddBlockDetails,
  },
  {
    category: "walletRemoveBlock",
    process: "D",
    component: WalletRemoveBlockDetails,
  },
  {
    category: "cardApplication",
    process: "C",
    component: CardApplicationDetails,
  },
  {
    category: "financialCareCancel",
    process: "U",
    component: FinancialCareCancelDetails,
  },
  {
    category: "financialCareCancel",
    process: "U",
    component: FinancialCareCancelDetails,
  },
  {
    category: "financialCareAdd",
    process: "C",
    component: FinancialCareAddDetails,
  },
  { category: "channelDesigns.add", process: "C", component: ChannelDesingDetails },
  {
    category: "UpdateNotificationManagement",
    process: "U",
    component: UpdateNotificationManagement,
  },

];
export const GetDetailChildren = (
  category = null,
  data = null
  /* process = "C"*/
) => {
  return CATEGORY_DETAIL_DEF.find(
    (e) => e.category === category /*&& e.process === process*/
  )?.component(data);
};
function PaperComponent(props) {
  return (
    <Draggable
      handle="#blocks-on-wallet-dialog"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
function PaperHistoryComponent(props) {
  return (
    <Draggable
      handle="#blocks-on-wallet-history-dialog"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
