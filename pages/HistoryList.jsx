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
  VStack,
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

  const statusColor = {
    confirmed: "green",
    declined: "red",
    pending: "yellow",
    returned: "pink.400",
  };
  useEffect(() => {
    fetchClientsByDate();
  }, [fetchClientsByDate]);

  return (
    <Container maxW={"container.xl"} display={"flex"} flexDir={"column"}>
      <Text fontWeight={"extrabold"} color={"pink.400"} p={"4"}>
        Full Transaction History{" "}
        <Text as="span" fontStyle={"italic"}>
          {" "}
          (based on date the request was sent)
        </Text>
      </Text>
      <Accordion allowMultiple>
        {groupedClients.map((group) => (
          <AccordionItem key={group.date}>
            <h2>
              <AccordionButton>
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  fontWeight="bold"
                  color="white"
                >
                  {group.date}
                </Box>
                <AccordionIcon color="white" />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack align="stretch" spacing={3}>
                {group.clients.map((client) => (
                  <Box
                    key={client._id}
                    p={3}
                    borderWidth="1px"
                    borderRadius="lg"
                    shadow="sm"
                  >
                    <Text fontWeight="semibold" color="white" fontSize={"2xl"}>
                      {client.firstName} {client.lastName}
                      <Text
                        as="span"
                        fontStyle={"italic"}
                        fontSize="sm"
                        color={statusColor[client.status] || "gray.500"}
                      >
                        {" "}
                        {client.status}
                      </Text>
                    </Text>
                    <Text fontSize="sm" color="white">
                      Item Requested:{" "}
                      {client.products.map((p) => p.productName).join(", ") ||
                        "None"}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
};
export default RequestList;
