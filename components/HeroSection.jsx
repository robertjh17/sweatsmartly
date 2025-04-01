import { Box, Heading, Text } from "@chakra-ui/react";

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
      {/* Hero Tekst */}
      <Box
        position="absolute"
        bottom={{ base: "auto", md: 10 }}
        left={{ base: "50%", md: 10 }}
        top={{ base: "50%", md: "auto" }}
        transform={{ base: "translate(-50%, -50%)", md: "none" }}
        textAlign={{ base: "center", md: "left" }}
        width={{ base: "100%", md: "auto" }}
        maxWidth={{ base: "100%", md: "50%" }}
        px={{ base: 0, md: 0 }}
      >
        <Heading
          fontSize={{ base: "3xl", sm: "4xl", md: "7xl" }}
          lineHeight={{ base: "1.3", md: "1.1" }}
          px={{ base: 4, sm: 6 }}
        >
          <Text as="span" color="red.400">
            Bereid je voor op
          </Text>{" "}
          een nieuwe piek in jouw progressie.
        </Heading>
      </Box>
    </Box>
  );
};

export default HeroSection;
