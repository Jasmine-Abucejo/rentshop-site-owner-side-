import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import { useProductStore } from "../store/productStore";
import {
  Text,
  Box,
  Grid,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";

const ProductList = () => {
  const toast = useToast();
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const addProduct = useProductStore((state) => state.addProduct);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newProduct, setNewProduct] = useState({
    productName: "",
    size: "",
    material: "",
    color: "",
    price: "",
    image: "",
  });
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, products]);
  const handleSave = () => {
    if (
      !newProduct.productName.trim() ||
      !newProduct.size.trim() ||
      !newProduct.color.trim() ||
      !newProduct.material.trim() ||
      !newProduct.price.trim() ||
      !newProduct.image.trim()
    ) {
      toast({
        title: "Incomplete Fields",
        description: "Please fill up all the fields before saving",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    addProduct(newProduct); // call store function
    setNewProduct({
      // clear inputs
      productName: "",
      size: "",
      material: "",
      color: "",
      price: "",
    });
    onClose(); // close modal
    toast({
      title: "New Item Added",
      description: "The new item has been added to the database",
      status: "success",
      duration: 6000,
      isClosable: true,
      position: "top",
    });
  };
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
        onClick={onOpen}
        position="fixed"
        right="16px"
        bottom="16px"
        zIndex="50"
        bg="pink.400"
        p="4"
      >
        Add Product
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={"bold"}>Enter Item Specifications</Text>
            <Stack spacing={3}>
              {" "}
              <Input
                value={newProduct.productName}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, productName: e.target.value });
                }}
                placeholder="Product Name"
                size="md"
              />
              <Input
                value={newProduct.size}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, size: e.target.value });
                }}
                placeholder="Size"
                size="md"
              />
              <Input
                value={newProduct.material}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, material: e.target.value });
                }}
                placeholder="Material"
                size="md"
              />
              <Input
                value={newProduct.color}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, color: e.target.value });
                }}
                placeholder="Color"
                size="md"
              />
              <Input
                value={newProduct.price}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, price: e.target.value });
                }}
                placeholder="Price"
                size="md"
              />
              <Input
                value={newProduct.image}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, image: e.target.value });
                }}
                placeholder="Image Link"
                size="md"
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSave} colorScheme="pink" mr={3}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default ProductList;
