import { Box, Typography } from "@mui/material";
import InvoiceHeader from "../components/InvoiceHeader";
import BillTo from "../components/BillTo";

const CreateInvoice = () => {
  return (
    <Box p={3} bgcolor="#f5f5f5" minHeight="100vh">
      <InvoiceHeader />
      <BillTo />

      <Typography variant="h6" mt={4}>
        Items section coming next…
      </Typography>
    </Box>
  );
};

export default CreateInvoice;
