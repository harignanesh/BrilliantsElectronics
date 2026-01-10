import { Box, Typography, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { customers } from "../data/customers";

const BillTo = () => {
  const [selectedId, setSelectedId] = useState<number | "">("");

  const selectedCustomer =
    customers.find((c) => c.id === selectedId) || null;

  return (
    <Box
      mt={4}
      p={3}
      borderRadius={2}
      boxShadow={1}
      bgcolor="#fff"
    >
      <Typography variant="subtitle1" fontWeight={600} mb={2}>
        Bill To
      </Typography>

      <TextField
        select
        label="Customer"
        fullWidth
        value={selectedId}
        onChange={(e) => setSelectedId(Number(e.target.value))}
        margin="normal"
      >
        {customers.map((customer) => (
          <MenuItem key={customer.id} value={customer.id}>
            {customer.name}
          </MenuItem>
        ))}
      </TextField>

      {selectedCustomer && (
        <Box mt={2}>
          <Typography variant="body2">
            <strong>Address:</strong> {selectedCustomer.address}
          </Typography>
          <Typography variant="body2">
            <strong>GSTIN:</strong> {selectedCustomer.gstin}
          </Typography>
          <Typography variant="body2">
            <strong>Phone:</strong> {selectedCustomer.phone}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default BillTo;
