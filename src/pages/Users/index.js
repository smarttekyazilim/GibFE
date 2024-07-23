import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import withTitle from "../../helpers/hoc/withTitle";
import AppBreadcrumb from "../../components/layout/AppBreadcrumb";
import { FormattedMessage } from "react-intl";
import { UserGetAll, COMakerSendRequest } from "../../api/api";
import { Chip, Typography } from "@mui/material";
import { dateConverter } from "../../helpers/dateHelpers";
import { useSnackbar } from "notistack";
import DeleteDialog from "../../components/DeleteDialog";
import UpdateDialog from "../../components/UpdateDialog";
import UserUpdate from "./UserUpdate";
import { useAuth } from "../../context/AuthContext";
import { convertRolPermissionToReadableObj } from "../../helpers/HELPERS";
import MRTTable from "../../components/MRTTable";
import { injectIntl } from "react-intl";

function Users({ intl }) {
  const breadcrumb = useMemo(
    () => [{ name: <FormattedMessage id="users" />, active: true }],
    []
  );
  const IntlTranslate = useCallback((id) => intl.formatMessage({ id }), [intl]);
  const columns = useMemo(
    () => [
      //{ accessorKey: "USER_ID", header: IntlTranslate("userId") },
      {
        accessorKey: "REGISTRATION_NO",
        header: IntlTranslate("registrationNo"),
      },
      { accessorKey: "NAME", header: IntlTranslate("firstName") },
      { accessorKey: "SURNAME", header: IntlTranslate("lastName") },
      {
        accessorKey: "USER_NAME",
        header: IntlTranslate("username"),
        size: 200,
      },
      { accessorKey: "EMAIL", header: IntlTranslate("email") },
      { accessorKey: "GSM_NO", header: IntlTranslate("phone"), size: 200 },
      {
        accessorKey: "USER_TYPE",
        header: IntlTranslate("userType"),
        size: 200,
        Cell: (params) => (
          <Chip size="small" label={params.cell.getValue()} color="primary" />
        ),
      },
      {
        accessorKey: "IS_READONLY_USER",
        header: IntlTranslate("isReadonlyUser"),
        size: 260,
        Cell: (params) => (
          <Chip
            size="small"
            label={params.cell.getValue()}
            variant="outlined"
            disabled={params.cell.getValue() === "EVET"}
          />
        ),
      },
      {
        accessorKey: "ROLE_PERMISSION",
        header: IntlTranslate("roles"),
        Cell: (params) => {
          let val = params.cell.getValue().split(" Adet");
          return (
            <span>
              <b>{val[0]}</b> Adet
            </span>
          );
        },
      },
      {
        accessorKey: "CREATE_DATE",
        header: IntlTranslate("creationDate"),
        size: 220,
        sortingFn: "dotDHSort",
      },
      {
        accessorKey: "CREATE_USER",
        header: IntlTranslate("createdByUser"),
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
    ],
    [IntlTranslate]
  );
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  //GET DATA FILTERS
  const [pageChanged, setPageChanged] = useState(new Date().getTime());
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setLoading(true);
    UserGetAll().then((resp) => {
      setData(
        resp.DATA.map(
          ({
            CREATE_DATE,
            MODIFY_DATE,
            ROLE_PERMISSION,
            IS_READONLY_USER,
            ...rest
          }) => ({
            ...rest,
            CREATE_DATE: dateConverter(CREATE_DATE),
            MODIFY_DATE: dateConverter(MODIFY_DATE),
            ROLE_PERMISSION: ROLE_PERMISSION
              ? `${
                  convertRolPermissionToReadableObj(ROLE_PERMISSION)
                    .ALLOWED_PAGES.length
                } Adet`
              : "0 Adet",
            IS_READONLY_USER: IS_READONLY_USER === "0" ? "HAYIR" : "EVET",
          })
        )
      );
    });
    setLoading(false);
  }, [pageChanged]);

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

  const onDelete = async () => {
    setLoading(true);
    let status = true;
    for (let i = 0; i < editDeleteSelectedRow.rows.length; i++) {
      let result = await COMakerSendRequest({
        MAKER_USER_ID: user.USER_ID,
        PROCESS: "D",
        CATEGORY: "users",
        API_NAME: "bo_user/boDeleteUser",
        REQUEST_DATA_UNIQUE_FIELD: editDeleteSelectedRow.rows[i],
        REQUEST_DATA: JSON.stringify({
          USER_ID: editDeleteSelectedRow.rows[i],
        }),
        DISPLAY_DATA: JSON.stringify({
          ...data.find((e) => e.USER_ID === editDeleteSelectedRow.rows[i]),
        }),
      });
      if (result.STATUS === "success") {
        continue;
      } else {
        status = false;
        enqueueSnackbar(result.RESPONSECODEDESC, { variant: "error" });
        break;
      }
    }
    if (status) {
      enqueueSnackbar("Kullanıcı silme talebi başarıyla oluşturuldu.", {
        variant: "success",
      });
    }
    resetSelected();
    setLoading(false);
    setPageChanged(new Date().getTime());
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
    while (i < editDeleteSelectedRow.rows.length) {
      let result = await COMakerSendRequest({
        MAKER_USER_ID: user.USER_ID,
        PROCESS: "U",
        CATEGORY: "users",
        API_NAME: "bo_user/boCreateUser",
        MAKER_NOTE: values.makerDesc,
        REQUEST_DATA_UNIQUE_FIELD: editDeleteSelectedRow.rows[i],
        REQUEST_DATA: JSON.stringify({
          USER_ID: editDeleteSelectedRow.rows[i],
          USERNAME: values.username,
          NAME: values.name,
          SURNAME: values.surname,
          GSM_NO: values.phone.replace(/\D/g, ""),
          EMAIL: values.email + values.emailDomain,
          MODIFY_USER: user.USER_ID,
          USER_TYPE: values.userType,
          IS_READONLY_USER: values.userReadonly ? "1" : "0",
          REGISTRATION_NO: values.registrationNo,
        }),
        DISPLAY_DATA: JSON.stringify({
          USER_NAME: values.username,
          NAME: values.name,
          SURNAME: values.surname,
          GSM_NO: values.phone,
          EMAIL: values.email + values.emailDomain,
          USER_TYPE: values.userType,
          IS_READONLY_USER: values.userReadonly ? "1" : "0",
          REGISTRATION_NO: values.registrationNo,
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
      enqueueSnackbar("Kullanıcı güncelleme talebi başarıyla oluşturuldu.", {
        variant: "success",
      });
    }
    resetSelected();
    setLoading(false);
    setPageChanged(new Date().getTime());
  };
  //END - Update & Delete Actions
  return (
    <>
      <AppBreadcrumb links={breadcrumb} addButton={{ name: "users.add" }} />
      <Typography variant="h1" fontSize="2rem">
        <FormattedMessage id="userTableTitle" />
      </Typography>
      <MRTTable
        data={data}
        columns={columns}
        loading={loading}
        rowsUniqueId="USER_ID"
        setEditDeleteSelectedRow={setEditDeleteSelectedRow}
        exportFileTitle={IntlTranslate("users")}
      />
      <DeleteDialog
        editDeleteSelectedRow={editDeleteSelectedRow}
        onClose={onClose}
        onDelete={onDelete}
        datas={{
          id: data.find((e) => e.USER_ID === editDeleteSelectedRow.rows[0])
            ?.USER_ID,
          label: data.find((e) => e.USER_ID === editDeleteSelectedRow.rows[0])
            ?.USER_NAME,
        }}
        loading={loading}
      />
      <UpdateDialog
        editDeleteSelectedRow={editDeleteSelectedRow}
        onClose={onClose}
        onUpdate={onUpdate}
        datas={{
          id: data.find((e) => e.USER_ID === editDeleteSelectedRow.rows[0])
            ?.USER_ID,
          label: data.find((e) => e.USER_ID === editDeleteSelectedRow.rows[0])
            ?.USER_NAME,
        }}
        loading={loading}
        title="user.edit"
      >
        <UserUpdate
          ref={updateValues}
          datas={data.find((e) => e.USER_ID === editDeleteSelectedRow.rows[0])}
        />
      </UpdateDialog>
    </>
  );
}

export default withTitle(injectIntl(Users), "users");
