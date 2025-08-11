import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Text, Icon, Input } from "@chakra-ui/react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useProductStore } from "../store/productStore";

const ModalDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const closeModal = () => {
    navigate(-1);
  };
  const client = useProductStore((state) => state.client);
  const fetchClient = useProductStore((state) => state.fetchClient);
  let product;
  if (client) {
    product = client.products[0];
  }
  // console.log(client.products);
  const requestDate = new Date(client?.dateNeeded);
  const formatDate = (dateObj) => {
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      weekday: "long", // Monday
      year: "numeric", // 2020
      month: "long", // August
      day: "numeric", // 11
    });

    return formattedDate;
  };

  useEffect(() => {
    if (id) {
      fetchClient(id);
    }
  }, [id]);
  console.log(client);
  return (
    <Box
      position={"fixed"}
      top={"0"}
      left={"0"}
      bgColor={"blackAlpha.800"}
      inset={"0"}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={"2rem"}
      zIndex={"100"}
      w={"100vw"}
      h={"100vh"}
    >
      <Icon
        as={IoMdCloseCircleOutline}
        position={"absolute"}
        top={"10rem"}
        left={"10rem"}
        fontSize={"4xl"}
        textColor={"pink.400"}
        onClick={() => closeModal()}
      />
      {client && (
        <Box
          bgColor={"white"}
          minW={"40%"}
          borderWidth={"4px"}
          borderColor={"pink.300"}
          display={"flex"}
          alignItems={"center"}
          textAlign={"center"}
          justifyContent={"center"}
          flexDir={"column"}
          p={"4"}
          gap={"4"}
        >
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Are you sure you want to confirm this reservation?
          </Text>
          <Box
            borderWidth={"4px"}
            borderColor={"pink.300"}
            p={"4"}
            justifyItems={"left"}
          >
            <Text fontWeight={"bold"}>
              Requested Item:{" "}
              <Text as={"span"} fontWeight={"normal"}>
                {product?.productName}
              </Text>
            </Text>
            <Text fontWeight={"bold"}>
              Client Name:{" "}
              <Text as={"span"} fontWeight={"normal"}>
                {client?.firstName} {""} {client?.lastName}
              </Text>
            </Text>
            <Text fontWeight={"bold"}>
              Mobile:{" "}
              <Text as={"span"} fontWeight={"normal"}>
                {client?.mobile}
              </Text>
            </Text>
            <Text fontWeight={"bold"}>
              Date Needed:{" "}
              <Text as={"span"} fontWeight={"normal"}>
                {formatDate(requestDate)}
              </Text>
            </Text>
            <Text fontWeight={"bold"}>Set Return Date: </Text>
            <Input placeholder="Select Return Date" size="md" type="date" />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ModalDetails;
