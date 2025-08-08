import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, Icon } from "@chakra-ui/react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const ModalDetails = () => {
  const navigate = useNavigate();
  const closeModal = () => {
    navigate(-1);
  };
  return (
    <Box
      position={"fixed"}
      top={"0"}
      left={"0"}
      bgColor={"blackAlpha.700"}
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
        position={"absolute"}
        top={"10rem"}
        left={"10rem"}
        fontSize={"4xl"}
        textColor={"pink.400"}
        onClick={() => closeModal()}
      >
        <IoMdCloseCircleOutline />
      </Icon>
      <Box bgColor={"pink.300"} minW={"40%"} border={"2"} display={"flex"}>
        <Text>Confirmation</Text>
      </Box>
    </Box>
  );
};

export default ModalDetails;
