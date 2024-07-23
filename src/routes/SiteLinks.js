import React from 'react';
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import ShieldIcon from "@mui/icons-material/Shield";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RuleIcon from "@mui/icons-material/Rule";
import ExtensionIcon from "@mui/icons-material/Extension";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaymentsIcon from '@mui/icons-material/Payments';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// import { gibGetMenu } from "../api/api";

const testGibMenuNames = {
  "STATUS": "success",
  "RESPONSECODE": "000",
  "RESPONSECODEDESC": "OK",
  "DATA": [
    {
      "ID": 1,
      "NAME": "ÖDEME VE E-PARA KURULUŞU HESAP-KART KİMLİK VE BAKİYE FORMU",
      "LANG": "TR"
    },
    {
      "ID": 2,
      "NAME": "ÖDEME VE E-PARA KURULUŞU HESABINA PARA YÜKLEME/ÇEKME NAKİT İŞLEMLER FORMU",
      "LANG": "TR"
    },
    {
      "ID": 3,
      "NAME": "YURT İÇİ TRANSFER FORMU",
      "LANG": "TR"
    },
    {
      "ID": 4,
      "NAME": "ÖDEME KURULUŞLARI KART İŞLEM BİLGİLERİNE İLİŞKİN FORM",
      "LANG": "TR"
    }
  ]
};


export const FilteredLinks = (pages) => {
  var menu = MenuLinks.filter((e) => pages.includes(e.id) && e.showOnMenu);
  var gib = GibLinks.filter((e) => pages.includes(e.id) && e.showOnMenu);
  var setting = SettingLinks.filter((e) => pages.includes(e.id) && e.showOnMenu);
  return {
    menu,
    gib,
    setting,
  };
};

export const GetFirstPagesPath = (pageId) => {
  return (
    [
      ...MenuLinks,
      ...GibLinks,
      ...SettingLinks,
    ].find((e) => e.id === pageId)?.path || ""
  );
};

export const GetAllPageNames = () => {
  return [
    ...MenuLinks,
    ...GibLinks,
    ...SettingLinks,
  ].map((e) => ({
    id: e.id,
    label: e.name,
  }));
};



export const MenuLinks = [
  {
    id: "1",
    path: "/",
    name: "dashboard",
    icon: <DashboardIcon />,
    showOnMenu: true,
  },
  {
    id: "31",
    path: "/checker-operations",
    name: "checkerOperations",
    icon: <RuleIcon />,
    showOnMenu: true,
  },
  {
    id: "2",
    path: "/users",
    name: "users",
    icon: <GroupIcon />,
    showOnMenu: true,
  },
  {
    id: "3",
    path: "/users/add",
    name: "users.add",
    icon: <PersonAddIcon />,
    showOnMenu: true,
  },
  {
    id: "25",
    path: "/roles/update-user-role",
    name: "updateUserRole",
    icon: <AdminPanelSettingsIcon />,
    showOnMenu: true,
  },
  {
    id: "26",
    path: "/roles",
    name: "roles",
    icon: <ShieldIcon />,
    showOnMenu: true,
  },
  {
    id: "27",
    path: "/roles/add",
    name: "roles.add",
    icon: <AddModeratorIcon />,
    showOnMenu: true,
  },
  {
    id: "28",
    path: "/roles/role-transaction-log",
    name: "roleTransactionLog",
    icon: <ContentPasteSearchIcon />,
    showOnMenu: true,
  },
  {
    id: "999",
    path: "/profile",
    name: "profile",
    icon: null,
    showOnMenu: false,
  },
];




// export const GibLinks = [
//   {
//     id: "801",
//     path: "/gib-page-one",
//     // name: "gibPageOne",
//     icon: <AccountBalanceWalletIcon />,
//     showOnMenu: true,
//     defaultName: "gibPageOne",
//   },
//   {
//     id: "802",
//     path: "/gib-page-two",
//     // name: "gibPageTwo",
//     icon: <PaymentsIcon />,
//     showOnMenu: true,
//     defaultName: "gibPageTwo",
//   },
//   {
//     id: "803",
//     path: "/gib-page-three",
//     // name: "gibPageThree",
//     icon: <MoveDownIcon />,
//     showOnMenu: true,
//     defaultName: "gibPageThree",
//   },
//   {
//     id: "804",
//     path: "/gib-page-four",
//     // name: "gibPageFour",
//     icon: <CreditCardIcon />,
//     showOnMenu: true,
//     defaultName: "gibPageFour",
//   },

//   {
//     id: "805",
//     path: "/gib-error",
//     name: "gibError",
//     icon: <ErrorOutlineIcon />,
//     showOnMenu: true,
//     // defaultName: "gibError",
//   },
// ];

export const GibLinks = [
  {
    id: "801",
    path: "/gib-page-one",
    icon: <AccountBalanceWalletIcon />,
    showOnMenu: true,
    defaultName: "gibPageOne",
  },
  {
    id: "802",
    path: "/gib-page-two",
    icon: <PaymentsIcon />,
    showOnMenu: true,
    defaultName: "gibPageTwo",
  },
  {
    id: "803",
    path: "/gib-page-three",
    icon: <MoveDownIcon />,
    showOnMenu: true,
    defaultName: "gibPageThree",
  },
  {
    id: "804",
    path: "/gib-page-four",
    icon: <CreditCardIcon />,
    showOnMenu: true,
    defaultName: "gibPageFour",
  },
  {
    id: "805",
    path: "/gib-error",
    name: "gibError",
    icon: <ErrorOutlineIcon />,
    showOnMenu: true,
    isGibError: true, 
  },
];


const updateGibLinksNames = () => {
  GibLinks.forEach((link, index) => {
    const menuItem = testGibMenuNames.DATA[index]; // Veri dizisinden ilgili elemanı al
    if (menuItem) { // Eğer menuItem mevcutsa, yani DATA dizisi yeterince uzunsa
      link.name = menuItem.NAME; // Link objesindeki name alanını güncelle
    }
  });
};

// Güncelleme fonksiyonunu çağırma
updateGibLinksNames();

// GibLinks'i dışa aktarma
export default GibLinks;

export const SettingLinks = [
  {
    id: "99",
    path: "/parameters",
    name: "parameters",
    icon: <ExtensionIcon />,
    showOnMenu: true,
  },
];