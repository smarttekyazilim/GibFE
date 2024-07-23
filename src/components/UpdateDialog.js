import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Slide,
} from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";
import ReplayIcon from "@mui/icons-material/Replay";
import Draggable from "react-draggable";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function UpdateDialog({
  editDeleteSelectedRow,
  onClose,
  onUpdate,
  datas,
  loading,
  children,
  title = "dialog.edit",
}) {
  return (
    <Dialog
      open={
        editDeleteSelectedRow.operation === "edit" &&
        editDeleteSelectedRow.rows.length > 0
          ? true
          : false
      }
      onClose={onClose}
      fullWidth
      maxWidth="xl"
      scroll="paper"
      aria-labelledby="update-dialog-title"
      aria-describedby="update-dialog-description"
      TransitionComponent={Transition}
      PaperComponent={PaperComponent}
    >
      <DialogTitle style={{ cursor: "move" }} id="update-dialog-title">
        <FormattedMessage id={title} />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="update-dialog-description">
          {editDeleteSelectedRow.rows.length > 1 ? (
            <FormattedMessage
              id="updateItemsCountMessage"
              values={{ count: editDeleteSelectedRow.rows.length }}
            />
          ) : (
            <>
              <b>{`${datas?.id ? `(${datas.id})` : ""} ${
                datas?.label || ""
              }`}</b>
              &nbsp;&nbsp;&nbsp;
              <FormattedMessage id="updateitemmessage" />
            </>
          )}
        </DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          <FormattedMessage id="cancel" />
        </Button>
        <LoadingButton
          onClick={onUpdate}
          color="warning"
          variant="contained"
          loading={loading}
          loadingPosition="start"
          startIcon={<ReplayIcon />}
        >
          <FormattedMessage id="update" />
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default React.memo(UpdateDialog);
function PaperComponent(props) {
  return (
    <Draggable
      handle="#update-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
