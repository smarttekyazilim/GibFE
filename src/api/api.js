import axios from "axios";
const {
  REACT_APP_SITE_URL_DEV,
  REACT_APP_SITE_URL_TEST,
  REACT_APP_SITE_URL_UAT140,
  REACT_APP_SITE_URL_UAT141,
  REACT_APP_SITE_URL_PROD14,
  REACT_APP_SITE_URL_PROD15,
  REACT_APP_PROJECT_TYPE,
  REACT_APP_API_PATH,
  REACT_APP_PORT_USER,
  REACT_APP_PORT_BO_BANKSOFT,
  //REACT_APP_PORT_BO_COMPLAINT,
  REACT_APP_PORT_MONEY_TRANSFER,
  // REACT_APP_PORT_CUSTOMER,
  // REACT_APP_PORT_BO_CAMPAIGNS,
  // REACT_APP_PORT_DOCUMENT_MANAGEMENT,
  // REACT_APP_PORT_PF,
  REACT_APP_PORT_GIB,
} = process.env;
const URL_DEFS = {
  test: REACT_APP_SITE_URL_TEST,
  dev: REACT_APP_SITE_URL_DEV,
  uat140: REACT_APP_SITE_URL_UAT140,
  uat141: REACT_APP_SITE_URL_UAT141,
  prod14: REACT_APP_SITE_URL_PROD14,
  prod15: REACT_APP_SITE_URL_PROD15,
  "": REACT_APP_SITE_URL_DEV,
};
const CURRENT_URL = URL_DEFS[REACT_APP_PROJECT_TYPE];
axios.interceptors.request.use(
  function (config) {
    const { origin } = new URL(config.url);
    console.log({ origin });
    // const allowedOrigins = [
    //   `${CURRENT_URL}:${REACT_APP_PORT_USER}`,
    //   `${CURRENT_URL}:${REACT_APP_PORT_BO_BANKSOFT}`,
    //   `${CURRENT_URL}:${REACT_APP_PORT_MONEY_TRANSFER}`,
    //   `${CURRENT_URL}:${REACT_APP_PORT_CUSTOMER}`,
    //   "https://zpaykblczdngtwyvip.zb",
    // ];
    const token = localStorage.getItem("jwt");
    //if (allowedOrigins.includes(origin)) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json";
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Access-Control-Allow-Credentials"] = "true";
    config.headers["Access-Control-Allow-Methods"] =
      "POST, GET, OPTIONS, DELETE";
    config.headers["Access-Control-Max-Age"] = "3600";
    //}
    return config;
  },
  function (error) {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    response.headers["Access-Control-Allow-Origin"] = "*";
    let nullishData = JSON.parse(
      JSON.stringify(response.data, (_k, v) => (v === null ? "" : v))
    );
    return { ...response, data: nullishData };
  },
  async (error) => {
    console.log("ERROR", error);
    if (error.response.status === 403 || error.response.status === 401) {
      alert("Oturumunuz sonlanmıştır. Tekrar giriş yapınız.");
      localStorage.removeItem("user");
      localStorage.removeItem("pages");
      localStorage.removeItem("jwt");
      localStorage.removeItem("role");
    }
  }
);

//START - DYS (doküman yükleme, görüntüleme)
export const DYSAddFile = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_BO_BANKSOFT}${REACT_APP_API_PATH}/bo-banksoft/boDysAddFile`,
    input
  );
  return data;
};
export const DYSGetFile = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_BO_BANKSOFT}${REACT_APP_API_PATH}/bo-banksoft/boDysGetFile`,
    input
  );
  return data;
};
//END - DYS (doküman yükleme, görüntüleme)
//START - MAKER & CHECKER
export const COGetAll = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boUserCheckerOperationsGetAll`,
    input
  );
  return data;
};

export const COGetByMakerId = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boUserCheckerGetAllRequestByMakerId`,
    input
  );
  return data;
};

