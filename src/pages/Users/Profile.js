import React, { useEffect, useMemo, useState } from "react";
import AppBreadcrumb from "../../components/layout/AppBreadcrumb";
import { FormattedMessage } from "react-intl";
import withTitle from "../../helpers/hoc/withTitle";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Chip,
  CircularProgress,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
} from "@mui/material";
import { UserGetById, profileChangePassword } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { generateIcon, gsmNoFormatter } from "../../helpers/HELPERS";
import { dateConverter } from "../../helpers/dateHelpers";
import CreateIcon from "@mui/icons-material/Create";
import CheckIcon from "@mui/icons-material/Check";
import { useSnackbar } from "notistack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useFormik, Form, FormikProvider } from "formik";

//START - Role
const ROLE_OBJ = {
  maker: {
    label: "Maker",
    icon: <CreateIcon color="inherit" />,
    chipColor: "#1a1a1a",
  },
  checker: {
    label: "Checker",
    icon: <CheckIcon color="inherit" />,
    chipColor: "#e10514",
  },
};
//END - Role

//START - YUP
const validationSchema = yup.object({
  CURRENT_PASSWORD: yup
    .string()
    .min(10, <FormattedMessage id="password.min" />)
    .matches(
      // eslint-disable-next-line
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Parola en az bir küçük harf, bir büyük harf, bir rakam ve bir sembol içermelidir"
    )
    .required(<FormattedMessage id="currentPassword.required" />),
  NEW_PASSWORD: yup
    .string()
    .min(10, <FormattedMessage id="password.min" />)
    .matches(
      // eslint-disable-next-line
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Parola en az bir küçük harf, bir büyük harf, bir rakam ve bir sembol içermelidir"
    )
    .required(<FormattedMessage id="newPassword.required" />),
  NEW_PASSWORD_AGAIN: yup
    .string()
    .oneOf(
      [yup.ref("NEW_PASSWORD")],
      <FormattedMessage id="newPasswordsNotMatch" />
    )
    .required(<FormattedMessage id="newPasswordAgain.required" />),
});
//END - YUP

