import tr from "./locales/tr_TR.json";
import en from "./locales/en_EN.json";
import turkeyFlag from "../assets/flags/turkey.png";
import englandFlag from "../assets/flags/england.png";

export const AppLocale = {
  tr,
  en,
};
export const languagesData = [
  {
    code: "tr",
    name: "Türkçe",
    flag: turkeyFlag,
  },
  {
    code: "en",
    name: "English",
    flag: englandFlag,
  },
];
export const availableLanguagesWithoutFlag = languagesData.map(({flag,...rest}) => rest);