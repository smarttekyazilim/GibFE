import { GetFirstPagesPath } from "../routes/SiteLinks";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";
import { customDecrypt } from "./secureData";

export const HideCardNumber = (fullNumber) => {
  if (fullNumber === "" || fullNumber === null || fullNumber === undefined) {
    return "-";
  }
  const last4Digits = fullNumber.slice(-4);
  const first4Digits = fullNumber.slice(0, 4);
  var maskedNumber =
    first4Digits + last4Digits.padStart(fullNumber.length - 4, "*");
  let temp = "";
  for (let i = 0; i < fullNumber.length; i++) {
    if (i % 4 === 0 && i !== 0) {
      temp += ` ${maskedNumber[i]}`;
    } else {
      temp += maskedNumber[i];
    }
  }
  return temp;
};

export const HideGSMNo = (fullNumber) => {
  //905314378788
  if (fullNumber === "" || fullNumber === null || fullNumber === undefined) {
    return "-";
  }
  const sliceNum = fullNumber.length === 10 ? 3 : 5;
  const last2Digits = fullNumber.slice(-2);
  const first5Digits = fullNumber.slice(0, sliceNum);
  var maskedNumber =
    first5Digits + last2Digits.padStart(fullNumber.length - sliceNum, "*");
  let temp = "";
  for (let i = 0; i < fullNumber.length; i++) {
    temp += maskedNumber[i];
  }
  return temp;
};

export const HideMail = (fullMail) => {
  //talha.ekrem@smarttekas.com.tr
  if (fullMail === "" || fullMail === null || fullMail === undefined) {
    return "-";
  }
  const masked = fullMail.replace(
    /^(.)(.*)(.@.*)$/,
    (_, a, b, c) => a + b.replace(/./g, "*") + c
  );
  return masked;
};

export const convertRolPermissionToReadableObj = (str) => {
  let multipleRoles = str.split("|");
  //tanımlamalar
  var allowedPagesId = [];
  var pageCrudDef = {};

  //gereksizler
  let pageIdAndCruds = [];

  for (let m = 0; m < multipleRoles.length; m++) {
    let pages = multipleRoles[m].split(","); //sayfaları al

    for (let i = 0; i < pages.length; i++) {
      pageIdAndCruds = pages[i].split("-");
      if (!allowedPagesId.includes(pageIdAndCruds[0])) {
        allowedPagesId.push(pageIdAndCruds[0]);
      }

      pageCrudDef[pageIdAndCruds[0]] = {
        create:
          pageCrudDef[pageIdAndCruds[0]]?.create !== true
            ? pageIdAndCruds[1].includes("C")
            : true,
        read:
          pageCrudDef[pageIdAndCruds[0]]?.read !== true
            ? pageIdAndCruds[1].includes("R")
            : true,
        update:
          pageCrudDef[pageIdAndCruds[0]]?.update !== true
            ? pageIdAndCruds[1].includes("U")
            : true,
        delete:
          pageCrudDef[pageIdAndCruds[0]]?.delete !== true
            ? pageIdAndCruds[1].includes("D")
            : true,
      };
    }
  }
  return {
    ALLOWED_PAGES: allowedPagesId,
    PAGES: pageCrudDef,
  };
};
export const addRedirectURItoQueryString = () => {
  let qStr = window.location.search;
  let pathName = window.location.pathname;
  if (pathName === "/404") {
    return "";
  }
  if (qStr === "") {
    return `?redirect_uri=${pathName}`;
  } else {
    return `${qStr}&redirect_uri=${pathName}`;
  }
};
export const getRedirectURIFromQueryString = () => {
  let queryStr = window.location.search;
  if (queryStr === "") {
    //logout olmuştur. bir yönlendirme yok
    return {
      redirect: false,
      to: "",
    };
  }
  let obj = queryStr
    .replace("?", "")
    .split("&")
    .map((param) => param.split("="))
    .reduce((values, [key, value]) => {
      values[key] = value;
      return values;
    }, {});
  const { redirect_uri, ...rest } = obj;

  if (Object.keys(rest).length === 0) {
    //return_uri den başka bir şey yok demektir
    return {
      redirect: true,
      to: redirect_uri,
    };
  } else {
    const newQueryString =
      "?" +
      Object.keys(rest)
        .map((key) => {
          return `${key}=${obj[key]}`;
        })
        .join("&");
    return {
      redirect: true,
      to: `${redirect_uri}${newQueryString}`,
    };
  }
};

export const CurrencyFormat = (
  money,
  noSymbol = false,
  currencySymbol = " TL",
  locale = "tr-TR"
) => {
  if (money || money === 0) {
    let val = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(money);
    let symbol = noSymbol ? "" : currencySymbol;
    return `${val}${symbol}`;
  }
  return "-";
};

