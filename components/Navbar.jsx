import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Flex, Text, Icon } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Container
      maxW={"100vw"}
      p={"4"}
      borderWidth={"2"}
      backgroundColor={"pink.300"}
    >
      <Flex gap={"4"} justifyContent={"space-between"}>
        <Link to={"/"}>
          <Text>
            Current Requests{" "}
            <Text as={"span"} fontSize={"22"}>
              📋
            </Text>
          </Text>
        </Link>
        <Link to={"/confirmed-list"}>
          <Text>
            Confirmed Requests{" "}
            <Text as={"span"} fontSize={"22"}>
              ✅
            </Text>
          </Text>
        </Link>
        <Link to={"/declined-list"}>
          <Text>
            Declined Requests
            <Text as={"span"} fontSize={"22"}>
              ❌
            </Text>
          </Text>
        </Link>
      </Flex>
    </Container>
  );
};

export default Navbar;
