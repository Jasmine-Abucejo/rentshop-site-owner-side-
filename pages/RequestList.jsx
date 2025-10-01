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
  const [status, setStatus] = useState("pending request");
  // const pendingClients = Array.isArray(clients)
  //   ? clients.filter((client) => client?.status === "pending request")
  //   : [];

  useEffect(() => {
    fetchClients({ status });
  }, [status, fetchClients, location]);
  const confirmRequest = (id, buttonClicked) => {
    navigate(`/image/${id}`, {
      state: {
        backgroundLocation: location,
        from: "requestPage",
        buttonClicked: buttonClicked,
      },
    });
  };
  return (
    <Box p={"4"}>
      <Grid templateColumns={"repeat(5, 1fr)"} gap={"2"}>
        {clients.length > 0 ? (
          clients.map((client) =>
            client?._id ? (
              <RequestCard
                key={client._id}
                client={client}
                page={"current"}
                confirmRequest={confirmRequest}
              />
            ) : null
          )
        ) : (
          <Text color={"pink.400"}>No clients in the list yet</Text>
        )}
      </Grid>
    </Box>
  );
};
export default RequestList;