export const CurrencyFormatNoDigits = (
  money,
  noSymbol = false,
  currencySymbol = " TL",
  locale = "tr-TR"
) => {
  if (money || money === 0) {
    let val = new Intl.NumberFormat(locale, {
      maximumFractionDigits: 0,
    }).format(money);
    let symbol = noSymbol ? "" : currencySymbol;
    return `${val}${symbol}`;
  }
  return "-";
};
export const CheckAllowedHomePage = (allowedPages) => {
  const homePageId = "1";
  if (
    allowedPages.ALLOWED_PAGES.includes(homePageId) &&
    allowedPages.PAGES[homePageId].read
  ) {
    return "/";
  } else {
    return GetFirstPagesPath(
      allowedPages.ALLOWED_PAGES.filter((e) => e !== homePageId)[0]
    );
  }
};

export const TCKNCheck = (tckn) => {
  if (tckn && tckn.length === 11 && Number(tckn[0]) !== 0) {
    let oddSum = Number(tckn[0]);
    let evenSum = 0;
    for (let i = 1; i < 8; i += 2) {
      oddSum += Number(tckn[i + 1]);
      evenSum += Number(tckn[i]);
    }
    if (
      (oddSum * 7 - evenSum) % 10 === Number(tckn[9]) &&
      (oddSum + evenSum + Number(tckn[9])) % 10 === Number(tckn[10])
    ) {
      return true;
    }
  }
  return false;
};

const ICON_DEF = {
  Y: {
    thumb: ThumbUpRoundedIcon,
    check: CheckOutlinedIcon,
    color: "success",
  },
  N: {
    thumb: ThumbDownRoundedIcon,
    check: HighlightOffOutlinedIcon,
    color: "error",
  },
};

export const generateIcon = (status, type = "thumb") => {
  if (status !== "Y" && status !== "N") {
    return "";
  }
  let IconComponent = ICON_DEF[status][type];
  return (
    <IconComponent
      color={ICON_DEF[status].color}
      fontSize="small"
      sx={{ verticalAlign: "middle" }}
    />
  );
};

export const formatArchivePeriod = (str = "") => {
  if (str.length !== 7 || !str.includes("_")) {
    return str;
  }

  let year = str.slice(0, 4);
  let quarter = str[6];
  return `${year} ${quarter}. Çeyrek`;
};

const GSM_NO_LENGTH_DEF = {
  13: {
    regex: /^(.{3})(\d{3})(\d{3})(\d{4})$/,
    replacer: "$1 ($2) $3 $4",
  },
  12: {
    regex: /^(\d{2})(\d{3})(\d{3})(\d{4})$/,
    replacer: "+$1 ($2) $3 $4",
  },
  11: {
    regex: /^(\d{1})(\d{3})(\d{3})(\d{4})$/,
    replacer: "+9$1 ($2) $3 $4",
  },
  10: {
    regex: /^(\d{3})(\d{3})(\d{4})$/,
    replacer: "+90 ($1) $2 $3",
  },
};
export const gsmNoFormatter = (phone) => {
  if (phone && phone.length > 9) {
    return phone.replace(
      GSM_NO_LENGTH_DEF[phone.length].regex,
      GSM_NO_LENGTH_DEF[phone.length].replacer
    );
  }
  return "-";
};

export const getCallPages = (callStr, user) => {
  let errorReturn = {
    ALLOWED_PAGES: ["30"],
    PAGES: { 30: { create: true, read: true, update: true, delete: true } },
  };
  let callDetail = customDecrypt(callStr);
  if (Object.keys(callDetail).length === 0) {
    return errorReturn;
  }
  if (!user?.SECURITY_LEVEL_PAGES) {
    return errorReturn;
  }
  console.log("callDetail", callDetail);
  console.log("user", user);
  let securityLevel = callDetail.SECURITY_LEVEL;
  let pagesStr = user.SECURITY_LEVEL_PAGES;
  let temp = {};
  pagesStr.split("-").forEach((e) => {
    let key = e.split(":")[0];
    let values = e.split(":")[1].split(",");
    temp[key] = values;
  });
  let pageIds = temp[securityLevel];
  if (!pageIds.includes("30")) {
    //callCenter sayfası idsi. olmak zorundadır. değilse ekle. eğer bu sayfa yoksa çağrı gelemez ve kapatamaz
    pageIds.push("30");
  }
  let temp2 = {};
  pageIds.forEach(
    (e) =>
      (temp2[e] = {
        create: true,
        read: true,
        update: true,
        delete: true,
      })
  );

  return {
    ALLOWED_PAGES: pageIds,
    PAGES: temp2,
  };
};

export const USER_EMAIL_DOMAINS = ["@ziraatpay.com.tr", "@ziraatbank.com.tr"];

export const GetRandomNum = () => {
  const cryp = window.crypto || window.msCrypto;
  var tab = new Uint32Array(1);
  cryp.getRandomValues(tab);
  return tab[0] / 2 ** 32;
};
