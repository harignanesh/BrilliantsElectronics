import { Box, Button } from "@mui/material";
import {
  Menu,
  MenuItem,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useInvoiceMeta } from "../hooks/useInvoiceMeta";
import ExcelJS from "exceljs";

import { useRef, useState } from "react";
import InvoiceHeader from "../components/InvoiceHeader";
import BillTo from "../components/BillTo";
import ItemsTable from "../components/ItemsTable";
import TaxSummary from "../components/TaxSummary";
import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx";
import type { InvoiceItem } from "../data/InvoiceItem";


const exportExcelFromTemplate = async () => { ... }

const CreateInvoice = () => {
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const exportPDF = () => {
  if (!invoiceRef.current) return;

  const fileName = getInvoiceFileName();

  html2pdf()
    .from(invoiceRef.current)
    .set({
      margin: 10,
      filename: `${fileName}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4" },
    })
    .save();
};
const {
  invoiceNo,
  date,
  setDate,
  persistInvoiceNo,
} = useInvoiceMeta();

const getInvoiceFileName = () => {
  const customerName = "EL TECH";
  const d = new Date(date);

  const monthYear = d.toLocaleString("en-IN", {
    month: "short",
    year: "numeric",
  });

  return `BRI ${invoiceNo} ${monthYear} TAX INVOICE ${customerName}`;
};
const exportExcel = () => {
  const invoiceNo = "025";
  const customerName = "EL TECH";
  const date = new Date();
  const monthYear = date.toLocaleString("en-IN", {
    month: "short",
    year: "numeric",
  });

  const fileName = `BRI ${invoiceNo} ${monthYear} TAX INVOICE ${customerName}.xlsx`;

  const rows: any[] = [];

  // HEADER
  rows.push({
    A: "BRILLIANTS ELECTRONICS",
  });
  rows.push({
    A: "Making Technology work",
  });
  rows.push({
    A: "142/5, Sakthivel Nagar, Peravallur, Chennai - 600082",
  });
  rows.push({});
  rows.push({
    A: "TAX INVOICE",
  });
  rows.push({});

  // TABLE HEADER
  rows.push({
    A: "S.No",
    B: "Description",
    C: "Quantity",
    D: "Price",
    E: "Total",
  });

  // ITEMS
  items.forEach((item, index) => {
    rows.push({
      A: index + 1,
      B: item.description,
      C: item.quantity,
      D: item.price,
      E: item.quantity * item.price,
    });
  });

  // TOTALS
  const subtotal = items.reduce(
    (s, i) => s + i.quantity * i.price,
    0
  );
  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  rows.push({});
  rows.push({ D: "Subtotal", E: subtotal });
  rows.push({ D: "GST 18%", E: gst });
  rows.push({ D: "Total Amount", E: grandTotal });

  const worksheet = XLSX.utils.json_to_sheet(rows, {
    skipHeader: true,
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Invoice");

 XLSX.writeFile(workbook, `${fileName}.xlsx`);

};

const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
const open = Boolean(anchorEl);

const handleExportClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => setAnchorEl(null);

const exportBoth = () => {
  exportExcel();
  exportPDF();
  handleClose();
};

  return (
    <Box p={3} bgcolor="#f5f5f5" minHeight="100vh">
      {/* EXPORT BUTTONS */}
  <Box display="flex" justifyContent="flex-end" mb={2}>
  <Button
    variant="contained"
    endIcon={<KeyboardArrowDownIcon />}
    onClick={handleExportClick}
  >
    Export
  </Button>

  <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
    <MenuItem
      onClick={() => {
        exportExcel();
        handleClose();
        persistInvoiceNo();

      }}
    >
      Export Excel
    </MenuItem>

    <MenuItem
      onClick={() => {
        exportPDF();
        handleClose();
        persistInvoiceNo();

      }}
    >
      Export PDF
    </MenuItem>

    <MenuItem onClick={exportBoth}>
      Export Both
    </MenuItem>
  </Menu>
</Box>

      {/* INVOICE CONTENT */}
      <Box ref={invoiceRef}>
       <InvoiceHeader
  invoiceNo={invoiceNo}
  date={date}
  onDateChange={setDate}
/>

        <BillTo />
        <ItemsTable items={items} setItems={setItems} />
        <TaxSummary items={items} />
      </Box>
    </Box>
  );
};

export default CreateInvoice;

