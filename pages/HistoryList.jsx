import React, { useEffect, useState } from "react";
import RequestCard from "../components/RequestCard";
import {
  Container,
  Text,
  Box,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useProductStore } from "../store/productStore";
import { useLocation, useNavigate } from "react-router-dom";

const RequestList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const groupedClients = useProductStore((state) => state.groupedClients);
  const fetchClientsByDate = useProductStore(
    (state) => state.fetchClientsByDate
  );
  // const pendingClients = Array.isArray(clients)
  //   ? clients.filter((client) => client?.status === "pending request")
  //   : [];
  // const completedClients = Array.isArray(clients)
  //   ? clients.filter((client) => client?.status === "returned")
  //   : [];
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
    fetchClientsByDate();
  }, [fetchClientsByDate]);

  return (
    <Container maxW={"container.xl"} display={"flex"} flexDir={"column"}>
      <Text fontWeight={"extrabold"} color={"pink.400"} p={"4"}>
        Finished Transactions:{" "}
      </Text>
      <Accordion w="100%" allowToggle>
        {groupedClients.length > 0 ? (
          groupedClients.map((client) =>
            client?._id ? (
              <AccordionItem key={client._id}>
                <h2>
                  <AccordionButton
                    w="100%"
                    color={"white"}
                    _expanded={{ bg: "pink.400", color: "white" }}
                  >
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      textColor={"white"}
                    >
                      {formatDate(new Date(client.createdAt))}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} textColor={"white"}>
                  <Box key={client._id} p="2" borderBottom="1px solid #ccc">
                    <Text fontWeight="bold">{client.name}</Text>
                    {client.products.length > 0 &&
                      client.products.map((p) => (
                        <Text key={p._id}>- {p.productName}</Text>
                      ))}
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            ) : null
          )
        ) : (
          <Text color={"pink.400"}>No clients in the list yet</Text>
        )}
      </Accordion>
    </Container>
  );
};
export default RequestList;
