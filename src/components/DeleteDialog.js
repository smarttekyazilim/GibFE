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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Draggable from "react-draggable";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteDialog({
  editDeleteSelectedRow,
  onClose,
  onDelete,
  datas,
  loading,
}) {
  return (
    <Dialog
      open={
        editDeleteSelectedRow.operation === "delete" &&
        editDeleteSelectedRow.rows.length > 0
          ? true
          : false
      }
      onClose={onClose}
      fullWidth
      maxWidth="xl"
      scroll="paper"
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      TransitionComponent={Transition}
      PaperComponent={PaperComponent}
    >
      <DialogTitle style={{ cursor: "move" }} id="delete-dialog-title">
        <FormattedMessage id="dialog.delete" />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          {editDeleteSelectedRow.rows.length > 1 ? (
            <FormattedMessage
              id="deleteItemsCountMessage"
              values={{ count: editDeleteSelectedRow.rows.length }}
            />
          ) : (
            <>
              <b>{`${datas?.id ? `(${datas.id})` : ""} ${
                datas?.label || ""
              }`}</b>
              &nbsp;&nbsp;&nbsp;
              <FormattedMessage id="deleteitemmessage" />
            </>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          <FormattedMessage id="cancel" />
        </Button>
        <LoadingButton
          onClick={onDelete}
          color="error"
          variant="contained"
          loading={loading}
          loadingPosition="start"
          startIcon={<DeleteForeverIcon />}
        >
          <FormattedMessage id="remove" />
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default React.memo(DeleteDialog);
function PaperComponent(props) {
  return (
    <Draggable
      handle="#delete-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
