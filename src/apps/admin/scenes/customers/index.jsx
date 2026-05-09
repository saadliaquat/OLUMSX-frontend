import React, { useState, useEffect } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { toast } from "react-toastify";

import { Header } from "@admin/components";

const Customers = () => {
  const theme = useTheme();
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/user/getcustomers");
      console.log(response.data);
      setCustomers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDeleteCustomer = async (customerId) => {
    try {
      console.log("herehe ", customerId);
      const response = await axios.delete('http://localhost:3001/api/user/deleteuser', {
        data: { userID: customerId },
      });
  
      if (response.status === 200) {
        fetchCustomers();
        toast.success('Customer deleted successfully!');
      } else {
        console.error('Unexpected response:', response.data);
        toast.error('Failed to delete customer.');
      }
    } catch (error) {
      console.error('Failed to delete customer:', error.message || error);
      toast.error('An error occurred while deleting the customer.');
    }
  };
  

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "username", headerName: "Username", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "DOB", headerName: "DOB", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDeleteCustomer(params.row._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of Customers" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButtom-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading}
          getRowId={(row) => row._id}
          rows={customers}
          columns={columns}
          pageSize={10}
        />
      </Box>
    </Box>
  );
};

export default Customers;