export const COMakerSendRequest = async (input) => {
  /*
    MAKER_USER_ID
    MAKER_NOTE
    PROCESS
    CATEGORY
    API_NAME
    CUSTOMER_ID
    REQUEST_DATA_UNIQUE_FIELD
    REQUEST_DATA
    DISPLAY_DATA
  */
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boUserMakerSendRequest`,
    input
  );
  return data;
};

export const COCheckerValidateResponse = async (input) => {
  /*
    CHECKER_OPERATION_ID,
    CHECKER_USER_ID,
    STATUS,
  */
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boUserCheckerValidateResponse`,
    input
  );
  return data;
};

export const COCheckerSendResponse = async (input) => {
  /*
    CHECKER_OPERATION_ID,
    CHECKER_USER_ID,
    STATUS, //1 onay, 2 red
    CHECKER_NOTE,
  */
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boUserCheckerSendResponse`,
    input
  );
  return data;
};

export const CODelete = async (coId, userId) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boUserCheckerDeleteRequest`,
    {
      CHECKER_OPERATION_ID: coId,
      CHECKER_USER_ID: userId,
    }
  );
  return data;
};
//END - MAKER & CHECKER

export const FinanceCodesGetAll = async () => {
  const { data } = await axios.get(
    `${CURRENT_URL}:${REACT_APP_PORT_BO_BANKSOFT}${REACT_APP_API_PATH}/bo-banksoft/boGetTransactionTypes`
  );
  return data;
};
//START - login
export const fetchLogin = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boSignIn`,
    input
  );
  return data;
};
export const fetchLogout = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boSignOut`,
    input
  );
  return data;
};
export const checkOTP = async (input) => {
  const { TOKEN, ...rest } = input;
  const response = await fetch(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boUserCheckOtp`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(rest),
    }
  ).then((resp) => resp.json());
  return response;
};

export const changePassword = async (input) => {
  const { TOKEN, ...rest } = input;
  const response = await fetch(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boUserChangePassword`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(rest),
    }
  ).then((resp) => resp.json());
  return response;
};

export const userSimBlockSendMail = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boUserRemoveSimBlock`,
    input
  );
  return data;
};

export const userSimBlockVerifyOTPAndRemoveSimBlock = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boUserVerifySimBlockOtp`,
    input
  );
  return data;
};
//END - login

//START - user
const UserAddOrUpdate = async (user) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boCreateUser`,
    user
  );
  return data;
};
const UserDelete = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boDeleteUser`,
    input
  );
  return data;
};
export const UserGetById = async (userId) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boUserSelectById`,
    {
      USER_ID: userId,
    }
  );
  return data;
};
export const UserGetAll = async () => {
  //    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boUserGetAll`
  //https://ZPAYKBLCZDNGTWYVIP.ZB/bo_user/boUserGetAll
  const { data } = await axios.get(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boUserGetAll`
  );
  return data;
};
//END - user

//START - User Roles
export const RoleGetAll = async () => {
  const { data } = await axios.get(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boRoleGetAll`
  );
  return data;
};
export const RoleUserLogGetAll = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boUserRoleLogGetAll`,
    input
  );
  return data;
};
export const RoleUserLogGetAllHttpsTest = async (input) => {
  const { data } = await axios.post(
    `https://172.29.68.11:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boUserRoleLogGetAll`,
    input
  );
  return data;
};
export const RoleUserLogGetAllCORSTest = async (input) => {
  const { data } = await axios.post(
    // `https://zpayprdczdngtwyvip.zb/bo_user/boUserRoleLogGetAll`,
    `https://zpaykblczdngtwyvip.zb/bo_user/boUserRoleLogGetAll`, //Elvan
    input
  );
  return data;
};
export const RoleUserLogGetAllCORSProd = async (input) => {
  const { data } = await axios.post(
    `https://zpayprdczdngtwyvip.zb/bo_user/boUserRoleLogGetAll`,
    input
  );
  return data;
};
const RoleAddOrUpdate = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boCreateRole`,
    input
  );
  return data;
};
const RoleDelete = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boDeleteRole`,
    input
  );
  return data;
};
const RoleUserAssignOrRemove = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boAssignRole`,
    input
  );
  return data;
};
export const RoleUserGetByUserId = async (userId) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boUserRolesGetByUserId`,
    {
      USER_ID: userId,
    }
  );
  return data;
};
//END - User Roles



