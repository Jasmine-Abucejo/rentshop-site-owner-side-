import React from "react";
import { Box, Image, Text, HStack, Button } from "@chakra-ui/react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useState, useEffect } from "react";

const RequestCard = ({ client, confirmRequest, page }) => {
  // const [selected, setSelected] = useState({
  //   from: new Date(),
  //   to: "Sat Aug 18 2025 00:00:00 GMT+0800 (Philippine Standard Time)",
  // });

  const product = client.products[0];
  const dateSent = new Date(client.createdAt);
  const requestDate = new Date(client.dateNeeded);
  const returnDate = new Date(client.returnDate);
  const today = new Date();
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
    <Box borderWidth={"2px"} borderColor={"pink.400"} maxHeight={"90%"}>
      <Image src={product.image} height={"30%"} width={"100%"} />
      <Box margin={"2"}>
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
          {page !== "decline" && (
            <Button
              variant={"surface"}
              backgroundColor={"green.500"}
              onClick={() => confirmRequest(client._id, "confirm")}
            >
              {page === "confirm" ? "Return" : "Confirm"}
            </Button>
          )}

          {page === "current" && (
            <Button
              variant={"surface"}
              backgroundColor={"red.500"}
              onClick={() => confirmRequest(client._id, "decline")}
            >
              Decline
            </Button>
          )}
          {page === "confirm" && (
            <Text color={"white"} fontStyle={"italic"}>
              Should be returned by:{" "}
              <Text
                as={"span"}
                fontStyle={"normal"}
                color={
                  returnDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)
                    ? "red"
                    : "green"
                }
              >
                {formatDate(returnDate)}
              </Text>
            </Text>
          )}
        </HStack>
      </Box>
    </Box>
  );
};

export default RequestCard;
