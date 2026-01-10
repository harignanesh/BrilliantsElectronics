import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const goToCreateInvoice = () => {
    navigate("/invoice/new");
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>
        Dashboard
      </Typography>

      <Typography variant="body1" mb={3}>
        Welcome, <strong>{user?.username}</strong>
      </Typography>

      <Box display="flex" gap={2}>
        <Button variant="contained" onClick={goToCreateInvoice}>
          Create Invoice
        </Button>

        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
