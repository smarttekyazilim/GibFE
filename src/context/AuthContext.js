import {
  useState,
  createContext,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { decryptData, encryptData } from "../helpers/secureData";
import {
  convertRolPermissionToReadableObj,
  getCallPages,
} from "../helpers/HELPERS";
import { fetchLogout } from "../api/api";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();
const salt = process.env.REACT_APP_CRYPTO_SECRET;
const PROJECT_TYPE = process.env.REACT_APP_PROJECT_TYPE;

const AuthProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("");
  const PROJECT_TYPES = useMemo(
    () => ({
      locale: {
        loggedIn: true,
        pages: {
          ALLOWED_PAGES: [
            "1",
            "2",
            "3",
            "21",
            "25",
            "26",
            "27",
            "28",
            "29",
            "31",
            "99",
            "801",
            "802",
            "803",
            "804",
            "805",
          ],
          PAGES: {
            1: {
              create: true,
              read: true,
              update: true,
              delete: true,
            },
            2: {
              create: true,
              read: true,
              update: true,
              delete: true,
            },
            3: {
              create: true,
              read: true,
              update: true,
              delete: true,
            },
            21: {
              create: true,
              read: true,
              update: true,
              delete: true,
            },
            25: {
              create: true,
              read: true,
              update: true,
              delete: true,
            },
            26: {
              create: true,
              read: true,
              update: true,
              delete: true,
            },
            27: {
              create: true,
              read: true,
              update: true,
              delete: true,
            },
            28: {
              create: true,
              read: true,
              update: true,
              delete: true,
            },
            29: {
              create: true,
              read: true,
              update: true,
              delete: true,
            },
            31: {
              create: true,
              read: true,
              update: true,
              delete: true,
            },
            99: {
              create: true,
              read: true,
              update: true,
              delete: true,
            },
            801: {
              create: true,
              read: true,
              update: true,
              delete: true,
            },
            802: {
              create: true,
              read: true,
              update: true,
              delete: true,
            },
            803: {
              create: true,
              read: true,
              update: true,
              delete: true,
            },
            804: {
              create: true,
              read: true,
              update: true,
              delete: true,
            },
            805: {
              create: true,
              read: true,
              update: true,
              delete: true,
            },
          },
        },
        role: "maker",
        user: {
          USER_ID: 1,
          NAME: "Talha",
          SURNAME: "Ekrem",
          IS_READONLY_USER: "0",
          ROLE_SCOPE: "MIM",
        },
        mimCallCustomer: {
          PROFILE: {
            TCKN: 52048351132,
            VKN: null,
            GSM_NO: "905373895788",
            EMAIL: "talha.ekrem@payten.com",
            FIRST_NAME: "Talha",
            LAST_NAME: "Ekrem",
            BIRTH_DATE: "19650723",
            JOB: null,
            KVKK_FLAG: 0,
          },
          WALLETS: [
            {
              WALLET_NO: 765154509064,
              CARD_NO: null,
            },
          ],
        },
      },
      dev: {
        loggedIn: localStorage.getItem("jwt") ? true : false,
        pages:
          localStorage.getItem("jwt") && localStorage.getItem("pages")
            ? convertRolPermissionToReadableObj(
                decryptData(localStorage.getItem("pages"), salt)
              )
            : { ALLOWED_PAGES: [], PAGES: {} },
        role:
          localStorage.getItem("jwt") && localStorage.getItem("role")
            ? decryptData(localStorage.getItem("role"), salt)
            : null,
        user:
          localStorage.getItem("jwt") && localStorage.getItem("user")
            ? decryptData(localStorage.getItem("user"), salt)
            : null,
        mimCallCustomer: localStorage.getItem("call")
          ? decryptData(localStorage.getItem("call"), salt)?.customer || null
          : null,
      },
      test: {
        loggedIn: localStorage.getItem("jwt") ? true : false,
        pages:
          localStorage.getItem("jwt") && localStorage.getItem("pages")
            ? convertRolPermissionToReadableObj(
                decryptData(localStorage.getItem("pages"), salt)
              )
            : { ALLOWED_PAGES: [], PAGES: {} },
        role:
          localStorage.getItem("jwt") && localStorage.getItem("role")
            ? decryptData(localStorage.getItem("role"), salt)
            : null,
        user:
          localStorage.getItem("jwt") && localStorage.getItem("user")
            ? decryptData(localStorage.getItem("user"), salt)
            : null,
        mimCallCustomer: localStorage.getItem("call")
          ? decryptData(localStorage.getItem("call"), salt)?.customer || null
          : null,
      },
      uat140: {
        loggedIn: localStorage.getItem("jwt") ? true : false,
        pages:
          localStorage.getItem("jwt") && localStorage.getItem("pages")
            ? convertRolPermissionToReadableObj(
                decryptData(localStorage.getItem("pages"), salt)
              )
            : { ALLOWED_PAGES: [], PAGES: {} },
        role:
          localStorage.getItem("jwt") && localStorage.getItem("role")
            ? decryptData(localStorage.getItem("role"), salt)
            : null,
        user:
          localStorage.getItem("jwt") && localStorage.getItem("user")
            ? decryptData(localStorage.getItem("user"), salt)
            : null,
        mimCallCustomer: localStorage.getItem("call")
          ? decryptData(localStorage.getItem("call"), salt)?.customer || null
          : null,
      },
      uat141: {
        loggedIn: localStorage.getItem("jwt") ? true : false,
        pages:
          localStorage.getItem("jwt") && localStorage.getItem("pages")
            ? convertRolPermissionToReadableObj(
                decryptData(localStorage.getItem("pages"), salt)
              )
            : { ALLOWED_PAGES: [], PAGES: {} },
        role:
          localStorage.getItem("jwt") && localStorage.getItem("role")
            ? decryptData(localStorage.getItem("role"), salt)
            : null,
        user:
          localStorage.getItem("jwt") && localStorage.getItem("user")
            ? decryptData(localStorage.getItem("user"), salt)
            : null,
        mimCallCustomer: localStorage.getItem("call")
          ? decryptData(localStorage.getItem("call"), salt)?.customer || null
          : null,
      },
      prod14: {
        loggedIn: localStorage.getItem("jwt") ? true : false,
        pages:
          localStorage.getItem("jwt") && localStorage.getItem("pages")
            ? convertRolPermissionToReadableObj(
                decryptData(localStorage.getItem("pages"), salt)
              )
            : { ALLOWED_PAGES: [], PAGES: {} },
        role:
          localStorage.getItem("jwt") && localStorage.getItem("role")
            ? decryptData(localStorage.getItem("role"), salt)
            : null,
        user:
          localStorage.getItem("jwt") && localStorage.getItem("user")
            ? decryptData(localStorage.getItem("user"), salt)
            : null,
        mimCallCustomer: localStorage.getItem("call")
          ? decryptData(localStorage.getItem("call"), salt)?.customer || null
          : null,
      },
      prod15: {
        loggedIn: localStorage.getItem("jwt") ? true : false,
        pages:
          localStorage.getItem("jwt") && localStorage.getItem("pages")
            ? convertRolPermissionToReadableObj(
                decryptData(localStorage.getItem("pages"), salt)
              )
            : { ALLOWED_PAGES: [], PAGES: {} },
        role:
          localStorage.getItem("jwt") && localStorage.getItem("role")
            ? decryptData(localStorage.getItem("role"), salt)
            : null,
        user:
          localStorage.getItem("jwt") && localStorage.getItem("user")
            ? decryptData(localStorage.getItem("user"), salt)
            : null,
        mimCallCustomer: localStorage.getItem("call")
          ? decryptData(localStorage.getItem("call"), salt)?.customer || null
          : null,
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPage]
  );
  const [user, setUser] = useState(PROJECT_TYPES[PROJECT_TYPE].user);
  const [pages, setPages] = useState(PROJECT_TYPES[PROJECT_TYPE].pages);
  const [mimCallCustomer, setMimCallCustomer] = useState(
    PROJECT_TYPES[PROJECT_TYPE].mimCallCustomer
  );
  const [role, setRole] = useState(PROJECT_TYPES[PROJECT_TYPE].role);
  const [loggedIn, setLoggedIn] = useState(
    PROJECT_TYPES[PROJECT_TYPE].loggedIn
  );

  const SETCURRENTPAGE = useCallback((pageId) => setCurrentPage(pageId), []);

  const LOGIN = useCallback((loginResp) => {
    const { ROLE_PERMISSION, USER_TYPE, PASSWORD, ...userData } =
      loginResp.DATA;
    const encryptedUser = encryptData(userData, salt);
    const encryptedPages = encryptData(ROLE_PERMISSION, salt);
    const encryptedRole = encryptData(USER_TYPE, salt);
    localStorage.setItem("user", encryptedUser);
    localStorage.setItem("pages", encryptedPages);
    localStorage.setItem("role", encryptedRole);
    localStorage.setItem("jwt", loginResp.TOKEN);
    setUser(userData);
    setPages(convertRolPermissionToReadableObj(ROLE_PERMISSION));
    setRole(USER_TYPE);
    setLoggedIn(true);
  }, []);

  const LOGOUT = useCallback(async (callback) => {
    let resp = await fetchLogout();
    if (resp && resp.RESPONSECODE === "000") {
      localStorage.removeItem("user");
      localStorage.removeItem("pages");
      localStorage.removeItem("jwt");
      localStorage.removeItem("role");

      setLoggedIn(false);
      setUser(null);
      setPages({ ALLOWED_PAGES: [], PAGES: {} });
      setRole(null);
      callback();
    }
  }, []);
  const IdleLogout = useCallback(
    async (cb) => {
      let resp = await fetchLogout();
      if (resp && resp.RESPONSECODE === "000") {
        localStorage.removeItem("user");
        localStorage.removeItem("pages");
        localStorage.removeItem("jwt");
        localStorage.removeItem("role");
        cb(user.USER_NAME);
      }
    },
    [user]
  );
  const pageAddPermission = useMemo(() => {
    if (user?.IS_READONLY_USER !== "0") {
      return {
        status: false,
        reason: "IS_READONLY_USER",
        message: "pageAddPermission.error1",
      };
    }
    if (role === "checker") {
      return {
        status: false,
        reason: "USER_TYPE",
        message: "pageAddPermission.error2",
      };
    }
    if (!pages?.PAGES[currentPage]?.create) {
      return {
        status: false,
        reason: "ROLE_PERMISSION",
        message: "pageAddPermission.error3",
      };
    }
    return {
      status: true,
    };
  }, [currentPage, pages, role, user]);

  const getCurrentPagePermissions = useMemo(() => {
    let pagePermissions = pages?.PAGES[currentPage];
    let createP = pagePermissions?.create;
    let readP = pagePermissions?.read;
    let updateP = pagePermissions?.update;
    let deleteP = pagePermissions?.delete;
    return {
      createP,
      readP,
      updateP,
      deleteP,
    };
  }, [currentPage, pages]);

  const navigate = useNavigate()

  useEffect(() => {
    //mim kullanıcıları için, eğer bir arama varsa ona ait sayfaları getir, arama yoksa normal hale çevir kontrolü
    if (loggedIn && user?.ROLE_SCOPE.split("|").includes("MIM")) {
      const callStr = localStorage.getItem("call");
      if (callStr) {
        let obj = decryptData(localStorage.getItem("call"), salt);
        setPages(getCallPages(obj.callStr, user));
        setMimCallCustomer(obj.customer);
      } else {
        const kcCallUrl = localStorage.getItem("kcCallUrl")

        if (kcCallUrl) {
          navigate(`/callCenter?customer=${kcCallUrl}`)
        } else {
          setPages(PROJECT_TYPES[PROJECT_TYPE].pages);
          setMimCallCustomer(null);
        }
      }
    }
  }, [user, loggedIn, PROJECT_TYPES, navigate]);
  const changePages = useCallback(
    (callStr = null, customer) => {
      if (callStr) {
        let obj = {
          callStr: callStr,
          customer: customer,
        };
        let encryptedCall = encryptData(obj, salt);
        localStorage.setItem("call", encryptedCall); //local storagea çağrı bilgilerini kaydet
        localStorage.removeItem("kcCallUrl")
        setPages(getCallPages(callStr, user));
        setMimCallCustomer(customer);
      } else {
        localStorage.removeItem("call"); //çağrı bittiği için mevcut bilgiyi temizle
        setPages(
          convertRolPermissionToReadableObj(
            decryptData(localStorage.getItem("pages"), salt)
          )
        );
        setMimCallCustomer(null);
      }
    },
    [user]
  );
  const values = {
    user,
    role,
    pages,
    loggedIn,
    LOGIN,
    LOGOUT,
    currentPage,
    SETCURRENTPAGE,
    pageAddPermission,
    getCurrentPagePermissions,
    IdleLogout,
    changePages,
    mimCallCustomer,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
