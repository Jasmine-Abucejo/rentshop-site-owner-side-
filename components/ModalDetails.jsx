import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Box, Text, Icon, Input, Button } from "@chakra-ui/react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useProductStore } from "../store/productStore";

const ModalDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const from = location.state?.from;

  const closeModal = () => {
    navigate(-1);
  };
  const client = useProductStore((state) => state.client);
  const fetchClient = useProductStore((state) => state.fetchClient);
  const confirmClient = useProductStore((state) => state.confirmClient);
  const setProductReservation = useProductStore(
    (state) => state.setProductReservation
  );

  const [returnDate, setReturnDate] = useState(""); // if return date hasn't been set; from request page

  const [updateClient, setUpdateClient] = useState({
    _id: id,
    firstName: "",
    lastName: "",
    mobile: "",
    dateNeeded: "",
    status: "confirmed",
    returnDate: "",
    products: "",
    returned: false,
  });
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (id) {
      fetchClient(id);
    }
  }, [id, fetchClient]);

  useEffect(() => {
    if (client) {
      const firstProduct = client.products[0];

      // Build the updated product with new reservation date
      if (from === "requestPage") {
        const updatedProduct = {
          ...firstProduct,
          reservationDates: [
            ...(firstProduct.reservationDates || []),
            new Date(client.dateNeeded),
          ],
          returnDates: [
            ...(firstProduct.returnDates || []),
            new Date(returnDate),
          ],
        };

        // Update local product state
        setProduct(updatedProduct);

        // Update the client object with updated product array
        setUpdateClient({
          _id: client._id,
          firstName: client.firstName,
          lastName: client.lastName,
          mobile: client.mobile,
          dateNeeded: client.dateNeeded,
          status: "confirmed",
          returnDate: new Date(returnDate),
          products: [updatedProduct], // Now has updated reservationDates
          returned: false,
        });
      } else if (from === "confirmPage") {
        setProduct(firstProduct);
        setUpdateClient({
          _id: client._id,
          firstName: client.firstName,
          lastName: client.lastName,
          mobile: client.mobile,
          dateNeeded: client.dateNeeded,
          status: "confirmed",
          returnDate: client.returnDate,
          products: [firstProduct],
          returned: true,
        });
      }
    }
  }, [client, id, returnDate]);

  const requestDate = new Date(client?.dateNeeded);
  const dateOfReturn = new Date(client?.returnDate); //if return date already set; from confirm page
  const dateSent = new Date(client?.createdAt);
  const formatDate = (dateObj) => {
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      weekday: "long", // Monday
      year: "numeric", // 2020
      month: "long", // August
      day: "numeric", // 11
    });

    return formattedDate;
  };

  const saveConfirmation = async () => {
    if (!updateClient) {
      console.warn("Client data not ready yet.");
      return;
    }

    const { success, message } = await confirmClient(id, updateClient);
    console.log("Confirmation result:", success, message);
    console.log("Data sent:", updateClient);

    if (from === "requestPage") {
      if (!product) {
        console.warn("Product data not ready yet");
        return;
      }

      const productReservationUpdate = await setProductReservation(
        product._id,
        product
      );
      console.log(
        productReservationUpdate.success,
        productReservationUpdate.message
      );
    }
  };

  return (
    <Box
      position={"fixed"}
      top={"0"}
      left={"0"}
      bgColor={"blackAlpha.800"}
      inset={"0"}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={"2rem"}
      zIndex={"100"}
      w={"100vw"}
      h={"100vh"}
    >
      <Icon
        as={IoMdCloseCircleOutline}
        position={"absolute"}
        top={"10rem"}
        left={"10rem"}
        fontSize={"4xl"}
        textColor={"pink.400"}
        onClick={() => closeModal()}
      />
      {client && (
        <Box
          bgColor={"white"}
          minW={"40%"}
          borderWidth={"4px"}
          borderColor={"pink.300"}
          display={"flex"}
          alignItems={"center"}
          textAlign={"center"}
          justifyContent={"center"}
          flexDir={"column"}
          p={"4"}
          gap={"4"}
        >
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Are you sure you want to confirm this reservation?
          </Text>
          <Box
            borderWidth={"4px"}
            borderColor={"pink.300"}
            p={"4"}
            justifyItems={"left"}
          >
            <Text fontWeight={"bold"}>
              Requested Item:{" "}
              <Text as={"span"} fontWeight={"normal"}>
                {product.productName}
              </Text>
            </Text>
            <Text fontWeight={"bold"}>
              Client Name:{" "}
              <Text as={"span"} fontWeight={"normal"}>
                {client?.firstName} {""} {client?.lastName}
              </Text>
            </Text>
            <Text fontWeight={"bold"}>
              Mobile:{" "}
              <Text as={"span"} fontWeight={"normal"}>
                {client?.mobile}
              </Text>
            </Text>
            <Text fontWeight={"bold"}>
              Requested sent on:{" "}
              <Text as={"span"} fontWeight={"normal"}>
                {formatDate(dateSent)}
              </Text>
            </Text>
            <Text fontWeight={"bold"}>
              Requested for:{" "}
              <Text as={"span"} fontWeight={"normal"}>
                {formatDate(requestDate)}
              </Text>
            </Text>
            {from === "requestPage" && (
              <>
                <Text fontWeight={"bold"}>Set Return Date: </Text>
                <Input
                  placeholder="Select Return Date"
                  size="md"
                  type="date"
                  value={returnDate}
                  onChange={(e) => {
                    setUpdateClient({
                      ...updateClient,
                      returnDate: e.target.value,
                    });

                    setReturnDate(e.target.value);
                  }}
                />
              </>
            )}
            {from === "confirmPage" && (
              <>
                <Text fontWeight={"bold"}>
                  Return Date:{" "}
                  <Text as={"span"} fontWeight={"normal"}>
                    {formatDate(dateOfReturn)}
                  </Text>
                </Text>
              </>
            )}

            <Button
              onClick={() => {
                console.log("clicked");
                saveConfirmation();
              }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ModalDetails;
