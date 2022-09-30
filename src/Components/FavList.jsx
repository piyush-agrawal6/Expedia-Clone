import { Box, Heading, Stack } from "@chakra-ui/react";
import { Card } from "./HotelCard";
import { CartState } from "../Context/FavContext";
import { useContext } from "react";
function Favourite() {
  const {
    state: { cart },
  } = useContext(CartState);
  console.log(cart);
  return (
    <Box boxShadow="base">
      <Stack
        justify="center"
        gap={5}
        flexWrap="wrap"
        w="container.xl"
        m="auto"
        p={6}
      >
        {cart.map((elem) => (
          <Card key={elem.id} elem={elem} />
        ))}
      </Stack>
    </Box>
  );
}
export default Favourite;
