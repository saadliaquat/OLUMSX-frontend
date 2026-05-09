import React, { useState, useEffect } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { toast } from "react-toastify";

import { Header } from "@admin/components";

const Advertisements = () => {
  const theme = useTheme();
  const [advertisements, setAdvertisements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAdvertisements = async () => {
    try {
      const response = await axios.get("https://olumsx-backend-deploy-new.vercel.app/api/ad/fetchadsall");
      console.log(response.data);
      setAdvertisements(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch advertisements:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvertisements();
  }, []);

 
  const handleDeleteAdvertisement = async (adId) => {
    try {
      console.log(adId)
      const response = await axios.post("https://olumsx-backend-deploy-new.vercel.app/api/ad/deletead", {
        data: { adId },
      });

      console.log("Deleted advertisement:", adId);
      fetchAdvertisements();
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to delete advertisement:", error);
      toast.error("Failed to delete advertisement: " + error.message);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "imageUrl", headerName: "Image", flex: 1, renderCell: (params) => <img src={params.value} alt="advertisement" style={{ width: "100%", height: "auto" }} /> },
    { field: "vendorID", headerName: "Vendor ID", flex: 1 },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDeleteAdvertisement(params.row._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Advertisements" subtitle="List of Advertisements" />
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
          rows={advertisements}
          columns={columns}
          pageSize={10}
        />
      </Box>
    </Box>
  );
};

export default Advertisements;
