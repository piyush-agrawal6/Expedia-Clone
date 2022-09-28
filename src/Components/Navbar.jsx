import React from "react";
import { ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import { BiWorld } from "react-icons/bi";
import { BsBuilding } from "react-icons/bs";
import { BsBellFill } from "react-icons/bs";
import { MdOutlineFlight, MdOutlineHolidayVillage } from "react-icons/md";
import { FaCarSide } from "react-icons/fa";
import { VscMultipleWindows } from "react-icons/vsc";
import {
  Container,
  Spacer,
  Box,
  Image,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  useMediaQuery,
  Avatar,
  Icon,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverHeader,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Center,
  Heading,
  Tag,
  useToast,
  Button,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const { isAuth } = useContext(AuthContext);
  const [isLargerThan1280] = useMediaQuery("(min-width: 992px)");
  const [isLargerThan576] = useMediaQuery("(min-width: 576px)");
  let hoverColor = "blue.400";
  const Navigate = useNavigate();
  const toast = useToast();
  const { SignOut } = useContext(AuthContext);
  const loggedUserName = JSON.parse(localStorage.getItem("loginUser")) || null;
  const handleSignout = (e) => {
    SignOut();
    toast({
      title: "Logged Out Successfully",
      status: "info",
      duration: 1000,
      isClosable: true,
      position: "top",
    });
  };
  const handleTrip = () => {
    if (isAuth) Navigate("/trips");
    else
      toast({
        title: "Please Sign in !!!",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
  };
  const UserLoginSection = () => {
    return (
      <PopoverContent p={5} w="md" border="2px solid gray">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Text mt={5}>
            Save an average of 15% on thousands of hotels when you're signed in
          </Text>
          <Button
            mt={5}
            w="100%"
            colorScheme="blue"
            onClick={() => Navigate("/signin")}
          >
            Sign in
          </Button>
          <PopoverFooter>
            <Link to="/signup" mt={10}>
              <Text _hover={{ color: hoverColor }}>Create a free account</Text>
            </Link>
          </PopoverFooter>
          <PopoverFooter>
            <Link mt={5} to="/favourite">
              <Text _hover={{ color: hoverColor }}>Lists of favourites</Text>
            </Link>
          </PopoverFooter>
          <PopoverFooter>
            <Link to="/rewards" mt={10}>
              <Text _hover={{ color: hoverColor }}>Expedia rewards</Text>
            </Link>
          </PopoverFooter>
        </PopoverBody>
        <PopoverFooter>
          <Link to="/feedback" mt={10}>
            <Text _hover={{ color: hoverColor }}>Feedback</Text>
          </Link>
        </PopoverFooter>
      </PopoverContent>
    );
  };
  const SignInSignOutSection = () => {
    return (
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Center mt="5" mb="5">
            <Heading size="md">
              Hi , {loggedUserName.firstName}
            </Heading>
          </Center>
          <Center mb="5">
            <Heading as="h6" size="md">
              {loggedUserName.email}
            </Heading>
          </Center>
          <Center mb="4">
            <Button colorScheme="blue">Blue Member</Button>
          </Center>
        </PopoverHeader>
        <PopoverBody>
          <PopoverFooter>
            <Link to="/account">Account</Link>
          </PopoverFooter>
          <PopoverFooter>
            <Link to="/favourite">Lists of favourites</Link>
          </PopoverFooter>
          <PopoverFooter>
            <Link to="/feedback">Feedback</Link>
          </PopoverFooter>
        </PopoverBody>
        <PopoverFooter>
          <Center>
            <Button
              w="100%"
              colorScheme="blue"
              onClick={(e) => {
                handleSignout(e);
              }}
            >
              Sign out
            </Button>
          </Center>
        </PopoverFooter>
      </PopoverContent>
    );
  };

  return (
    <>
      <Box
        bgColor="white"
        boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
        w="100%"
        zIndex={10}
        borderBottom="1px"
        borderBottomColor="#c5c7cc"
        pos="sticky"
        top="0"
      >
        <Container maxW="container.xl">
          <Stack direction="row">
            <Box p="5">
              <Stack direction="row" spacing={8}>
                <Link to="/">
                  <Image
                    w="130px"
                    src="https://www.expedia.co.in/_dms/header/logo.svg?locale=en_GB&siteid=27&2"
                  />
                </Link>
                {isLargerThan576 ? (
                  <Menu>
                    <MenuButton _hover={{ color: hoverColor }} fontSize={18}>
                      More travel <ChevronDownIcon />
                    </MenuButton>
                    <Portal>
                      <MenuList p={10} fontSize="xl">
                        <MenuItem
                          _hover={{ color: hoverColor }}
                          icon={<BsBuilding />}
                        >
                          Stays
                        </MenuItem>
                        <MenuItem
                          _hover={{ color: hoverColor }}
                          icon={<MdOutlineFlight />}
                        >
                          Flights
                        </MenuItem>
                        <MenuItem
                          _hover={{ color: hoverColor }}
                          icon={<FaCarSide />}
                        >
                          Cars
                        </MenuItem>
                        <MenuItem
                          _hover={{ color: hoverColor }}
                          icon={<VscMultipleWindows />}
                        >
                          Packages
                        </MenuItem>
                        <MenuItem
                          _hover={{ color: hoverColor }}
                          icon={<MdOutlineHolidayVillage />}
                        >
                          Holiday activities
                        </MenuItem>
                        <MenuItem _hover={{ color: hoverColor }}>
                          Deals
                        </MenuItem>
                        <MenuItem _hover={{ color: hoverColor }}>
                          Groups and meetings
                        </MenuItem>
                      </MenuList>
                    </Portal>
                  </Menu>
                ) : null}
              </Stack>
            </Box>
            <Spacer />
            <Box p="4">
              {isLargerThan1280 ? (
                <Stack
                  direction="row"
                  spacing={8}
                  align="center"
                  p="1"
                  fontSize={18}
                >
                  <Text _hover={{ color: hoverColor }}>
                    <Link to="/language">
                      <Icon as={BiWorld} w={3.5} h={3.5} />
                      &nbsp; English
                    </Link>
                  </Text>
                  <Text _hover={{ color: hoverColor }}>
                    <a
                      href="https://www.expedia.co.in/service/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Support
                    </a>
                  </Text>
                  <Text
                    cursor="pointer"
                    _hover={{ color: hoverColor }}
                    onClick={handleTrip}
                  >
                    Trips
                  </Text>
                  <Menu>
                    <MenuButton _hover={{ color: hoverColor }} fontSize={18}>
                      <BsBellFill />
                    </MenuButton>
                    <Portal>
                      <MenuList fontSize="xl" w="md">
                        <Text
                          fontSize={25}
                          boxShadow="base"
                          p={4}
                          display="flex"
                          alignItems="center"
                          gap="10px"
                        >
                          Notifications <BsBellFill></BsBellFill>
                        </Text>
                        <MenuItem
                          w="full"
                          _hover={{ color: hoverColor }}
                          p={5}
                          display="flex"
                          justifyContent="center"
                        >
                          Stay Tuned
                        </MenuItem>
                        <MenuItem
                          _hover={{ color: hoverColor }}
                          p={10}
                          fontSize={18}
                        >
                          Notifications keep you up to date and help you manage
                          your trips from start to finish.
                        </MenuItem>
                      </MenuList>
                    </Portal>
                  </Menu>
                  <Popover>
                    <PopoverTrigger>
                      <Text cursor="pointer" _hover={{ color: hoverColor }}>
                        {isAuth ? loggedUserName.firstName : "Sign in"}
                      </Text>
                    </PopoverTrigger>
                    <Portal>
                      {isAuth ? <SignInSignOutSection /> : <UserLoginSection />}
                    </Portal>
                  </Popover>
                </Stack>
              ) : (
                <Stack direction="row" spacing={8} align="center" p="1">
                  {isLargerThan576 ? null : (
                    <Menu>
                      <MenuButton>
                        <Search2Icon />
                      </MenuButton>
                      <Portal>
                        <MenuList>
                          <MenuItem icon={<BsBuilding />}>Stays</MenuItem>
                          <MenuItem icon={<MdOutlineFlight />}>
                            Flights
                          </MenuItem>
                          <MenuItem icon={<FaCarSide />}>Cars</MenuItem>
                          <MenuItem icon={<VscMultipleWindows />}>
                            Packages
                          </MenuItem>
                          <MenuItem icon={<MdOutlineHolidayVillage />}>
                            Holiday activities
                          </MenuItem>
                          <MenuItem>Deals</MenuItem>
                          <MenuItem>Groups and meetings</MenuItem>
                          <MenuItem>Mobile</MenuItem>
                        </MenuList>
                      </Portal>
                    </Menu>
                  )}
                  <Image
                    w="20px"
                    objectFit="cover"
                    src="https://w7.pngwing.com/pngs/751/12/png-transparent-computer-icons-business-briefcase-suitcase-rectangle-people-suitcase.png"
                    alt="Dan Abramov"
                  />
                  <Popover>
                    <PopoverTrigger>
                      <Avatar
                        size="xs"
                        name="Dan Abrahmov"
                        src="https://flyclipart.com/thumb2/user-icon-png-pnglogocom-133466.png"
                      />
                    </PopoverTrigger>
                  </Popover>
                </Stack>
              )}
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Navbar;
