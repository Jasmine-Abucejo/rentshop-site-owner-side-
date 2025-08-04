import React from "react";
import { Box, Image, Text, HStack, Button } from "@chakra-ui/react";

const RequestCard = ({ client }) => {
  const product = client.products[0];
  const dateObj = new Date(client.createdAt);
  const formattedDate = `${String(dateObj.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(dateObj.getDate()).padStart(2, "0")}-${dateObj.getFullYear()}`;
  return (
    <Box borderWidth={"2px"} p={"4"} borderColor={"pink.400"}>
      <Image src={product.image} />
      <Text fontWeight={"bold"}>
        Requested item:{" "}
        <Text as="span" fontWeight={"normal"}>
          {product.productName}
        </Text>
      </Text>
      <Text fontWeight={"bold"}>
        Request for:{" "}
        <Text as="span" fontWeight={"normal"}>
          {client.dateNeeded}
        </Text>
      </Text>

      <Text fontWeight={"bold"}>
        Client Name:{" "}
        <Text as={"span"} fontWeight={"normal"}>
          {client.firstName} {client.lastName}
        </Text>
      </Text>
      <Text fontWeight={"bold"}>
        Contact No.:{" "}
        <Text as={"span"} fontWeight={"normal"}>
          {client.mobile}
        </Text>
      </Text>
      <Text fontWeight={"bold"}>
        Request sent on:{" "}
        <Text as={"span"} fontWeight={"normal"}>
          {formattedDate}
        </Text>
      </Text>
      <HStack>
        <Button variant={"surface"} backgroundColor={"green.500"}>
          Confirm
        </Button>
        <Button variant={"surface"} backgroundColor={"red.500"}>
          Decline
        </Button>
      </HStack>
    </Box>
  );
};

export default RequestCard;
