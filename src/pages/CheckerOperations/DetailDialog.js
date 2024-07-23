import React from "react";
import { GetDetailChildren } from "./DetailPages";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Slide,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import CloseIcon from "@mui/icons-material/Close";
import Draggable from "react-draggable";

const PROCESS_DEF = {
  C: {
    btn: "success",
    color: "success.dark",
    bg: "success.light",
  },
  U: {
    btn: "warning",
    color: "warning.dark",
    bg: "warning.light",
  },
  D: {
    btn: "error",
    color: "error.dark",
    bg: "error.light",
  },
  "": {
    btn: "primary",
    color: "primary.dark",
    bg: "primary.light",
  },
};
function DetailDialog(props) {
  const {
    selectedRow = { PROCESS: "C", CATEGORY: "", DISPLAY_DATA: "" },
    open,
    onClose,
  } = props;
  //selectedRow = {CATEGORY, REQUEST_DATA PROCESS}

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      scroll="paper"
      aria-labelledby="maker-checker-data-detail"
      aria-describedby="maker-checker-dialog-area"
      TransitionComponent={Transition}
      PaperComponent={DraggableComponent}
    >
      <DialogTitle
        id="maker-checker-data-detail"
        style={{ cursor: "move" }}
        sx={{
          backgroundColor: PROCESS_DEF[selectedRow.PROCESS].bg,
          color: PROCESS_DEF[selectedRow.PROCESS].color,
        }}
        borderBottom
      >
        {selectedRow.CATEGORY ? (
          <>
            <FormattedMessage id={selectedRow.CATEGORY} />{" "}
            <FormattedMessage id="detail" />
          </>
        ) : (
          "İşlem Detay"
        )}
        <IconButton
          aria-label="close dialog"
          onClick={onClose}
          color={PROCESS_DEF[selectedRow.PROCESS].btn}
          sx={{
            position: "absolute",
            right: 14,
            top: 12,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ paddingTop: "1.25rem !important" }}>
        {GetDetailChildren(selectedRow.CATEGORY, selectedRow.DISPLAY_DATA)}
      </DialogContent>
    </Dialog>
  );
}

export default DetailDialog;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function DraggableComponent(props) {
  return (
    <Draggable
      handle="#maker-checker-data-detail"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
