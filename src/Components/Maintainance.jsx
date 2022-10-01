import React, { useEffect, useState } from "react";
import { Image, Spinner, Box, Flex, Heading } from "@chakra-ui/react";

function Maintainance() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
        <Box w="100%" bgColor="#f7f9fb">
          <Flex justify="center" align="center" h="90vh" direction="column">
            <Box>
              <Image
                w="100%"
                src="https://thumbs.gfycat.com/BountifulPalatableHerring-max-1mb.gif"
              />
            </Box>
            <Box>
              <Heading as="h3" size="lg">
                Page Is Under Maintainance
              </Heading>
            </Box>
            <Box mt="10px">
              <Heading as="h4" size="md">
                we are building something new for you !
              </Heading>
            </Box>
          </Flex>
        </Box>
      )}
    </>
  );
}

export default Maintainance;