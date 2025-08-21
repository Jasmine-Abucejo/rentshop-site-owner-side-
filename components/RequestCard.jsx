import React from "react";
import { Box, Image, Text, HStack, Button } from "@chakra-ui/react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useState, useEffect } from "react";

const RequestCard = ({ client, confirmRequest }) => {
  // const [selected, setSelected] = useState({
  //   from: new Date(),
  //   to: "Sat Aug 18 2025 00:00:00 GMT+0800 (Philippine Standard Time)",
  // });

  const product = client.products[0];
  const dateSent = new Date(client.createdAt);
  const requestDate = new Date(client.dateNeeded);
  const formatDate = (dateObj) => {
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      weekday: "long", // Monday
      year: "numeric", // 2020
      month: "long", // August
      day: "numeric", // 11
    });

    return formattedDate;
  };

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
          {formatDate(requestDate)}
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
          {formatDate(dateSent)}
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
