import React, { useState, useEffect } from "react";
import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  Flex,
  Heading,
  useMediaQuery,
  Select,
  useToast,
  Spinner,
} from "@chakra-ui/react";

function ProfileEdit() {
  const [isLoading, setIsLoading] = useState(false);
  var currentUserData = JSON.parse(localStorage.getItem("loginUser"));
  const BoxShadow = "base";
  const [userData, setUserData] = useState({
    password: currentUserData.password,
    gender: "select a gender",
    contact: "",
    email: currentUserData.email,
    firstName: currentUserData.firstName,
    lastName: currentUserData.lastName,
  });
  const toast = useToast();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    if (currentUserData.password !== "")
      setUserData({
        password: currentUserData.password,
        gender: currentUserData.gender,
        contact: currentUserData.contact,
        email: currentUserData.email,
        firstName: currentUserData.firstName,
        lastName: currentUserData.lastName,
      });
  }, []);

  const [isLargerThan992] = useMediaQuery("(min-width: 992px)");

  const onChangeInput = (e) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    localStorage.setItem("loginUser", JSON.stringify(userData));
    toast({
      title: "Profile Updated !!!",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
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
        <Flex
          justify="center"
          align="center"
          direction="column"
          textAlign="center"
        >
          <Heading mt="10" as="h2" size="lg">
            Profile Edit
          </Heading>
          <FormControl
            w={isLargerThan992 ? "30%" : "70%"}
            borderRadius="lg"
            boxShadow={BoxShadow}
            p={"3"}
            cursor="pointer"
            mt={5}
          >
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <Input
              mb={3}
              value={userData.firstName}
              type="text"
              id="firstName"
              onChange={(e) => {
                onChangeInput(e);
              }}
              placeholder="Enter a first name"
            />
            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <Input
              mb={3}
              value={userData.lastName}
              type="text"
              id="lastName"
              onChange={(e) => {
                onChangeInput(e);
              }}
              placeholder="enter lastname"
            />
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              mb={3}
              value={userData.email}
              type="email"
              id="email"
              onChange={(e) => {
                onChangeInput(e);
              }}
              placeholder="enter email"
            />

            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              mb={3}
              value={userData.password}
              type="text"
              id="password"
              onChange={(e) => {
                onChangeInput(e);
              }}
            />
            <FormLabel htmlFor="contact">Contact</FormLabel>
            <Input
            mb={3}
              value={userData.contact}
              type="number"
              id="contact"
              onChange={(e) => {
                onChangeInput(e);
              }}
            />
            <FormLabel htmlFor="gender">Gender</FormLabel>
            <Select
              mb={3}
              id="gender"
              onChange={(e) => {
                onChangeInput(e);
              }}
              value={userData.gender}
            >
              <option>select a gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
            <Button
              w="100%"
              mt={4}
              colorScheme="blue"
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Submit
            </Button>
          </FormControl>
        </Flex>
      )}
    </>
  );
}

export default ProfileEdit;
