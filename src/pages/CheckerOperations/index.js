import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FormattedMessage } from "react-intl";
import AppBreadcrumb from "../../components/layout/AppBreadcrumb";
import withTitle from "../../helpers/hoc/withTitle";
import { useAuth } from "../../context/AuthContext";
import { useSnackbar } from "notistack";
import GetDataArea from "../../components/GetDataArea";
import { dateConverter } from "../../helpers/dateHelpers";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
  TextField,
  Tab,
  Tabs,
  Box,
  MenuItem,
  Autocomplete,
  Paper,
} from "@mui/material";
import {
  API_METHOD_DEF,
  COCheckerSendResponse,
  COCheckerValidateResponse,
  CODelete,
  COGetAll,
  COGetByMakerId,
} from "../../api/api";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { LoadingButton } from "@mui/lab";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import MRTTable from "../../components/MRTTable";
import { injectIntl } from "react-intl";
import Grid from "@mui/material/Unstable_Grid2";
import parse from "autosuggest-highlight/parse"; //autocomplete match highlight
import match from "autosuggest-highlight/match"; //autocomplete match highlight
import dayjs from "dayjs";
import DetailDialog from "./DetailDialog";
import Draggable from "react-draggable";

const SCREEN_NAMES_DEF = [
  "complaintNotifications",
  "roles",
  "notificationPool",
  "cardStatusUpdate",
  "customerStatusUpdate",
  "fee",
  "fees",
  "products",
  "limit",
  "userRole",
  "parameters",
  "user",
];
const PROCESS_DEF = {
  C: {
    color: "success",
    label: "adding",
    icon: <AddCircleOutlineOutlinedIcon />,
  },
  U: {
    color: "warning",
    label: "updating",
    icon: <ReplayOutlinedIcon />,
  },
  D: {
    color: "error",
    label: "deletion",
    icon: <DeleteOutlinedIcon />,
  },
};
const STATUS_DEF = {
  0: {
    color: "warning",
    label: "status.pending",
    icon: <AccessTimeOutlinedIcon />,
  },
  1: {
    color: "success",
    label: "status.accepted",
    icon: <TaskAltOutlinedIcon />,
  },
  2: {
    color: "error",
    label: "status.denied",
    icon: <HighlightOffOutlinedIcon />,
  },
  3: {
    color: "info",
    label: "status.return",
    icon: <KeyboardReturnOutlinedIcon />,
  },
  4: {
    color: "default",
    label: "status.cancel",
    icon: <DeleteForeverOutlinedIcon />,
  },
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`checker-tabpanel-${index}`}
      aria-labelledby={`checker-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function tabAreaProps(index) {
  return {
    id: `checker-tab-${index}`,
    "aria-controls": `checker-tabpanel-${index}`,
  };
}

function CheckerOperations({ intl }) {
  const breadcrumb = useMemo(
    () => [{ name: <FormattedMessage id="checkerOperations" />, active: true }],
    []
  );

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { role, user } = useAuth();

  const [selectedRow, setSelectedRow] = useState({});

  //detay modalı
  const [detailRow, setDetailRow] = useState({});
  const [detailOpen, setDetailOpen] = useState(false);
  const GoToItemDetail = (currentRow) => {
    setDetailRow(currentRow);
    setDetailOpen(true);
  };

  //yanıtla modalı
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
    setDescError("");
  };
  const OpenModal = (currentRow) => {
    setSelectedRow(currentRow);
    setOpen(true);
  };
  const IntlTranslate = useCallback((id) => intl.formatMessage({ id }), [intl]);

  const column0 = useMemo(
    () => [
      {
        accessorKey: "CATEGORY_DISPLAY",
        header: IntlTranslate("screenName"),
      },
      {
        accessorKey: "MAKER_USER_NAME_SURNAME",
        header: IntlTranslate("makerUser"),
      },
      {
        accessorKey: "MAKER_NOTE",
        header: IntlTranslate("makerDesc"),
        size: 220,
      },
      {
        accessorKey: "CREATE_DATE",
        header: IntlTranslate("makerCreateDate"),
        size: 220,
        sortingFn: "slashYSSort",
      },
      { accessorKey: "CUSTOMER_ID", header: IntlTranslate("customerNo2") },
      {
        accessorKey: "CUSTOMER_NAME_SURNAME",
        header: IntlTranslate("customerNameSurname2"),
        size: 220,
      },
      {
        accessorKey: "PROCESS",
        header: IntlTranslate("processType"),
        Cell: (params) => {
          let val = params.cell.getValue();
          if (["C", "U", "D"].includes(val)) {
            return (
              <Chip
                size="small"
                variant="outlined"
                label={<FormattedMessage id={PROCESS_DEF[val].label} />}
                color={PROCESS_DEF[val].color}
                icon={PROCESS_DEF[val].icon}
              />
            );
          } else return "-";
        },
      },
      {
        accessorKey: "REQUEST_DATA",
        header: IntlTranslate("processDetail"),
        size: 220,
        Cell: (params) => (
          <Button
            variant="text"
            size="small"
            color="info"
            onClick={() => GoToItemDetail(params.row.original)}
          >
            <FormattedMessage id="detail" />
          </Button>
        ),
      },
      {
        accessorKey: "WAITING_TIME",
        header: IntlTranslate("waitingTime"),
        size: 220,
      },
      {
        accessorKey: "REF_NO",
        header: IntlTranslate("referenceNumber"),
        size: 220,
      },
      {
        id: "reqProcess",
        header: IntlTranslate("processAction"),
        columnDefType: "display",
        enablePinning: false,
        size: 100,
        Cell: (params) => (
          <Button
            size="small"
            variant="contained"
            color={role === "maker" ? "error" : "info"}
            onClick={() => OpenModal(params.row.original)}
          >
            <FormattedMessage id={role === "maker" ? "cancel" : "answer"} />
          </Button>
        ),
      },
    ],
    [role, IntlTranslate]
  );

  const column123 = useMemo(
    () => [
      {
        accessorKey: "CATEGORY_DISPLAY",
        header: IntlTranslate("screenName"),
      },
      {
        accessorKey: "MAKER_USER_NAME_SURNAME",
        header: IntlTranslate("makerUser"),
      },
      {
        accessorKey: "MAKER_NOTE",
        header: IntlTranslate("makerDesc"),
        size: 220,
      },
      {
        accessorKey: "CREATE_DATE",
        header: IntlTranslate("makerCreateDate"),
        size: 220,
        sortingFn: "slashYSSort",
      },
      { accessorKey: "CUSTOMER_ID", header: IntlTranslate("customerNo2") },
      {
        accessorKey: "CUSTOMER_NAME_SURNAME",
        header: IntlTranslate("customerNameSurname2"),
        size: 220,
      },
      {
        accessorKey: "PROCESS",
        header: IntlTranslate("processType"),
        Cell: (params) => {
          let val = params.cell.getValue();
          if (["C", "U", "D"].includes(val)) {
            return (
              <Chip
                size="small"
                variant="outlined"
                label={<FormattedMessage id={PROCESS_DEF[val].label} />}
                color={PROCESS_DEF[val].color}
                icon={PROCESS_DEF[val].icon}
              />
            );
          } else return "-";
        },
      },
      {
        accessorKey: "REQUEST_DATA",
        header: IntlTranslate("processDetail"),
        size: 220,
        Cell: (params) => (
          <Button
            variant="text"
            size="small"
            color="info"
            onClick={() => GoToItemDetail(params.row.original)}
          >
            <FormattedMessage id="detail" />
          </Button>
        ),
      },
      {
        accessorKey: "CHECKER_NAME_SURNAME",
        header: IntlTranslate("checkerNameSurname"),
        size: 280,
      },
      {
        accessorKey: "CHECKER_NOTE",
        header: IntlTranslate("checkerDesc"),
        size: 280,
      },
      {
        accessorKey: "CHECK_DATE",
        header: IntlTranslate("checkerDate"),
        size: 280,
        sortingFn: "slashYSSort",
      },
      {
        accessorKey: "REF_NO",
        header: IntlTranslate("referenceNumber"),
        size: 220,
      },
    ],
    [IntlTranslate]
  );

  const column4 = useMemo(
    () => [
      {
        accessorKey: "CATEGORY_DISPLAY",
        header: IntlTranslate("screenName"),
      },
      {
        accessorKey: "MAKER_USER_NAME_SURNAME",
        header: IntlTranslate("makerUser"),
      },
      {
        accessorKey: "MAKER_NOTE",
        header: IntlTranslate("makerDesc"),
        size: 220,
      },
      {
        accessorKey: "CREATE_DATE",
        header: IntlTranslate("makerCreateDate"),
        size: 220,
        sortingFn: "slashYSSort",
      },
      { accessorKey: "CUSTOMER_ID", header: IntlTranslate("customerNo2") },
      {
        accessorKey: "CUSTOMER_NAME_SURNAME",
        header: IntlTranslate("customerNameSurname2"),
        size: 220,
      },
      {
        accessorKey: "REF_NO",
        header: IntlTranslate("referenceNumber"),
        size: 220,
      },
      {
        accessorKey: "CHECKER_NAME_SURNAME",
        header: IntlTranslate("returnCheckerUser"),
      },
      {
        accessorKey: "CHECKER_NOTE",
        header: IntlTranslate("returnDesc"),
        size: 220,
      },
      {
        accessorKey: "CHECK_DATE",
        header: IntlTranslate("returnDate"),
        size: 220,
        sortingFn: "slashYSSort",
      },
      {
        id: "reqProcess",
        header: IntlTranslate("takeAction"),
        columnDefType: "display",
        enablePinning: false,
        size: 100,
        Cell: (params) => (
          <Button
            size="small"
            variant="contained"
            color="info"
            //navigate işlemi olacak. ilgili sayfada update ekranı açılacak
            disabled={role === "checker"}
          >
            <FormattedMessage id="takeAction" />
          </Button>
        ),
      },
    ],
    [role, IntlTranslate]
  );

  const column5 = useMemo(
    () => [
      {
        accessorKey: "CATEGORY_DISPLAY",
        header: IntlTranslate("screenName"),
      },
      {
        accessorKey: "MAKER_USER_NAME_SURNAME",
        header: IntlTranslate("makerUser"),
      },
      {
        accessorKey: "MAKER_NOTE",
        header: IntlTranslate("makerDesc"),
        size: 220,
      },
      {
        accessorKey: "CREATE_DATE",
        header: IntlTranslate("makerCreateDate"),
        size: 220,
        sortingFn: "slashYSSort",
      },
      { accessorKey: "CUSTOMER_ID", header: IntlTranslate("customerNo2") },
      {
        accessorKey: "CUSTOMER_NAME_SURNAME",
        header: IntlTranslate("customerNameSurname2"),
        size: 220,
      },
      {
        accessorKey: "STATUS",
        header: IntlTranslate("status"),
        Cell: (params) => {
          let val = params.cell.getValue();
          if ([0, 1, 2, 3, 4].includes(Number(val))) {
            return (
              <Chip
                size="small"
                label={<FormattedMessage id={STATUS_DEF[val].label} />}
                color={STATUS_DEF[val].color}
                icon={STATUS_DEF[val].icon}
              />
            );
          } else return "-";
        },
      },
      {
        accessorKey: "PROCESS",
        header: IntlTranslate("processType"),
        Cell: (params) => {
          let val = params.cell.getValue();
          if (["C", "U", "D"].includes(val)) {
            return (
              <Chip
                size="small"
                variant="outlined"
                label={<FormattedMessage id={PROCESS_DEF[val].label} />}
                color={PROCESS_DEF[val].color}
                icon={PROCESS_DEF[val].icon}
              />
            );
          } else return "-";
        },
      },
      {
        accessorKey: "REQUEST_DATA",
        header: IntlTranslate("processDetail"),
        size: 220,
        Cell: (params) => (
          <Button
            variant="text"
            size="small"
            color="info"
            onClick={() => GoToItemDetail(params.row.original)}
          >
            <FormattedMessage id="detail" />
          </Button>
        ),
      },
      {
        accessorKey: "CHECKER_NAME_SURNAME",
        header: IntlTranslate("checkerNameSurname"),
        size: 280,
      },
      {
        accessorKey: "CHECKER_NOTE",
        header: IntlTranslate("checkerDesc"),
        size: 280,
      },
      {
        accessorKey: "CHECK_DATE",
        header: IntlTranslate("checkerDate"),
        size: 280,
        sortingFn: "slashYSSort",
      },
      {
        accessorKey: "REF_NO",
        header: IntlTranslate("referenceNumber"),
        size: 220,
      },
    ],
    [IntlTranslate]
  );
  const [currentTab, setCurrentTab] = useState(0);
  //GET DATA FILTERS
  const btn = useRef();
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState(null);

  const HandleSearchClick = useCallback(
    async (start, end) => {
      setLoading(true);

      const handleDataFetch = (requestData) => {
        requestData
          .then((resp) =>
            setData(
              resp.DATA.map((e) => ({
                CHECKER_OPERATION_ID: e.CHECKER_OPERATION_ID,
                API_NAME: e.API_NAME,
                CATEGORY_DISPLAY: IntlTranslate(e.CATEGORY),
                CATEGORY: e.CATEGORY,
                MAKER_USER_NAME_SURNAME: `${e?.MAKER_NAME || ""} ${
                  e?.MAKER_SURNAME || ""
                }`,
                MAKER_NOTE: e.MAKER_NOTE || "-",
                CREATE_DATE: dateConverter(
                  e.CREATE_DATE,
                  "dateseventeen",
                  "yeartosecond"
                ),
                CUSTOMER_ID: e.CUSTOMER_ID || "-",
                CUSTOMER_NAME_SURNAME: `${e?.CUSTOMER_NAME || ""} ${
                  e?.CUSTOMER_SURNAME || ""
                }`,
                PROCESS: e.PROCESS,
                REQUEST_DATA: e.REQUEST_DATA,
                WAITING_TIME: passingTime(e.CREATE_DATE),
                REF_NO: e.REF_NO,
                CHECKER_NAME_SURNAME: `${e?.CHECKER_NAME || ""} ${
                  e?.CHECKER_SURNAME || ""
                }`,
                CHECKER_NOTE: e.CHECKER_NOTE || "-",
                CHECK_DATE: dateConverter(
                  e.CHECK_DATE,
                  "dateseventeen",
                  "yeartosecond"
                ),
                DISPLAY_DATA: e.DISPLAY_DATA,
                STATUS: e.STATUS,
              }))
            )
          )
          .finally(() => setLoading(false));
      };

      switch (currentTab) {
        case 0:
          //onay bekleyen işlemler
          if (role === "maker") {
            handleDataFetch(
              COGetByMakerId({ USER_ID: user.USER_ID, STATUS: currentTab })
            );
          } else if (role === "checker") {
            handleDataFetch(COGetAll({ STATUS: currentTab }));
          }
          break;
        case 1:
        case 2:
          //onaylanmış ve reddedilmiş işlemler
          handleDataFetch(
            COGetAll({
              START_DATE: dayjs()
                .set("hour", 0)
                .set("minute", 0)
                .set("second", 0)
                .set("ms", 0)
                .format("YYYYMMDDHHmmssSSS"),
              END_DATE: dayjs()
                .set("hour", 23)
                .set("minute", 59)
                .set("second", 59)
                .set("ms", 999)
                .format("YYYYMMDDHHmmssSSS"),
              STATUS: currentTab,
            })
          );
          break;
        case 3:
          //iptal edişmiş işlemler
          if (role === "maker") {
            handleDataFetch(
              COGetByMakerId({
                START_DATE: dayjs()
                  .set("hour", 0)
                  .set("minute", 0)
                  .set("second", 0)
                  .set("ms", 0)
                  .format("YYYYMMDDHHmmssSSS"),
                END_DATE: dayjs()
                  .set("hour", 23)
                  .set("minute", 59)
                  .set("second", 59)
                  .set("ms", 999)
                  .format("YYYYMMDDHHmmssSSS"),
                USER_ID: user.USER_ID,
                STATUS: "4",
              })
            );
          } else if (role === "checker") {
            handleDataFetch(
              COGetAll({
                START_DATE: dayjs()
                  .set("hour", 0)
                  .set("minute", 0)
                  .set("second", 0)
                  .set("ms", 0)
                  .format("YYYYMMDDHHmmssSSS"),
                END_DATE: dayjs()
                  .set("hour", 23)
                  .set("minute", 59)
                  .set("second", 59)
                  .set("ms", 999)
                  .format("YYYYMMDDHHmmssSSS"),
                STATUS: "4",
              })
            );
          }
          break;
        case 4:
          //iade edişmiş işlemler
          if (role === "maker") {
            handleDataFetch(
              COGetByMakerId({ USER_ID: user.USER_ID, STATUS: "3" })
            );
          } else if (role === "checker") {
            handleDataFetch(COGetAll({ STATUS: "3" }));
          }
          break;
        case 5:
          //tarihçe
          handleDataFetch(
            COGetAll({
              START_DATE: dateConverter(
                start.toISOString(),
                "isoFull",
                "dateseventeen"
              ),
              END_DATE: dateConverter(
                end.toISOString(),
                "isoFull",
                "dateseventeen"
              ),
              STATUS: status === "all" ? "" : status,
              CATEGORY: category,
            })
          );
          break;
        default:
          break;
      }
    },
    [role, user, category, status, currentTab, IntlTranslate]
  );
  const HandleDeleteClick = useCallback(async () => {
    setData([]);
    setStatus("all");
    setCategory(null);
    setLoading(false);
    setDescError("");
  }, []);

  const makerCancelRequest = useCallback(() => {
    setLoading(true);
    CODelete(selectedRow.CHECKER_OPERATION_ID, user.USER_ID)
      .then((resp) => {
        if (resp.STATUS === "success") {
          enqueueSnackbar("Talep başarıyla iptal edildi.", {
            variant: "success",
          });
        } else {
          enqueueSnackbar(resp.RESPONSECODEDESC, { variant: "error" });
        }
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
        btn.current.click();
      });
  }, [enqueueSnackbar, selectedRow, user]);

  const noteRef = useRef();
  const [descError, setDescError] = useState("");
  const checkerSendResponse = useCallback(
    (status) => {
      if (
        ["2", "3"].includes(status) &&
        (noteRef.current?.value?.length || 0) < 10
      ) {
        setDescError(<FormattedMessage id="checkerRespDesc.error" />);
        return;
      }
      setDescError("");
      setLoading(true);
      COCheckerValidateResponse({
        CHECKER_OPERATION_ID: selectedRow.CHECKER_OPERATION_ID,
        CHECKER_USER_ID: user.USER_ID,
        STATUS: status,
      }).then((validate) => {
        if (validate && validate.RESPONSECODE === "000") {
          if (status === "1") {
            const Func = API_METHOD_DEF[selectedRow.API_NAME];
            Func(JSON.parse(selectedRow.REQUEST_DATA)).then((response) => {
              if (response.STATUS === "success") {
                COCheckerSendResponse({
                  CHECKER_OPERATION_ID: selectedRow.CHECKER_OPERATION_ID,
                  CHECKER_USER_ID: user.USER_ID,
                  STATUS: status,
                  CHECKER_NOTE: noteRef.current?.value || "",
                })
                  .then((resp) => {
                    if (resp.STATUS === "success") {
                      enqueueSnackbar("Talep değerlendirmesi başarılı.", {
                        variant: "success",
                      });
                      btn.current.click();
                    } else {
                      enqueueSnackbar(resp.RESPONSECODEDESC, {
                        variant: "error",
                      });
                    }
                  })
                  .finally(() => {
                    setLoading(false);
                    setOpen(false);
                    setDescError("");
                  });
              } else {
                enqueueSnackbar(response.RESPONSECODEDESC, {
                  variant: "error",
                });
                setLoading(false);
                setOpen(false);
                setDescError("");
              }
            });
          } else {
            COCheckerSendResponse({
              CHECKER_OPERATION_ID: selectedRow.CHECKER_OPERATION_ID,
              CHECKER_USER_ID: user.USER_ID,
              STATUS: status,
              CHECKER_NOTE: noteRef.current?.value || "",
            })
              .then((resp) => {
                if (resp.STATUS === "success") {
                  enqueueSnackbar("Talep değerlendirmesi başarılı.", {
                    variant: "success",
                  });
                  btn.current.click();
                } else {
                  enqueueSnackbar(resp.RESPONSECODEDESC, {
                    variant: "error",
                  });
                }
              })
              .finally(() => {
                setLoading(false);
                setOpen(false);
                setDescError("");
              });
          }
        } else {
          enqueueSnackbar(validate.RESPONSECODEDESC, { variant: "error" });
          setLoading(false);
          setOpen(false);
          setDescError("");
        }
      });
    },
    [selectedRow, user, enqueueSnackbar]
  );

  useEffect(() => {
    if (currentTab === 0) {
      btn.current.click();
    } else {
      setLoading(false);
    }
  }, [currentTab]);
  return (
    <>
      <AppBreadcrumb links={breadcrumb} />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={currentTab}
          onChange={(e, newVal) => {
            setCurrentTab(newVal);
            setData([]);
          }}
          aria-label="checker tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            sx={{ minWidth: "fit-content", flex: 1 }}
            icon={<AccessTimeOutlinedIcon />}
            iconPosition="start"
            label={<FormattedMessage id="checkerTabs.0" />}
            {...tabAreaProps(0)}
          />
          <Tab
            sx={{ minWidth: "fit-content", flex: 1 }}
            icon={<TaskAltOutlinedIcon />}
            iconPosition="start"
            label={<FormattedMessage id="checkerTabs.1" />}
            {...tabAreaProps(1)}
          />
          <Tab
            sx={{ minWidth: "fit-content", flex: 1 }}
            icon={<HighlightOffOutlinedIcon />}
            iconPosition="start"
            label={<FormattedMessage id="checkerTabs.2" />}
            {...tabAreaProps(2)}
          />
          <Tab
            sx={{ minWidth: "fit-content", flex: 1 }}
            icon={<DeleteForeverOutlinedIcon />}
            iconPosition="start"
            label={<FormattedMessage id="checkerTabs.3" />}
            {...tabAreaProps(3)}
          />
          <Tab
            sx={{ minWidth: "fit-content", flex: 1 }}
            icon={<KeyboardReturnOutlinedIcon />}
            iconPosition="start"
            label={<FormattedMessage id="checkerTabs.4" />}
            {...tabAreaProps(4)}
            disabled //CR iade kısmı
          />
          <Tab
            sx={{ minWidth: "fit-content", flex: 1 }}
            icon={<CalendarMonthOutlinedIcon />}
            iconPosition="start"
            label={<FormattedMessage id="checkerTabs.5" />}
            {...tabAreaProps(4)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={currentTab} index={0}>
        <Box mt={3}>
          <GetDataArea
            HandleSearchClick={HandleSearchClick}
            HandleDeleteClick={HandleDeleteClick}
            btnRef={btn}
            dateFilter={false}
          />
        </Box>
        <MRTTable
          data={data}
          columns={column0}
          loading={loading}
          rowsUniqueId="CHECKER_OPERATION_ID"
          enableActions={false}
          rightPins={["reqProcess"]}
          exportFileTitle={IntlTranslate("checkerOperations")}
        />
      </CustomTabPanel>
      <CustomTabPanel value={currentTab} index={1}>
        <Box mt={3}>
          <GetDataArea
            HandleSearchClick={HandleSearchClick}
            HandleDeleteClick={HandleDeleteClick}
            btnRef={btn}
            dateFilter={false}
          />
        </Box>
        <MRTTable
          data={data}
          columns={column123}
          loading={loading}
          rowsUniqueId="CHECKER_OPERATION_ID"
          enableActions={false}
          exportFileTitle={IntlTranslate("checkerOperations")}
        />
      </CustomTabPanel>
      <CustomTabPanel value={currentTab} index={2}>
        <Box mt={3}>
          <GetDataArea
            HandleSearchClick={HandleSearchClick}
            HandleDeleteClick={HandleDeleteClick}
            btnRef={btn}
            dateFilter={false}
          />
        </Box>
        <MRTTable
          data={data}
          columns={column123}
          loading={loading}
          rowsUniqueId="CHECKER_OPERATION_ID"
          enableActions={false}
          exportFileTitle={IntlTranslate("checkerOperations")}
        />
      </CustomTabPanel>
      <CustomTabPanel value={currentTab} index={3}>
        <Box mt={3}>
          <GetDataArea
            HandleSearchClick={HandleSearchClick}
            HandleDeleteClick={HandleDeleteClick}
            btnRef={btn}
            dateFilter={false}
          />
        </Box>
        <MRTTable
          data={data}
          columns={column123}
          loading={loading}
          rowsUniqueId="CHECKER_OPERATION_ID"
          enableActions={false}
          exportFileTitle={IntlTranslate("checkerOperations")}
        />
      </CustomTabPanel>
      <CustomTabPanel value={currentTab} index={4}>
        <Box mt={3}>
          <GetDataArea
            HandleSearchClick={HandleSearchClick}
            HandleDeleteClick={HandleDeleteClick}
            btnRef={btn}
            dateFilter={false}
          />
        </Box>
        <MRTTable
          data={data}
          columns={column4}
          loading={loading}
          rowsUniqueId="CHECKER_OPERATION_ID"
          enableActions={false}
          rightPins={["reqProcess"]}
          exportFileTitle={IntlTranslate("checkerOperations")}
        />
      </CustomTabPanel>
      <CustomTabPanel value={currentTab} index={5}>
        <Box mt={3}>
          <GetDataArea
            HandleSearchClick={HandleSearchClick}
            HandleDeleteClick={HandleDeleteClick}
            btnRef={btn}
            dateFilter
            timeSelect
            pEndDate={dayjs()
              .subtract(1, "day")
              .set("hour", 23)
              .set("minute", 59)
              .set("second", 58)}
            pMaxDate={dayjs()
              .subtract(1, "day")
              .set("hour", 23)
              .set("minute", 59)
              .set("second", 59)}
          >
            <Grid xs={12} lg={3}>
              <TextField
                select
                fullWidth
                size="small"
                label={<FormattedMessage id="approvalType" />}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="all">
                  <i>
                    <FormattedMessage id="all" />
                  </i>
                </MenuItem>
                <MenuItem value="1">
                  <FormattedMessage id="checkerTabs.1" />
                </MenuItem>
                <MenuItem value="2">
                  <FormattedMessage id="checkerTabs.2" />
                </MenuItem>
                <MenuItem value="4">
                  <FormattedMessage id="checkerTabs.3" />
                </MenuItem>
              </TextField>
            </Grid>
            <Grid xs={12} lg={3}>
              <Autocomplete
                options={SCREEN_NAMES_DEF}
                fullWidth
                size="small"
                value={category}
                onChange={(e, newval) => setCategory(newval)}
                getOptionLabel={(opt) => IntlTranslate(opt)}
                renderOption={(props, option, { inputValue }) => {
                  let newopt = IntlTranslate(option);
                  const matches = match(newopt, inputValue, {
                    insideWords: true,
                  });
                  const parts = parse(newopt, matches);

                  return (
                    <li {...props}>
                      <div>
                        {parts.map((part, index) => (
                          <span
                            key={index}
                            style={{
                              backgroundColor: part.highlight
                                ? "#ffff00"
                                : "unset",
                            }}
                          >
                            {part.text}
                          </span>
                        ))}
                      </div>
                    </li>
                  );
                }}
                blurOnSelect
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={<FormattedMessage id="approvalScreenName" />}
                  />
                )}
              />
            </Grid>
          </GetDataArea>
        </Box>
        <MRTTable
          data={data}
          columns={column5}
          loading={loading}
          rowsUniqueId="CHECKER_OPERATION_ID"
          enableActions={false}
          exportFileTitle={IntlTranslate("checkerOperations")}
        />
      </CustomTabPanel>

      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        scroll="paper"
        aria-labelledby="checker-operations-dialog"
        aria-describedby="maker-checker-dialog-area"
        TransitionComponent={Transition}
        PaperComponent={PaperComponent}
      >
        <DialogTitle style={{ cursor: "move" }} id="checker-operations-dialog">
          <FormattedMessage id={`CO.dialog.title.${role}`} />
          <IconButton
            aria-label="close dialog"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 14,
              top: 12,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="maker-checker-dialog-area">
            <FormattedMessage id={`CO.dialog.desc.${role}`} />
          </DialogContentText>
          {role === "checker" && (
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              size="small"
              inputRef={noteRef}
              label={<FormattedMessage id="checkerNote" />}
              error={Boolean(descError)}
              helperText={descError}
            />
          )}
        </DialogContent>
        <DialogActions>
          {role === "maker" ? (
            <LoadingButton
              onClick={makerCancelRequest}
              color="error"
              variant="contained"
              loading={loading}
              loadingPosition="start"
              startIcon={<DeleteForeverIcon />}
            >
              <FormattedMessage id="accept" />
            </LoadingButton>
          ) : (
            <>
              <LoadingButton
                onClick={() => checkerSendResponse("1")}
                color="success"
                variant="contained"
                loading={loading}
                loadingPosition="start"
                fullWidth
                startIcon={<TaskAltOutlinedIcon />}
              >
                <FormattedMessage id="accept" />
              </LoadingButton>
              <LoadingButton
                onClick={() => checkerSendResponse("3")}
                color="secondary"
                variant="contained"
                loading={loading}
                loadingPosition="start"
                fullWidth
                startIcon={<KeyboardReturnOutlinedIcon />}
                disabled //CR iade kısmı
              >
                <FormattedMessage id="return" />
              </LoadingButton>
              <LoadingButton
                onClick={() => checkerSendResponse("2")}
                color="error"
                variant="contained"
                loading={loading}
                loadingPosition="start"
                fullWidth
                startIcon={<HighlightOffOutlinedIcon />}
              >
                <FormattedMessage id="reject" />
              </LoadingButton>
            </>
          )}
        </DialogActions>
      </Dialog>
      <DetailDialog
        selectedRow={
          Object.keys(detailRow).length === 0 ? undefined : detailRow
        }
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </>
  );
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default withTitle(injectIntl(CheckerOperations), "checkerOperations");

const passingTime = (time) => {
  const now = dayjs();
  const dateToCompare = dayjs(time, "YYYYMMDDHHmmssSSS");
  const diffInSeconds = now.diff(dateToCompare, "s", true);

  let formattedDiff;
  if (diffInSeconds < 60) {
    formattedDiff = `${Math.floor(diffInSeconds)} saniye`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    const seconds = Math.floor(diffInSeconds % 60);
    formattedDiff = `${minutes} dakika ${seconds} saniye`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    formattedDiff = `${hours} saat ${minutes} dakika`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    const hours = Math.floor((diffInSeconds % 86400) / 3600);
    formattedDiff = `${days} gün ${hours} saat`;
  }

  return formattedDiff;
};
function PaperComponent(props) {
  return (
    <Draggable
      handle="#checker-operations-dialog"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
