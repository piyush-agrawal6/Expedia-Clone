import React, { useEffect, useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import {
  Container,
  Box,
  useMediaQuery,
  Input,
  InputGroup,
  Flex,
  Heading,
  InputLeftElement,
  Checkbox,
  Stack,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  Button,
  Text,
} from "@chakra-ui/react";
import { Card } from "./HotelCard";
import { CartState } from "../Context/FavContext";
import { useContext } from "react";
import { citiesData } from "../Data";
import { useParams } from "react-router-dom";
const initialData = citiesData;
function ListView() {
  const {
    state: { products },
  } = useContext(CartState);
  // console.log(products);
  const [arr, setArr] = useState(products);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  let { cityName } = useParams();
  let data = initialData.filter((elem) => {
    if (elem.place == cityName.toLowerCase().trim()) return elem;
  });
  const handleSort = (e) => {
    const { value } = e.target;
    if (value === "sort by rating") {
      arr.sort((a, b) => {
        if (a.rating > b.rating) return -1;
        return 1;
      });
      setArr([...arr]);
    } else if (value === "sort by price") {
      arr.sort((a, b) => {
        if (Number(a.offerPrice) > Number(b.offerPrice)) return -1;
        return 1;
      });
      setArr([...arr]);
    } else if (value === "sort by review") {
      arr.sort((a, b) => {
        if (Number(a.reviewCount) > Number(b.reviewCount)) return -1;
        return 1;
      });
      setArr([...arr]);
    } else if (value === "show all") {
      setArr([...data]);
    }
  };
  const handleFilter = (e) => {
    const { value } = e.target;
    setIsLoading(true);
    if (value === "all") {
      setArr([...data]);
      setIsLoading(false);
    } else if (value === "wonderful") {
      let a = data.filter((elem) => {
        if (+elem.rating > 4) return elem;
      });
      setArr([...a]);
      setIsLoading(false);
    } else if (value === "verygood") {
      let a = data.filter((elem) => {
        if (+elem.rating > 3) return elem;
      });
      setArr([...a]);
      setIsLoading(false);
    } else if (value === "good") {
      let a = data.filter((elem) => {
        if (+elem.rating > 2) return elem;
      });
      setArr([...a]);
      setIsLoading(false);
    } else if (value === "2000") {
      let a = data.filter((elem) => {
        if (+elem.offerPrice < 2000) return elem;
      });
      setArr([...a]);
      setIsLoading(false);
    } else if (value === "4000") {
      let a = data.filter((elem) => {
        if (+elem.offerPrice > 2000 && +elem.offerPrice < 4000) return elem;
      });
      setArr([...a]);
      setIsLoading(false);
    } else if (value === "8000") {
      let a = data.filter((elem) => {
        if (+elem.offerPrice > 4000 && +elem.offerPrice < 8000) return elem;
      });
      setArr([...a]);
      setIsLoading(false);
    } else if (value === "9000") {
      let a = data.filter((elem) => {
        if (+elem.offerPrice > 8000 && +elem.offerPrice < 11000) return elem;
      });
      setArr([...a]);
      setIsLoading(false);
    } else if (value === "11000") {
      let a = data.filter((elem) => {
        if (+elem.offerPrice > 11000) return elem;
      });
      setArr([...a]);
      setIsLoading(false);
    }
  };
  const handleSearch = (e) => {
    if (
      search.toLowerCase().trim() == "goa" ||
      search.toLowerCase().trim() == "bengaluru" ||
      search.toLowerCase().trim() == "jammu"
    ) {
      setIsLoading(true);
      e.preventDefault();
      let searchResult = initialData.filter((elem) => {
        if (elem.place == search.toLowerCase().trim()) return elem;
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      setArr([...searchResult]);
    }
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [isLargerThan492] = useMediaQuery("(min-width: 492px)");
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
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
        <Box w="100%" backgroundColor="#f8f5f4" pb={10}>
          <Container maxW="container.xl">
            <Flex justify="center">
              {isLargerThan768 ? (
                <Box w="27%">
                  <Box w="100%" align="left" mt={5} mb={5}>
                    <Heading as="h6" size="md" mt={5} mb={5}>
                      Search by city name
                    </Heading>
                    <Text pb={4} w="90%" color="blue.500">
                      **Search will only work for Goa , Jammu and Bengaluru**
                    </Text>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="black" />}
                      />
                      <Input
                        w="65%"
                        type="text"
                        backgroundColor="white"
                        placeholder="e.g.  Jammu , Bengaluru"
                        borderColor="black"
                        mr="1"
                        value={search}
                        onChange={handleChange}
                      />
                      <Button p="3" colorScheme="blue" onClick={handleSearch}>
                        search
                      </Button>
                    </InputGroup>
                  </Box>
                  <Box w="100%" align="left" mt={7} mb={5}>
                    <Heading size="md" mb={2}>
                      Filter by
                    </Heading>
                  </Box>
                  <Box w="100%" align="left" mt={6} mb={7}>
                    <Heading size="md" mb={3}>
                      Traveller rating
                    </Heading>
                    <RadioGroup>
                      <Stack onChange={(e) => handleFilter(e)}>
                        <Radio
                          backgroundColor="white"
                          value="all"
                          size="md"
                          borderColor="black"
                        >
                          Any
                        </Radio>
                        <Radio
                          backgroundColor="white"
                          value="wonderful"
                          size="md"
                          borderColor="black"
                        >
                          Wonderful 4+
                        </Radio>
                        <Radio
                          backgroundColor="white"
                          value="verygood"
                          size="md"
                          borderColor="black"
                        >
                          Very good 3+
                        </Radio>
                        <Radio
                          backgroundColor="white"
                          value="good"
                          size="md"
                          borderColor="black"
                        >
                          Good 2+
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </Box>
                  <Box w="100%" align="left" mt={6} mb={7}>
                    <Heading size="md" mb={3}>
                      Price per night
                    </Heading>
                    <RadioGroup>
                      <Stack onChange={(e) => handleFilter(e)}>
                        <Radio
                          backgroundColor="white"
                          value="2000"
                          size="md"
                          borderColor="black"
                        >
                          Less than ₹2000
                        </Radio>
                        <Radio
                          backgroundColor="white"
                          value="4000"
                          size="md"
                          borderColor="black"
                        >
                          ₹2000 to ₹4000
                        </Radio>
                        <Radio
                          backgroundColor="white"
                          value="8000"
                          size="md"
                          borderColor="black"
                        >
                          ₹4000 to ₹8000
                        </Radio>
                        <Radio
                          backgroundColor="white"
                          value="9000"
                          size="md"
                          borderColor="black"
                        >
                          ₹8000 to ₹11000
                        </Radio>
                        <Radio
                          backgroundColor="white"
                          value="11000"
                          size="md"
                          borderColor="black"
                        >
                          Greater than ₹11000
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </Box>
                </Box>
              ) : null}
              <Box w={isLargerThan768 ? "70%" : "90%"}>
                <Flex justify={isLargerThan768 ? "right" : "center"} p={3}>
                  <Select
                    placeholder="Sort By"
                    id="filter"
                    onChange={(e) => handleSort(e)}
                    w="lg"
                    bgColor={"white"}
                  >
                    <option value="sort by rating">Sort By Rating</option>
                    <option value="sort by price">Sort By Price</option>
                    <option value="sort by review">Sort By Review</option>
                    <option value="show all">Show All</option>
                  </Select>
                </Flex>
                {arr.length > 0 ? (
                  <Flex
                    direction="column"
                    flexWrap="wrap"
                    justify="center"
                    gap={4}
                  >
                    {arr.map((elem) => {
                      if (
                        elem.place == cityName.toLowerCase().trim() ||
                        elem.place == search.toLowerCase().trim()
                      )
                        return <Card key={elem.id} elem={elem} />;
                    })}
                  </Flex>
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
            </Flex>
          </Container>
        </Box>
      )}
    </>
  );
}

export default ListView;
