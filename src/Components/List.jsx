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
} from "@chakra-ui/react";
import { Card } from "./HotelCard";
import { citiesData } from "../Data";
import { useParams } from "react-router-dom";
const initialData = citiesData;
function ListView() {
  const [arr, setArr] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const { cityName } = useParams();
  let data = initialData.filter((elem) => {
    if (elem.place == cityName.toLowerCase().trim()) return elem;
  });
  console.log(data);
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
    }
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
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="black" />}
                      />
                      <Input
                        w="80%"
                        type="text"
                        backgroundColor="white"
                        placeholder="Eg. Goa , Jammu ."
                        borderColor="black"
                      />
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
                      <Stack>
                        <Radio
                          backgroundColor="white"
                          value="1"
                          size="md"
                          borderColor="black"
                        >
                          Less than 2000 rs
                        </Radio>
                        <Radio
                          backgroundColor="white"
                          value="2"
                          size="md"
                          borderColor="black"
                        >
                          Less than 4000 rs
                        </Radio>
                        <Radio
                          backgroundColor="white"
                          value="3"
                          size="md"
                          borderColor="black"
                        >
                          Less than 8000 rs
                        </Radio>
                        <Radio
                          backgroundColor="white"
                          value="4"
                          size="md"
                          borderColor="black"
                        >
                          Greater than 8000 rs
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </Box>
                  <Box w="100%" align="left" mt={6} mb={7}>
                    <Heading size="md" mb={3}>
                      Payment Type
                    </Heading>
                    <Stack direction="column">
                      <Checkbox borderColor="black">Fully refundable</Checkbox>
                      <Checkbox borderColor="black">
                        Reserve now, pay later
                      </Checkbox>
                      <Checkbox borderColor="black">
                        Reserve without a credit card
                      </Checkbox>
                    </Stack>
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
                      if (elem.place == cityName.toLowerCase().trim())
                        return <Card key={elem.id} data={elem} />;
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
