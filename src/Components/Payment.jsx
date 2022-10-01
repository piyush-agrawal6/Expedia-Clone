import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Icon,
  Button,
  Input,
  UnorderedList,
  ListItem,
  useMediaQuery,
  FormControl,
  FormLabel,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";
import { MdPayment } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import { TiArrowRightThick } from "react-icons/ti";
import { Card } from "./HotelCard";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartState } from "../Context/FavContext";
function Payment() {
  const BoxShadow = "base";
  const [isLoading, setIsLoading] = useState(true);
  const [hotelData, setHotelData] = useState({});
  const stayData = JSON.parse(localStorage.getItem("staySearch"));
  const userData = JSON.parse(localStorage.getItem("loginUser"));
  const Navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  const {
    state: { products },
  } = useContext(CartState);

  let data = products.filter((e) => {
    if (e.id == id) {
      return e;
    }
  });
  console.log(data[0]);
  useEffect(() => {
    setHotelData(data[0]);
  }, []);
  const [isLargerThan769] = useMediaQuery("(min-width: 769px)");
  const toast = useToast();
  let travellers = stayData.adult + stayData.children;
  let reqRooms;
  if (travellers % 2 === 0) {
    reqRooms = Math.floor(travellers / 2);
  } else {
    reqRooms = Math.ceil(travellers / 2);
  }

  let hp = +hotelData[0]?.offerPrice;
  const d1 = stayData.checkin.split("-")[2];
  const d2 = stayData.checkout.split("-")[2];
  const totalNights = d2 - d1;

  console.log(d1, d2, totalNights, hp);

  let totalFare = totalNights * reqRooms * hp;

  const TextWithIcon = ({ logo, heading, para }) => {
    return (
      <Flex
        gap={1}
        p="10px"
        direction="row"
        flexWrap="wrap"
        justify={isLargerThan769 ? "left" : "center"}
      >
        <Box m="10px" w="20px">
          <Icon as={logo} h="100%" w="100%" />
        </Box>
        <Flex direction="column" gap="10px">
          <Heading as="h5" size="sm">
            {heading}
          </Heading>
          <Text>{para}</Text>
        </Flex>
      </Flex>
    );
  };

  return (
    <>
      {isLoading ? (
        <Flex justify="center" mt={"5"}>
          <Spinner
            thickness="5px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#3182ce"
            size="lg"
          />
        </Flex>
      ) : (
        <Box bgColor="#f7f9fb" w="100%">
          <Container maxW="container.lg">
            <Heading as="h3" size="lg" p={5}>
              Review and book
            </Heading>
            <Box
              mt="10px"
              maxW="container.xl"
              bgColor="white"
              borderRadius="10px"
              boxShadow={BoxShadow}
            >
              <TextWithIcon
                logo={MdPayment}
                heading={
                  "Free cancellation before Thu, 14 Apr, 19:00 (property local time)"
                }
                para={
                  "You can change or cancel this stay for a full refund if plans change. Because flexibility matters."
                }
              />
            </Box>
            <Box
              h="100%"
              w="100%"
              bgColor="white"
              borderRadius="10px"
              boxShadow={BoxShadow}
              mt="20px"
            >
              <TextWithIcon
                logo={FaLock}
                heading={"Signed in as"}
                para={userData.email}
              />
            </Box>
            <Box mt="20px">
              <Card elem={hotelData} mt="20px" />
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
}

export default Payment;
