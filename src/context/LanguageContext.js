import { createContext, useContext, useState, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { AppLocale } from "../languages";
import { availableLanguagesWithoutFlag } from "../languages";
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  let langState = "tr";
  if (
    localStorage.getItem("locale") &&
    availableLanguagesWithoutFlag.some(
      (e) => e.code === localStorage.getItem("locale")
    )
  ) {
    langState = localStorage.getItem("locale");
  }
  const [lang, setLang] = useState(langState);
  useEffect(() => {
    localStorage.setItem("locale", lang);
    document.getElementsByTagName("html")[0].setAttribute("lang", lang);
  }, [lang]);

  const values = {
    lang,
    setLang,
  };
  return (
    <LanguageContext.Provider value={values}>
      <IntlProvider locale={lang} messages={AppLocale[lang]}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export const GetCurrentLanguage = () => {
  var { lang } = useLanguage();
  return availableLanguagesWithoutFlag.find((e) => e.code === lang);
};