import {
  Container,
  Box,
  Image,
  Center,
  Text,
  Stack,
  Heading,
  Flex,
  Spacer,
} from "@chakra-ui/react";

let hoverColor ="blue.400"

function Footer() {
  const MenuItem = ({ name, link }) => {
    return (
      <Text fontSize="sm" textAlign={"left"} _hover={{ color: hoverColor }}>
        <a href={link} target="_blank" rel="noreferrer">
          {name}
        </a>
      </Text>
    );
  };
  return (
    <Container maxW="container.xl">
      <Box mt="50" mb="50" p="1">
        <Flex flexWrap="wrap">
          <Box>
            <Image
              w="130px"
              src="https://a.travel-assets.com/globalcontrols-service/content/f285fb631b0a976202ef57611c7050e9ef5ca51a/images/EG_Wordmark_blue_RGB.svg"
            />
          </Box>
          <Spacer />
          <Box mb="50">
            <Stack spacing={3}>
              <Heading as="h6" size="sm" textAlign={"left"}>
                Company
              </Heading>
              <MenuItem
                link={"https://www.expedia.co.in/lp/b/about"}
                name={"About us"}
              />
              <MenuItem
                link={"https://lifeatexpediagroup.com/"}
                name={"Jobs"}
              />
              <MenuItem
                link={
                  "https://apps.expediapartnercentral.com/en_GB/list?utm_medium=referral&utm_source=wwwexpediacoin-en_GB&utm_campaign=HomePage&utm_contentewd=footer-btn&siteId=27&tpid=27&eapid=0&langId=2057"
                }
                name={"List your property"}
              />
              <MenuItem
                link={
                  "https://www.expediagroup.com/partner-with-us/default.aspx"
                }
                name={"Partnerships"}
              />
            </Stack>
          </Box>
          <Spacer />
          <Box mb="50">
            <Stack spacing={3}>
              <Heading as="h6" size="sm" textAlign={"left"}>
                Explore
              </Heading>
              <MenuItem
                link={"https://www.expedia.co.in/India.dx80"}
                name={"India travel guide"}
              />
              <MenuItem
                link={
                  "https://www.expedia.co.in/Destinations-In-India.d80.Hotel-Destinations"
                }
                name={"Hotels in India"}
              />
              <MenuItem
                link={
                  "https://www.expedia.co.in/Destinations-In-India.d80.Holiday-Rental-Destinations"
                }
                name={"Holiday rentals in India"}
              />
              <MenuItem
                link={
                  "https://www.expedia.co.in/India.d80.Holidays-City-Breaks"
                }
                name={" Holiday packages in India"}
              />
              <MenuItem
                link={
                  "https://www.expedia.co.in/Destinations-In-India.d80.Flight-Destinations"
                }
                name={"Domestic flights"}
              />
              <MenuItem
                link={
                  "https://www.expedia.co.in/Destinations-In-India.d80.Car-Hire-Destinations"
                }
                name={"Car hire in India"}
              />
              <MenuItem
                link={"https://www.expedia.co.in/Accommodation"}
                name={"All accommodation types"}
              />
              <MenuItem
                link={"https://travelblog.expedia.co.in/"}
                name={"Travel blog"}
              />
            </Stack>
          </Box>
          <Spacer />
          <Box mb="50">
            <Stack spacing={3}>
              <Heading as="h6" size="sm" textAlign={"left"}>
                Terms and policies
              </Heading>
              <MenuItem
                link={"https://www.expedia.co.in/lp/lg-privacypolicy"}
                name={"Privacy Statement"}
              />
              <MenuItem
                link={"https://www.expedia.co.in/lp/lg-termsofuse"}
                name={"Terms of use"}
              />
              <MenuItem
                link={
                  "https://www.vrbo.com/en-au/legal/traveller-terms-and-conditions"
                }
                name={" Vrbo terms and conditions"}
              />
            </Stack>
          </Box>
          <Spacer />
          <Box mb="50">
            <Stack spacing={3}>
              <Heading as="h6" size="sm" textAlign={"left"}>
                Help
              </Heading>
              <MenuItem
                link={"https://www.expedia.co.in/service/"}
                name={"Support"}
              />
              <MenuItem
                link={
                  "https://www.expedia.co.in/service/#/articles/767/34/19798"
                }
                name={"Change or cancel your booking"}
              />
              <MenuItem
                link={
                  "https://www.expedia.co.in/service/#/articles/767/741/19795"
                }
                name={"Refund process and timelines"}
              />
              <MenuItem
                link={
                  "https://www.expedia.co.in/service/#/articles/767/34/25812"
                }
                name={" Book a flight using an airline credit"}
              />
              <MenuItem
                link={
                  "https://www.expedia.co.in/service/#/articles/767/52/19788"
                }
                name={" International travel documents"}
              />
            </Stack>
          </Box>
        </Flex>
      </Box>
      <Container maxW="container.xl" borderTop="1px" borderTopColor="#c5c7cc">
        <Box p="5">
          <Center>
            <Image
              w="200px"
              src="https://images.trvl-media.com/media/content/expind/images/sg/secure.png"
            />
          </Center>
          <Text fontSize="sm" mt="10px" textAlign="center">
          © 2022 Expedia, Inc., an Expedia Group company. All rights reserved. Expedia and the Airplane Logo are trademarks or registered trademarks of Expedia, Inc.
          </Text>
        </Box>
      </Container>
    </Container>
  );
}

export default Footer;
