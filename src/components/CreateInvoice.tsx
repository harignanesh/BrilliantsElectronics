import { Box } from "@mui/material";
import { useState } from "react";
import InvoiceHeader from "../components/InvoiceHeader";
import BillTo from "../components/BillTo";
import ItemsTable from "../components/ItemsTable";
import type { InvoiceItem } from "../data/InvoiceItem";
import TaxSummary from "./TaxSummary";

const CreateInvoice = () => {
  const [items, setItems] = useState<InvoiceItem[]>([]);

  return (
    <Box p={3} bgcolor="#f5f5f5" minHeight="100vh">
      <InvoiceHeader />
      <BillTo />
      <ItemsTable items={items} setItems={setItems} />
      <TaxSummary items={items} />
    </Box>
  );
};

export default CreateInvoice;
