import React, { useEffect } from "react";
import { useProductStore } from "../store/productStore";
import RequestCard from "../components/RequestCard";
import { Box, Grid, Text } from "@chakra-ui/react";

const DeclinedList = () => {
  const clients = useProductStore((state) => state.clients);
  const fetchClients = useProductStore((state) => state.fetchClients);
  const declinedClients = Array.isArray(clients)
    ? clients.filter((client) => client?.status === "declined")
    : [];
  useEffect(() => {
    fetchClients();
  }, [fetchClients]);
  return (
    <Box p={"4"}>
      <Grid templateColumns={"repeat(4, 1fr)"}>
        {declinedClients.length > 0 ? (
          declinedClients.map((client) =>
            client?._id ? (
              <RequestCard key={client._id} client={client} />
            ) : null
          )
        ) : (
          <Text>No clients in the list yet</Text>
        )}
      </Grid>
    </Box>
  );
};

export default DeclinedList;
