import { Flex, Box, Text, Icon } from "@chakra-ui/react";

function IconWithText({ img, text, distnace, w1, w2, w3 }) {
  w1 = w1 !== "" ? w1 : "";
  w2 = w2 !== "" ? w2 : "";
  w3 = w3 !== "" ? w3 : "";

  return (
    <Flex verticalAlign={"middle"}>
      <Box w={w1}>
        <Icon as={img} w="6" h="6" />
      </Box>
      &emsp;
      <Box w={w2} verticalAlign={"middle"}>
        <Text fontSize="lg">{text}</Text>
      </Box>
      {distnace ? (
        <Text w={w3} fontSize="lg">
          {distnace} min
        </Text>
      ) : null}
    </Flex>
  );
}

export default IconWithText;
