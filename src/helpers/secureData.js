import CryptoJS from "crypto-js";
import { GetRandomNum } from "./HELPERS";

export const encryptData = (data, salt, cryptMethod = "AES") =>
  CryptoJS[cryptMethod].encrypt(JSON.stringify(data), salt).toString();

export const decryptData = (ciphertext, salt, cryptMethod = "AES") => {
  const bytes = CryptoJS[cryptMethod].decrypt(ciphertext, salt);
  try {
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (err) {
    return null;
  }
};

export const customDecrypt = (str) => {
  const encryptedSl = str.split("A")[0];
  const encryptedTckn = str.split("Td")[0].split("A")[1];
  const encryptedcsd = str.split("Td")[1];

  let decryptedTckn = "";
  let decryptedSl = "";
  let decryptedcsd = "";

  const swapedHarfNum = swap(harfnumlib);
  const swapedNumToNum = swap(numToNum);
  if (encryptedTckn.slice(0, 2) === "hF") {
    decryptedTckn = "0";
  } else {
    for (let i = 0; i < 11; i++) {
      decryptedTckn += swapedHarfNum[encryptedTckn[i]];
    }
  }
  decryptedSl = swapedNumToNum[Number(encryptedSl)].toString();
  for (let i = 0; i < 17; i++) {
    if (i % 2 === 0) {
      decryptedcsd += swapedHarfNum[encryptedcsd[i]];
    } else {
      decryptedcsd += swapedNumToNum[Number(encryptedcsd[i])].toString();
    }
  }
  return {
    TCKN: decryptedTckn,
    SECURITY_LEVEL: decryptedSl,
    CALL_START_DATE: decryptedcsd,
  };
};

const harfnumlib = {
  0: "h",
  1: "Q",
  2: "b",
  3: "i",
  4: "O",
  5: "S",
  6: "z",
  7: "H",
  8: "g",
  9: "l",
};
const numToNum = {
  0: 7,
  1: 0,
  2: 5,
  3: 4,
  4: 6,
  5: 9,
  6: 2,
  7: 3,
  8: 1,
  9: 8,
};
function swap(json) {
  var ret = {};
  for (var key in json) {
    ret[json[key]] = key;
  }
  return ret;
}

export const customEncrypt = (data) => {
  //(Güvenlik seviyeleri: Kayıp Çalıntı 0 , Şifresiz 1 , Şifreli 2 )
  const tckn = data.TCKN;
  const sl = data.SECURITY_LEVEL;
  const csd = data.CALL_START_DATE;

  let encryptedTckn = "";
  let encryptedSl = "";
  let encryptedcsd = "";
  if (tckn.length === 1 || sl === "0") {
    encryptedTckn = "hF";
    let random = Math.floor(100000000 + GetRandomNum() * 900000000).toString();
    for (let i = 0; i < 9; i++) {
      encryptedTckn += harfnumlib[random[i]];
    }
  } else {
    for (let i = 0; i < 11; i++) {
      encryptedTckn += harfnumlib[tckn[i]];
    }
  }
  encryptedSl = numToNum[Number(sl)].toString();

  for (let i = 0; i < 17; i++) {
    if (i % 2 === 0) {
      encryptedcsd += harfnumlib[Number(csd[i])].toString();
    } else {
      encryptedcsd += numToNum[Number(csd[i])].toString();
    }
  }
  return `${encryptedSl}A${encryptedTckn}Td${encryptedcsd}`;
};