import { createContext, useContext, useState, useEffect } from "react";
import { FinanceCodesGetAll } from "../api/api";
const GlobalContext = createContext();

const trxTypes = {
  YI: "YI - Yurt İçi",
  YD: "YD - Yurt Dışı",
  "": "YI - Yurt İçi ve YD - Yurt Dışı",
};
const GlobalProvider = ({ children }) => {
  const [posEntryModes, setPosEntryModes] = useState([
    { CODE: "", DESCRIPTION: "" },
  ]);
  const [isSent, setIsSent] = useState(true);
  const [trxCodes, setTrxCodes] = useState([
    {
      TRX_TYPE_CODE: "030",
      TRX_TYPE_SUBCODE: "0503",
      TRX_TYPE_DESC: "Ziraat ATM Ziraatpay Kart Para çekme",
      TRX_TYPE_SIGN: "EKSI",
      TRX_TYPE_REPEATABLE: "N",
      TRX_TERM_SOURCE_CODE: "01",
      TRX_TYPE_INFO: "WITHDRAW",
    },
  ]);
  const [sourceCodes, setSourceCodes] = useState([
    {
      TERM_SOURCE_CODE: "01",
      TERM_SOURCE_DESC: "ATM",
    },
  ]);
  useEffect(() => {
    if (!isSent) {
      FinanceCodesGetAll().then((resp) => {
        if (resp.STATUS === "success") {
          setPosEntryModes(resp.POS_ENTRY_MODES);
          setTrxCodes(resp.TRX_CODES);
          setSourceCodes(resp.TERMINAL_SOURCE);
          setIsSent(true);
        }
      });
    }
  }, [isSent]);
  const values = { posEntryModes, trxCodes, sourceCodes, trxTypes };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

const useGlobal = () => useContext(GlobalContext);

export { GlobalProvider, useGlobal };
