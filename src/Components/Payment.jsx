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
  FormControl,
  FormLabel,
  Spinner,
  useToast,
  Stack,
  InputLeftAddon,
  InputGroup,
  Spacer,
  Image,
  Select,
  Checkbox,
  FormHelperText,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { MdPayment } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import { IoMdPerson } from "react-icons/io";
import { AiFillCreditCard } from "react-icons/ai";
import { Card } from "./HotelCard";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartState } from "../Context/FavContext";

function Payment() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const BoxShadow = "base";
  const [isLoading, setIsLoading] = useState(true);
  const [hotelData, setHotelData] = useState({});
  const [payData, setPayData] = useState({});
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

  const toast = useToast();
  var months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d1 = stayData.checkin.split("-");
  const d2 = stayData.checkout.split("-");
  const date1 = d1[2];
  const date2 = d2[2];
  const m1 = months[d1[1] - 1];
  const m2 = months[d2[1] - 1];
  const y1 = d1[0];
  const y2 = d2[0];
  const pd = date1 == 1 ? 30 : date1 - 1;
  const pm = date1 == 1 ? months[d1[1] - 2] : m1;
  const c1 = +date2 - +date1;
  let c2 = 30 - +date1 + +date2;
  for (let i = 1; i < d2[1] - d1[1]; i++) {
    if (d2[1] - d1[1] > 1) {
      c2 += 30;
    }
  }
  const nights = d1[1] == d2[1] ? c1 : c2;
  const totalPrice = nights * data[0].offerPrice + 1200;
  const initialPayData = {
    userName: userData.firstName + " " + userData.lastName,
    contact: "",
    cardName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    securityCode: "",
    panNumber: "",
    otp: "",
    rooms: stayData.room,
    nights: nights,
    totalPrice: totalPrice,
    checkIn: date1 + " " + m1 + " " + y1,
    checkout: date2 + " " + m2 + " " + y2,
    hotelName: data[0].hotelName,
    place: stayData.city,
  };
  console.log(payData);
  useEffect(() => {
    setHotelData(data[0]);
    setPayData(initialPayData);
  }, []);
  const handleChange = (e) => {
    setPayData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleOtp = (e) => {
    toast({
      title: "Your OTP is 0931",
      description: "We've booked your room for you.",
      status: "success",
      duration: 4000,
      isClosable: true,
      position: "top",
    });
  };
  const handlePayment = (e) => {
    if (payData.otp == "0931") {
      toast({
        title: "Payment Successful",
        description: "We've booked your room for you.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("payData", JSON.stringify(payData));
      onClose();
    } else {
      toast({
        title: "Payment failed",
        description: "Otp is incorrect.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };
  const handleSubmit = (e) => {
    if (
      payData.contact == "" ||
      payData.cardName == "" ||
      payData.cardNumber == "" ||
      payData.expiryMonth == "" ||
      payData.expiryYear == "" ||
      payData.securityCode == "" ||
      payData.panNumber == ""
    ) {
      toast({
        title: "Please enter all the details !",

        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: "Your OTP is 0931",
        description: "We've booked your room for you.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      onOpen();
    }
  };
  console.log(payData);
  const TextWithIcon = ({ logo, heading, para }) => {
    return (
      <Flex gap={1} p="10px" direction="row" flexWrap="wrap">
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
        <Box bgColor="#f7f9fb" w="100%" pb="5">
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
                heading={`Free cancellation before Thu, ${pd} ${pm}, 19:00 (property local time)`}
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
          <Stack maxW="container.lg" m="auto" mt="20px" pb={2} direction="row">
            <Box width="65%" bgColor="white" boxShadow="lg" p={3}>
              <Flex gap={4} align="center">
                <Box>
                  <Icon color="black" as={IoMdPerson} w="6" h="6" />
                </Box>
                <Box verticalAlign={"middle"}>
                  <Text fontSize="md">
                    Room {stayData.room} : {stayData.children} Childeren ,
                    {stayData.adult} Adult
                  </Text>
                </Box>
              </Flex>
              <Flex
                direction={{ base: "column", md: "row" }}
                p={3}
                gap={3}
                align="center"
              >
                <Flex
                  verticalAlign={"middle"}
                  gap={1}
                  justify="center"
                  align="center"
                >
                  <Box>
                    <Icon color="green" as={ImCheckmark} w="4" h="4" />
                  </Box>
                  <Box verticalAlign={"middle"}>
                    <Text color="green" fontSize="md">
                      Breakfast included
                    </Text>
                  </Box>
                </Flex>
                <Flex
                  verticalAlign={"middle"}
                  gap={1}
                  justify="center"
                  align="center"
                >
                  <Box>
                    <Icon color="green" as={ImCheckmark} w="4" h="4" />
                  </Box>
                  <Box verticalAlign={"middle"}>
                    <Text color="green" fontSize="md">
                      Free Parking
                    </Text>
                  </Box>
                </Flex>
                <Flex
                  verticalAlign={"middle"}
                  gap={1}
                  justify="center"
                  align="center"
                >
                  <Box>
                    <Icon color="green" as={ImCheckmark} w="4" h="4" />
                  </Box>
                  <Box verticalAlign={"middle"}>
                    <Text color="green" fontSize="md">
                      Free WiFi
                    </Text>
                  </Box>
                </Flex>
              </Flex>
              <FormControl borderRadius="lg" p={"3"} cursor="pointer">
                <FormLabel htmlFor="firstName">Traveller Name</FormLabel>
                <Input
                  mt="1"
                  mb="3"
                  type="text"
                  value={userData.firstName + " " + userData.lastName}
                />
                <Flex
                  direction={{ base: "column", md: "row" }}
                  gap="20px"
                  m="10px 0"
                >
                  <Flex direction="column">
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <Input
                      mt="1"
                      mb="3"
                      type="text"
                      value={userData.firstName}
                    />
                  </Flex>
                  <Flex direction="column">
                    <FormLabel htmlFor="firstName">Last Name</FormLabel>
                    <Input
                      mt="1"
                      mb="3"
                      type="text"
                      value={userData.lastName}
                    />
                  </Flex>
                </Flex>
                <FormLabel htmlFor="firstName">Contact Number</FormLabel>
                <InputGroup mt="1" mb="3" direction="column">
                  <InputLeftAddon children="+91" />
                  <Input
                    name="contact"
                    value={payData.contact}
                    onChange={handleChange}
                    type="number"
                    placeholder="Phone number"
                  />
                </InputGroup>
              </FormControl>
            </Box>

            <Box width="35%" bgColor="white" boxShadow="lg">
              <Heading size="md" boxShadow="base" p="3">
                Price Details
              </Heading>
              <Flex w="full" p="3">
                <Text>Checkin -</Text>
                <Spacer></Spacer>
                <Text>
                  {date1} {m1} {y1}
                </Text>
              </Flex>
              <Flex w="full" p="3">
                <Text>Checkout -</Text>
                <Spacer></Spacer>
                <Text>
                  {date2} {m2} {y2}
                </Text>
              </Flex>
              <Flex w="full" p="3">
                <Text>
                  {stayData.room} {stayData.room > 1 ? "Rooms" : "Room"} x{" "}
                  {nights} {nights > 1 ? "Nights" : "Night"}
                </Text>
                <Spacer></Spacer>
                <Text>₹ {nights * hotelData.offerPrice}</Text>
              </Flex>
              <Flex w="full" p="3" boxShadow="base">
                <Text>Taxes and service fees </Text>
                <Spacer></Spacer>
                <Text>₹ 1299</Text>
              </Flex>
              <Flex w="full" p="4">
                <Heading size="sm">Total</Heading>
                <Spacer></Spacer>
                <Text>₹ {totalPrice}</Text>
              </Flex>
              <Text pr="4" pl="4" pb="4" color="blue.500" size="sm">
                Use a coupon, credit, or promotion code
              </Text>
              <Text pr="4" pl="4" pb="4" fontSize="xs">
                Trip total includes GST that Expedia pays to its vendors (e.g.
                Hotels). We retain our service fee for facilitating your travel
                reservation. For details please see our terms of use.
              </Text>
            </Box>
          </Stack>
          <Stack maxW="container.lg" m="auto" mt="20px" pb={2} direction="row">
            <Box width="50%" bgColor="white" boxShadow="lg" p={3}>
              <Flex gap={4} align="center">
                <Box>
                  <Icon color="black" as={AiFillCreditCard} w="6" h="6" />
                </Box>
                <Box verticalAlign={"middle"}>
                  <Text fontSize="md">Debit / Credit Card Details</Text>
                </Box>
              </Flex>
              <Flex
                direction={{ base: "column", md: "row" }}
                p={3}
                gap={3}
                align="center"
              >
                <Flex
                  verticalAlign={"middle"}
                  gap={1}
                  justify="center"
                  align="center"
                >
                  <Box>
                    <Icon color="green" as={ImCheckmark} w="4" h="4" />
                  </Box>
                  <Box verticalAlign={"middle"}>
                    <Text color="green" fontSize="sm">
                      We protect your personal information
                    </Text>
                  </Box>
                </Flex>
                <Flex
                  verticalAlign={"middle"}
                  gap={1}
                  justify="center"
                  align="center"
                >
                  <Box>
                    <Icon color="green" as={ImCheckmark} w="4" h="4" />
                  </Box>
                  <Box verticalAlign={"middle"}>
                    <Text color="green" fontSize="sm">
                      We use secure transmission
                    </Text>
                  </Box>
                </Flex>
              </Flex>
              <Box p="3">
                <Image
                  w="25%"
                  src="https://www.nicepng.com/png/detail/5-50082_free-credit-card-visa-and-master-card-png.png"
                  alt="Dan Abramov"
                />
              </Box>
              <FormControl borderRadius="lg" p={"3"} cursor="pointer">
                <FormLabel>Name on card</FormLabel>
                <Input
                  name="cardName"
                  value={payData.cardName}
                  onChange={handleChange}
                  type="text"
                  mt="1"
                  mb="3"
                />
                <FormLabel>Debit / Credit Card number</FormLabel>
                <Input
                  name="cardNumber"
                  value={payData.cardNumber}
                  onChange={handleChange}
                  type="text"
                  mt="1"
                  mb="3"
                />
                <FormLabel>Expiry Date</FormLabel>
                <Flex
                  direction={{ base: "column", md: "row" }}
                  gap="20px"
                  m="10px 0"
                >
                  <Select
                    placeholder="Month"
                    mt="1"
                    mb="3"
                    name="expiryMonth"
                    value={payData.expiryMonth}
                    onChange={handleChange}
                  >
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </Select>
                  <Select
                    name="expiryYear"
                    value={payData.expiryYear}
                    onChange={handleChange}
                    placeholder="Year"
                    mt="1"
                    mb="3"
                  >
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                    <option value="2031">2031</option>
                    <option value="2032">2032</option>
                    <option value="2033">2033</option>
                    <option value="2034">2034</option>
                  </Select>
                </Flex>
                <Flex
                  direction={{ base: "column", md: "row" }}
                  gap="20px"
                  m="10px 0"
                >
                  <Flex direction="column">
                    <FormLabel>Security Code</FormLabel>
                    <Input
                      name="securityCode"
                      value={payData.securityCode}
                      onChange={handleChange}
                      type="text"
                      placeholder="C V V"
                      mt="1"
                      mb="3"
                    />
                  </Flex>
                  <Flex direction="column">
                    <FormLabel>PAN Number</FormLabel>
                    <Input
                      name="panNumber"
                      value={payData.panNumber}
                      onChange={handleChange}
                      type="text"
                      mt="1"
                      mb="3"
                    />
                  </Flex>
                </Flex>
              </FormControl>
            </Box>
            <Box width="50%" bgColor="white" boxShadow="lg" p={2}>
              <Heading size="md" boxShadow="base" p="3">
                Manage your bookings
              </Heading>
              <Heading p="3" size="sm">
                Confirmation email
              </Heading>
              <Text pr="3" pl="3" pb="3" fontSize="xs">
                Please enter the email address where you would like to receive
                your confirmation.
              </Text>
              <FormControl p="3">
                <FormLabel>Email Adress</FormLabel>
                <Input type="text" mt="1" value={userData.email} />
              </FormControl>
              <Checkbox p="3" defaultChecked>
                Please send me Expedia emails with travel deals, special offers
                and other information.
              </Checkbox>
              <FormControl p="3">
                <FormLabel>Create password</FormLabel>
                <Input type="text" mt="1" />
                <FormLabel>Confirm Password</FormLabel>
                <Input type="text" mt="1" />
              </FormControl>
              <Text pr="3" pl="3" pb="3" fontSize="sm">
                By creating an account, I agree to the Terms of Use opens in a
                new window, Privacy Policy opens in a new window, and Expedia
                Rewards Terms and Conditions.
              </Text>
            </Box>
          </Stack>

          <Flex
            direction="column"
            gap="5"
            maxW="container.lg"
            m="auto"
            bg="white"
            p="5"
            mt="5"
            pb="5"
            mb="5"
            boxShadow="lg"
          >
            <Heading as="h4" size="md">
              Important information about your booking
            </Heading>

            <UnorderedList fontSize="sm">
              <ListItem>
                This rate is non-refundable. If you change or cancel your
                booking you will not get a refund or credit to use for a future
                stay. This policy will apply regardless of COVID-19, subject to
                any local consumer laws.
              </ListItem>
              <ListItem>
                No refunds will be issued for late check-in or early check-out.
              </ListItem>
              <ListItem>Stay extensions require a new reservation.</ListItem>
              <ListItem>
                This property offers transfers from the airport (surcharges may
                apply). Guests must contact the property with arrival details
                before travel, using the contact information on the booking
                confirmation. Front desk staff will greet guests on arrival.
              </ListItem>
              <ListItem>
                Please note that BEX Travel Asia Pte Ltd and the hotel will not
                issue a tax invoice. You will receive a commercial receipt for
                the purpose of the transaction.
              </ListItem>
            </UnorderedList>
            <Text fontSize="sm">
              By clicking on the button below, I acknowledge that I have
              reviewed the Privacy Statement Opens in a new window. and
              Government Travel Advice Opens in a new window. and have reviewed
              and accept the Rules & Restrictions Opens in a new window. and
              Terms of Use Opens in a new window..
            </Text>
            <>
              <Button colorScheme="yellow" onClick={handleSubmit}>
                Confirm Payment
              </Button>

              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Confirm Payment
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>
                    <FormControl p={5}>
                      <FormLabel>Enter OTP</FormLabel>
                      <Input
                        name="otp"
                        value={payData.otp}
                        type="text"
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        Never share your OTP with anyone.
                      </FormHelperText>
                    </FormControl>
                    <AlertDialogFooter>
                      <Button colorScheme="yellow" onClick={handleOtp} mr={3}>
                        Send OTP again
                      </Button>
                      <Button
                        colorScheme="red"
                        ref={cancelRef}
                        onClick={onClose}
                      >
                        Cancel
                      </Button>
                      <Button
                        colorScheme="green"
                        onClick={handlePayment}
                        ml={3}
                      >
                        Process
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </>
          </Flex>
        </Box>
      )}
    </>
  );
}

export default Payment;
