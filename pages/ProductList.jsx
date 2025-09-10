import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import { useProductStore } from "../store/productStore";
import { Text, Box, Grid, Button } from "@chakra-ui/react";

const ProductList = () => {
  //   const { fetchProducts, products } = useProductStore();
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  console.log(products);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Box p={"4"}>
      <Grid templateColumns={"repeat(5, 1fr)"} gap={"2"}>
        {products.length > 0 ? (
          products.map((product) =>
            product?._id ? (
              <ProductCard key={product._id} item={product} />
            ) : null
          )
        ) : (
          <Text color={"pink.400"}>No products yet</Text>
        )}
      </Grid>
      <Button
        position="fixed"
        right="16px"
        bottom="16px"
        zIndex="50"
        bg="pink.400"
        p="4"
      >
        Add Product
      </Button>
    </Box>
  );
};
export default ProductList;
