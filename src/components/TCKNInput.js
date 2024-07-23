import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { FormattedMessage } from "react-intl";
import { TextField } from "@mui/material";
import { TCKNCheck } from "../helpers/HELPERS";

const TCKNInput = forwardRef(({ size = "small", disabled = false }, ref) => {
  const [tckn, setTckn] = useState("");
  const [tcknError, setTcknError] = useState("");
  const handleTcknChange = (e) => {
    setTckn(e.target.value);
    if (e.target.value.length === 11 && !TCKNCheck(e.target.value)) {
      setTcknError("TCKN geçersiz");
    } else {
      setTcknError("");
    }
  };
  const Reset = useCallback(() => {
    setTckn("");
    setTcknError("");
  }, []);

  const CheckTCKN = useCallback(() => {
    if (tckn && !TCKNCheck(tckn).toString()) {
      setTcknError("TCKN geçersiz");
      return false;
    } else {
      return true;
    }
  }, [tckn]);
  useImperativeHandle(ref, () => {
    return { tckn, Reset, CheckTCKN };
  });
  return (
    <TextField
      label={<FormattedMessage id="tckn" />}
      fullWidth
      value={tckn}
      onChange={handleTcknChange}
      onBeforeInput={(event) => {
        if (event.target.value.length >= 11 || !/[0-9]/.test(event.data)) {
          event.preventDefault();
        }
      }}
      error={Boolean(tcknError)}
      helperText={tcknError}
      size={size}
      disabled={disabled}
    />
  );
});

export default TCKNInput;
