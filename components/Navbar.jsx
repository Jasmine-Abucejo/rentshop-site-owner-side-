import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Box, Container, Flex, Text, Icon } from "@chakra-ui/react";

const Navbar = () => {
  const location = useLocation();
  return (
    <Container
      maxW={"100vw"}
      p={"4"}
      borderWidth={"2"}
      backgroundColor={"pink.300"}
      position={"sticky"}
      top={"0"}
      zIndex={"50"}
    >
      <Flex gap={"4"} justifyContent={"space-between"}>
        <Link to={"/"}>
          <Box
            p={"2"}
            borderRadius={"50px"}
            boxShadow={"lg"}
            bgColor={location.pathname === "/" ? "pink.500" : "pink.300"}
            flex={"1"}
          >
            <Text>
              Current Requests{" "}
              <Text as={"span"} fontSize={"22"}>
                📋
              </Text>
            </Text>
          </Box>
        </Link>
        <Link to={"/confirmed-list"}>
          <Box
            p={"2"}
            borderRadius={"50px"}
            boxShadow={"lg"}
            bgColor={
              location.pathname === "/confirmed-list" ? "pink.500" : "pink.300"
            }
            flex={"1"}
          >
            <Text>
              Confirmed Requests{" "}
              <Text as={"span"} fontSize={"22"}>
                ✅
              </Text>
            </Text>
          </Box>
        </Link>
        <Link to={"/declined-list"}>
          <Box
            p={"2"}
            borderRadius={"50px"}
            boxShadow={"lg"}
            bgColor={
              location.pathname === "/declined-list" ? "pink.500" : "pink.300"
            }
            flex={"1"}
          >
            <Text>
              Declined Requests
              <Text as={"span"} fontSize={"22"}>
                ❌
              </Text>
            </Text>
          </Box>
        </Link>
        <Link to={"/products"}>
          <Box
            p={"2"}
            borderRadius={"50px"}
            boxShadow={"lg"}
            bgColor={
              location.pathname === "/products" ? "pink.500" : "pink.300"
            }
            flex={"1"}
          >
            <Text>
              All Products{" "}
              <Text as={"span"} fontSize={"22"}>
                🛒
              </Text>
            </Text>
          </Box>
        </Link>
        <Link to={"/history"}>
          <Box
            p={"2"}
            borderRadius={"50px"}
            boxShadow={"lg"}
            bgColor={location.pathname === "/history" ? "pink.500" : "pink.300"}
            flex={"1"}
          >
            <Text>
              Full History{" "}
              <Text as={"span"} fontSize={"22"}>
                📜
              </Text>
            </Text>
          </Box>
        </Link>
      </Flex>
    </Container>
  );
};

export default Navbar;
