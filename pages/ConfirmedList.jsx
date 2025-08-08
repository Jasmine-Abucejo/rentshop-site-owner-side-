import React, { useEffect } from "react";
import { Text, Box, Grid } from "@chakra-ui/react";
import RequestCard from "../components/RequestCard";
import { useProductStore } from "../store/productStore";

const ConfirmedList = () => {
  const clients = useProductStore((state) => state.clients);
  const fetchClients = useProductStore((state) => state.fetchClients);
  const confirmedClients = Array.isArray(clients)
    ? clients.filter((client) => client?.status === "confirmed")
    : [];

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);
  return (
    <Box p={"4"}>
      <Grid templateColumns={"repeat(4, 1fr)"}>
        {confirmedClients.length > 0 ? (
          confirmedClients.map((client) =>
            client?._id ? (
              <RequestCard key={client._id} client={client} />
            ) : null
          )
        ) : (
          <Text color={"pink.400"}>No clients in the list yet</Text>
        )}
      </Grid>
    </Box>
  );
};

export default ConfirmedList;
