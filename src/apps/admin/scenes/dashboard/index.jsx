import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme, useMediaQuery, Box, Button, Typography } from '@mui/material';
import { Email, PersonAdd, Traffic, DownloadOutlined } from '@mui/icons-material';
import { BreakdownChart, FlexBetween, Header, StatBox } from '@admin/components';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    // fetch latest user session.
    fetch('https://olumsx-backend-deploy-new.vercel.app/api/session/fetchsession')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        localStorage.setItem('userId', data.userID);
        localStorage.setItem('userID', data.userID);
        localStorage.setItem('user_id', data.userID);
        localStorage.setItem('user_type', data.role);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const theme = useTheme();
  const isNonMediumScreen = useMediaQuery("(min-width: 1200px)");
  const [customers, setCustomers] = useState(0);
  const [vendors, setVendors] = useState(0);
  const [products, setProducts] = useState(0);
  const [dailyOrders, setDailyOrders] = useState(0);
  const [users, setUsers] = useState([]);
  const [advertisements, setAdvertisements] = useState([]);

  const fetchData = async () => {
    try {
      const responses = await Promise.all([
        axios.get('https://olumsx-backend-deploy-new.vercel.app/api/user/getcustomers'),
        axios.get('https://olumsx-backend-deploy-new.vercel.app/api/user/getvendors'),
        axios.get('https://olumsx-backend-deploy-new.vercel.app/api/product/productsadmin'),
        axios.get('https://olumsx-backend-deploy-new.vercel.app/api/ad/fetchadsall')
      ]);
      setCustomers(responses[0].data.length);
      setVendors(responses[1].data.length);
      setProducts(responses[2].data.length);
      setAdvertisements(responses[3].data);
      // Map users and vendors data
      const mappedUsers = responses[0].data.map(user => ({
        _id: user._id,
        username: user.username,
        first_name: user.first_name || user.username, // Fallback to username if first_name isn't available
        createdAt: user.createdAt || "Not provided", // Fallback if createdAt isn't available
        DOB: user.DOB || "Not provided", // Fallback if DOB isn't available
        role: user.user_type,
      }));
      const mappedVendors = responses[1].data.map(vendor => ({
        _id: vendor._id,
        username: vendor.username,
        first_name: vendor.first_name || vendor.username, // Fallback to username if first_name isn't available
        createdAt: vendor.createdAt || "Not provided", // Fallback if createdAt isn't available
        DOB: vendor.DOB || "Not provided", // Fallback if DOB isn't available
        role: vendor.user_type,
      }));
      // Merge users and vendors data
      const allUsers = [...mappedUsers, ...mappedVendors];
      setUsers(allUsers);
      console.log(allUsers);
    } catch (error) {
      console.error("Failed to fetch data", error);
      toast.error("Failed to fetch data: " + error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    console.log('Delete user with ID:', userId);
    // Implement the deletion logic here
    try {
      console.log("herehe ", userId);
      const response = await axios.delete('https://olumsx-backend-deploy-new.vercel.app/api/user/deleteuser', {
        data: { userID: userId },
      });
  
      if (response.status === 200) {
        fetchData();
        toast.success('User deleted successfully!');
      } else {
        console.error('Unexpected response:', response.data);
        toast.error('Failed to delete user.');
      }
    } catch (error) {
      console.error('Failed to delete user:', error.message || error);
      toast.error('An error occurred while deleting the user.');
    }
  };

  const columns = [
    { field: "username", headerName: "Username", flex: 1 },
    { field: "first_name", headerName: "First Name", flex: 0.5 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "DOB", headerName: "DOB", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 1 },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.5,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(params.row._id)}
        >
          Delete
        </Button>
      ),
      sortable: false,
    }
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary.light,
              },
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{ "& > div": { gridColumn: isNonMediumScreen ? undefined : "span 12" } }}
      >
        <StatBox
          title="Total Customers"
          value={customers}
          increase="+14%"
          description="Since last month"
          icon={<Email sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />

        <StatBox
          title="Total Vendors"
          value={vendors}
          increase="+5%"
          description="Since last month"
          icon={<PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />

        <StatBox
          title="Total Products"
          value={products}
          increase="+43%"
          description="Number of total products"
          icon={<Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />

        <StatBox
          title="Orders Today"
          value={dailyOrders}
          increase="+43%"
          description="Orders received today"
          icon={<Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />

        <Box gridColumn="span 8" gridRow="span 3" sx={{ "& .MuiDataGrid-root": { border: "none", borderRadius: "5rem" } }}>
          <DataGrid
            loading={users.length === 0}
            getRowId={(row) => row._id}
            rows={users}
            columns={columns}
          />
        </Box>

        <Box gridColumn="span 4" gridRow="span 3" backgroundColor={theme.palette.background.alt} p="1.5rem" borderRadius="0.55rem">
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>List of Advertisements</Typography>
          {/* <BreakdownChart isDashboard={true} /> */}
          <Box mt={2} maxHeight="400px" overflow="auto">
            {advertisements.map((advertisement) => (
              <Box key={advertisement._id} mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">{advertisement.name}</Typography>
                <Typography variant="body2">{advertisement.description}</Typography>
                <img src={advertisement.imageUrl} alt="Advertisement" style={{ maxWidth: '100%', height: 'auto', marginTop: '8px' }} />
              </Box>
            ))}
          </Box>
          <Typography p="0 0.6rem" fontSize="0.8rem" sx={{ color: theme.palette.secondary[200] }}>The list of all the Advertisements, you can activate or deactivate.</Typography>
        </Box>

      </Box>
    </Box>
  );
};

export default Dashboard;
