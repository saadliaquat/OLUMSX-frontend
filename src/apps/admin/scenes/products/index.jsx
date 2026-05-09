import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Header } from "@admin/components";
import axios from "axios";

// Product component
const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  // Theme
  const theme = useTheme();

  // State for expansion
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
        p: "1rem",
      }}
    >
      {/* Content */}
      <Typography variant="h5" component="div">
        {name}
      </Typography>
      <Typography>{description}</Typography>
      <Typography>Category: {category}</Typography>
      <Typography>Price: Rs.{Number(price).toFixed(2)}</Typography>
    </Box>
  );
};

// Products component
const Products = () => {
  // State for products data
  const [products, setProducts] = useState([]);
  const theme = useTheme();
  const isNonMobile = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/product/productsadmin");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      {/* Header */}
      <Header title="PRODUCTS" subtitle="See your list of products." />

      {/* Content */}
      {products.length ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {/* Loop over each product */}
          {products.map((product) => (
            <Product key={product._id} {...product} />
          ))}
        </Box>
      ) : (
        // Loader or Empty State
        <Typography variant="h5" mt="20%" textAlign="center">
          Loading...
        </Typography>
      )}
    </Box>
  );
};

export default Products;
