import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import AppBreadcrumb from '../../components/layout/AppBreadcrumb';
import GetDataArea from '../../components/GetDataArea';
import withTitle from '../../helpers/hoc/withTitle';
import MRTTable from '../../components/MRTTable';
import IntlTranslate from '../../helpers/IntlTranslate';
import DeleteDialog from "../../components/DeleteDialog";
import UpdateDialog from "../../components/UpdateDialog";
import UpdateGibPageOne from "./UpdateGibPageOne";
import { enqueueSnackbar } from 'notistack';
import { dateConverter } from "../../helpers/dateHelpers";
import { useAuth } from '../../context/AuthContext';
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";
import { gibGetTableFour, gibUpdateTableFour, /*gibGetMenu,*/ } from "../../api/api";


const GibPageOne = () => {
  const breadcrumb = useMemo(
    () => [
      {
        //Buraya api'den gelen isim çekilecek
        name: <FormattedMessage id="gibPageOne" />,
        active: true,
      },
    ],
    []
  );

  //MRTTable
  // const [data, setData] = useState([]);
  const [data, setData] = useState(testData.DATA);

  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const btn = useRef();
  const [editDeleteSelectedRow, setEditDeleteSelectedRow] = useState({
    operation: "",
    rows: [],
  });
  const { user } = useAuth();

  console.log("user", user);

  console.log("selectedData:", selectedData);

  const HandleSearchClick = useCallback(
    async (startDate, endDate, tckn, _w, _c, iref) => {
      setLoading(true);
      await gibGetTableFour({
        TCKN: tckn || "",
        CARD_NUMBER: "",
        WALLET_NUMBER: "",
        PAGE_NUMBER: "",
        PAGE_SIZE: "",
      }).then((resp) => {
        let RESP_DATA = resp.Data;
        setData(
          RESP_DATA.map((e) => ({
            RECORD_TYPE: e.RECORD_TYPE,
            L_REF: e.L_REF,
            ISLEM_TURU: e?.ISLEM_TURU || "-",
            HSTK_VKN: e?.HSTK_VKN || "-",
            HSTK_UNVAN: e?.HSTK_UNVAN || "-",
            HSGK_AD: e?.HSGK_AD || "-",
            HSGK_SOYAD: e?.HSGK_SOYAD || "-",
            HSGK_KIMLIK_TIPI: e?.HSGK_KIMLIK_TIPI || "-",
            HSGK_KIMLIK_NO: e?.HSGK_KIMLIK_NO || "-",
            HSGK_UYRUK: e?.HSGK_UYRUK || "-",
            HSGK_ADRES: e?.HSGK_ADRES || "-",
            HSGK_ILCE_ADI: e?.HSGK_ILCE_ADI || "-",
            HSGK_POSTA_KOD: e?.HSGK_POSTA_KOD || "-",
            HSGK_IL_KOD: e?.HSGK_IL_KOD || "-",
            HSGK_IL_ADI: e?.HSGK_IL_ADI || "-",
            HS_TEL: e?.HS_TEL || "-",
            HS_EPOSTA: e?.HS_EPOSTA || "-",
            HES_NO: e?.HES_NO || "-",
            DOVIZ_TIP: e?.DOVIZ_TIP || "-",
            HSP_TIP: e?.HSP_TIP || "-",
            HSP_DURUM: e?.HSP_DURUM || "-",
            HSP_ACLS_TAR: e?.HSP_ACLS_TAR || "-",
            HSP_KPNS_TAR: e?.HSP_KPNS_TAR || "-",
            HSP_BAKIYE: e?.HSP_BAKIYE || "-",
            HSP_BAKIYE_TARIHI: e?.HSP_BAKIYE_TARIHI || "-",
            HSP_KART_DURUM: e?.HSP_KART_DURUM || "-",
            HSP_KART_ACLS_TAR: e?.HSP_KART_ACLS_TAR || "-",
            HSP_KART_KPNS_TAR: e?.HSP_KART_KPNS_TAR || "-",
            HSP_KART_NO: e?.HSP_KART_NO || "-",
            KURUM_KOD: e?.KURUM_KOD || "-",
            CREATED_DATE: e?.CREATED_DATE || "-",
            UPDATED_DATE: e?.UPDATED_DATE || "-",
            GNDRM_TARIHI: e?.GNDRM_TARIHI || "-",
            IS_SEND: e?.IS_SEND || "-",
          }))
        );
      });
      setLoading(false);
      setSelectedData([]);
      setEditDeleteSelectedRow({
        operation: "",
        rows: [],
      });
    }, []);

  const HandleDeleteClick = useCallback(async () => {
    setData([]);
    setLoading(false);
    setSelectedData([]);
    setEditDeleteSelectedRow({
      operation: "",
      rows: [],
    });
  }, []);

  //Kimlik Tipi
  const identityType = (value) => {
    // console.log("Kimlik Tipi:", value);
    switch (value) {
      case "1":
        return "T.C. Kimlik Kartı";
      case "2":
        return "T.C. Eski Kimlik Kartı";
      case "3":
        return "Ehliyet";
      case "4":
        return "Pasaport";
      case "5":
        return "Diğer";
      default:
        return "";
    }
  }

  //Hesap Tipi
  const accountType = (value) => {
    switch (value) {
      case "1":
        return "Ön Ödemeli Kart No";
      case "2":
        return "Ek Kart";
      case "3":
        return "Telefon Numarası";
      case "4":
        return "E-posta Adresi";
      case "5":
        return "Müşteri No";
      case "6":
        return "TCKN";
      case "7":
        return "e-para";
      case "8":
        return "Temsilci";
      case "9":
        return "Ödeme Hesabı";
      default:
        return "";
    }
  }

  //Hesap Durumu
  const accountStatus = (value) => {
    switch (value) {
      case "1":
        return "Yeni Kayıt";
      case "2":
        return "Güncelleme";
      case "3":
        return "İptal";
      case "4":
        return "Kapanan";
      default:
        return "";
    }
  }

  //Kart Durumu
  const cardStatus = (value) => {
    switch (value) {
      case "1":
        return "Yeni Kayıt";
      case "2":
        return "Güncelleme";
      case "3":
        return "İptal";
      case "4":
        return "Kapanan";
      default:
        return "";
    }
  }

  //CellThumb
  const CellThump = ({ cell }) => {
    const value = cell.getValue();
    return value === "Y" || value === "E" ? <ThumbUpRoundedIcon color="success" /> : <ThumbDownRoundedIcon color="error" />;
    // return cell.getValue() === "Y" ? <ThumbUpRoundedIcon color="success" /> : <ThumbDownRoundedIcon color="error" />;
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "RECORD_TYPE",
        header: IntlTranslate("RECORD_TYPE"),
      },
      {
        accessorKey: "L_REF",
        header: IntlTranslate("L_REF"),
        size: 200,
      },
      {
        accessorKey: "ISLEM_TURU",
        header: IntlTranslate("ISLEM_TURU"),
        size: 210,
      },
      {
        accessorKey: "HSTK_VKN",
        header: IntlTranslate("HSTK_VKN"),
        size: 240,
      },
      {
        accessorKey: "HSTK_UNVAN",
        header: IntlTranslate("HSTK_UNVAN"),
        size: 210,
      },
      {
        accessorKey: "HSGK_AD",
        header: IntlTranslate("HSGK_AD"),
      },
      {
        accessorKey: "HSGK_SOYAD",
        header: IntlTranslate("HSGK_SOYAD"),
      },
      {
        accessorKey: "HSGK_KIMLIK_TIPI",
        header: IntlTranslate("HSGK_KIMLIK_TIPI"),
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return identityType(value);
        },
      },
      {
        accessorKey: "HSGK_KIMLIK_NO",
        header: IntlTranslate("HSGK_KIMLIK_NO"),
        size: 210,
      },
      {
        accessorKey: "HSGK_UYRUK",
        header: IntlTranslate("HSGK_UYRUK"),
      },
      {
        accessorKey: "HSGK_ADRES",
        header: IntlTranslate("HSGK_ADRES"),
      },
      {
        accessorKey: "HSGK_ILCE_ADI",
        header: IntlTranslate("HSGK_ILCE_ADI"),
      },
      {
        accessorKey: "HSGK_POSTA_KOD",
        header: IntlTranslate("HSGK_POSTA_KOD"),
      },
      {
        accessorKey: "HSGK_IL_KOD",
        header: IntlTranslate("HSGK_IL_KOD"),
      },
      {
        accessorKey: "HSGK_IL_ADI",
        header: IntlTranslate("HSGK_IL_ADI"),
      },
      {
        accessorKey: "HS_TEL",
        header: IntlTranslate("HS_TEL"),
        size: 210,
      },
      {
        accessorKey: "HS_EPOSTA",
        header: IntlTranslate("HS_EPOSTA"),
      },
      {
        accessorKey: "HES_NO",
        header: IntlTranslate("HES_NO"),
      },
      {
        accessorKey: "DOVIZ_TIP",
        header: IntlTranslate("DOVIZ_TIP"),
      },
      {
        accessorKey: "HSP_TIP",
        header: IntlTranslate("HSP_TIP"),
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return accountType(value);
        },
      },
      {
        accessorKey: "HSP_DURUM",
        header: IntlTranslate("HSP_DURUM"),
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return accountStatus(value);
        },
      },
      {
        accessorKey: "HSP_ACLS_TAR",
        header: IntlTranslate("HSP_ACLS_TAR"),
        size: 200,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const formattedDate = dateConverter(value, "dateseventeen", "dotdate");
          return formattedDate;
        }
      },
      {
        accessorKey: "HSP_KPNS_TAR",
        header: IntlTranslate("HSP_KPNS_TAR"),
        size: 220,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const formattedDate = dateConverter(value, "dateseventeen", "dotdate");
          return formattedDate;
        }
      },
      {
        accessorKey: "HSP_BAKIYE",
        header: IntlTranslate("HSP_BAKIYE"),
      },
      {
        accessorKey: "HSP_BAKIYE_TARIHI",
        header: IntlTranslate("HSP_BAKIYE_TARIHI"),
        size: 210,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const formattedDate = dateConverter(value, "dateseventeen", "dotdate");
          return formattedDate;
        }
      },
      {
        accessorKey: "HSP_KART_DURUM",
        header: IntlTranslate("HSP_KART_DURUM"),
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return cardStatus(value);
        }
      },
      {
        accessorKey: "HSP_KART_ACLS_TAR",
        header: IntlTranslate("HSP_KART_ACLS_TAR"),
        size: 200,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const formattedDate = dateConverter(value, "dateseventeen", "dotdate");
          return formattedDate;
        }
      },
      {
        accessorKey: "HSP_KART_KPNS_TAR",
        header: IntlTranslate("HSP_KART_KPNS_TAR"),
        size: 200,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const formattedDate = dateConverter(value, "dateseventeen", "dotdate");
          return formattedDate;
        }
      },
      {
        accessorKey: "HSP_KART_NO",
        header: IntlTranslate("HSP_KART_NO"),
      },
      {
        accessorKey: "KURUM_KOD",
        header: IntlTranslate("KURUM_KOD"),
      },
      {
        accessorKey: "CREATED_DATE",
        header: IntlTranslate("CREATED_DATE"),
        size: 210,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const formattedDate = dateConverter(value, "dateseventeen", "dotdate");
          return formattedDate;
        }
      },
      {
        accessorKey: "UPDATED_DATE",
        header: IntlTranslate("UPDATED_DATE"),
        size: 210,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const formattedDate = dateConverter(value, "dateseventeen", "dotdate");
          return formattedDate;
        }
      },
      {
        accessorKey: "GNDRM_TARIHI",
        header: IntlTranslate("GNDRM_TARIHI"),
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const formattedDate = dateConverter(value, "dateseventeen", "dotdate");
          return formattedDate;
        }
      },
      {
        accessorKey: "IS_SEND",
        header: IntlTranslate("IS_SEND"),
        Cell: CellThump,
      },
    ],
    // eslint-disable-next-line
    [IntlTranslate, dateConverter]
  );

  const resetSelected = useCallback(() => {
    setEditDeleteSelectedRow((prev) => ({
      operation: prev.operation,
      rows: [],
    }));
    setSelectedData([]);
  }, []);
  const onClose = () => {
    resetSelected();
  };


  //START - OnDelete
  const onDelete = async () => {
    setLoading(true);
    let i = 0;
    let status = true;
    while (i < editDeleteSelectedRow.rows.length) {
      let result = await gibUpdateTableFour({
        RECORD_TYPE: editDeleteSelectedRow.rows[0].RECORD_TYPE,
        L_REF: editDeleteSelectedRow.rows[0].L_REF,
        HSTK_VKN: editDeleteSelectedRow.rows[0].HSTK_VKN,
        HSTK_UNVAN: editDeleteSelectedRow.rows[0].HSTK_UNVAN,
        HSGK_AD: editDeleteSelectedRow.rows[0].HSGK_AD,

        HSGK_SOYAD: editDeleteSelectedRow.rows[0].HSGK_SOYAD,
        HSGK_KIMLIK_TIPI: editDeleteSelectedRow.rows[0].HSGK_KIMLIK_TIPI,
        HSGK_KIMLIK_NO: editDeleteSelectedRow.rows[0].HSGK_KIMLIK_NO,
        HSGK_UYRUK: editDeleteSelectedRow.rows[0].HSGK_UYRUK,
        HSGK_ADRES: editDeleteSelectedRow.rows[0].HSGK_ADRES,

        HSGK_ILCE_ADI: editDeleteSelectedRow.rows[0].HSGK_ILCE_ADI,
        HSGK_POSTA_KOD: editDeleteSelectedRow.rows[0].HSGK_POSTA_KOD,
        HSGK_IL_KOD: editDeleteSelectedRow.rows[0].HSGK_IL_KOD,
        HSGK_IL_ADI: editDeleteSelectedRow.rows[0].HSGK_IL_ADI,
        HS_TEL: editDeleteSelectedRow.rows[0].HS_TEL,

        HS_EPOSTA: editDeleteSelectedRow.rows[0].HS_EPOSTA,
        HES_NO: editDeleteSelectedRow.rows[0].HES_NO,
        DOVIZ_TIP: editDeleteSelectedRow.rows[0].DOVIZ_TIP,
        HSP_TIP: editDeleteSelectedRow.rows[0].HSP_TIP,
        HSP_DURUM: editDeleteSelectedRow.rows[0].HSP_DURUM,

        HSP_ACLS_TAR: editDeleteSelectedRow.rows[0].HSP_ACLS_TAR,
        HSP_KPNS_TAR: editDeleteSelectedRow.rows[0].HSP_KPNS_TAR,
        HSP_BAKIYE: editDeleteSelectedRow.rows[0].HSP_BAKIYE,
        HSP_BAKIYE_TARIHI: editDeleteSelectedRow.rows[0].HSP_BAKIYE_TARIHI,
        HSP_KART_DURUM: editDeleteSelectedRow.rows[0].HSP_KART_DURUM,

        HSP_KART_ACLS_TAR: editDeleteSelectedRow.rows[0].HSP_KART_ACLS_TAR,
        HSP_KART_KPNS_TAR: editDeleteSelectedRow.rows[0].HSP_KART_KPNS_TAR,
        HSP_KART_NO: editDeleteSelectedRow.rows[0].HSP_KART_NO,
        KURUM_KOD: editDeleteSelectedRow.rows[0].KURUM_KOD,
        GNDRM_TARIHI: editDeleteSelectedRow.rows[0].GNDRM_TARIHI,

        IS_SEND: editDeleteSelectedRow.rows[0].IS_SEND,
        DELETED_FLAG: "Y",
      });
      if (result.STATUS === "success") {
        i++;
      } else {
        status = false;
        enqueueSnackbar(result.RESPONSECODEDESC, { variant: "error" });
        break;
      }
    }
    if (status) {
      enqueueSnackbar("Başarıyla silindi.", { variant: "success" });
    }
    resetSelected();
    setLoading(false);
    btn.current.click();
  };
  //END - OnDelete


  //START - Update Values
  const updateValues = useRef();
  const onUpdate = async () => {
    if (Object.keys(updateValues.current.errors).length > 0) {
      return;
    }
    setLoading(true);
    const values = updateValues.current.datas;
    console.log("values", values);
    let i = 0;
    let status = true;

    while (i < editDeleteSelectedRow.rows.length) {
      let result = await gibUpdateTableFour({
        RECORD_TYPE: values.RECORD_TYPE,
        L_REF: editDeleteSelectedRow.rows[0].L_REF,
        HSTK_VKN: values.HSTK_VKN,
        HSTK_UNVAN: values.HSTK_UNVAN,
        HSGK_AD: values.HSGK_AD,
        HSGK_SOYAD: values.HSGK_SOYAD,
        HSGK_KIMLIK_TIPI: values.HSGK_KIMLIK_TIPI,
        HSGK_KIMLIK_NO: values.HSGK_KIMLIK_NO,
        HSGK_UYRUK: values.HSGK_UYRUK,
        HSGK_ADRES: values.HSGK_ADRES,
        HSGK_ILCE_ADI: values.HSGK_ILCE_ADI,
        HSGK_POSTA_KOD: values.HSGK_POSTA_KOD,
        HSGK_IL_KOD: values.HSGK_IL_KOD,
        HSGK_IL_ADI: values.HSGK_IL_ADI,
        HS_TEL: values.HS_TEL,
        HS_EPOSTA: values.HS_TEL,
        HES_NO: values.HS_TEL,
        DOVIZ_TIP: values.DOVIZ_TIP,
        HSP_TIP: values.HSP_TIP,
        HSP_DURUM: values.HSP_DURUM,
        HSP_ACLS_TAR: values.HSP_ACLS_TAR,
        HSP_KPNS_TAR: values.HSP_KPNS_TAR,
        HSP_BAKIYE: values.HSP_BAKIYE,
        HSP_BAKIYE_TARIHI: values.HSP_BAKIYE_TARIHI,
        HSP_KART_DURUM: values.HSP_KART_DURUM,
        HSP_KART_ACLS_TAR: values.HSP_KART_ACLS_TAR,
        HSP_KART_KPNS_TAR: values.HSP_KART_KPNS_TAR,
        HSP_KART_NO: values.HSP_KART_NO,
        KURUM_KOD: values.KURUM_KOD,
        GNDRM_TARIHI: values.GNDRM_TARIHI,
        IS_SEND: values.IS_SEND,
      });
      if (result.STATUS === "success") {
        i++;
      } else {
        status = false;
        enqueueSnackbar(result.RESPONSECODEDESC, { variant: "error" });
        break;
      }
    }
    if (status) {
      enqueueSnackbar("Başarıyla güncellendi.", { variant: "success" });
    }
    resetSelected();
    setLoading(false);
    btn.current.click();
  };
  //END - Update Values


  return (
    <>
      <AppBreadcrumb links={breadcrumb} />
      <GetDataArea
        HandleSearchClick={HandleSearchClick}
        HandleDeleteClick={HandleDeleteClick}
        inputsShow={{ tckn: true, iref: true }}
      // inputsPlacement="after"
      // inputsSize={6}
      />
      <MRTTable
        data={data}
        columns={columns}
        loading={loading}
        rowsUniqueId="L_REF"
        setEditDeleteSelectedRow={setEditDeleteSelectedRow}
        setSelectedData={setSelectedData}
        allowDelete={true}
        exportFileTitle={IntlTranslate("L_REF")}
      />
      <DeleteDialog
        editDeleteSelectedRow={editDeleteSelectedRow}
        onClose={onClose}
        onDelete={onDelete}
        datas={{
          id: data.find((e) => e.L_REF === editDeleteSelectedRow.rows[0])?.L_REF,
          // label: data.find((e) => e.L_REF === editDeleteSelectedRow.rows[0])?.RECORD_TYPE,
        }}
        loading={loading}
      />
      <UpdateDialog
        editDeleteSelectedRow={editDeleteSelectedRow}
        onClose={onClose}
        onUpdate={onUpdate}
        datas={{
          id: data.find((e) => e.L_REF === editDeleteSelectedRow.rows[0])?.L_REF,
        }}
        loading={loading}
      >
        <UpdateGibPageOne
          ref={updateValues}
          datas={data.find((e) => e.L_REF === editDeleteSelectedRow.rows[0])}
        />
      </UpdateDialog>
    </>
  )
}

