import React, { useEffect, useState } from "react";
import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  Flex,
  Heading,
  useMediaQuery,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
function SignIn() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { SignIn } = useContext(AuthContext);
  const Navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const [isLargerThan992] = useMediaQuery("(min-width: 992px)");
  const onChangeInput = (e) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    var a = JSON.parse(localStorage.getItem("Users") || "[]");
    var login = false;
    let loogedInUserName = null;
    a.forEach((elem) => {
      if (elem.email == userData.email && elem.password == userData.password) {
        login = true;
        loogedInUserName = elem;
        return;
      } else {
        login = false;
      }
    });
    if (login) {
      localStorage.setItem("loginUser", JSON.stringify(loogedInUserName));
      SignIn();
      setTimeout(() => {
        Navigate("/");
      }, 2000);
      toast({
        title: "Login Successfull !!!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setUserData({
        email: "",
        password: "",
      });
    } else {
      toast({
        title: "Login Failed !!!",
        status: "error",
        duration: 1500,
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
        <Flex
          justify="center"
          align="center"
          direction="column"
          textAlign="center"
          pb={10}
          boxShadow="base"
        >
          <Heading mt="10" as="h2" size="lg">
            Sign In
          </Heading>
          <FormControl
            w={isLargerThan992 ? "30%" : "70%"}
            borderRadius="lg"
            boxShadow="lg"
            p={"3"}
            cursor="pointer"
            mt={5}
          >
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              value={userData.email}
              type="email"
              id="email"
              onChange={(e) => {
                onChangeInput(e);
              }}
              placeholder="enter email"
            />
            <FormHelperText>We'll never share your email.</FormHelperText>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              value={userData.password}
              id="password"
              onChange={(e) => {
                onChangeInput(e);
              }}
              type="password"
              placeholder="enter password"
            />
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

export default SignIn;
