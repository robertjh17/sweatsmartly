import { Box, Flex, Heading, Text, Image } from "@chakra-ui/react";

const HeroSection = () => {
  return (
    <Box
      bgImage="url('/hero-image.png')"
      bgSize="cover"
      bgPosition="center"
      color="white"
      position="relative"
      minHeight="100vh"
      width="100%"
    >
      {/* Navbar */}
      <Flex
        as="nav"
        position="absolute"
        top={0}
        left={0}
        width="100%"
        py={4}
        px={8}
        align="center"
      >
        {/* Logo Links */}
        <Flex flex="1" align="center">
          <Image src="/logo-sweatsmartly.png" alt="Logo SweatSmartly" h="40px" />
          <Text
            fontSize="xl"
            fontWeight="bold"
            fontFamily="Poppins, sans-serif"
          >
            SweatSmartly
          </Text>
        </Flex>

        {/* Navigatie in het midden */}
        <Flex flex="1" justify="center" gap={6}>
          <Text cursor="pointer" _hover={{ color: "red.400" }}>Home</Text>
          <Text cursor="pointer" _hover={{ color: "red.400" }}>Over ons</Text>
          <Text cursor="pointer" _hover={{ color: "red.400" }}>Contact</Text>
        </Flex>

        {/* Leeg Box om layout symmetrisch te houden */}
        <Box flex="1" />
      </Flex>

      {/* Hero Tekst Linksonder */}
      <Box
        position="absolute"
        bottom={10}
        left={10}
        textAlign="left"
        maxWidth="50%"
      >
        <Heading fontSize={{ base: "4xl", md: "7xl" }}>
          <Text as="span" color="red.400">Bereid je voor op</Text> een nieuwe piek in jouw progressie.
        </Heading>
      </Box>
    </Box>
  );
};

export default HeroSection;
