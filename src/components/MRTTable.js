import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_TR } from "material-react-table/locales/tr";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import {
  Box,
  Divider,
  FormControlLabel,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";
//icons
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplayIcon from "@mui/icons-material/Replay";
//excel export
import XLSX from "sheetjs-style";
import { saveAs } from "file-saver";
//pdf export
// import jsPDF from "jspdf";
// import "jspdf-autotable";
//helper
import { FormattedMessage } from "react-intl";
import useStateCallback from "../helpers/useStateCallback";
//context
import { useAuth } from "../context/AuthContext";
import { GetCurrentLanguage } from "../context/LanguageContext";
import { useReactToPrint } from "react-to-print";
import { dateSort } from "../helpers/dateHelpers";

//pdfMake pdf export
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function MRTTable({
  data,
  columns,
  loading,
  customRightClickMenus = null,
  rowsUniqueId = "id",
  setEditDeleteSelectedRow = () => {},
  enableActions = true,
  allowEditDelete = true,
  allowEdit = true,
  editButtonText = "edit",
  editAllowOpt = null,
  allowDelete = true,
  deleteButtonText = "delete",
  deleteAllowOpt = null,
  allowCopy = false,
  setSelectedData = () => {},
  multipleSelect = true,
  leftPins = [],
  rightPins = [],
  initialRest = {},
  CustomTopToolbar = null,
  dbclicktoUpdate = false,
  setRowClassName = [],
  exportFileTitle = "rapor",
  //renderDetailFunc = null,
  ...rest
}) {
  const currentLang = GetCurrentLanguage();

  //START - selection
  const [rowSelection, setRowSelection] = useStateCallback({});
  const handleRowSelectChange = (old) => {
    setRowSelection(old, (rs) => setSelectedData(Object.keys(rs)));
  };
  //END - selection

  //START - table instance
  const table = useMaterialReactTable({
    columns: columns.map((e) => ({
      ...e,
      filterFn: e.filterFn || "startsWith",
    })),
    data,
    getRowId: (row) => row[rowsUniqueId],
    enableGrouping: true,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableColumnResizing: true,
    enableGlobalFilter: false,
    enableColumnPinning: true,
    enableStickyHeader: true,
    enableRowActions: enableActions,
    enableRowSelection: true,
    enableMultiRowSelection: multipleSelect,
    filterFns: {
      multiSelectFilter: (row, id, filterVal) => {
        // Eğer filtre değeri boş ise veya herhangi bir değer seçilmemişse, tüm satırları göster
        if (!filterVal || filterVal.length === 0) {
          return true;
        }

        // Değilse, normal multi-select filtreleme işlemi
        let val = row.getValue(id);
        return filterVal.includes(val);
      },
      currencyFilter: (row, id, filterVal) => {
        let val = row.getValue(id);
        if (val === null || val === "-" || val === "") {
          val = 0;
        }
        if (typeof val !== "number") {
          val = Number(
            val
              .toString()
              .replace(/\./g, "")
              .replace(/,/, ".")
              .replace(/\s*TL$/, "")
          );
        }
        if (filterVal[0] && filterVal[1]) {
          return Number(filterVal[0]) <= val && val <= Number(filterVal[1]);
        } else if (filterVal[0]) {
          return Number(filterVal[0]) <= Number(val);
        } else if (filterVal[1]) {
          return Number(val) <= Number(filterVal[1]);
        } else {
          return true;
        }
      },
    },
    sortingFns: {
      currencySort: (a, b, id) => {
        let first = a.getValue(id);
        let sec = b.getValue(id);
        if (first === null || first === "-" || first === "") {
          first = 0;
        }
        if (sec === null || sec === "-" || sec === "") {
          sec = 0;
        }
        if (typeof first !== "number") {
          first = Number(
            first
              .toString()
              .replace(/\./g, "")
              .replace(/,/, ".")
              .replace(/\s*TL$/, "")
          );
        }
        if (typeof sec !== "number") {
          sec = Number(
            sec
              .toString()
              .replace(/\./g, "")
              .replace(/,/, ".")
              .replace(/\s*TL$/, "")
          );
        }
        return first - sec;
      },
      dotDHSort: (a, b, id) => {
        return dateSort(a.getValue(id)) - dateSort(b.getValue(id));
      },
      dotDSort: (a, b, id) => {
        return (
          dateSort(a.getValue(id), "dotdate") -
          dateSort(b.getValue(id), "dotdate")
        );
      },
      slashDSort: (a, b, id) => {
        return (
          dateSort(a.getValue(id), "slashdate") -
          dateSort(b.getValue(id), "slashdate")
        );
      },
      slashYSSort: (a, b, id) => {
        return (
          dateSort(a.getValue(id), "yeartosecond") -
          dateSort(b.getValue(id), "yeartosecond")
        );
      },
    },
    onRowSelectionChange: handleRowSelectChange,
    localization:
      currentLang.code === "tr" ? MRT_Localization_TR : MRT_Localization_EN,
    enableColumnVirtualization: false,
    enableRowVirtualization: false,
    //tablo ilk create edilirken state tanımı
    initialState: {
      density: "compact",
      columnPinning: {
        left: ["mrt-row-actions", "mrt-row-select", ...leftPins],
        right: rightPins,
      },
      ...initialRest,
    },
    //değişken statelerin tanımı
    state: {
      isLoading: loading,
      rowSelection,
    },
    layoutMode: "grid-no-grow",
    // muiFilterTextFieldProps: {
    //   sx: {mt:"0.5rem", width: '100%' },
    //   variant: 'outlined',
    //   size:"small"
    // },
    //toolbar
    muiTopToolbarProps: {
      sx: {
        "& :last-child": {
          alignItems: "center",
          gap: "0",
        },
        "& :last-child .MuiBox-root": {
          height: "40px",
        },
        "& .MuiIconButton-root": {
          color: "primary.main",
          padding: "5px",
        },
        "& .MuiIconButton-root:hover": {
          backgroundColor: "rgba(225, 5, 20, 0.04)",
        },
      },
    },
    //başlık header kısmı
    muiTableHeadCellProps: {
      sx: {
        fontWeight: "600",
        borderTop: "1px solid rgba(224, 224, 224, 1)",
      },
    },
    //satırların olduğu blok
    muiTableContainerProps: {
      sx: { minHeight: "400px", height: "calc(100vh - 650px)" },
    },
    //sayfalama pagination
    muiPaginationProps: {
      rowsPerPageOptions: [10, 25, 50, 100],
      showFirstButton: true,
      showLastButton: true,
    },
    //varsayılan sütun genişliği
    defaultColumn: {
      maxSize: 1000,
      minSize: 50,
      size: 180,
    },
    positionToolbarAlertBanner: "bottom",
    isMultiSortEvent: () => true, //now no need to hold `shift` key to multi-sort
    displayColumnDefOptions: {
      "mrt-row-actions": {
        size: 50,
        header: "",
      },
      "mrt-row-select": {
        size: 50,
      },
    },
    ...((dbclicktoUpdate || setRowClassName) && {
      muiTableBodyRowProps: ({ row }) => {
        let rowsClass = "";
        if (setRowClassName && setRowClassName.length > 0) {
          //eğer koşullu satır sınıflandırması prop olarak tanımlanmışsa
          for (let i = 0; i < setRowClassName.length; i++) {
            let item = setRowClassName[i];
            if (item.isEqual) {
              if (row.original[item.key] === item.value) {
                rowsClass = item.className;
              }
            } else if (row.original[item.key] !== item.value) {
              rowsClass = item.className;
            }
          }
        }
        return {
          ...(rowsClass && {
            className: rowsClass,
          }),
          ...(dbclicktoUpdate && {
            onDoubleClick: (event) => {
              event.preventDefault();
              if (!row.getIsGrouped()) {
                setEditDeleteSelectedRow({
                  operation: "edit",
                  rows: [row.id],
                });
              }
            },
          }),
        };
      },
    }),
    renderTopToolbarCustomActions: () => {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            justifyContent: "space-between",
            flexGrow: "1",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {CustomTopToolbar}
          </Box>
          <Tooltip title={<FormattedMessage id="exportFile" />} arrow>
            <IconButton
              size="small"
              id="export-button"
              aria-controls={
                Boolean(exportAnchorEl) ? "export-menu" : undefined
              }
              aria-haspopup="true"
              aria-expanded={Boolean(exportAnchorEl) ? "true" : undefined}
              onClick={handleExportClick}
            >
              <FileDownloadIcon />
            </IconButton>
          </Tooltip>
        </Box>
      );
    },
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      allowCopy && (
        <MenuItem
          key={0}
          sx={{ color: "secondary.main" }}
          onClick={() => {
            navigator.clipboard.writeText(
              JSON.stringify(row.original, null, 2)
            );
            closeMenu();
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <ContentCopyIcon />
          </ListItemIcon>
          <ListItemText>
            <FormattedMessage id="copyRow" />
          </ListItemText>
        </MenuItem>
      ),
      getCurrentPagePermissions.updateP &&
        canEditeDeleteRow &&
        allowEditDelete &&
        allowEdit &&
        (editAllowOpt !== null
          ? compare(
              row.original[editAllowOpt.key],
              editAllowOpt.operator,
              editAllowOpt.value
            )
          : true) && (
          <MenuItem
            key={1}
            sx={{ color: "warning.main" }}
            onClick={() => {
              setEditDeleteSelectedRow({
                operation: "edit",
                rows: [row.original[rowsUniqueId]],
              });
              closeMenu();
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <ReplayIcon />
            </ListItemIcon>
            <ListItemText>
              <FormattedMessage id={editButtonText} />
            </ListItemText>
          </MenuItem>
        ),
      getCurrentPagePermissions.deleteP &&
        canEditeDeleteRow &&
        allowEditDelete &&
        allowDelete &&
        (deleteAllowOpt !== null
          ? compare(
              row.original[deleteAllowOpt.key],
              deleteAllowOpt.operator,
              deleteAllowOpt.value
            )
          : true) && (
          <MenuItem
            key={2}
            sx={{ color: "error.main" }}
            onClick={() => {
              setEditDeleteSelectedRow({
                operation: "delete",
                rows: [row.original[rowsUniqueId]],
              });
              closeMenu();
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText>
              <FormattedMessage id={deleteButtonText} />
            </ListItemText>
          </MenuItem>
        ),
      customRightClickMenus !== null &&
        customRightClickMenus.map((item, i) => (
          <MenuItem
            key={i + 3}
            onClick={() => {
              item.clickMethod(row.original[rowsUniqueId]);
              closeMenu();
            }}
          >
            <ListItemText>
              <FormattedMessage id={item.translateName} />
            </ListItemText>
          </MenuItem>
        )),
    ],
    ...rest,
  });
  //END - table instance

  //START - dışa aktar menü
  const [exportAnchorEl, setExportAnchorEl] = useState(null);
  const handleExportClick = useCallback(
    (event) => {
      if (Object.keys(rowSelection).length === 0) {
        setExportType("all");
      }
      setExportAnchorEl(event.currentTarget);
    },
    [rowSelection]
  );
  const [exportType, setExportType] = useState("all");
  //END - dışa aktar menü

  //START - excel export
  const exportExcel = useCallback(() => {
    let filteredSortedRowIds = table.getSortedRowModel().rows.map((e) => e.id);
    let visibleColumns = table
      .getVisibleFlatColumns()
      .filter(
        (e) =>
          ![
            "mrt-row-actions",
            "mrt-row-select",
            "mrt-row-spacer",
            "reqProcess",
          ].includes(e.id)
      );

    if (exportType === "selected") {
      filteredSortedRowIds = filteredSortedRowIds.filter((e) =>
        Object.keys(rowSelection)
          .map((t) => t.toString())
          .includes(e.toString())
      );
    }
    const expData = filteredSortedRowIds.map((id) => {
      const row = {};
      visibleColumns.forEach((item) => {
        row[item.columnDef.header] = table.getRow(id).getValue(item.id);
      });
      return row;
    });
    const ws = XLSX.utils.json_to_sheet(expData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    //excel stil ayarları
    let sh = wb.Sheets.data;
    for (let cell in sh) {
      if (cell[0] === "!") continue;
      if (!sh[cell].s) {
        sh[cell].s = {};
      }
      const match = cell.match(/\d+$/);
      const rowNumber = match ? parseInt(match[0]) : null;
      if (rowNumber === 1) {
        sh[cell].s = {
          fill: { fgColor: { rgb: "FFFFFF00" } },
          font: { bold: true, color: { rgb: "FF000000" } },
        };
      }
      sh[cell].s = {
        ...sh[cell].s,
        font: { sz: 11 },
        border: {
          top: { style: "thin", color: "FF000000" },
          bottom: { style: "thin", color: "FF000000" },
          left: { style: "thin", color: "FF000000" },
          right: { style: "thin", color: "FF000000" },
        },
      };
    }
    /* calculate column width */
    ws["!cols"] = fitToColumn(expData);
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const exportData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(exportData, `${exportFileTitle}.xlsx`);
  }, [table, exportType, rowSelection, exportFileTitle]);
  //END - excel export

  //START - PDF export

  //JsPDF
  // const exportPDF = useCallback(() => {
  //   let filteredSortedRowIds = table.getSortedRowModel().rows.map((e) => e.id);
  //   let visibleColumns = table
  //     .getVisibleFlatColumns()
  //     .filter(
  //       (e) =>
  //         ![
  //           "mrt-row-actions",
  //           "mrt-row-select",
  //           "mrt-row-spacer",
  //           "reqProcess",
  //         ].includes(e.id)
  //     );

  //   if (exportType === "selected") {
  //     filteredSortedRowIds = filteredSortedRowIds.filter((e) =>
  //       Object.keys(rowSelection)
  //         .map((t) => t.toString())
  //         .includes(e.toString())
  //     );
  //   }

  //   const expData = filteredSortedRowIds.map((id) => {
  //     const row = [];
  //     visibleColumns.forEach((item) => {
  //       row.push(table.getRow(id).getValue(item.id));
  //     });
  //     return row;
  //   });

  //   const headers = [visibleColumns.map((e) => e.columnDef.header)];
  //   //pdf settings
  //   const unit = "pt";
  //   const size = "A4";
  //   const orientation = "landscape";
  //   //init pdf
  //   const doc = new jsPDF(orientation, unit, size);
  //   doc.setFontSize(14);
  //   let content = {
  //     theme: "grid",
  //     startY: 16,
  //     showHead: "firstPage",
  //     head: headers,
  //     body: expData,
  //     styles: {
  //       font: "Poppins-Regular",
  //     },
  //     headStyles: {
  //       fillColor: [225, 5, 20],
  //     },
  //   };
  //   import("./PoppinsFont").then((font) => {
  //     doc.addFileToVFS("Poppins-Regular-normal.ttf", font.font);
  //     doc.addFont("Poppins-Regular-normal.ttf", "Poppins-Regular", "normal");
  //     doc.setFont("Poppins-Regular");
  //     doc.autoTable(content);
  //     doc.save(`${exportFileTitle}.pdf`);
  //   });
  // }, [table, exportType, rowSelection, exportFileTitle]);

  //pdfMake
  const exportPDF = useCallback(() => {
    let filteredSortedRowIds = table.getSortedRowModel().rows.map((e) => e.id);
    let visibleColumns = table
      .getVisibleFlatColumns()
      .filter(
        (e) =>
          ![
            "mrt-row-actions",
            "mrt-row-select",
            "mrt-row-spacer",
            "reqProcess",
          ].includes(e.id)
      );
    if (exportType === "selected") {
      filteredSortedRowIds = filteredSortedRowIds.filter((e) =>
        Object.keys(rowSelection)
          .map((t) => t.toString())
          .includes(e.toString())
      );
    }
    const expData = filteredSortedRowIds.map((id) => {
      const row = [];
      visibleColumns.forEach((item) => {
        row.push(table.getRow(id).getValue(item.id));
      });
      return row;
    });
    const headers = visibleColumns.map((e) => e.columnDef.header);

    let maxWidth = visibleColumns.length * 100;
    const docDefinition = {
      pageOrientation: "landscape",
      pageSize: {
        width: maxWidth,
        height: 596, //A4 kısa kenar boyutu(210mm)
      },
      content: [
        {
          table: {
            headerRows: 1,
            widths: visibleColumns.map(() => "auto"),
            body: [
              // Başlık satırı için border tanımlaması
              headers.map((header) => ({
                text: header,
                style: "headerStyle",
                border: [true, true, true, true],
              })),
              // Veri satırları için border tanımlaması
              ...expData.map((row) =>
                row.map((cell) => ({
                  text: cell,
                  border: [true, true, true, true],
                }))
              ),
            ],
          },
          layout: {
            fillColor: function (rowIndex) {
              return rowIndex % 2 === 0 ? "#EEEEEE" : null;
            },
          },
        },
      ],
      styles: {
        headerStyle: {
          bold: true,
          color: "white",
          fillColor: [225, 5, 20],
        },
      },
    };
    pdfMake.createPdf(docDefinition).download(`${exportFileTitle}.pdf`);
  }, [table, exportFileTitle, exportType, rowSelection]);

  //END - PDF export

  //START - print
  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  //END - print

  //START - rol kontrolü
  const { role, getCurrentPagePermissions } = useAuth();
  const canEditeDeleteRow = useMemo(() => {
    return role === "maker" ? true : false;
  }, [role]);
  //END - rol kontrolü

  return (
    <Box
      sx={{
        width: "100%",
        mt: 3,
      }}
    >
      <Box ref={printRef}>
        <MaterialReactTable table={table} />
      </Box>
      <Menu
        id="export-menu"
        anchorEl={exportAnchorEl}
        open={Boolean(exportAnchorEl)}
        onClose={() => setExportAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "export-button",
          sx: {
            pt: 0,
          },
        }}
        elevation={6}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          disableTouchRipple
          disableRipple
          sx={{
            py: 0,
            px: 1,
          }}
        >
          <RadioGroup
            row
            sx={{ alignItems: "center", justifyContent: "space-between" }}
            value={exportType}
            onChange={(e) => setExportType(e.target.value)}
          >
            <FormControlLabel
              sx={{ m: 0 }}
              value="all"
              control={<Radio size="small" />}
              label={<FormattedMessage id="all2" />}
            />
            <FormControlLabel
              sx={{ m: 0 }}
              value="selected"
              control={<Radio size="small" />}
              label={<FormattedMessage id="selecteds" />}
              disabled={Object.keys(rowSelection).length === 0}
            />
          </RadioGroup>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            exportExcel();
            setExportAnchorEl(null);
          }}
        >
          <FormattedMessage id="exportExcel" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            exportPDF();
            setExportAnchorEl(null);
          }}
        >
          <FormattedMessage id="exportPDF" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handlePrint();
            setExportAnchorEl(null);
          }}
        >
          <FormattedMessage id="print" />
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default React.memo(MRTTable);
function compare(post, operator, value) {
  switch (operator) {
    case ">":
      return post > value;
    case "<":
      return post < value;
    case ">=":
      return post >= value;
    case "<=":
      return post <= value;
    case "==":
      // eslint-disable-next-line eqeqeq
      return post == value;
    case "!=":
      // eslint-disable-next-line eqeqeq
      return post != value;
    case "===":
      return post === value;
    case "!==":
      return post !== value;
    case "includes":
      return value.includes(post);
    case "notincludes":
      return !value.includes(post);
    default:
      return false;
  }
}
const fitToColumn = (data) => {
  const columnWidths = [];
  for (const property in data[0]) {
    columnWidths.push({
      wch: Math.max(
        property ? property.toString().length : 0,
        ...data.map((obj) =>
          obj[property] ? obj[property].toString().length : 0
        )
      ),
    });
  }
  return columnWidths;
};
