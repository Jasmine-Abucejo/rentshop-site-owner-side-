import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";
import RequestCard from "../components/RequestCard";
import { Box, Grid, Text } from "@chakra-ui/react";

const DeclinedList = () => {
  const clients = useProductStore((state) => state.clients);
  const fetchClients = useProductStore((state) => state.fetchClients);
  const [status, setStatus] = useState("declined");
  // const declinedClients = Array.isArray(clients)
  //   ? clients.filter((client) => client?.status === "declined")
  //   : [];
  useEffect(() => {
    fetchClients({ status });
  }, [status, fetchClients]);
  return (
    <Box p={"4"}>
      <Grid templateColumns={"repeat(4, 1fr)"}>
        {clients.length > 0 ? (
          clients.map((client) =>
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

export default DeclinedList;
