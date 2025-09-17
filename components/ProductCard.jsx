import { Popover } from "react-tiny-popover";
import { FaClipboardList } from "react-icons/fa";
import { useState } from "react";
import { Box, Image, Text, HStack, Button } from "@chakra-ui/react";

const ProductCard = ({ viewDetails, item, className = "" }) => {
  const reservationDates = item.reservationDates;
  const returnDates = item.returnDates;
  // console.log(returnDates);
  const formatDate = (dateObj) => {
    // Ensure it's a Date object
    const date = new Date(dateObj);

    // Get ISO string: "2025-07-30T00:00:00.000Z"
    // Split at "T" → take only the first part
    return date.toISOString().split("T")[0];
  };
  const formattedReturnDates = returnDates.map((dateObj) =>
    formatDate(dateObj)
  );
  const formattedReservationDates = reservationDates.map((dateObj) =>
    formatDate(dateObj)
  );
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Box borderWidth={"2px"} borderColor={"pink.400"}>
      <Image src={item.image} minHeight={"70%"} width={"100%"} />
      <Box margin={"2"}>
        <HStack justifyContent={"space-between"}>
          <Text fontWeight={"bold"} color={"white"}>
            {item.productName}
          </Text>
          <Text fontWeight={"normal"} color={"white"} fontStyle={"italic"}>
            {item.price}
          </Text>
        </HStack>
        <HStack justifyContent={"space-between"}>
          <Text fontWeight={"normal"} color={"white"} fontStyle={"italic"}>
            Color:{" "}
            <Text
              as={"span"}
              fontWeight={"bold"}
              color={"white"}
              fontStyle={"normal"}
            >
              {item.color}
            </Text>
          </Text>
          <Text fontWeight={"bold"} color={"white"}>
            {item.size}
          </Text>
        </HStack>

        <Text fontWeight={"normal"} color={"white"} fontStyle={"italic"}>
          Material:{" "}
          <Text
            as={"span"}
            fontWeight={"bold"}
            color={"white"}
            fontStyle={"normal"}
          >
            {item.material}
          </Text>
        </Text>
        <Popover
          isOpen={isPopoverOpen}
          positions={["right", "left"]}
          align="center"
          onClickOutside={() => setIsPopoverOpen(false)}
          content={
            <Box bg={"white"}>
              <Box bg={"pink.400"} p={"2"}>
                <Text>Rented dates for {item.productName}</Text>
              </Box>
              <Box p={"2"}>
                {" "}
                {formattedReservationDates &&
                formattedReservationDates.length > 0 ? (
                  formattedReservationDates.map((date, index) => (
                    <Text>
                      ➤{date} - {formattedReturnDates[index]}
                    </Text>
                  ))
                ) : (
                  <Text>No rented date for this item yet</Text>
                )}
              </Box>
            </Box>
          }
        >
          <Text color={"white"} fontStyle={"italic"}>
            See unavailable dates:{""}
            <Text
              as={"span"}
              cursor="pointer"
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            >
              🗓️
            </Text>
          </Text>
        </Popover>
      </Box>
    </Box>
  );
};
export default ProductCard;
