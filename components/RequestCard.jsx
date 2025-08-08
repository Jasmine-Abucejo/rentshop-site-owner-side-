import React from "react";
import { Box, Image, Text, HStack, Button } from "@chakra-ui/react";

const RequestCard = ({ client, confirmRequest }) => {
  const product = client.products[0];
  const dateObj = new Date(client.createdAt);
  const formattedDate = `${String(dateObj.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(dateObj.getDate()).padStart(2, "0")}-${dateObj.getFullYear()}`;
  return (
    <Box borderWidth={"2px"} p={"4"} borderColor={"pink.400"}>
      <Image src={product.image} />
      <Text fontWeight={"bold"} color={"pink.400"}>
        Requested item:{" "}
        <Text as="span" fontWeight={"normal"} color={"pink.400"}>
          {product.productName}
        </Text>
      </Text>
      <Text fontWeight={"bold"} color={"pink.400"}>
        Request for:{" "}
        <Text as="span" fontWeight={"normal"} color={"pink.400"}>
          {client.dateNeeded}
        </Text>
      </Text>

      <Text fontWeight={"bold"} color={"pink.400"}>
        Client Name:{" "}
        <Text as={"span"} fontWeight={"normal"} color={"pink.400"}>
          {client.firstName} {client.lastName}
        </Text>
      </Text>
      <Text fontWeight={"bold"} color={"pink.400"}>
        Contact No.:{" "}
        <Text as={"span"} fontWeight={"normal"} color={"pink.400"}>
          {client.mobile}
        </Text>
      </Text>
      <Text fontWeight={"bold"} color={"pink.400"}>
        Request sent on:{" "}
        <Text as={"span"} fontWeight={"normal"} color={"pink.400"}>
          {formattedDate}
        </Text>
      </Text>
      <HStack>
        <Button
          variant={"surface"}
          backgroundColor={"green.500"}
          onClick={() => confirmRequest(client._id)}
        >
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
