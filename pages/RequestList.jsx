import React, { useEffect, useState } from "react";
import RequestCard from "../components/RequestCard";
import { Container, Text, Box, Grid } from "@chakra-ui/react";
import { useProductStore } from "../store/productStore";

const RequestList = () => {
  const clients = useProductStore((state) => state.clients);
  const fetchClients = useProductStore((state) => state.fetchClients);
  const pendingClients = Array.isArray(clients)
    ? clients.filter((client) => client?.status === "pending request")
    : [];
  const [toggleModal, setToggleModal] = useState(false);
  useEffect(() => {
    fetchClients();
  }, [fetchClients]);
  const confirmRequest = () => {
    setToggleModal(true);
  };
  return (
    <Container fluid maxW={"container.xl"}>
      <Box p={"4"}>
        <Grid
          templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
          gap={"4"}
          overflowY="auto"
        >
          {pendingClients.length > 0 ? (
            pendingClients.map((client) =>
              client?._id ? (
                <RequestCard key={client._id} client={client} />
              ) : null
            )
          ) : (
            <Text>No clients in the list yet</Text>
          )}
        </Grid>
      </Box>
    </Container>
  );
};
export default RequestList;