export default withTitle(injectIntl(GibPageOne), "gibPageOne");

const testData = {
  "STATUS": "success",
  "RESPONSECODE": "000",
  "RESPONSECODEDESC": "OK",
  "DATA": [
    {
      "RECORD_TYPE": "E",
      "L_REF": "VMBWZXZVHGNV",
      "ISLEM_TURU": "EP002",
      "HSTK_VKN": null,
      "HSTK_UNVAN": null,
      "HSGK_AD": "Sadasda",
      "HSGK_SOYAD": "Sadsads",
      "HSGK_KIMLIK_TIPI": "1",
      "HSGK_KIMLIK_NO": "12321312312",
      "HSGK_UYRUK": "XX",
      "HSGK_ADRES": "XX",
      "HSGK_ILCE_ADI": "MERKEZ",
      "HSGK_POSTA_KOD": null,
      "HSGK_IL_KOD": "3",
      "HSGK_IL_ADI": "AFYONKARAHİSAR",
      "HS_TEL": "905333333333",
      "HS_EPOSTA": "sadsadasd@gmail.com",
      "HES_NO": "733484690266",
      "DOVIZ_TIP": "TRY",
      "HSP_TIP": "7",
      "HSP_DURUM": null,
      "HSP_ACLS_TAR": "20230526135833530",
      "HSP_KPNS_TAR": null,
      "HSP_BAKIYE": "0",
      "HSP_BAKIYE_TARIHI": null,
      "HSP_KART_DURUM": "1",
      "HSP_KART_ACLS_TAR": null,
      "HSP_KART_KPNS_TAR": null,
      "HSP_KART_NO": null,
      "KURUM_KOD": "KK080",
      "CREATED_DATE": "20240705141909984",
      "UPDATED_DATE": null,
      "GNDRM_TARIHI": null,
      "IS_SEND": "N"
    },
    {
      "RECORD_TYPE": "E",
      "L_REF": "SPTBOUPHOJSE",
      "ISLEM_TURU": "EP002",
      "HSTK_VKN": null,
      "HSTK_UNVAN": null,
      "HSGK_AD": "Abdullah",
      "HSGK_SOYAD": "Balta",
      "HSGK_KIMLIK_TIPI": "1",
      "HSGK_KIMLIK_NO": "12184635886",
      "HSGK_UYRUK": "XX",
      "HSGK_ADRES": "XX",
      "HSGK_ILCE_ADI": "EYÜPSULTAN",
      "HSGK_POSTA_KOD": null,
      "HSGK_IL_KOD": "34",
      "HSGK_IL_ADI": "İSTANBUL",
      "HS_TEL": "905074589938",
      "HS_EPOSTA": "abdullahbalta901@gmail.com",
      "HES_NO": "851337820850",
      "DOVIZ_TIP": "TRY",
      "HSP_TIP": "7",
      "HSP_DURUM": "2",
      "HSP_ACLS_TAR": "20230526152918782",
      "HSP_KPNS_TAR": null,
      "HSP_BAKIYE": "972095",
      "HSP_BAKIYE_TARIHI": null,
      "HSP_KART_DURUM": null,
      "HSP_KART_ACLS_TAR": "20230925200028877",
      "HSP_KART_KPNS_TAR": null,
      "HSP_KART_NO": "5331846493261262",
      "KURUM_KOD": "KK080",
      "CREATED_DATE": "20240705141909985",
      "UPDATED_DATE": null,
      "GNDRM_TARIHI": null,
      "IS_SEND": "Y"
    },
  ]
};