//PARAMETRELER
export const ParametersGetCategoryList = async () => {
  const { data } = await axios.get(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boParamsGetCategories`
  );
  return data;
};
export const ParametersGetAll = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boParamsGetAll`,
    input
  );
  return data;
};

const ParametersAddOrUpdate = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boParamsInsert`,
    input
  );
  return data;
};


export const GetBankNames = async () => {
  const { data } = await axios.get(
    `${CURRENT_URL}:${REACT_APP_PORT_BO_BANKSOFT}${REACT_APP_API_PATH}/bo-banksoft/getBankNames`
  );
  return data;
};

export const GetBranchCodes = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_MONEY_TRANSFER}${REACT_APP_API_PATH}/moneytransfer/getBranchCodes`,
    input
  );
  return data;
};


// export const notificationUpdate = async (input) => {
//   const { data } = await axios.post(
//     `${CURRENT_URL}:${REACT_APP_PORT_BO_BANKSOFT}${REACT_APP_API_PATH}/bo-banksoft/boUpdateNotificationTemplate`,
//     input
//   );
//   return data;
// };

export const GetCurrencyCodes = async () => {
  const { data } = await axios.get(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/getCurrencyCodes`
  );
  return data;
};


//Profile Change Password
export const profileChangePassword = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boUserChangePassword`,
    input
  );
  return data;
};

//Forgot Password (Mail)
export const forgotPassword = async ({ email, lang }) => {
  const body = {
    EMAIL: email,
    LANG: lang,
    URL: `${window.location.origin}/reset-password`,
  };

  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boForgotPassword`,
    body
  );
  return data;
};

//Reset Password (Password part)
export const resetPassword = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_USER}${REACT_APP_API_PATH}/bo_user/boResetPassword`,
    input
  );
  return data;
};




//Gelir İdaresi Başkanlığı
export const gibGetMenu = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_GIB}${REACT_APP_API_PATH}/gib/gibGetMenu`,
    input
  );
  return data;
};

// Get Ek4
export const gibGetTableFour = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_GIB}${REACT_APP_API_PATH}/gib/gibGetEpkbb`,
    input
  );
  return data;
};


// Update Ek4
export const gibUpdateTableFour = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_GIB}${REACT_APP_API_PATH}/gib/gibUpdateEpkbb`,
    input
  );
  return data;
};

// Get Ek5
export const gibGetTableFive = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_GIB}${REACT_APP_API_PATH}/gib/gibGetEphpycni`,
    input
  );
  return data;
};

// Update Ek5
export const gibUpdateTableFive = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_GIB}${REACT_APP_API_PATH}/gib/gibUpdateEphpycni`,
    input
  );
  return data;
};

// Get Ek6
export const gibGetTableSix = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_GIB}${REACT_APP_API_PATH}/gib/gibGetYt`,
    input
  );
  return data;
};

// Update Ek6
export const gibUpdateTableSix = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_GIB}${REACT_APP_API_PATH}/gib/gibUpdateYt`,
    input
  );
  return data;
};

// Get Ek7
export const gibGetTableSeven = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_GIB}${REACT_APP_API_PATH}/gib/gibGetOkkib`,
    input
  );
  return data;
};

// Update Ek7
export const gibUpdateTableSeven = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_GIB}${REACT_APP_API_PATH}/gib/gibUpdateOkkib`,
    input
  );
  return data;
};


//Get Error
export const gibGetError = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_GIB}${REACT_APP_API_PATH}/gib/gibGetError`,
    input
  );
  return data;
};

//Insert Error
export const gibGetErrorInsert = async (input) => {
  const { data } = await axios.post(
    `${CURRENT_URL}:${REACT_APP_PORT_GIB}${REACT_APP_API_PATH}/gib/gibInsertError`,
    input
  );
  return data;
};

export const API_METHOD_DEF = {
  "bo_user/boCreateUser": UserAddOrUpdate,
  "bo_user/boDeleteUser": UserDelete,
  "bo_user/boCreateRole": RoleAddOrUpdate,
  "bo_user/boDeleteRole": RoleDelete,
  "bo_user/boAssignRole": RoleUserAssignOrRemove,
  "bo_user/boParamsInsert": ParametersAddOrUpdate,
  // "bo-banksoft/boUpdateNotificationTemplate": notificationUpdate,
};
