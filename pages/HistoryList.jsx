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
  const clients = useProductStore((state) => state.clients);
  const fetchClients = useProductStore((state) => state.fetchClients);
  const pendingClients = Array.isArray(clients)
    ? clients.filter((client) => client?.status === "pending request")
    : [];
  const completedClients = Array.isArray(clients)
    ? clients.filter((client) => client?.status === "returned")
    : [];
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
    fetchClients();
  }, [fetchClients]);

  return (
    <Container maxW={"container.xl"} display={"flex"} flexDir={"column"}>
      <Text fontWeight={"extrabold"} color={"pink.400"} p={"4"}>
        Finished Transactions:{" "}
      </Text>
      <Accordion w="100%" allowToggle>
        {completedClients.length > 0 ? (
          completedClients.map((client) =>
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
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
