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
    // <div
    //   key={item._id}
    //   className={` w-full aspect-auto bg-white shadow-md rounded-lg overflow-hidden pb-2 ${className}`}
    // >
    //   {/* Top pink design line */}
    //   <div className="w-full h-2 bg-pink-400 " />

    //   {/* Content */}
    //   <div className="lg:relative  group  h-full w-full flex flex-col   overflow-y-auto">
    //     {item.image && (
    //       <img
    //         src={item.image}
    //         alt={item.productName}
    //         className="w-full h-3/4 object-cover mb-2  lg:pointer-events-none"
    //         onClick={(e) => viewDetails(e, item.id, item)}
    //       />
    //     )}

    //     <div className="p-2">
    //       <div className="flex justify-between">
    //         {item.productName && (
    //           <span className="font-bold text-lg "> {item.productName}</span>
    //         )}

    //         {item.price && <span className="text-sm">{item.price} </span>}
    //       </div>
    //       <Popover
    //         isOpen={isPopoverOpen}
    //         positions={["right", "left"]}
    //         align="center"
    //         onClickOutside={() => setIsPopoverOpen(false)}
    //         content={
    //           <div className="bg-white border-2 z-50 ">
    //             <div className="border-b-2 bg-pink-400 p-2">
    //               Rented dates for {item.productName}
    //             </div>
    //             <div className="p-2">
    //               {" "}
    //               {formattedReservationDates &&
    //               formattedReservationDates.length > 0 ? (
    //                 formattedReservationDates.map((date, index) => (
    //                   <p>
    //                     ➤{date} - {formattedReturnDates[index]}
    //                   </p>
    //                 ))
    //               ) : (
    //                 <p>No rented date for this item yet</p>
    //               )}
    //             </div>
    //           </div>
    //         }
    //       >
    //         <p className="text-gray-400 italic">
    //           See unavailable dates:{""}
    //           <FaClipboardList
    //             onClick={() => setIsPopoverOpen(!isPopoverOpen)}
    //             className="inline"
    //           />
    //         </p>
    //       </Popover>
    //     </div>
    //   </div>
    // </div>
  );
};
export default ProductCard;
