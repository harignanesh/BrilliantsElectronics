import { useState } from "react";

const INVOICE_KEY = "lastInvoiceNumber";

export const useInvoiceMeta = () => {
  const last = Number(localStorage.getItem(INVOICE_KEY)) || 227;
  const [invoiceNo, setInvoiceNo] = useState(last + 1);

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const persistInvoiceNo = () => {
    localStorage.setItem(INVOICE_KEY, invoiceNo.toString());
  };

  return {
    invoiceNo,
    setInvoiceNo,
    date,
    setDate,
    persistInvoiceNo,
  };
};
