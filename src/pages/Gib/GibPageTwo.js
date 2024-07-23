import React, { useCallback, useMemo, useRef, useState } from 'react';
import withTitle from '../../helpers/hoc/withTitle';
import { FormattedMessage, injectIntl } from 'react-intl';
import AppBreadcrumb from '../../components/layout/AppBreadcrumb';
import GetDataArea from '../../components/GetDataArea';
import MRTTable from '../../components/MRTTable';
import IntlTranslate from '../../helpers/IntlTranslate';
import DeleteDialog from "../../components/DeleteDialog";
import UpdateDialog from "../../components/UpdateDialog";
import UpdateGibPageTwo from './UpdategibPageTwo';
import { enqueueSnackbar } from 'notistack';
import { dateConverter } from "../../helpers/dateHelpers";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";
import { gibGetTableFive, gibUpdateTableFive, /* gibGetMenu,*/ } from "../../api/api";



const GibPageTwo = () => {
  const breadcrumb = useMemo(
    () => [
      {
        name: <FormattedMessage id="gibPageTwo" />,
        active: true,
      },
    ],
    []
  );

  //Kimlik Tipi
  const identityType = (value) => {
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
        return "Kredi Kartı";
      case "7":
        return "TCKN";
      case "8":
        return "Temsilci";
      case "9":
        return "e-para";
      case "10":
        return "Ödeme Hesabı";
      default:
        return "";
    }
  }

  //İşlem Kanalı
  const transactionChannel = (value) => {
    switch (value) {
      case "1":
        return "Şube";
      case "2":
        return "Temsilci";
      case "3":
        return "ATM/Kiosk";
      case "4":
        return "Diğer ÖHS";
      case "5":
        return "Mobil";
      case "6":
        return "Web Sitesi";
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

  //MRTTable
  // const [data, setData] = useState([]);
  //Test Data
  const [data, setData] = useState(testData.DATA);

  const [loading, setLoading] = useState(false);
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
        size: 200,
      },
      {
        accessorKey: "MUSTERI_MI",
        header: IntlTranslate("MUSTERI_MI"),
        Cell: CellThump,
      },
      {
        accessorKey: "HESTK_VKN",
        header: IntlTranslate("HESTK_VKN"),
        size: 220,
      },
      {
        accessorKey: "HESTK_UNVAN",
        header: IntlTranslate("HESTK_UNVAN"),
        size: 200,
      },
      {
        accessorKey: "HESGK_AD",
        header: IntlTranslate("HESGK_AD"),
      },
      {
        accessorKey: "HESGK_SOYAD",
        header: IntlTranslate("HESGK_SOYAD"),
      },
      {
        accessorKey: "HESGK_KIMLIK_TIPI",
        header: IntlTranslate("HESGK_KIMLIK_TIPI"),
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return identityType(value);
        },
      },
      {
        accessorKey: "HESGK_KIMLIK_NO",
        header: IntlTranslate("HESGK_KIMLIK_NO"),
        size: 200,
      },
      {
        accessorKey: "HESGK_UYRUK",
        header: IntlTranslate("HESGK_UYRUK"),
      },
      {
        accessorKey: "HESGK_ADRES",
        header: IntlTranslate("HESGK_ADRES"),
      },
      {
        accessorKey: "HESGK_ILCE_ADI",
        header: IntlTranslate("HESGK_ILCE_ADI"),
      },
      {
        accessorKey: "HESGK_POSTA_KOD",
        header: IntlTranslate("HESGK_POSTA_KOD"),
      },
      {
        accessorKey: "HESGK_IL_KOD",
        header: IntlTranslate("HESGK_IL_KOD"),
      },
      {
        accessorKey: "HESGK_IL_ADI",
        header: IntlTranslate("HESGK_IL_ADI"),
      },
      {
        accessorKey: "HES_TEL",
        header: IntlTranslate("HES_TEL"),
        size: 200,
      },
      {
        accessorKey: "HES_EPOSTA",
        header: IntlTranslate("HES_EPOSTA"),
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
        accessorKey: "KISI_AD",
        header: IntlTranslate("KISI_AD"),
      },
      {
        accessorKey: "KISI_SOYAD",
        header: IntlTranslate("KISI_SOYAD"),
      },
      {
        accessorKey: "KISI_KIMLIK_TIPI",
        header: IntlTranslate("KISI_KIMLIK_TIPI"),
        size: 220,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return identityType(value);
        },
      },
      {
        accessorKey: "KISI_KIMLIK_NO",
        header: IntlTranslate("KISI_KIMLIK_NO"),
        size: 220,
      },
      {
        accessorKey: "IS_TAR",
        header: IntlTranslate("IS_TAR"),
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const formattedDate = dateConverter(value, "dateseventeen", "dotdate");
          return formattedDate;
        }
      },
      {
        accessorKey: "IS_KNL",
        header: IntlTranslate("IS_KNL"),
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return transactionChannel(value);
        },
      },
      {
        accessorKey: "BANKA_AD",
        header: IntlTranslate("BANKA_AD"),
      },
      {
        accessorKey: "ISLEM_TUTAR",
        header: IntlTranslate("ISLEM_TUTAR"),
      },
      {
        accessorKey: "ASIL_PARA_TUTAR",
        header: IntlTranslate("ASIL_PARA_TUTAR"),
      },
      {
        accessorKey: "PARA_BIRIM",
        header: IntlTranslate("PARA_BIRIM"),
      },
      {
        accessorKey: "BRUT_KOM_TUT",
        header: IntlTranslate("BRUT_KOM_TUT"),
        size: 220,
      },
      {
        accessorKey: "MUS_ACIKLAMA",
        header: IntlTranslate("MUS_ACIKLAMA"),
        size: 200,
      },
      {
        accessorKey: "KUR_ACIKLAMA",
        header: IntlTranslate("KUR_ACIKLAMA"),
        size: 200,
      },
      {
        accessorKey: "KURUM_KOD",
        header: IntlTranslate("KURUM_KOD"),
      },
      {
        accessorKey: "TRX_ID",
        header: IntlTranslate("TRX_ID"),
      },
      {
        accessorKey: "DELETED_FLAG",
        header: IntlTranslate("DELETED_FLAG"),
        Cell: CellThump,
      },
      {
        accessorKey: "CREATED_DATE",
        header: IntlTranslate("CREATED_DATE"),
        size: 200,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const formattedDate = dateConverter(value, "dateseventeen", "dotdate");
          return formattedDate;
        }
      },
      {
        accessorKey: "UPDATED_DATE",
        header: IntlTranslate("UPDATED_DATE"),
        size: 220,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const formattedDate = dateConverter(value, "dateseventeen", "dotdate");
          return formattedDate;
        }
      },
      {
        accessorKey: "GNDRM_TAR",
        header: IntlTranslate("GNDRM_TAR"),
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
    [IntlTranslate]
  );


  const [selectedData, setSelectedData] = useState([]);

  console.log(selectedData)

  //START - Update & Delete Actions
  const [editDeleteSelectedRow, setEditDeleteSelectedRow] = useState({
    operation: "",
    rows: [],
  });

  console.log(editDeleteSelectedRow)


  const HandleSearchClick = useCallback(
    async (startDate, endDate, tckn, _w, _c, iref) => {
      setLoading(true);
      await gibGetTableFive({
        TCKN: "",
        CARD_NUMBER: "",
        WALLET_NUMBER: "",
        PAGE_NUMBER: "",
        PAGE_SIZE: "",
      }).then((resp) => {
        let RESP_DATA = resp.Data;
        setData(
          RESP_DATA.map((e) => ({
            RECORD_TYPE: e.RECORD_TYPE,
            L_REF: e.L_REF || "-",
            ISLEM_TURU: e.ISLEM_TURU || "-",
            MUSTERI_MI: e.MUSTERI_MI || "-",
            HESTK_VKN: e.HESTK_VKN || "-",
            HESTK_UNVAN: e.HESTK_UNVAN || "-",
            HESGK_AD: e.HESGK_AD || "-",
            HESGK_SOYAD: e.HESGK_SOYAD || "-",
            HESGK_KIMLIK_TIPI: e.HESGK_KIMLIK_TIPI || "-",
            HESGK_KIMLIK_NO: e.HESGK_KIMLIK_NO || "-",
            HESGK_UYRUK: e.HESGK_UYRUK || "-",
            HESGK_ADRES: e.HESGK_ADRES || "-",
            HESGK_ILCE_ADI: e.HESGK_ILCE_ADI || "-",
            HESGK_POSTA_KOD: e.HESGK_POSTA_KOD || "-",
            HESGK_IL_KOD: e.HESGK_IL_KOD || "-",
            HESGK_IL_ADI: e.HESGK_IL_ADI || "-",
            HES_TEL: e.HES_TEL || "-",
            HES_EPOSTA: e.HES_EPOSTA || "-",
            HES_NO: e.HES_NO || "-",
            DOVIZ_TIP: e.DOVIZ_TIP || "-",
            HSP_TIP: e.HSP_TIP || "-",
            KISI_AD: e.KISI_AD || "-",
            KISI_SOYAD: e.KISI_SOYAD || "-",
            KISI_KIMLIK_TIPI: e.KISI_KIMLIK_TIPI || "-",
            KISI_KIMLIK_NO: e.KISI_KIMLIK_NO || "-",
            IS_TAR: e.IS_TAR || "-",
            IS_KNL: e.IS_KNL || "-",
            BANKA_AD: e.BANKA_AD || "-",
            ISLEM_TUTAR: e.ISLEM_TUTAR || "-",
            ASIL_PARA_TUTAR: e.ASIL_PARA_TUTAR || "-",
            PARA_BIRIM: e.PARA_BIRIM || "-",
            BRUT_KOM_TUT: e.BRUT_KOM_TUT || "-",
            MUS_ACIKLAMA: e.MUS_ACIKLAMA || "-",
            KUR_ACIKLAMA: e.KUR_ACIKLAMA || "-",
            KURUM_KOD: e.KURUM_KOD || "-",
            TRX_ID: e.TRX_ID || "-",
            DELETED_FLAG: e.DELETED_FLAG || "-",
            CREATED_DATE: e.CREATED_DATE || "-",
            UPDATED_DATE: e.UPDATED_DATE || "-",
            GNDRM_TAR: e.GNDRM_TAR || "-",
            IS_SEND: e.IS_SEND || "-",
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



  //Seçileni Resetleme
  const resetSelected = useCallback(() => {
    setEditDeleteSelectedRow((prev) => ({
      operation: prev.operation,
      rows: [],
    }));
    setSelectedData([]);
  }, []);
  //Diolog Kapatma
  const onClose = () => {
    resetSelected();
  };

  const btn = useRef();

  //START - OnDelete
  const onDelete = async () => {
    setLoading(true);
    let i = 0;
    let status = true;
    while (i < editDeleteSelectedRow.rows.length) {
      let result = await gibUpdateTableFive({
        RECORD_TYPE: editDeleteSelectedRow.rows[0].RECORD_TYPE,
        L_REF: editDeleteSelectedRow.rows[0].L_REF,
        ISLEM_TURU: editDeleteSelectedRow.rows[0].ISLEM_TURU,
        MUSTERI_MI: editDeleteSelectedRow.rows[0].MUSTERI_MI,
        HESTK_VKN: editDeleteSelectedRow.rows[0].HESTK_VKN,

        HESTK_UNVAN: editDeleteSelectedRow.rows[0].HESTK_UNVAN,
        HESGK_AD: editDeleteSelectedRow.rows[0].HESGK_AD,
        HESGK_SOYAD: editDeleteSelectedRow.rows[0].HESGK_SOYAD,
        HESGK_KIMLIK_TIPI: editDeleteSelectedRow.rows[0].HESGK_KIMLIK_TIPI,
        HESGK_KIMLIK_NO: editDeleteSelectedRow.rows[0].HESGK_KIMLIK_NO,

        HESGK_UYRUK: editDeleteSelectedRow.rows[0].HESGK_UYRUK,
        HESGK_ILCE_ADI: editDeleteSelectedRow.rows[0].HESGK_ILCE_ADI,
        HESGK_POSTA_KOD: editDeleteSelectedRow.rows[0].HESGK_POSTA_KOD,
        HESGK_IL_KOD: editDeleteSelectedRow.rows[0].HESGK_IL_KOD,
        HESGK_IL_ADI: editDeleteSelectedRow.rows[0].HESGK_IL_ADI,

        HES_TEL: editDeleteSelectedRow.rows[0].HES_TEL,
        HES_EPOSTA: editDeleteSelectedRow.rows[0].HES_EPOSTA,
        HES_NO: editDeleteSelectedRow.rows[0].HES_NO,
        DOVIZ_TIP: editDeleteSelectedRow.rows[0].DOVIZ_TIP,
        KISI_AD: editDeleteSelectedRow.rows[0].KISI_AD,

        KISI_SOYAD: editDeleteSelectedRow.rows[0].KISI_SOYAD,
        KISI_KIMLIK_TIPI: editDeleteSelectedRow.rows[0].KISI_KIMLIK_TIPI,
        KISI_KIMLIK_NO: editDeleteSelectedRow.rows[0].KISI_KIMLIK_NO,
        IS_TAR: editDeleteSelectedRow.rows[0].IS_TAR,
        IS_KNL: editDeleteSelectedRow.rows[0].IS_KNL,

        ISLEM_TUTAR: editDeleteSelectedRow.rows[0].ISLEM_TUTAR,
        ASIL_PARA_TUTAR: editDeleteSelectedRow.rows[0].ASIL_PARA_TUTAR,
        PARA_BIRIM: editDeleteSelectedRow.rows[0].PARA_BIRIM,
        BRUT_KOM_TUT: editDeleteSelectedRow.rows[0].BRUT_KOM_TUT,
        KURUM_KOD: editDeleteSelectedRow.rows[0].KURUM_KOD,

        TRX_ID: editDeleteSelectedRow.rows[0].TRX_ID,
        DELETED_FLAG: "Y",
        GNDRM_TAR: editDeleteSelectedRow.rows[0].GNDRM_TAR,
        IS_SEND: editDeleteSelectedRow.rows[0].IS_SEND,
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
      let result = await gibUpdateTableFive({
        RECORD_TYPE: values.RECORD_TYPE,
        L_REF: editDeleteSelectedRow.rows[0].L_REF,
        ISLEM_TURU: values.ISLEM_TURU,
        MUSTERI_MI: values.MUSTERI_MI,
        HESTK_VKN: values.HESTK_VKN,

        HESTK_UNVAN: values.HESTK_UNVAN,
        HESGK_AD: values.HESGK_AD,
        HESGK_SOYAD: values.HESGK_SOYAD,
        HESGK_KIMLIK_TIPI: values.HESGK_KIMLIK_TIPI,
        HESGK_KIMLIK_NO: values.HESGK_KIMLIK_NO,

        HESGK_UYRUK: values.HESGK_UYRUK,
        HESGK_ILCE_ADI: values.HESGK_ILCE_ADI,
        HESGK_POSTA_KOD: values.HESGK_POSTA_KOD,
        HESGK_IL_KOD: values.HESGK_IL_KOD,
        HESGK_IL_ADI: values.HESGK_IL_ADI,

        HES_TEL: values.HES_TEL,
        HES_EPOSTA: values.HES_EPOSTA,
        HES_NO: values.HES_NO,
        DOVIZ_TIP: values.DOVIZ_TIP,
        KISI_AD: values.KISI_AD,

        KISI_SOYAD: values.KISI_SOYAD,
        KISI_KIMLIK_TIPI: values.KISI_KIMLIK_TIPI,
        KISI_KIMLIK_NO: values.KISI_KIMLIK_NO,
        IS_TAR: values.IS_TAR,
        IS_KNL: values.IS_KNL,

        ISLEM_TUTAR: values.ISLEM_TUTAR,
        ASIL_PARA_TUTAR: values.ASIL_PARA_TUTAR,
        PARA_BIRIM: values.PARA_BIRIM,
        BRUT_KOM_TUT: values.BRUT_KOM_TUT,
        KURUM_KOD: values.KURUM_KOD,

        TRX_ID: values.TRX_ID,
        DELETED_FLAG: values.DELETED_FLAG,
        GNDRM_TAR: values.GNDRM_TAR,
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
      />
      <MRTTable
        data={data}
        columns={columns}
        loading={loading}
        rowsUniqueId="L_REF"
        setEditDeleteSelectedRow={setEditDeleteSelectedRow}
        setSelectedData={setSelectedData}
        allowDelete={true}
        exportFileTitle={IntlTranslate("gibPageTwo")}
      />
      <DeleteDialog
        editDeleteSelectedRow={editDeleteSelectedRow}
        onClose={onClose}
        onDelete={onDelete}
        datas={{
          id: data.find((e) => e.L_REF === editDeleteSelectedRow.rows[0])?.L_REF,
          //   label: data.find((e) => e.id === editDeleteSelectedRow.rows[0])?.TCKN,
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
        <UpdateGibPageTwo
          ref={updateValues}
          datas={data.find((e) => e.L_REF === editDeleteSelectedRow.rows[0])}
        />
      </UpdateDialog>
    </>
  )
}

export default withTitle(injectIntl(GibPageTwo), "gibPageTwo");

const testData =
{
  "STATUS": "success",
  "RESPONSECODE": "000",
  "RESPONSECODEDESC": "OK",
  "DATA": [
    {
      "RECORD_TYPE": "E",
      "L_REF": "MMROTYQBUPXH",
      "ISLEM_TURU": "OH009",
      "MUSTERI_MI": "E",
      "HESTK_VKN": null,
      "HESTK_UNVAN": null,
      "HESGK_AD": "Test",
      "HESGK_SOYAD": "Test",
      "HESGK_KIMLIK_TIPI": "5",
      "HESGK_KIMLIK_NO": "28875867214",
      "HESGK_UYRUK": "XX",
      "HESGK_ADRES": "XX",
      "HESGK_ILCE_ADI": "BEYLİKDÜZÜ",
      "HESGK_POSTA_KOD": null,
      "HESGK_IL_KOD": "34",
      "HESGK_IL_ADI": "İSTANBUL",
      "HES_TEL": "905015010101",
      "HES_EPOSTA": "i@i.com",
      "HES_NO": "675962626856",
      "DOVIZ_TIP": "TRY",
      "HSP_TIP": "9",
      "KISI_AD": "Test",
      "KISI_SOYAD": "Test",
      "KISI_KIMLIK_TIPI": "5",
      "KISI_KIMLIK_NO": "28875867214",
      "IS_TAR": "20240131150154042",
      "IS_KNL": "3",
      "BANKA_AD": "XX",
      "ISLEM_TUTAR": "160",
      "ASIL_PARA_TUTAR": "140",
      "PARA_BIRIM": "TRY",
      "BRUT_KOM_TUT": "0",
      "MUS_ACIKLAMA": "XX",
      "KUR_ACIKLAMA": "XX",
      "KURUM_KOD": "KK080",
      "TRX_ID": "21747",
      "DELETED_FLAG": "N",
      "CREATED_DATE": null,
      "UPDATED_DATE": "20240712140950593",
      "GNDRM_TAR": null,
      "IS_SEND": "N"
    },
    {
      "RECORD_TYPE": "E",
      "L_REF": "YMZPLXMWEDVM",
      "ISLEM_TURU": "OH009",
      "MUSTERI_MI": "E",
      "HESTK_VKN": null,
      "HESTK_UNVAN": null,
      "HESGK_AD": "Test",
      "HESGK_SOYAD": "Test",
      "HESGK_KIMLIK_TIPI": "5",
      "HESGK_KIMLIK_NO": "28875867214",
      "HESGK_UYRUK": "XX",
      "HESGK_ADRES": "XX",
      "HESGK_ILCE_ADI": "BEYLİKDÜZÜ",
      "HESGK_POSTA_KOD": null,
      "HESGK_IL_KOD": "34",
      "HESGK_IL_ADI": "İSTANBUL",
      "HES_TEL": "905015010101",
      "HES_EPOSTA": "i@i.com",
      "HES_NO": "675962626856",
      "DOVIZ_TIP": "TRY",
      "HSP_TIP": "9",
      "KISI_AD": "Test",
      "KISI_SOYAD": "Test",
      "KISI_KIMLIK_TIPI": "5",
      "KISI_KIMLIK_NO": "28875867214",
      "IS_TAR": "20240131150920547",
      "IS_KNL": "3",
      "BANKA_AD": "XX",
      "ISLEM_TUTAR": "150",
      "ASIL_PARA_TUTAR": "140",
      "PARA_BIRIM": "TRY",
      "BRUT_KOM_TUT": "0",
      "MUS_ACIKLAMA": "XX",
      "KUR_ACIKLAMA": "XX",
      "KURUM_KOD": "KK080",
      "TRX_ID": "21750",
      "DELETED_FLAG": "N",
      "CREATED_DATE": null,
      "UPDATED_DATE": null,
      "GNDRM_TAR": null,
      "IS_SEND": "N"
    },
  ],
}