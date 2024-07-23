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
import GetDataArea from "../../components/GetDataArea";
import MRTTable from "../../components/MRTTable";
import UpdateDialog from "../../components/UpdateDialog";
import {
  COMakerSendRequest,
  ParametersGetAll,
  ParametersGetCategoryList,
} from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { useSnackbar } from "notistack";
import { dateConverter } from "../../helpers/dateHelpers";
import ParametersUpdate from "./ParametersUpdate";
import Grid from "@mui/material/Unstable_Grid2";
import { IconButton, MenuItem, TextField } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import { injectIntl } from "react-intl";

function Parameters({ intl }) {
  const breadcrumb = useMemo(
    () => [{ name: <FormattedMessage id="parameters" />, active: true }],
    []
  );
  const { user, role, getCurrentPagePermissions } = useAuth();
  const canEditeDeleteRow = useMemo(() => {
    return role === "maker" && getCurrentPagePermissions.updateP ? true : false;
  }, [role, getCurrentPagePermissions]);
  const IntlTranslate = useCallback((id) => intl.formatMessage({ id }), [intl]);
  const columns = useMemo(
    () =>
      [
        { accessorKey: "GEN_PARAMS_ID", header: IntlTranslate("id") },
        { accessorKey: "CATEGORY", header: IntlTranslate("category") },
        { accessorKey: "KEY", header: IntlTranslate("code") },
        { accessorKey: "VALUE", header: IntlTranslate("value") },
        {
          accessorKey: "DESCRIPTION",
          header: IntlTranslate("description"),
          size: 240,
        },
        {
          accessorKey: "MODIFY_DATE",
          header: IntlTranslate("modificationDate"),
          size: 220,
          sortingFn: "dotDHSort",
        },
        {
          accessorKey: "MODIFY_USER",
          header: IntlTranslate("modifiedByUser"),
          size: 240,
        },
        canEditeDeleteRow && {
          id: "reqProcess",
          header: IntlTranslate("update"),
          columnDefType: "display",
          enablePinning: false,
          size: 80,
          //right align the header and body cells
          muiTableHeadCellProps: {
            align: "right",
          },
          muiTableBodyCellProps: {
            align: "right",
          },
          Cell: (params) => (
            <IconButton
              size="small"
              color="warning"
              onClick={() =>
                setEditDeleteSelectedRow({
                  operation: "edit",
                  rows: [params.row.original.GEN_PARAMS_ID],
                })
              }
              disabled={params.row.original.IS_EDITABLE === "N"}
            >
              <ReplayIcon />
            </IconButton>
          ),
        },
      ].filter(Boolean),
    [IntlTranslate, canEditeDeleteRow]
  );
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  //GET DATA FILTERS
  const btn = useRef();
  const { enqueueSnackbar } = useSnackbar();

  //custom filter
  const [selectedCategory, setSelectedCategory] = useState("all");
  const HandleSearchClick = useCallback(async () => {
    setLoading(true);
    await ParametersGetAll({
      CATEGORY: selectedCategory === "all" ? "" : selectedCategory,
    }).then((resp) => {
      setData(
        resp.DATA.map(({ MODIFY_DATE, ...rest }) => ({
          ...rest,
          MODIFY_DATE: dateConverter(MODIFY_DATE),
        }))
      );
    });
    setLoading(false);
  }, [selectedCategory]);
  const HandleDeleteClick = useCallback(async () => {
    setSelectedCategory("all");
    setData([]);
    setLoading(false);
  }, []);

  //START - Update & Delete Actions
  const [editDeleteSelectedRow, setEditDeleteSelectedRow] = useState({
    operation: "",
    rows: [],
  });
  const resetSelected = useCallback(() => {
    setEditDeleteSelectedRow((prev) => ({
      operation: prev.operation,
      rows: [],
    }));
  }, []);
  const onClose = () => {
    resetSelected();
  };

  const updateValues = useRef();
  const onUpdate = async () => {
    if (Object.keys(updateValues.current.errors).length > 0) {
      return;
    }
    setLoading(true);
    const values = updateValues.current.datas;
    let i = 0;
    let status = true;
    if(values.category === "PROTECTION_ACCOUNT"){
      values.value = dateConverter(values.value.toISOString(),"isoFull","hourMintwoDoths")
    }
    while (i < editDeleteSelectedRow.rows.length) {
      let result = await COMakerSendRequest({
        MAKER_USER_ID: user.USER_ID,
        PROCESS: "U",
        CATEGORY: "parameters",
        API_NAME: "bo_user/boParamsInsert",
        REQUEST_DATA_UNIQUE_FIELD: editDeleteSelectedRow.rows[i],
        REQUEST_DATA: JSON.stringify({
          GEN_PARAMS_ID: editDeleteSelectedRow.rows[i],
          VALUE: values.value,
          DESCRIPTION: values.description,
          CATEGORY: values.category,
          USER: user.USER_ID,
        }),
        DISPLAY_DATA: JSON.stringify({
          KEY: values.key,
          VALUE: values.value,
          DESCRIPTION: values.description,
          CATEGORY: values.category,
          USER: `${user.NAME} ${user.SURNAME}`,
        }),
      });
      if (result.STATUS === "success") {
        i++;
      } else {
        status = false;
        enqueueSnackbar(result.RESPONSECODEDESC, { variant: "error" });
        break;
      }
    }
    if (status) {
      enqueueSnackbar("Parametre güncelleme talebi başarıyla oluşturuldu.", {
        variant: "success",
      });
    }
    resetSelected();
    setLoading(false);
    btn.current.click();
  };
  //END - Update & Delete Actions

  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    ParametersGetCategoryList().then((resp) => {
      setCategoryList(resp.DATA.map((e) => ({ id: e.CATEGORY })));
    });
  }, []);
  return (
    <>
      <AppBreadcrumb links={breadcrumb} />
      <GetDataArea
        HandleSearchClick={HandleSearchClick}
        HandleDeleteClick={HandleDeleteClick}
        btnRef={btn}
        dateFilter={false}
      >
        <Grid xs={12} lg={3}>
          <TextField
            fullWidth
            size="small"
            label={<FormattedMessage id="category" />}
            select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem value="all">
              <i>
                <FormattedMessage id="all2" />
              </i>
            </MenuItem>
            {categoryList.map((e, i) => (
              <MenuItem key={i} value={e.id}>
                {e.id}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </GetDataArea>
      <MRTTable
        data={data}
        columns={columns}
        loading={loading}
        rowsUniqueId="GEN_PARAMS_ID"
        setEditDeleteSelectedRow={setEditDeleteSelectedRow}
        enableActions={false}
        rightPins={["reqProcess"]}
        exportFileTitle={IntlTranslate("parameters")}
      />
      <UpdateDialog
        editDeleteSelectedRow={editDeleteSelectedRow}
        onClose={onClose}
        onUpdate={onUpdate}
        datas={{
          id: data.find(
            (e) => e.GEN_PARAMS_ID === editDeleteSelectedRow.rows[0]
          )?.GEN_PARAMS_ID,
          label: data.find(
            (e) => e.GEN_PARAMS_ID === editDeleteSelectedRow.rows[0]
          )?.KEY,
        }}
        loading={loading}
      >
        <ParametersUpdate
          ref={updateValues}
          datas={data.find(
            (e) => e.GEN_PARAMS_ID === editDeleteSelectedRow.rows[0]
          )}
          categories={categoryList}
        />
      </UpdateDialog>
    </>
  );
}

export default withTitle(injectIntl(Parameters), "parameters");