function Profile() {
  const breadcrumb = useMemo(
    () => [{ name: <FormattedMessage id="profile" />, active: true }],
    []
  );
  const { user } = useAuth();
  //Api bağlantısı
  const [data, setData] = useState({});
  useEffect(() => {
    UserGetById(user.USER_ID).then((resp) => setData(resp.DATA[0]));
  }, [user]);

  //START - Şifre Değiştir
  const [diologopen, setDiologOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      CURRENT_PASSWORD: "",
      NEW_PASSWORD: "",
      NEW_PASSWORD_AGAIN: "",
    },
    validationSchema,
    onSubmit: async (datas, { resetForm }) => {
      if (user.USER_ID === "") {
        enqueueSnackbar(
          "Kullanıcı bilgilerini getirilirken bir hata oluştu. Daha sonra tekrar deneyin",
          {
            variant: "error",
          }
        );
        return;
      }
      setLoading(true);

      await profileChangePassword({
        USER_ID: user.USER_ID,
        OLD_PASSWORD: datas.CURRENT_PASSWORD,
        NEW_PASSWORD: datas.NEW_PASSWORD,
        CREATE_USER_ID: user.USER_ID,
        SOURCE: "profileChangePassword",
      })
        .then((loginResponse) => {
          if (loginResponse.STATUS === "success") {
            enqueueSnackbar(
              "Şifre başarıyla değiştirildi. Tekrar giriş yapınız.",
              { variant: "success" }
            );
            resetForm();
            setDiologOpen(false);
          } else {
            enqueueSnackbar(loginResponse.RESPONSECODEDESC, {
              variant: "error",
            });
          }
        })
        .catch((err) => {
          enqueueSnackbar(err.message, {
            variant: "error",
          });
        })
        .finally(() => setLoading(false));
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  //START - Şifre Hashleme
  const [showPasswords, setShowPasswords] = useState({
    CURRENT_PASSWORD: false,
    NEW_PASSWORD: false,
    NEW_PASSWORD_AGAIN: false,
  });

  const handleShowPassword = (name) => {
    setShowPasswords((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };
  //END - Şifre Hashleme

  //END - Şifre Değiştir

  return (
    <>
      <AppBreadcrumb links={breadcrumb} />
      {Object.keys(data).length > 0 ? (
        <TableContainer>
          <Table aria-label="customer informations">
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <FormattedMessage id="userID" />
                </TableCell>
                <TableCell>{data.USER_ID}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <FormattedMessage id="name" />
                </TableCell>
                <TableCell>{data.NAME}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <FormattedMessage id="surname" />
                </TableCell>
                <TableCell>{data.SURNAME}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <FormattedMessage id="username" />
                </TableCell>
                <TableCell>{data.USER_NAME}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <FormattedMessage id="password" />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    // color="secondary"
                    sx={{
                      color: "blue",
                      borderColor: "blue",
                      "&:hover": {
                        backgroundColor: "transparent",
                        borderColor: "darkblue",
                        color: "darkblue",
                      },
                    }}
                    size="small"
                    onClick={() => {
                      setDiologOpen(true);
                    }}
                  >
                    <FormattedMessage id="changePassword" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <FormattedMessage id="email" />
                </TableCell>
                <TableCell>{data.EMAIL}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <FormattedMessage id="cellphone" />
                </TableCell>
                <TableCell>{gsmNoFormatter(data.GSM_NO)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <FormattedMessage id="userType" />
                </TableCell>
                <TableCell>
                  <Chip
                    variant="outlined"
                    size="small"
                    sx={{
                      color: ROLE_OBJ[data.USER_TYPE]?.chipColor,
                      borderColor: ROLE_OBJ[data.USER_TYPE]?.chipColor,
                    }}
                    label={ROLE_OBJ[data.USER_TYPE]?.label}
                    icon={ROLE_OBJ[data.USER_TYPE]?.icon}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <FormattedMessage id="creationDate" />
                </TableCell>
                <TableCell>{dateConverter(data.CREATE_DATE)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <FormattedMessage id="createdByUser" />
                </TableCell>
                <TableCell>{data.CREATE_USER || "-"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <FormattedMessage id="modificationDate" />
                </TableCell>
                <TableCell>{dateConverter(data.MODIFY_DATE)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <FormattedMessage id="modifiedByUser" />
                </TableCell>
                <TableCell>{data.MODIFY_USER || "-"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <FormattedMessage id="isReadonlyUser" />
                </TableCell>
                <TableCell>
                  {generateIcon(
                    data?.IS_READONLY_USER?.toString() === "1" ? "Y" : "N"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <FormattedMessage id="passwordExpireDate" />
                </TableCell>
                <TableCell>
                  {dateConverter(data.PASSWORD_EXPIRE_DATE)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <FormattedMessage id="userStatus" />
                </TableCell>
                <TableCell>{data.USER_STATUS}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <FormattedMessage id="rolePermission" />
                </TableCell>
                <TableCell>
                  <b>{data?.ROLE_PERMISSION?.split(",").length || 0}</b> Adet
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <FormattedMessage id="roleName" />
                </TableCell>
                <TableCell>
                  {data?.ROLE_NAMES?.split(",").map((roleName, i) => (
                    <Chip
                      key={i}
                      size="small"
                      label={roleName.trim()}
                      sx={{ mr: 1 }}
                    />
                  ))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
        </Box>
      )}

      {/* Şifre Değiştirme Diolog*/}
      <Dialog
        open={diologopen}
        onClose={() => {
          setDiologOpen(false);
        }}
        PaperProps={{
          component: "div",
          // onSubmit: () => {
          //   setDiologOpen(false)
          // },
        }}
      >
        <DialogTitle>
          <FormattedMessage id="changePassword" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <FormattedMessage id="password.typeError" />
          </DialogContentText>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                autoComplete="current-password"
                type={showPasswords.CURRENT_PASSWORD ? "text" : "password"}
                label={<FormattedMessage id="currentPassword" />}
                {...getFieldProps("CURRENT_PASSWORD")}
                error={Boolean(
                  touched.CURRENT_PASSWORD && errors.CURRENT_PASSWORD
                )}
                helperText={touched.CURRENT_PASSWORD && errors.CURRENT_PASSWORD}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleShowPassword("CURRENT_PASSWORD")}
                        edge="end"
                      >
                        {showPasswords.CURRENT_PASSWORD ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                autoComplete="new-password"
                type={showPasswords.NEW_PASSWORD ? "text" : "password"}
                label={<FormattedMessage id="newPassword" />}
                {...getFieldProps("NEW_PASSWORD")}
                error={Boolean(touched.NEW_PASSWORD && errors.NEW_PASSWORD)}
                helperText={touched.NEW_PASSWORD && errors.NEW_PASSWORD}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleShowPassword("NEW_PASSWORD")}
                        edge="end"
                      >
                        {showPasswords.NEW_PASSWORD ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                autoComplete="new-password-again"
                type={showPasswords.NEW_PASSWORD_AGAIN ? "text" : "password"}
                label={<FormattedMessage id="newPasswordAgain" />}
                {...getFieldProps("NEW_PASSWORD_AGAIN")}
                error={Boolean(
                  touched.NEW_PASSWORD_AGAIN && errors.NEW_PASSWORD_AGAIN
                )}
                helperText={
                  touched.NEW_PASSWORD_AGAIN && errors.NEW_PASSWORD_AGAIN
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleShowPassword("NEW_PASSWORD_AGAIN")}
                        edge="end"
                      >
                        {showPasswords.NEW_PASSWORD_AGAIN ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <DialogActions>
                <Button
                  onClick={() => {
                    setDiologOpen(false);
                  }}
                >
                  <FormattedMessage id="cancel" />
                </Button>
                <LoadingButton type="submit" loading={loading} color="success">
                  <FormattedMessage id="changePassword" />
                </LoadingButton>
              </DialogActions>
            </Form>
          </FormikProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default withTitle(Profile, "profile");

// const data = {
//   "USER_ID": 1,
//   "NAME": "Talha",
//   "SURNAME": "Ekrem",
//   "USER_NAME": "smarttek",
//   "EMAIL": "talha.ekrem@smarttekas.com.tr",
//   "GSM_NO": "905314378788",
//   "USER_TYPE": "maker",
//   "CREATE_DATE": "20230607120236092",
//   "CREATE_USER": null,
//   "MODIFY_DATE": "20230907163525427",
//   "MODIFY_USER": "smarttek",
//   "IS_READONLY_USER": "0",
//   "PASSWORD_EXPIRE_DATE": "20241208115019000",
//   "USER_STATUS": "OK",
//   "ROLE_PERMISSION": "2-CRUD,3-CRUD,25-CRUD,26-CRUD,27-CRUD,28-CRUD,21-CRUD,22-CRUD,23-CRUD,24-CRUD,4-CRUD,9-CRUD,8-CRUD,6-CRUD,7-CRUD,10-CRUD,18-CRUD,19-CRUD,11-CUDR,12-CRUD,14-CRUD,15-CRUD,16-CRUD,17-CRUD,13-CRUD,1-CRUD,30-CRUD,20-CRUD,29-CRUD,5-CRUD,31-CRUD,100-CRUD,101-CRUD,32-CRUD,34-CRUD,33-CRUD,102-CRUD,103-CRUD,201-CRUD,202-CRDU,203-CRUD,204-CRUD,35-CDUR,99-CRUD,36-CRUD,37-CRUD,38-CRUD,39-CRUD,40-CRUD,999-CRUD,41-CRUD,301-CRUD,300-CRUD,42-CRUD,888-CRUD,50-CRUD,51-CRUD,104-CRUD,302-CRUD",
//   "ROLE_NAMES": "Super Admin"
// };
