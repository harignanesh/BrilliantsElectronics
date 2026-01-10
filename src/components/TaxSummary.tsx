import { Box, Typography, TextField } from "@mui/material";
import { useState } from "react";
import type { InvoiceItem } from "../data/InvoiceItem";

const TaxSummary = ({ items }: { items: InvoiceItem[] }) => {
  const [taxPercent, setTaxPercent] = useState(18);

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const cgst = subtotal * (taxPercent / 2 / 100);
  const sgst = subtotal * (taxPercent / 2 / 100);
  const grandTotal = subtotal + cgst + sgst;

  return (
    <Box
      mt={4}
      p={3}
      bgcolor="#fff"
      borderRadius={2}
      boxShadow={1}
      maxWidth={400}
      ml="auto"
    >
      <Typography variant="body1">
        Subtotal: ₹{subtotal.toFixed(2)}
      </Typography>

      <TextField
        label="GST %"
        type="number"
        size="small"
        value={taxPercent}
        onChange={(e) => setTaxPercent(Number(e.target.value))}
        sx={{ my: 2 }}
      />

      <Typography variant="body2">
        CGST: ₹{cgst.toFixed(2)}
      </Typography>
      <Typography variant="body2">
        SGST: ₹{sgst.toFixed(2)}
      </Typography>

      <Typography variant="h6" mt={2}>
        Grand Total: ₹{grandTotal.toFixed(2)}
      </Typography>
    </Box>
  );
};

export default TaxSummary;
