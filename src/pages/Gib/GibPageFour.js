import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import withTitle from '../../helpers/hoc/withTitle';
import { FormattedMessage, injectIntl } from 'react-intl';
import AppBreadcrumb from '../../components/layout/AppBreadcrumb';
import GetDataArea from '../../components/GetDataArea';
import MRTTable from '../../components/MRTTable';
import IntlTranslate from '../../helpers/IntlTranslate';
import DeleteDialog from "../../components/DeleteDialog";
import UpdateDialog from "../../components/UpdateDialog";
import UpdateGibPageFour from './UpdateGibPageFour';
import { enqueueSnackbar } from 'notistack';
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";
import { dateConverter } from "../../helpers/dateHelpers";
import { gibGetTableSeven, gibUpdateTableSeven, gibGetMenu, } from "../../api/api";


const GibPageFour = () => {

  //BreadCrumb ismi için
  const [menuName, setMenuName] = useState([]);

  useEffect(() => {
    const fetchName = async () => {
      const response = await gibGetMenu({
        LANGUAGE: "TR",
      });

      if (response.STATUS === "success") {
        setMenuName(response.DATA);
      }
    }
    fetchName();
  }, []);



  //GetDataArea
  const HandleSearchClick = useCallback(
    async (startDate, endDate, tckn, _w, _c, iref) => {
      setLoading(true);
      await gibGetTableSeven({
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
            L_REF: e.L_REF || "-",

            ISLEM_TURU: e.ISLEM_TURU || "-",
            K_SAH_TK_VKN: e.K_SAH_TK_VKN || "-",
            K_SAH_TK_UNVAN: e.K_SAH_TK_UNVAN || "-",
            K_SAH_GK_AD: e.K_SAH_GK_AD || "-",
            K_SAH_GK_SOYAD: e.K_SAH_GK_SOYAD || "-",

            K_SAH_GK_KIMLIK_TIPI: e.K_SAH_GK_KIMLIK_TIPI || "-",
            K_SAH_GK_KIMLIK_NO: e.K_SAH_GK_KIMLIK_NO || "-",
            K_SAH_KART_NO: e.K_SAH_KART_NO || "-",
            BANK_TIP: e.BANK_TIP || "-",
            BANK_EFT_KOD: e.BANK_EFT_KOD || "-",

            BANK_ATM_KOD: e.BANK_ATM_KOD || "-",
            IS_TAR: e.IS_TAR || "-",
            ISLEM_TUTAR: e.ISLEM_TUTAR || "-",
            ASIL_TUTAR: e.ASIL_TUTAR || "-",
            PARA_BIRIM: e.PARA_BIRIM || "-",

            BRUT_KOM_TUT: e.BRUT_KOM_TUT || "-",
            MUS_ACIKLAMA: e.MUS_ACIKLAMA || "-",
            KUR_ACIKLAMA: e.KUR_ACIKLAMA || "-",
            KURUM_KOD: e.KURUM_KOD || "-",
            GNDRM_TAR: e.GNDRM_TAR || "-",

            IS_SEND: e.IS_SEND || "-",
            DELETED_FLAG: e.DELETED_FLAG || "-",
            TRX_ID: e.TRX_ID || "-",
            CREATED_DATE: e.CREATED_DATE || "-",
            UPDATED_DATE: e.UPDATED_DATE || "-",
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

  //Banka Tipi
  const bankType = (value) => {
    switch (value) {
      case "1":
        return "Fiziki Pos";
      case "2":
        return "Sanal Pos";
      case "3":
        return "Fiziki/Sanal";
      case "4":
        return "Fiziki-Seyyar EFT-POS (Mobil POS)";
      case "5":
        return "Fiziki-Masaüstü EFT-POS (Desktop POS)";
      case "6":
        return "Fiziki-Self-servis EFT-POS (Unattended POS)";
      case "7":
        return "Soft Pos";
      case "8":
        return "ATM";
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
        accessorKey: "K_SAH_TK_VKN",
        header: IntlTranslate("K_SAH_TK_VKN"),
        size: 220,
      },
      {
        accessorKey: "K_SAH_TK_UNVAN",
        header: IntlTranslate("K_SAH_TK_UNVAN"),
        size: 200,
      },
      {
        accessorKey: "K_SAH_GK_AD",
        header: IntlTranslate("K_SAH_GK_AD"),
      },
      {
        accessorKey: "K_SAH_GK_SOYAD",
        header: IntlTranslate("K_SAH_GK_SOYAD"),
        size: 200,
      },
      {
        accessorKey: "K_SAH_GK_KIMLIK_TIPI",
        header: IntlTranslate("K_SAH_GK_KIMLIK_TIPI"),
        size: 200,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return identityType(value);
        },
      },
      {
        accessorKey: "K_SAH_GK_KIMLIK_NO",
        header: IntlTranslate("K_SAH_GK_KIMLIK_NO"),
        size: 200,
      },
      {
        accessorKey: "K_SAH_KART_NO",
        header: IntlTranslate("K_SAH_KART_NO"),
        size: 220,
      },
      {
        accessorKey: "BANK_TIP",
        header: IntlTranslate("BANK_TIP"),
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return bankType(value);
        },
      },
      {
        accessorKey: "BANK_EFT_KOD",
        header: IntlTranslate("BANK_EFT_KOD"),
        size: 210,
      },
      {
        accessorKey: "BANK_ATM_KOD",
        header: IntlTranslate("BANK_ATM_KOD"),
        size: 210,
      },
      {
        accessorKey: "IS_TAR",
        header: IntlTranslate("IS_TAR"),
      },
      {
        accessorKey: "ISLEM_TUTAR",
        header: IntlTranslate("ISLEM_TUTAR"),
      },
      {
        accessorKey: "ASIL_TUTAR",
        header: IntlTranslate("ASIL_TUTAR"),
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
      {
        accessorKey: "DELETED_FLAG",
        header: IntlTranslate("DELETED_FLAG"),
        Cell: CellThump,
      },
      {
        accessorKey: "TRX_ID",
        header: IntlTranslate("TRX_ID"),
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
        size: 210,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const formattedDate = dateConverter(value, "dateseventeen", "dotdate");
          return formattedDate;
        }
      },
    ],
    // eslint-disable-next-line
    [IntlTranslate]
  );


  const [selectedData, setSelectedData] = useState([]);

  console.log(selectedData);

  //START - Update & Delete Actions
  const [editDeleteSelectedRow, setEditDeleteSelectedRow] = useState({
    operation: "",
    rows: [],
  });

  //Api Name breadcrumb
  const breadcrumb = useMemo(() => {
    const menuItem = menuName.find(i => i.ID === 4);
    return [
      {
        name: menuItem ? menuItem.NAME : <FormattedMessage id="gibPageFour" />,
        active: true,
      },
    ];
  }, [menuName]);

  // const breadcrumb = useMemo(
  //   () => [
  //     {
  //       name: <FormattedMessage id="gibPageFour" />,
  //       active: true,
  //     },
  //   ],
  //   []
  // );

  //Seçileni Resetleme
  const resetSelected = useCallback(() => {
    setEditDeleteSelectedRow((prev) => ({
      operation: prev.operation,
      rows: [],
    }));
    setSelectedData([]);
  }, []);
  //Diolog KApatma
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
      let result = await gibUpdateTableSeven({
        RECORD_TYPE: editDeleteSelectedRow.rows[0].RECORD_TYPE,
        L_REF: editDeleteSelectedRow.rows[0].L_REF,
        ISLEM_TURU: editDeleteSelectedRow.rows[0].ISLEM_TURU,
        K_SAH_TK_VKN: editDeleteSelectedRow.rows[0].K_SAH_TK_VKN,
        K_SAH_TK_UNVAN: editDeleteSelectedRow.rows[0].K_SAH_TK_UNVAN,

        K_SAH_GK_AD: editDeleteSelectedRow.rows[0].K_SAH_GK_AD,
        K_SAH_GK_SOYAD: editDeleteSelectedRow.rows[0].K_SAH_GK_SOYAD,
        K_SAH_GK_KIMLIK_TIPI: editDeleteSelectedRow.rows[0].K_SAH_GK_KIMLIK_TIPI,
        K_SAH_GK_KIMLIK_NO: editDeleteSelectedRow.rows[0].K_SAH_GK_KIMLIK_NO,
        K_SAH_KART_NO: editDeleteSelectedRow.rows[0].K_SAH_KART_NO,

        BANK_TIP: editDeleteSelectedRow.rows[0].BANK_TIP,
        BANK_EFT_KOD: editDeleteSelectedRow.rows[0].BANK_EFT_KOD,
        BANK_ATM_KOD: editDeleteSelectedRow.rows[0].BANK_ATM_KOD,
        IS_TAR: editDeleteSelectedRow.rows[0].IS_TAR,
        ISLEM_TUTAR: editDeleteSelectedRow.rows[0].ISLEM_TUTAR,

        ASIL_TUTAR: editDeleteSelectedRow.rows[0].ASIL_TUTAR,
        PARA_BIRIM: editDeleteSelectedRow.rows[0].PARA_BIRIM,
        BRUT_KOM_TUT: editDeleteSelectedRow.rows[0].BRUT_KOM_TUT,
        MUS_ACIKLAMA: editDeleteSelectedRow.rows[0].MUS_ACIKLAMA,
        KUR_ACIKLAMA: editDeleteSelectedRow.rows[0].KUR_ACIKLAMA,

        KURUM_KOD: editDeleteSelectedRow.rows[0].KURUM_KOD,
        GNDRM_TAR: editDeleteSelectedRow.rows[0].IS_SEND,
        IS_SEND: editDeleteSelectedRow.rows[0].L_REF,
        DELETED_FLAG: "Y",
        TRX_ID: editDeleteSelectedRow.rows[0].TRX_ID,

        CREATED_DATE: editDeleteSelectedRow.rows[0].CREATED_DATE,
        UPDATED_DATE: editDeleteSelectedRow.rows[0].UPDATED_DATE,
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
      let result = await gibUpdateTableSeven({
        RECORD_TYPE: values.RECORD_TYPE,
        L_REF: editDeleteSelectedRow.rows[0].L_REF,
        ISLEM_TURU: values.ISLEM_TURU,
        K_SAH_TK_VKN: values.K_SAH_TK_VKN,
        K_SAH_TK_UNVAN: values.K_SAH_TK_UNVAN,

        K_SAH_GK_AD: values.K_SAH_GK_AD,
        K_SAH_GK_SOYAD: values.K_SAH_GK_SOYAD,
        K_SAH_GK_KIMLIK_TIPI: values.K_SAH_GK_KIMLIK_TIPI,
        K_SAH_GK_KIMLIK_NO: values.K_SAH_GK_KIMLIK_NO,
        K_SAH_KART_NO: values.K_SAH_KART_NO,

        BANK_TIP: values.BANK_TIP,
        BANK_EFT_KOD: values.BANK_EFT_KOD,
        BANK_ATM_KOD: values.BANK_ATM_KOD,
        IS_TAR: values.IS_TAR,
        ISLEM_TUTAR: values.ISLEM_TUTAR,

        ASIL_TUTAR: values.ASIL_TUTAR,
        PARA_BIRIM: values.PARA_BIRIM,
        BRUT_KOM_TUT: values.BRUT_KOM_TUT,
        MUS_ACIKLAMA: values.MUS_ACIKLAMA,
        KUR_ACIKLAMA: values.KUR_ACIKLAMA,

        KURUM_KOD: values.KURUM_KOD,
        GNDRM_TAR: values.GNDRM_TAR,
        IS_SEND: values.IS_SEND,
        DELETED_FLAG: values.DELETED_FLAG,
        TRX_ID: values.TRX_ID,

        CREATED_DATE: values.CREATED_DATE,
        UPDATED_DATE: values.UPDATED_DATE,
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
        exportFileTitle={IntlTranslate("gibPageFour")}
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
        <UpdateGibPageFour
          ref={updateValues}
          datas={data.find((e) => e.L_REF === editDeleteSelectedRow.rows[0])}
        />
      </UpdateDialog>
    </>
  )
}

export default withTitle(injectIntl(GibPageFour), "gibPageFour");

const testData =
{
  "STATUS": "success",
  "RESPONSECODE": "000",
  "RESPONSECODEDESC": "OK",
  "DATA": [
    {
      "RECORD_TYPE": "E",
      "L_REF": "XDYNGQOIVZEH",
      "ISLEM_TURU": "KK002",
      "K_SAH_TK_VKN": null,
      "K_SAH_TK_UNVAN": null,
      "K_SAH_GK_AD": "İbrahim Hakkı",
      "K_SAH_GK_KIMLIK_TIPI": "5",
      "K_SAH_GK_KIMLIK_NO": "27631604728",
      "K_SAH_KART_NO": "5331846416009467",
      "BANK_TIP": "1",
      "BANK_EFT_KOD": "0000100000",
      "BANK_ATM_KOD": "000000000000000",
      "IS_TAR": "20240202004529019",
      "ISLEM_TUTAR": "501",
      "ASIL_TUTAR": null,
      "PARA_BIRIM": "TRY",
      "BRUT_KOM_TUT": "0",
      "MUS_ACIKLAMA": null,
      "KUR_ACIKLAMA": "BALA ANKARA TRTR",
      "KURUM_KOD": "KK080",
      "GNDRM_TAR": null,
      "IS_SEND": "N",
      "DELETED_FLAG": "N",
      "TRX_ID": "21981",
      "CREATED_DATE": null,
      "UPDATED_DATE": "20240722094918464",
      "K_SAH_GK_SOYAD": "Cuhadar"
    },
    {
      "RECORD_TYPE": "E",
      "L_REF": "YJXPENGQESYY",
      "ISLEM_TURU": "KK002",
      "K_SAH_TK_VKN": null,
      "K_SAH_TK_UNVAN": null,
      "K_SAH_GK_AD": "İbrahim Hakkı",
      "K_SAH_GK_KIMLIK_TIPI": "5",
      "K_SAH_GK_KIMLIK_NO": "27631604728",
      "K_SAH_KART_NO": "5331846416009467",
      "BANK_TIP": "1",
      "BANK_EFT_KOD": "0000100000",
      "BANK_ATM_KOD": "000000000000000",
      "IS_TAR": "20240202004532768",
      "ISLEM_TUTAR": "501",
      "ASIL_TUTAR": "501",
      "PARA_BIRIM": "TRY",
      "BRUT_KOM_TUT": "0",
      "MUS_ACIKLAMA": null,
      "KUR_ACIKLAMA": "BALA ANKARA TRTR",
      "KURUM_KOD": "KK080",
      "GNDRM_TAR": null,
      "IS_SEND": "N",
      "DELETED_FLAG": "N",
      "TRX_ID": "21982",
      "CREATED_DATE": null,
      "UPDATED_DATE": null,
      "K_SAH_GK_SOYAD": "Cuhadar"
    },
  ],
}