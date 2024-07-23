import dayjs from "dayjs";
const FORMATS = {
  full: "DD.MM.YYYY HH:mm:ss.SSS",
  isoFull: "YYYY-MM-DDTHH:mm:ss.SSSZ",
  dotdate: "DD.MM.YYYY",
  dotHour: "HH:mm:ss",
  dotdatehourmin: "DD.MM.YYYY HH:mm",
  dotdatesec: "DD.MM.YYYY HH:mm:ss",
  dotsingledatehourminsec: "D.MM.YYYY HH:mm:ss",
  dateseventeen: "YYYYMMDDHHmmssSSS",
  datefourteen: "YYYYMMDDHHmmss",
  dateonly: "YYYYMMDD",
  houronly: "HHmmss",
  slashdate: "DD/MM/YYYY",
  timestampformat: "YYYY-MM-DD HH:mm:ss",
  slashdatehourmin: "DD/MM/YYYY HH:mm",
  timestamp: "YYYY-MM-DDTHH:mm:ss",
  yeartosecond: "DD/MM/YY HH:mm:ss",
  fileDate: "DD.MM.YY HH-mm-ss",
  exceptDate: "HHmmssSSS",
  dateOnlyDash: "YYYY-MM-DD",
  mmSlashddSlashyyyy: "MM/DD/YYYY",
  hourMintwoDoths:"HH:mm"
};
export const dateConverter = (
  dateStr,
  importType = "dateseventeen",
  formatType = "dotdatehourmin"
) => {
  if (dateStr && dateStr.slice(0, 8) !== "19000101") {
    return dayjs(dateStr, FORMATS[importType]).format(FORMATS[formatType]);
  } else {
    return "-";
  }
};

export const dateSort = (dateStr, importType = "dotdatehourmin") => {
  if (dateStr && dateStr !== "-") {
    return dayjs(dateStr, FORMATS[importType]).format(FORMATS.dateseventeen);
  } else {
    return "0";
  }
};
