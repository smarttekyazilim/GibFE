import React, { useCallback, useMemo, useRef, useState } from 'react';
import withTitle from '../../helpers/hoc/withTitle';
import { FormattedMessage, injectIntl } from 'react-intl';
import AppBreadcrumb from '../../components/layout/AppBreadcrumb';
import GetDataArea from '../../components/GetDataArea';
import MRTTable from '../../components/MRTTable';
import IntlTranslate from '../../helpers/IntlTranslate';
import DeleteDialog from "../../components/DeleteDialog";
import UpdateDialog from "../../components/UpdateDialog";
import UpdateGibPageThree from './UpdateGibPageThree';
import { enqueueSnackbar } from 'notistack';
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";
import { dateConverter } from "../../helpers/dateHelpers";
import { gibGetTableSix, gibUpdateTableSix, /*gibGetMenu,*/ } from "../../api/api";




const GibPageThree = () => {
  const breadcrumb = useMemo(
    () => [
      {
        name: <FormattedMessage id="gibPageThree" />,
        active: true,
      },
    ],
    []
  );


  const HandleSearchClick = useCallback(
    async (startDate, endDate, tckn, _w, _c, iref) => {
      setLoading(true);
      await gibGetTableSix({
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
          GON_MUSTERI_MI: e.GON_MUSTERI_MI || "-",
          GON_OK_VKN: e.GON_OK_VKN || "-",
          GON_OK_UNVAN: e.GON_OK_UNVAN || "-",
          GON_TK_VKN: e.GON_TK_VKN || "-",
          GON_TK_UNVAN: e.GON_TK_UNVAN || "-",
          GON_GK_AD: e.GON_GK_AD || "-",
          GON_GK_SOYAD: e.GON_GK_SOYAD || "-",


          GON_GK_KIMLIK_TIPI: e.GON_GK_KIMLIK_TIPI || "-",
          GON_GK_KIMLIK_NO: e.GON_GK_KIMLIK_NO || "-",
          GON_GK_UYRUK: e.GON_GK_UYRUK || "-",
          GON_ADRES: e.GON_ADRES || "-",
          GON_ILCE_ADI: e.GON_ILCE_ADI || "-",
          GON_POSTA_KOD: e.GON_POSTA_KOD || "-",
          GON_IL_KOD: e.GON_IL_KOD || "-",
          GON_IL_ADI: e.GON_IL_ADI || "-",
          GON_TEL: e.GON_TEL || "-",
          GON_EPOSTA: e.GON_EPOSTA || "-",


          GON_OK_HES_NO: e.GON_OK_HES_NO || "-",
          GON_OK_EPARA: e.GON_OK_EPARA || "-",
          GON_OK_KART_NO: e.GON_OK_KART_NO || "-",
          GON_BANKA_AD: e.GON_BANKA_AD || "-",
          GON_BANKA_KOD: e.GON_BANKA_KOD || "-",
          GON_SUBE_AD: e.GON_SUBE_AD || "-",
          GON_IBAN: e.GON_IBAN || "-",
          GON_HES_NO: e.GON_HES_NO || "-",
          GON_KREDI_KART_NO: e.GON_KREDI_KART_NO || "-",
          AL_MUSTERI_MI: e.AL_MUSTERI_MI || "-",


          AL_OK_VKN: e.AL_OK_VKN || "-",
          AL_OK_UNVAN: e.AL_OK_UNVAN || "-",
          AL_GK_AD: e.AL_GK_AD || "-",
          AL_GK_SOYAD: e.AL_GK_SOYAD || "-",
          AL_GK_KIMLIK_NO: e.AL_GK_KIMLIK_NO || "-",
          AL_GK_UYRUK: e.AL_GK_UYRUK || "-",
          AL_ADRES: e.AL_ADRES || "-",
          AL_ILCE_ADI: e.AL_ILCE_ADI || "-",
          AL_POSTA_KOD: e.AL_POSTA_KOD || "-",
          AL_IL_KOD: e.AL_IL_KOD || "-",


          AL_IL_ADI: e.AL_IL_ADI || "-",
          AL_TEL: e.AL_TEL || "-",
          AL_EPOSTA: e.AL_EPOSTA || "-",
          AL_OK_HES_NO: e.AL_OK_HES_NO || "-",
          AL_OK_EPARA: e.AL_OK_EPARA || "-",
          AL_OK_KART_NO: e.AL_OK_KART_NO || "-",
          AL_BANKA_AD: e.AL_BANKA_AD || "-",
          AL_BANKA_KOD: e.AL_BANKA_KOD || "-",
          AL_SUBE_AD: e.AL_SUBE_AD || "-",
          AL_IBAN: e.AL_IBAN || "-",


          AL_HES_NO: e.AL_HES_NO || "-",
          AL_KREDI_KART_NO: e.AL_KREDI_KART_NO || "-",
          AL_DEBIT_KART_NO: e.AL_DEBIT_KART_NO || "-",
          IS_TAR: e.IS_TAR || "-",
          IS_SAAT: e.IS_SAAT || "-",
          ODENME_TAR: e.ODENME_TAR || "-",
          ISLEM_IP: e.ISLEM_IP || "-",
          ISLEM_TUTAR: e.ISLEM_TUTAR || "-",
          ASIL_TUTAR: e.ASIL_TUTAR || "-",
          PARA_BIRIM: e.PARA_BIRIM || "-",


          BRUT_KOM_TUT: e.BRUT_KOM_TUT || "-",
          IS_GON_NEDENI: e.IS_GON_NEDENI || "-",
          ISLEM_KNL: e.ISLEM_KNL || "-",
          SUBE_VKN: e.SUBE_VKN || "-",
          SUBE_UNVAN: e.SUBE_UNVAN || "-",
          SUBE_IL_ADI: e.SUBE_IL_ADI || "-",
          KUR_ACIKLAMA: e.KUR_ACIKLAMA || "-",
          MUS_ACIKLAMA: e.MUS_ACIKLAMA || "-",
          KURUM_KOD: e.KURUM_KOD || "-",
          CREATED_DATE: e.CREATED_DATE || "-",

          UPDATED_DATE: e.UPDATED_DATE || "-",
          DELETED_FLAG: e.DELETED_FLAG || "-",
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

  //İşlem Gönderilme Nedeni 
  const transactionReason = (value) => {
    switch (value) {
      case "1":
        return "Aidat";
      case "2":
        return "Konut Kirası";
      case "3":
        return "Eğitim";
      case "4":
        return "Kredi Kartı Borcu";
      case "5":
        return "Personel Ödemeleri";
      case "6":
        return "İşyeri Kirası";
      case "7":
        return "Diğer Kiralar";
      case "8":
        return "e-ticaret";
      case "9":
        return "Diğer";
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
        accessorKey: "GON_MUSTERI_MI",
        header: IntlTranslate("GON_MUSTERI_MI"),
        size: 230,
        Cell: CellThump,
      },
      {
        accessorKey: "GON_OK_VKN",
        header: IntlTranslate("GON_OK_VKN"),
        size: 260,
      },
      {
        accessorKey: "GON_OK_UNVAN",
        header: IntlTranslate("GON_OK_UNVAN"),
        size: 240,
      },
      {
        accessorKey: "GON_TK_VKN",
        header: IntlTranslate("GON_TK_VKN"),
        size: 260,
      },
      {
        accessorKey: "GON_TK_UNVAN",
        header: IntlTranslate("GON_TK_UNVAN"),
      },
      {
        accessorKey: "GON_GK_AD",
        header: IntlTranslate("GON_GK_AD"),
      },
      {
        accessorKey: "GON_GK_SOYAD",
        header: IntlTranslate("GON_GK_SOYAD"),
        size: 200,
      },


      {
        accessorKey: "GON_GK_KIMLIK_TIPI",
        header: IntlTranslate("GON_GK_KIMLIK_TIPI"),
        size: 200,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return identityType(value);
        },
      },
      {
        accessorKey: "GON_GK_KIMLIK_NO",
        header: IntlTranslate("GON_GK_KIMLIK_NO"),
        size: 200,
      },
      {
        accessorKey: "GON_GK_UYRUK",
        header: IntlTranslate("GON_GK_UYRUK"),
        size: 200,
      },
      {
        accessorKey: "GON_ADRES",
        header: IntlTranslate("GON_ADRES"),
        size: 200,
      },
      {
        accessorKey: "GON_ILCE_ADI",
        header: IntlTranslate("GON_ILCE_ADI"),
        size: 200,
      },
      {
        accessorKey: "GON_POSTA_KOD",
        header: IntlTranslate("GON_POSTA_KOD"),
        size: 220,
      },
      {
        accessorKey: "GON_IL_KOD",
        header: IntlTranslate("GON_IL_KOD"),
        size: 200,
      },
      {
        accessorKey: "GON_IL_ADI",
        header: IntlTranslate("GON_IL_ADI"),
        size: 200,
      },
      {
        accessorKey: "GON_TEL",
        header: IntlTranslate("GON_TEL"),
        size: 200,
      },
      {
        accessorKey: "GON_EPOSTA",
        header: IntlTranslate("GON_EPOSTA"),
        size: 200,
      },

      {
        accessorKey: "GON_OK_HES_NO",
        header: IntlTranslate("GON_OK_HES_NO"),
        size: 260,
      },
      {
        accessorKey: "GON_OK_EPARA",
        header: IntlTranslate("GON_OK_EPARA"),
        size: 240,
      },
      {
        accessorKey: "GON_OK_KART_NO",
        header: IntlTranslate("GON_OK_KART_NO"),
        size: 240,
      },
      {
        accessorKey: "GON_BANKA_AD",
        header: IntlTranslate("GON_BANKA_AD"),
        size: 240,
      },
      {
        accessorKey: "GON_BANKA_KOD",
        header: IntlTranslate("GON_BANKA_KOD"),
        size: 240,
      },
      {
        accessorKey: "GON_SUBE_AD",
        header: IntlTranslate("GON_SUBE_AD"),
        size: 220,
      },
      {
        accessorKey: "GON_IBAN",
        header: IntlTranslate("GON_IBAN"),
        size: 220,
      },
      {
        accessorKey: "GON_HES_NO",
        header: IntlTranslate("GON_HES_NO"),
        size: 240,
      },
      {
        accessorKey: "GON_KREDI_KART_NO",
        header: IntlTranslate("GON_KREDI_KART_NO"),
        size: 240,
      },
      {
        accessorKey: "GON_DEBIT_KART_NO",
        header: IntlTranslate("GON_DEBIT_KART_NO"),
        size: 240,
      },
      {
        accessorKey: "AL_MUSTERI_MI",
        header: IntlTranslate("AL_MUSTERI_MI"),
        size: 220,
        Cell: CellThump,
      },



      {
        accessorKey: "AL_OK_VKN",
        header: IntlTranslate("AL_OK_VKN"),
        size: 220,
      },
      {
        accessorKey: "AL_OK_UNVAN",
        header: IntlTranslate("AL_OK_UNVAN"),
        size: 220,
      },
      {
        accessorKey: "AL_GK_AD",
        header: IntlTranslate("AL_GK_AD"),
        size: 220,
      },
      {
        accessorKey: "AL_GK_SOYAD",
        header: IntlTranslate("AL_GK_SOYAD"),
        size: 220,
      },
      {
        accessorKey: "AL_GK_KIMLIK_NO",
        header: IntlTranslate("AL_GK_KIMLIK_NO"),
        size: 220,
      },
      {
        accessorKey: "AL_GK_UYRUK",
        header: IntlTranslate("AL_GK_UYRUK"),
        size: 220,
      },
      {
        accessorKey: "AL_ADRES",
        header: IntlTranslate("AL_ADRES"),
        // size: 220,
      },
      {
        accessorKey: "AL_ILCE_ADI",
        header: IntlTranslate("AL_ILCE_ADI"),
        // size: 220,
      },
      {
        accessorKey: "AL_POSTA_KOD",
        header: IntlTranslate("AL_POSTA_KOD"),
        size: 200,
      },
      {
        accessorKey: "AL_IL_KOD",
        header: IntlTranslate("AL_IL_KOD"),
        // size: 200,
      },

      {
        accessorKey: "AL_IL_ADI",
        header: IntlTranslate("AL_IL_ADI"),
        // size: 200,
      },
      {
        accessorKey: "AL_TEL",
        header: IntlTranslate("AL_TEL"),
        size: 200,
      },
      {
        accessorKey: "AL_EPOSTA",
        header: IntlTranslate("AL_EPOSTA"),
        size: 200,
      },
      {
        accessorKey: "AL_OK_HES_NO",
        header: IntlTranslate("AL_OK_HES_NO"),
        size: 240,
      },
      {
        accessorKey: "AL_OK_EPARA",
        header: IntlTranslate("AL_OK_EPARA"),
        size: 240,
      },
      {
        accessorKey: "AL_OK_KART_NO",
        header: IntlTranslate("AL_OK_KART_NO"),
        size: 200,
      },
      {
        accessorKey: "AL_BANKA_AD",
        header: IntlTranslate("AL_BANKA_AD"),
        size: 200,
      },
      {
        accessorKey: "AL_BANKA_KOD",
        header: IntlTranslate("AL_BANKA_KOD"),
        size: 200,
      },
      {
        accessorKey: "AL_SUBE_AD",
        header: IntlTranslate("AL_SUBE_AD"),
        size: 200,
      },
      {
        accessorKey: "AL_IBAN",
        header: IntlTranslate("AL_IBAN"),
        // size: 200,
      },


      {
        accessorKey: "AL_HES_NO",
        header: IntlTranslate("AL_HES_NO"),
      },
      {
        accessorKey: "AL_KREDI_KART_NO",
        header: IntlTranslate("AL_KREDI_KART_NO"),
        size: 200,
      },
      {
        accessorKey: "AL_DEBIT_KART_NO",
        header: IntlTranslate("AL_DEBIT_KART_NO"),
        size: 200,
      },
      {
        accessorKey: "IS_TAR",
        header: IntlTranslate("IS_TAR"),
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const formattedDate = dateConverter(value, "dateonly", "dotdate");
          return formattedDate;
        }
      },
      {
        accessorKey: "IS_SAAT",
        header: IntlTranslate("IS_SAAT"),
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const formattedHour = dateConverter(value, "houronly", "dotHour");
          return formattedHour;
        }
      },
      {
        accessorKey: "ODENME_TAR",
        header: IntlTranslate("ODENME_TAR"),
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const formattedDate = dateConverter(value, "dateseventeen", "dotdate");
          return formattedDate;
        }
      },
      {
        accessorKey: "ISLEM_IP",
        header: IntlTranslate("ISLEM_IP"),
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
        accessorKey: "IS_GON_NEDENI",
        header: IntlTranslate("IS_GON_NEDENI"),
        size: 260,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return transactionReason(value);
        },
      },
      {
        accessorKey: "ISLEM_KNL",
        header: IntlTranslate("ISLEM_KNL"),
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return transactionChannel(value);
        }
      },
      {
        accessorKey: "SUBE_VKN",
        header: IntlTranslate("SUBE_VKN"),
        size: 220,
      },
      {
        accessorKey: "SUBE_UNVAN",
        header: IntlTranslate("SUBE_UNVAN"),
      },
      {
        accessorKey: "SUBE_IL_ADI",
        header: IntlTranslate("SUBE_IL_ADI"),
      },
      {
        accessorKey: "KUR_ACIKLAMA",
        header: IntlTranslate("KUR_ACIKLAMA"),
        size: 200,
      },
      {
        accessorKey: "MUS_ACIKLAMA",
        header: IntlTranslate("MUS_ACIKLAMA"),
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
        accessorKey: "DELETED_FLAG",
        header: IntlTranslate("DELETED_FLAG"),
        Cell: CellThump,
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
  console.log(selectedData);



  //START - Update & Delete Actions
  const [editDeleteSelectedRow, setEditDeleteSelectedRow] = useState({
    operation: "",
    rows: [],
  });

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
      let result =  await gibUpdateTableSix({
        RECORD_TYPE: editDeleteSelectedRow.rows[0].L_REF,
        L_REF: editDeleteSelectedRow.rows[0].L_REF,
        ISLEM_TURU: editDeleteSelectedRow.rows[0].ISLEM_TURU,
        GON_MUSTERI_MI: editDeleteSelectedRow.rows[0].GON_MUSTERI_MI,
        GON_OK_VKN: editDeleteSelectedRow.rows[0].GON_OK_VKN,
        GON_OK_UNVAN: editDeleteSelectedRow.rows[0].GON_OK_UNVAN,
        GON_TK_VKN: editDeleteSelectedRow.rows[0].GON_TK_VKN,
        GON_TK_UNVAN: editDeleteSelectedRow.rows[0].GON_TK_UNVAN,
        GON_GK_AD: editDeleteSelectedRow.rows[0].GON_GK_AD,
        GON_GK_SOYAD: editDeleteSelectedRow.rows[0].GON_GK_SOYAD,

        GON_GK_KIMLIK_TIPI: editDeleteSelectedRow.rows[0].GON_GK_KIMLIK_TIPI,
        GON_GK_KIMLIK_NO: editDeleteSelectedRow.rows[0].GON_GK_KIMLIK_NO,
        GON_GK_UYRUK: editDeleteSelectedRow.rows[0].GON_GK_UYRUK,
        GON_ADRES: editDeleteSelectedRow.rows[0].GON_ADRES,
        GON_ILCE_ADI: editDeleteSelectedRow.rows[0].GON_ILCE_ADI,
        GON_POSTA_KOD: editDeleteSelectedRow.rows[0].GON_POSTA_KOD,
        GON_IL_KOD: editDeleteSelectedRow.rows[0].GON_IL_KOD,
        GON_IL_ADI: editDeleteSelectedRow.rows[0].GON_IL_ADI,
        GON_TEL: editDeleteSelectedRow.rows[0].GON_TEL,
        GON_EPOSTA: editDeleteSelectedRow.rows[0].GON_EPOSTA,

        GON_OK_HES_NO: editDeleteSelectedRow.rows[0].GON_OK_HES_NO,
        GON_OK_EPARA: editDeleteSelectedRow.rows[0].GON_OK_EPARA,
        GON_OK_KART_NO: editDeleteSelectedRow.rows[0].GON_OK_KART_NO,
        GON_BANKA_AD: editDeleteSelectedRow.rows[0].GON_BANKA_AD,
        GON_BANKA_KOD: editDeleteSelectedRow.rows[0].GON_BANKA_KOD,
        GON_SUBE_AD: editDeleteSelectedRow.rows[0].GON_SUBE_AD,
        GON_IBAN: editDeleteSelectedRow.rows[0].GON_IBAN,
        GON_HES_NO: editDeleteSelectedRow.rows[0].GON_HES_NO,
        GON_KREDI_KART_NO: editDeleteSelectedRow.rows[0].GON_KREDI_KART_NO,
        GON_DEBIT_KART_NO: editDeleteSelectedRow.rows[0].GON_DEBIT_KART_NO,
        AL_MUSTERI_MI: editDeleteSelectedRow.rows[0].AL_MUSTERI_MI,

        AL_OK_VKN: editDeleteSelectedRow.rows[0].AL_OK_VKN,
        AL_OK_UNVAN: editDeleteSelectedRow.rows[0].AL_OK_UNVAN,
        AL_GK_AD: editDeleteSelectedRow.rows[0].AL_GK_AD,
        AL_GK_SOYAD: editDeleteSelectedRow.rows[0].AL_GK_SOYAD,
        AL_GK_KIMLIK_NO: editDeleteSelectedRow.rows[0].AL_GK_KIMLIK_NO,
        AL_GK_UYRUK: editDeleteSelectedRow.rows[0].AL_GK_UYRUK,
        AL_ADRES: editDeleteSelectedRow.rows[0].AL_ADRES,
        AL_ILCE_ADI: editDeleteSelectedRow.rows[0].AL_ILCE_ADI,
        AL_POSTA_KOD: editDeleteSelectedRow.rows[0].AL_POSTA_KOD,

        AL_IL_KOD: editDeleteSelectedRow.rows[0].AL_IL_KOD,
        AL_IL_ADI: editDeleteSelectedRow.rows[0].AL_IL_ADI,
        AL_TEL: editDeleteSelectedRow.rows[0].AL_TEL,
        AL_EPOSTA: editDeleteSelectedRow.rows[0].AL_EPOSTA,
        AL_OK_HES_NO: editDeleteSelectedRow.rows[0].AL_OK_HES_NO,
        AL_OK_EPARA: editDeleteSelectedRow.rows[0].AL_OK_EPARA,
        AL_OK_KART_NO: editDeleteSelectedRow.rows[0].AL_OK_KART_NO,
        AL_BANKA_AD: editDeleteSelectedRow.rows[0].AL_BANKA_AD,
        AL_BANKA_KOD: editDeleteSelectedRow.rows[0].AL_BANKA_KOD,
        AL_SUBE_AD: editDeleteSelectedRow.rows[0].AL_SUBE_AD,

        AL_IBAN: editDeleteSelectedRow.rows[0].AL_IBAN,
        AL_HES_NO: editDeleteSelectedRow.rows[0].AL_HES_NO,
        AL_KREDI_KART_NO: editDeleteSelectedRow.rows[0].AL_KREDI_KART_NO,
        AL_DEBIT_KART_NO: editDeleteSelectedRow.rows[0].AL_DEBIT_KART_NO,
        IS_TAR: editDeleteSelectedRow.rows[0].IS_TAR,
        IS_SAAT: editDeleteSelectedRow.rows[0].IS_SAAT,
        ODENME_TAR: editDeleteSelectedRow.rows[0].ODENME_TAR,
        ISLEM_IP: editDeleteSelectedRow.rows[0].ISLEM_IP,
        ISLEM_TUTAR: editDeleteSelectedRow.rows[0].ISLEM_TUTAR,
        ASIL_TUTAR: editDeleteSelectedRow.rows[0].ASIL_TUTAR,

        PARA_BIRIM: editDeleteSelectedRow.rows[0].PARA_BIRIM,
        BRUT_KOM_TUT: editDeleteSelectedRow.rows[0].BRUT_KOM_TUT,
        IS_GON_NEDENI: editDeleteSelectedRow.rows[0].IS_GON_NEDENI,
        ISLEM_KNL: editDeleteSelectedRow.rows[0].ISLEM_KNL,
        SUBE_VKN: editDeleteSelectedRow.rows[0].SUBE_VKN,
        SUBE_UNVAN: editDeleteSelectedRow.rows[0].SUBE_UNVAN,
        SUBE_IL_ADI: editDeleteSelectedRow.rows[0].SUBE_IL_ADI,
        KUR_ACIKLAMA: editDeleteSelectedRow.rows[0].KUR_ACIKLAMA,
        MUS_ACIKLAMA: editDeleteSelectedRow.rows[0].MUS_ACIKLAMA,
        KURUM_KOD: editDeleteSelectedRow.rows[0].KURUM_KOD,
        TRX_ID: editDeleteSelectedRow.rows[0].TRX_ID,

        CREATED_DATE: editDeleteSelectedRow.rows[0].CREATED_DATE,
        UPDATED_DATE: editDeleteSelectedRow.rows[0].UPDATED_DATE,
        DELETED_FLAG: "Y",
        GNDRM_TAR: editDeleteSelectedRow.rows[0].GNDRM_TAR,
        IS_SEND: editDeleteSelectedRow.rows[0].IS_SEND,
      });
      if(result.STATUS === "success"){
        i++;
      } else {
        status = false;
        enqueueSnackbar(result.RESPONSECODEDESC, {variant: "error"});
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
      let result = await gibUpdateTableSix({
        RECORD_TYPE: values.RECORD_TYPE,
        L_REF: editDeleteSelectedRow.rows[0].L_REF,
        ISLEM_TURU: values.ISLEM_TURU,
        GON_MUSTERI_MI: values.GON_MUSTERI_MI,
        GON_OK_VKN: values.GON_OK_VKN,
        GON_OK_UNVAN: values.GON_OK_UNVAN,
        GON_TK_VKN: values.GON_TK_VKN,
        GON_TK_UNVAN: values.GON_TK_UNVAN,
        GON_GK_AD: values.GON_GK_AD,
        GON_GK_SOYAD: values.GON_GK_SOYAD,

        GON_GK_KIMLIK_TIPI: values.GON_GK_KIMLIK_TIPI,
        GON_GK_KIMLIK_NO: values.GON_GK_KIMLIK_NO,
        GON_GK_UYRUK: values.GON_GK_UYRUK,
        GON_ADRES: values.GON_ADRES,
        GON_ILCE_ADI: values.GON_ILCE_ADI,
        GON_POSTA_KOD: values.GON_POSTA_KOD,
        GON_IL_KOD: values.GON_IL_KOD,
        GON_IL_ADI: values.GON_IL_ADI,
        GON_TEL: values.GON_TEL,
        GON_EPOSTA: values.GON_EPOSTA,

        GON_OK_HES_NO: values.GON_OK_HES_NO,
        GON_OK_EPARA: values.GON_OK_EPARA,
        GON_OK_KART_NO: values.GON_OK_KART_NO,
        GON_BANKA_AD: values.GON_BANKA_AD,
        GON_BANKA_KOD: values.GON_BANKA_KOD,
        GON_SUBE_AD: values.GON_SUBE_AD,
        GON_IBAN: values.GON_IBAN,
        GON_HES_NO: values.GON_HES_NO,
        GON_KREDI_KART_NO: values.GON_KREDI_KART_NO,
        GON_DEBIT_KART_NO: values.GON_DEBIT_KART_NO,
        AL_MUSTERI_MI: values.AL_MUSTERI_MI,

        AL_OK_VKN: values.AL_OK_VKN,
        AL_OK_UNVAN: values.AL_OK_UNVAN,
        AL_GK_AD: values.AL_GK_AD,
        AL_GK_SOYAD: values.AL_GK_SOYAD,
        AL_GK_KIMLIK_NO: values.AL_GK_KIMLIK_NO,
        AL_GK_UYRUK: values.AL_GK_UYRUK,
        AL_ADRES: values.AL_ADRES,
        AL_ILCE_ADI: values.AL_ILCE_ADI,
        AL_POSTA_KOD: values.AL_POSTA_KOD,

        AL_IL_KOD: values.AL_IL_KOD,
        AL_IL_ADI: values.AL_IL_ADI,
        AL_TEL: values.AL_TEL,
        AL_EPOSTA: values.AL_EPOSTA,
        AL_OK_HES_NO: values.AL_OK_HES_NO,
        AL_OK_EPARA: values.AL_OK_EPARA,
        AL_OK_KART_NO: values.AL_OK_KART_NO,
        AL_BANKA_AD: values.AL_BANKA_AD,
        AL_BANKA_KOD: values.AL_BANKA_KOD,
        AL_SUBE_AD: values.AL_SUBE_AD,

        AL_IBAN: values.AL_IBAN,
        AL_HES_NO: values.AL_HES_NO,
        AL_KREDI_KART_NO: values.AL_KREDI_KART_NO,
        AL_DEBIT_KART_NO: values.AL_DEBIT_KART_NO,
        IS_TAR: values.IS_TAR,
        IS_SAAT: values.IS_SAAT,
        ODENME_TAR: values.ODENME_TAR,
        ISLEM_IP: values.ISLEM_IP,
        ISLEM_TUTAR: values.ISLEM_TUTAR,
        ASIL_TUTAR: values.ASIL_TUTAR,

        PARA_BIRIM: values.PARA_BIRIM,
        BRUT_KOM_TUT: values.BRUT_KOM_TUT,
        IS_GON_NEDENI: values.IS_GON_NEDENI,
        ISLEM_KNL: values.ISLEM_KNL,
        SUBE_VKN: values.SUBE_VKN,
        SUBE_UNVAN: values.SUBE_UNVAN,
        SUBE_IL_ADI: values.SUBE_IL_ADI,
        KUR_ACIKLAMA: values.KUR_ACIKLAMA,
        MUS_ACIKLAMA: values.MUS_ACIKLAMA,
        KURUM_KOD: values.KURUM_KOD,
        TRX_ID: values.TRX_ID,

        CREATED_DATE: values.CREATED_DATE,
        UPDATED_DATE: values.UPDATED_DATE,
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
        exportFileTitle={IntlTranslate("gibPageThree")}
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
        <UpdateGibPageThree
          // ref={updateValues}
          datas={data.find((e) => e.L_REF === editDeleteSelectedRow.rows[0])}
        />
      </UpdateDialog>
    </>
  )
}

export default withTitle(injectIntl(GibPageThree), "gibPageThree");



const testData =
{
  "STATUS": "success",
  "RESPONSECODE": "000",
  "RESPONSECODEDESC": "OK",
  "DATA": [
    {
      "RECORD_TYPE": "E",
      "L_REF": "AWTJGJKHNJCL",
      "ISLEM_TURU": "00004",
      "GON_MUSTERI_MI": "E",
      "GON_OK_VKN": "0",
      "GON_OK_UNVAN": "XX",
      "GON_TK_VKN": null,
      "GON_TK_UNVAN": null,
      "GON_GK_AD": "Furkanın",
      "GON_GK_SOYAD": "Datası",
      "GON_GK_KIMLIK_TIPI": "5",
      "GON_GK_KIMLIK_NO": "16361000658",
      "GON_GK_UYRUK": "XX",
      "GON_ADRES": null,
      "GON_ILCE_ADI": "Beylikduzu",
      "GON_POSTA_KOD": null,
      "GON_IL_KOD": "1",
      "GON_IL_ADI": "Istanbul",
      "GON_TEL": "905314378788",
      "GON_EPOSTA": "Hadiyine@iyisin.com",
      "GON_OK_HES_NO": null,
      "GON_OK_EPARA": "663922012762",
      "GON_OK_KART_NO": null,
      "GON_BANKA_AD": null,
      "GON_BANKA_KOD": null,
      "GON_SUBE_AD": null,
      "GON_IBAN": null,
      "GON_HES_NO": "663922012762",
      "GON_KREDI_KART_NO": null,
      "AL_MUSTERI_MI": "H",
      "AL_OK_VKN": "9991298872",
      "AL_OK_UNVAN": "ZİRAAT FİNANSAL TEKNOLOJİLER ELEKTRONİK PARA VE ÖDEME HİZMETLERİ ANONİM ŞİRKETİ",
      "AL_GK_AD": "Özgür",
      "AL_GK_SOYAD": "Kaya",
      "AL_GK_KIMLIK_NO": "19530392608",
      "AL_GK_UYRUK": "XX",
      "AL_ADRES": null,
      "AL_ILCE_ADI": "ESENLER",
      "AL_POSTA_KOD": null,
      "AL_IL_KOD": "0",
      "AL_IL_ADI": "İSTANBUL",
      "AL_TEL": null,
      "AL_EPOSTA": "ozzy@gmail.com",
      "AL_OK_HES_NO": null,
      "AL_OK_EPARA": null,
      "AL_OK_KART_NO": null,
      "AL_BANKA_AD": null,
      "AL_BANKA_KOD": null,
      "AL_SUBE_AD": null,
      "AL_IBAN": null,
      "AL_HES_NO": "610160415224",
      "AL_KREDI_KART_NO": null,
      "AL_DEBIT_KART_NO": null,
      "IS_TAR": "20230529",
      "IS_SAAT": "121504",
      "ODENME_TAR": "20230523161221006",
      "ISLEM_IP": null,
      "ISLEM_TUTAR": "114",
      "ASIL_TUTAR": "114",
      "PARA_BIRIM": "TRY",
      "BRUT_KOM_TUT": "0",
      "IS_GON_NEDENI": "9",
      "ISLEM_KNL": null,
      "SUBE_VKN": null,
      "SUBE_UNVAN": null,
      "SUBE_IL_ADI": null,
      "KUR_ACIKLAMA": null,
      "MUS_ACIKLAMA": null,
      "KURUM_KOD": "KK080",
      "CREATED_DATE": "20240718163751792",
      "UPDATED_DATE": "20240722095041358",
      "DELETED_FLAG": "N",
      "GNDRM_TAR": null,
      "IS_SEND": "N",
      "TRX_ID": "2236",
      "GON_DEBIT_KART_NO": null,
      "AL_GK_KIMLIK_TIPI": null
    },
    {
      "RECORD_TYPE": "E",
      "L_REF": "PCKKCZFTTNMV",
      "ISLEM_TURU": "00004",
      "GON_MUSTERI_MI": "E",
      "GON_OK_VKN": "0",
      "GON_OK_UNVAN": "XX",
      "GON_TK_VKN": null,
      "GON_TK_UNVAN": null,
      "GON_GK_AD": "Furkanın",
      "GON_GK_SOYAD": "Datası",
      "GON_GK_KIMLIK_TIPI": "5",
      "GON_GK_KIMLIK_NO": "16361000658",
      "GON_GK_UYRUK": "XX",
      "GON_ADRES": null,
      "GON_ILCE_ADI": "Beylikduzu",
      "GON_POSTA_KOD": null,
      "GON_IL_KOD": "1",
      "GON_IL_ADI": "Istanbul",
      "GON_TEL": "905314378788",
      "GON_EPOSTA": "Hadiyine@iyisin.com",
      "GON_OK_HES_NO": null,
      "GON_OK_EPARA": "663922012762",
      "GON_OK_KART_NO": null,
      "GON_BANKA_AD": null,
      "GON_BANKA_KOD": null,
      "GON_SUBE_AD": null,
      "GON_IBAN": null,
      "GON_HES_NO": "663922012762",
      "GON_KREDI_KART_NO": null,
      "AL_MUSTERI_MI": "H",
      "AL_OK_VKN": "9991298872",
      "AL_OK_UNVAN": "ZİRAAT FİNANSAL TEKNOLOJİLER ELEKTRONİK PARA VE ÖDEME HİZMETLERİ ANONİM ŞİRKETİ",
      "AL_GK_AD": "Özgür",
      "AL_GK_SOYAD": "Kaya",
      "AL_GK_KIMLIK_NO": "19530392608",
      "AL_GK_UYRUK": "XX",
      "AL_ADRES": null,
      "AL_ILCE_ADI": "ESENLER",
      "AL_POSTA_KOD": null,
      "AL_IL_KOD": "0",
      "AL_IL_ADI": "İSTANBUL",
      "AL_TEL": null,
      "AL_EPOSTA": "ozzy@gmail.com",
      "AL_OK_HES_NO": null,
      "AL_OK_EPARA": null,
      "AL_OK_KART_NO": null,
      "AL_BANKA_AD": null,
      "AL_BANKA_KOD": null,
      "AL_SUBE_AD": null,
      "AL_IBAN": null,
      "AL_HES_NO": "610160415224",
      "AL_KREDI_KART_NO": null,
      "AL_DEBIT_KART_NO": null,
      "IS_TAR": "20230529",
      "IS_SAAT": "121504",
      "ODENME_TAR": "20230523161351173",
      "ISLEM_IP": null,
      "ISLEM_TUTAR": "114",
      "ASIL_TUTAR": "114",
      "PARA_BIRIM": "TRY",
      "BRUT_KOM_TUT": "0",
      "IS_GON_NEDENI": "9",
      "ISLEM_KNL": null,
      "SUBE_VKN": null,
      "SUBE_UNVAN": null,
      "SUBE_IL_ADI": null,
      "KUR_ACIKLAMA": null,
      "MUS_ACIKLAMA": null,
      "KURUM_KOD": "KK080",
      "CREATED_DATE": "20240718163751793",
      "UPDATED_DATE": null,
      "DELETED_FLAG": "N",
      "GNDRM_TAR": null,
      "IS_SEND": "N",
      "TRX_ID": "2239",
      "GON_DEBIT_KART_NO": null,
      "AL_GK_KIMLIK_TIPI": null
    },
  ],
}