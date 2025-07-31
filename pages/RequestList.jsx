import React, { useEffect } from "react";
import RequestCard from "../components/RequestCard";
import { Container, Text, Box, Grid } from "@chakra-ui/react";
import { useProductStore } from "../store/productStore";

const RequestList = () => {
  const clients = useProductStore((state) => state.clients);
  const fetchClients = useProductStore((state) => state.fetchClients);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);
  //   console.log(clients[1]);
  return (
    <Box p={"4"}>
      <Grid templateColumns={"repeat(4, 1fr)"} gap={"4"}>
        {Array.isArray(clients) && clients.length > 0 ? (
          clients
            .filter((client) => client?.status === "pending request")
            .map((client) =>
              client._id ? (
                <RequestCard key={client._id} client={client} />
              ) : null
            )
        ) : (
          <Text> No product requests yet </Text>
        )}
      </Grid>
    </Box>
  );
};
export default RequestList;
