import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Container,
  Flex,
  Spinner,
} from "@chakra-ui/react";
function Trips() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  const BoxShadow = "base";
  const trips = JSON.parse(localStorage.getItem("payData"));
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
        <Container maxW="container.xl" mt="10">
          <TableContainer
            border="1px"
            borderColor="gray.200"
            borderRadius="10px"
            marginTop="50"
            boxShadow={BoxShadow}
          >
            <Table variant="simple">
              <Thead>
                <Tr bgColor="#2490fe">
                  <Th color="white">Sr.No</Th>
                  <Th color="white">Hotel Name</Th>
                  <Th color="white">Rooms Book</Th>
                  <Th color="white">Total Nights</Th>
                  <Th color="white">Total Amount (Rs)</Th>
                  <Th color="white">Checkin Date</Th>
                  <Th color="white">Checkout Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {trips.length > 0
                  ? trips.map((e, i) => (
                      <Tr
                        key={e.id}
                        _hover={{
                          bgColor: "#f7f9fb",
                          cursor: "pointer",
                        }}
                      >
                        <Td>{i + 1}</Td>
                        <Td>{e.hotelName}</Td>
                        <Td>{e.rooms}</Td>
                        <Td>{e.nights}</Td>
                        <Td>₹ {e.totalPrice}</Td>
                        <Td>{e.checkIn}</Td>
                        <Td>{e.checkout}</Td>
                      </Tr>
                    ))
                  : null}
              </Tbody>
            </Table>
          </TableContainer>
        </Container>
      )}
    </>
  );
}

export default Trips;
