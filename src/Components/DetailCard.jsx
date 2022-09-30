import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaSpa, FaSnowflake, FaBusinessTime } from "react-icons/fa";
import { RiParkingFill } from "react-icons/ri";
import { Carousel } from "react-responsive-carousel";
import { CgGym } from "react-icons/cg";
import { useContext } from "react";
import {
  MdLocationOn,
  MdOutlinePets,
  MdWifi,
  MdPool,
  MdCleaningServices,
  MdCleanHands,
  MdAccessTime,
  MdOutlineRestaurantMenu,
  MdFreeBreakfast,
  MdLocalBar,
  MdOutlineRoomService,
  MdOutlineLocalLaundryService,
  MdHotTub,
} from "react-icons/md";
import {
  Container,
  Box,
  Image,
  Flex,
  Heading,
  Text,
  AspectRatio,
  useMediaQuery,
  Button,
  Spinner,
  useToast,
  Spacer,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import IconWithText from "./IconWithText";
import { CartState } from "../Context/FavContext";
import { AuthContext } from "../Context/AuthContext";
const amenitiesLeft = [
  {
    img: MdPool,
    text: "Pool",
  },
  {
    img: MdWifi,
    text: "Free WiFi",
  },
  {
    img: RiParkingFill,
    text: "Parking included",
  },
  {
    img: MdOutlineRestaurantMenu,
    text: "Restaurant",
  },
  {
    img: MdFreeBreakfast,
    text: "Breakfast available",
  },
  {
    img: MdLocalBar,
    text: "Bar",
  },
  {
    img: MdOutlineRoomService,
    text: "Room service",
  },
];
const amenitiesRight = [
  {
    img: MdOutlinePets,
    text: "Pet-friendly",
  },
  {
    img: FaSnowflake,
    text: "Air conditioning",
  },
  {
    img: FaSpa,
    text: "Spa",
  },
  {
    img: CgGym,
    text: "Gym",
  },
  {
    img: FaBusinessTime,
    text: "Business services",
  },
  {
    img: MdOutlineLocalLaundryService,
    text: "Laundry",
  },
  {
    img: MdHotTub,
    text: "Hot tub",
  },
];

const cleaningAndSafetyPracticesLeft = [
  {
    img: MdCleaningServices,
    text: "Cleaned with disinfectant",
  },
  {
    img: MdOutlineRoomService,
    text: "Contactless check-in",
  },
];

const cleaningAndSafetyPracticesRight = [
  {
    img: MdCleanHands,
    text: "Hand sanitiser provided",
  },
  {
    img: MdAccessTime,
    text: "24-hour vacancy between guest room stays",
  },
];
function DetailCard() {
  const [isLargerThan768] = useMediaQuery("(min-width: 769px)");
  const [isLoading, setIsLoading] = useState(true);
  const [hotelData, setHotelData] = useState({
    images: [],
  });
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  const { id } = useParams();
  const toast = useToast();
  const Navigate = useNavigate();
  const {
    state: { products },
  } = useContext(CartState);
  console.log(products);
  const { isAuth } = useContext(AuthContext);
  console.log(isAuth);
  let data = products.filter((e) => {
    if (e.id == id) {
      return e;
    }
  });
  console.log(data[0]);
  useEffect(() => {
    setHotelData(data[0]);
  }, []);
  const handleReserve = () => {
    {
      isAuth
        ? Navigate(`/payment/${id}`)
        : toast({
            title: "Please Login !!!",
            status: "info",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
    }
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
        <Box w="100%" boxShadow="base" pt={4} pb={10}>
          {hotelData.images.length > 0 ? (
            <Container maxW="container.xl">
              <Box
                borderRadius="10px"
                display="flex"
                bg="gray.100"
                p={5}
                pl={isLargerThan768 ? 60 : 30}
                pr={isLargerThan768 ? 60 : 30}
                align="center"
                justify="center"
              >
                <Carousel
                  autoPlay="true"
                  infiniteLoop="true"
                  showThumbs={false}
                  width="80%"
                >
                  {hotelData.images.map((e, i) => (
                    <Image
                      key={i}
                      boxShadow="md"
                      borderRadius="lg"
                      overflow="hidden"
                      src={e}
                    />
                  ))}
                </Carousel>
              </Box>
              <Flex
                borderRadius="10px"
                bg="gray.100"
                w="100%"
                gap={1}
                textAlign="left"
                mt="25px"
                direction={isLargerThan768 ? "row" : "column"}
                justify="center"
                align="center"
                p={2}
              >
                <Box w={isLargerThan768 ? "60%" : "90%"} p="3">
                  <Heading as="h3" size="lg" mt="10px">
                    {hotelData.hotelName}
                  </Heading>
                  <Box mb="10px">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < hotelData.rating ? "teal.500" : "gray.300"}
                        />
                      ))}
                  </Box>

                  <Heading as="h4" size="md" mt="20px">
                    {hotelData.rating}/5 {hotelData.review}
                  </Heading>
                  <Text fontSize="lg" mt="5px" mb="10px">
                    Guests rated this property {hotelData.rating}/5 for
                    cleanliness.
                  </Text>
                  <Heading as="h4" size="md" mt="20px" mb="10px">
                    Popular amenities
                  </Heading>
                  <Flex justify="left">
                    <Box w="50%">
                      {amenitiesLeft.map((e, i) => (
                        <IconWithText key={i} img={e.img} text={e.text} />
                      ))}
                    </Box>
                    <Box w="50%">
                      {amenitiesRight.map((e, i) => (
                        <IconWithText key={i} img={e.img} text={e.text} />
                      ))}
                    </Box>
                  </Flex>
                  <Heading as="h4" size="md" mt="20px" mb="10px">
                    Cleaning and safety practices
                  </Heading>
                  <Flex justify="left">
                    <Box w="50%">
                      {cleaningAndSafetyPracticesLeft.map((e, i) => (
                        <IconWithText key={i} img={e.img} text={e.text} />
                      ))}
                    </Box>
                    <Box w="50%">
                      {cleaningAndSafetyPracticesRight.map((e, i) => (
                        <IconWithText key={i} img={e.img} text={e.text} />
                      ))}
                    </Box>
                  </Flex>
                </Box>
                <Box w={isLargerThan768 ? "40%" : "90%"}>
                  <Box p={3}>
                    <Button w="100%" colorScheme="blue" onClick={handleReserve}>
                      Reserve
                    </Button>
                  </Box>
                  <Box p="3">
                    <AspectRatio
                      boxShadow="md"
                      ratio={16 / 9}
                      borderRadius="lg"
                      overflow="hidden"
                    >
                      <iframe
                        title={hotelData.hotelName}
                        src={hotelData.location}
                        alt="demo"
                      />
                    </AspectRatio>
                    <Text fontSize="lg" mt="5px" mb="10px">
                      {hotelData.hotelName}
                    </Text>
                  </Box>
                  <Heading p="3" as="h4" size="md">
                    Explore the area
                  </Heading>
                  <Box p="3">
                    {hotelData.exploreArea.map((e, i) => (
                      <IconWithText
                        key={i}
                        img={MdLocationOn}
                        text={e.locationName}
                        distnace={e.distance}
                        w1={"10%"}
                        w2={"60%"}
                        w3={"30%"}
                      />
                    ))}
                  </Box>
                </Box>
              </Flex>
            </Container>
          ) : (
            <Flex justify="center" mt={"5"}>
              <Spinner
                thickness="5px"
                speed="0.65s"
                emptyColor="gray.200"
                color="#3182ce"
                size="lg"
              />
            </Flex>
          )}
        </Box>
      )}
    </>
  );
}

export default DetailCard;
