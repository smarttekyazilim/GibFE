import React, { useCallback, useMemo, useRef, useState } from 'react';
import GetDataArea from '../../components/GetDataArea';
import AppBreadcrumb from '../../components/layout/AppBreadcrumb';
import MRTTable from '../../components/MRTTable';
import withTitle from '../../helpers/hoc/withTitle';
import { FormattedMessage, injectIntl } from 'react-intl';
import IntlTranslate from '../../helpers/IntlTranslate';
import DeleteDialog from "../../components/DeleteDialog";
import UpdateDialog from "../../components/UpdateDialog";
import { enqueueSnackbar } from 'notistack';
import UpdateGibError from './UpdateGibError';
import { dateConverter } from "../../helpers/dateHelpers";
import { gibGetError } from "../../api/api";


const GibError = () => {
    const breadcrumb = useMemo(
        () => [
            {
                name: <FormattedMessage id="gibError" />,
                active: true,
            },
        ],
        []
    );


    //GetDataArea
    const HandleSearchClick = useCallback(
        async (startDate, endDate,) => {
            setLoading(true);
            await gibGetError({
            }).then((resp) => {
                let RESP_DATA = resp.DATA;
                setData(
                    RESP_DATA.map((e) => ({
                        ID: e.ID,
                        FORM_TYPE: e?.FORM_TYPE || "-",
                        CODE: e?.CODE || "-",
                        MESSAGE: e?.MESSAGE || "-",
                        ERROR_DATE: e?.ERROR_DATE || "-",
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

    const HandleDeleteClick = useCallback(() => {
        setData([]);
        setLoading(false);
        setSelectedData([]);
        setEditDeleteSelectedRow({
            operation: "",
            rows: [],
        });
    }, []);

    //MRTTable
    // const [data, setData] = useState([]);
    const [data, setData] = useState(testData.DATA);

    const [loading, setLoading] = useState(false);
    const columns = useMemo(
        () => [
            {
                accessorKey: "ID",
                header: IntlTranslate("ID"),
            },
            {
                accessorKey: "FORM_TYPE",
                header: IntlTranslate("FORM_TYPE"),
            },
            {
                accessorKey: "CODE",
                header: IntlTranslate("CODE"),
            },
            {
                accessorKey: "MESSAGE",
                header: IntlTranslate("MESSAGE"),
            },
            {
                accessorKey: "ERROR_DATE",
                header: IntlTranslate("ERROR_DATE"),
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
            // let result =  await something({});
            // if(result.STATUS === "success"){
            //   i++;
            // } else {
            //   status = false;
            //   enqueueSnackbar(result.RESPONSECODEDESC, {variant: "error"});
            //   break;
            // }
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
            // let result = await something({
            //   RECORD_TYPE: "",
            //   ID: editDeleteSelectedRow.rows[0].ID,
            // });
            // if (result.STATUS === "success") {
            //   i++;
            // } else {
            //   status = false;
            //   enqueueSnackbar(result.RESPONSECODEDESC, { variant: "error" });
            //   break;
            // }
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
            // inputsShow={{ tckn: true, iref: true }}
            />
            <MRTTable
                data={data}
                columns={columns}
                loading={loading}
                rowsUniqueId="ID"
                setEditDeleteSelectedRow={setEditDeleteSelectedRow}
                setSelectedData={setSelectedData}
                allowDelete={true}
                exportFileTitle={IntlTranslate("gibError")}
            />
            <DeleteDialog
                editDeleteSelectedRow={editDeleteSelectedRow}
                onClose={onClose}
                onDelete={onDelete}
                datas={{
                    id: data.find((e) => e.ID === editDeleteSelectedRow.rows[0])?.ID,
                    //   label: data.find((e) => e.ID === editDeleteSelectedRow.rows[0])?.TCKN,
                }}
                loading={loading}
            />
            <UpdateDialog
                editDeleteSelectedRow={editDeleteSelectedRow}
                onClose={onClose}
                onUpdate={onUpdate}
                datas={{
                    id: data.find((e) => e.ID === editDeleteSelectedRow.rows[0])?.ID,
                }}
                loading={loading}
            >
                <UpdateGibError
                    ref={updateValues}
                    datas={data.find((e) => e.ID === editDeleteSelectedRow.rows[0])}
                />
            </UpdateDialog>
        </>
    )
}

export default withTitle(injectIntl(GibError), "gibError");

const testData = {
    "STATUS": "success",
    "RESPONSECODE": "000",
    "RESPONSECODEDESC": "OK",
    "DATA": [
        {
            "ID": 1,
            "FORM_TYPE": "EPKBB",
            "CODE": "140",
            "MESSAGE": "TEST DATA",
            "ERROR_DATE": "20240708190453436"
        },
        {
            "ID": 2,
            "FORM_TYPE": "EPKBB",
            "CODE": "120",
            "MESSAGE": "TEST",
            "ERROR_DATE": "20240708190453436"
        },
        {
            "ID": 3,
            "FORM_TYPE": "EPKBB",
            "CODE": "120",
            "MESSAGE": "TEST",
            "ERROR_DATE": "20240709152511128"
        },
        {
            "ID": 21,
            "FORM_TYPE": "EPKBB",
            "CODE": "120",
            "MESSAGE": "TEST",
            "ERROR_DATE": "20240718163253534"
        }
    ]
}