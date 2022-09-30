import React, { useState, useEffect } from "react";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Image,
  Badge,
  Text,
  Heading,
  Spacer,
  Icon,
  useToast,
  Flex,
} from "@chakra-ui/react";
let fav = JSON.parse(localStorage.getItem("fav")) || [];
export const Card = ({ data }) => {
  const [isFav, setIsFav] = useState(false);
  const [colorSet, setColorSet] = useState(false);
  const BoxShadow = "base";
  const toast = useToast();
  const handleIconClick = () => {
    fav.push(data);
    localStorage.setItem("fav", JSON.stringify(fav));
    let heart = document.querySelector(".heart")
    heart.style.backgroundColor="red"
  };
  const {
    id,
    images,
    city,
    refund,
    shortDescription,
    hotelName,
    offerPrice,
    originalPrice,
    paymentMode,
    roomsLeft,
    review,
    rating,
    reviewCount,
  } = data;

  return (
    <Flex
      direction="row"
      w="full"
      h="215px"
      borderWidth="1px"
      borderRadius="lg"
      backgroundColor="white"
      overflow="hidden"
      cursor="pointer"
      boxShadow={BoxShadow}
    >
      <Link to={`/detail-page/${id}`}>
        <Box w="80" h="full" overflow="hidden">
          <Image src={images} w="full" h="full" />
        </Box>
      </Link>
      <Box p="3" w="xl">
        <Link to={`/detail-page/${id}`}>
          <Box
            h="30px"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            fontSize={20}
            display="flex"
            justifyContent="left"
            alignItems="center"
          >
            {hotelName}
          </Box>
        </Link>

        <Flex align="center">
          <Badge
            borderRadius="full"
            colorScheme="blue"
            mt="2"
            mb="2"
            padding="5px 10px"
          >
            {city}
          </Badge>

          <Icon
            as={colorSet ? AiTwotoneHeart : AiOutlineHeart}
            w={6}
            h={6}
            ml="20px"
            overflow="hidden"
            color={colorSet ? "red" : null}
            onClick={handleIconClick}
            className="heart"
          />
        </Flex>
        <Link to={`/detail-page/${id}`}>
          <Box h="20px" d="flex" alignItems="baseline">
            <Spacer />
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              marginLeft="5px"
            >
              <Heading as="h6" size="xs">
                {refund}
              </Heading>
            </Box>
            <Spacer />
            <Box margin="5px 5px" color="gray.600">
              {shortDescription}
            </Box>
            <Flex alignItems="baseline" mt="1" w="full">
              <Box>
                <Box as="span" color="gray.600" margin="0 5px" fontSize="md">
                  {paymentMode}
                </Box>
              </Box>
              <Spacer />
              <Box>
                <Box
                  d="flex"
                  gap={1}
                  alignItems="baseline"
                  as="span"
                  color="gray.600"
                  fontSize="sm"
                >
                  <Heading as="h6" size="md">
                    Rs.{offerPrice} ,{" "}
                    <Text fontSize="sm" as="del">
                      Rs.{originalPrice}
                    </Text>
                  </Heading>
                </Box>
              </Box>
            </Flex>
            <Flex alignItems="baseline" w="full" margin="0 5px">
              <Box d="flex" mt="2" alignItems="center" h="25px">
                <Badge
                  borderRadius="full"
                  px="2"
                  colorScheme="blue"
                  padding="3px 10px"
                >
                  {review}
                </Badge>
              </Box>
              <Spacer />
              <Badge
                borderRadius="full"
                px="2"
                colorScheme="blue"
                padding="3px 10px"
              >
                Rooms Left {roomsLeft}
              </Badge>
              <Spacer />

              <Box d="flex" mt="2" alignItems="center" h="20px">
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      color={i < rating ? "blue.300" : "gray.300"}
                    />
                  ))}
              </Box>
              <Spacer />
              <Box as="span" ml="2" color="blue.400" fontSize="sm" mr="1">
                <Heading as="h6" size="xs">
                  {reviewCount} reviews
                </Heading>
              </Box>
            </Flex>
          </Box>
        </Link>
      </Box>
    </Flex>
  );
};
