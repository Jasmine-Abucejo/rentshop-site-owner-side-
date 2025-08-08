import React, { useEffect, useState } from "react";
import RequestCard from "../components/RequestCard";
import { Container, Text, Box, Grid } from "@chakra-ui/react";
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

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);
  const confirmRequest = (id) => {
    navigate(`/image/${id}`, { state: { backgroundLocation: location } });
  };
  return (
    <Container maxW={"container.xl"} display={"flex"}>
      <Box p={"4"}>
        <Grid
          templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
          gap={"4"}
          overflowY="auto"
        >
          {pendingClients.length > 0 ? (
            pendingClients.map((client) =>
              client?._id ? (
                <RequestCard
                  key={client._id}
                  client={client}
                  confirmRequest={confirmRequest}
                />
              ) : null
            )
          ) : (
            <Text color={"pink.400"}>No clients in the list yet</Text>
          )}
        </Grid>
      </Box>
    </Container>
  );
};
export default RequestList;
