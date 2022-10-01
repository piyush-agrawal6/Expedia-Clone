import React, { useEffect, useState } from "react";
import { Image, Spinner, Box, Flex } from "@chakra-ui/react";
function NotFound() {
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
          <Flex justify="center">
            <Image src="https://cdn.dribbble.com/users/718859/screenshots/3267029/jisunpark_404-error.gif" />
          </Flex>
        </Box>
      )}
    </>
  );
}

export default NotFound;
