import React, { useEffect } from "react";
import { Text, Box, Grid } from "@chakra-ui/react";
import RequestCard from "../components/RequestCard";
import { useProductStore } from "../store/productStore";
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmedList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const clients = useProductStore((state) => state.clients);
  const fetchClients = useProductStore((state) => state.fetchClients);

  const confirmedClients = Array.isArray(clients)
    ? clients.filter(
        (client) => client?.status === "confirmed" && !client?.returned
      )
    : [];
  const returnProduct = (id) => {
    navigate(`/image/${id}`, {
      state: { backgroundLocation: location, from: "confirmPage" },
    });
  };
  // const [returnee, setReturnee] = useState({
  //   _id: id,
  //   firstName: "",
  //   lastName: "",
  //   mobile: "",
  //   dateNeeded: "",
  //   status: "",
  //   returnDate: "",
  //   products: "",
  //   returned: true,
  // });
  // const clientReturn = async () => {

  // }
  useEffect(() => {
    fetchClients();
  }, [fetchClients]);
  return (
    <Box p={"4"}>
      <Grid templateColumns={"repeat(4, 1fr)"}>
        {confirmedClients.length > 0 ? (
          confirmedClients.map((client) =>
            client?._id ? (
              <RequestCard
                key={client._id}
                client={client}
                page={"confirm"}
                confirmRequest={returnProduct}
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

export default ConfirmedList;
