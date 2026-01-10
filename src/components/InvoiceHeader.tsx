import { Box, Typography, Divider } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";

const InvoiceHeader = () => {
  console.log("InvoiceHeader rendered");

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns="2fr 1fr auto"
        gap={2}
        p={3}
        borderRadius={2}
        boxShadow={2}
        bgcolor="#fff"
      >
        <Box>
          <Typography variant="h6" fontWeight={700}>
            BRILLIANTS ELECTRONICS
          </Typography>

          <Typography variant="subtitle2" color="text.secondary">
            Making Technology work
          </Typography>

          <Typography variant="body2" mt={1}>
            142/5, Sakthivel Nagar<br />
            Peravallur, Chennai - 600082<br />
            Phone: 9840034153<br />
            Email: brilliantelectronics.chennai@gmail.com
          </Typography>
        </Box>

        <Box textAlign="right">
          <Typography variant="body2">
            <strong>GSTIN</strong> : 33ARYPL4958M1ZS
          </Typography>
          <Typography variant="body2">
            <strong>Invoice No</strong> : 25
          </Typography>
          <Typography variant="body2">
            <strong>Date</strong> : 10-Jan-2026
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center">
          <BusinessIcon sx={{ fontSize: 48, color: "grey.700" }} />
        </Box>
      </Box>

      <Divider sx={{ mt: 3 }} />
    </>
  );
};

export default InvoiceHeader;
