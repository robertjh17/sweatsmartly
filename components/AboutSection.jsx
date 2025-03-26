import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";

const AboutSection = () => {
  return (
    <Box
      bg="red.500"
      color="white"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      px={6} 
      position="relative"
    >
      {/* Cirkels achter de heading */}
      <Box
        position="absolute"
        top="27%"
        left="30%"
        transform="translate(-50%, -50%)"
        width="200px"
        height="200px"
        border="3px solid black"
        borderRadius="50%"
        zIndex={0}
        opacity={0.3}
        _before={{
            content: `""`,
            position: "absolute",
            width: "160px",
            height: "160px",
            border: "3px solid black",
            borderRadius: "50%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
         }}
        >
        <Box
            position="absolute"
            width="100px"
            height="100px"
            border="3px solid black"
            borderRadius="50%"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            zIndex={1}
            opacity={0.5}
        />
</Box>

      {/* Tekstcontainer met hogere z-index */}
      <Box position="relative" zIndex={1}>
        <Heading fontSize={{ base: "3xl", md: "6xl" }} fontWeight="bold" mb={10}>
          Krijg gepersonaliseerd
          <br />
          Advies
        </Heading>

        {/* Beschrijving */}
        <Text fontSize="lg" maxWidth="800px">
        Vind je een personal trainer te duur en is de stap te groot om iemand persoonlijk te benaderen?
        Bij SweatSmartly hebben we de perfecte oplossing voor jou! Ons platform biedt gecertificeerde personal
        trainers die klaarstaan om jou te helpen met al je fitnessuitdagingen. Onze trainers passen hun adviezen
        aan op jouw persoonlijke doelen, zodat je met vertrouwen en plezier kunt werken aan een gezondere versie van jezelf.
        Kies voor SweatSmartly en ontdek de voordelen van professionele begeleiding, zonder de hoge kosten en drempels van een
        traditionele personal trainer.
        </Text>

        {/* Knoppen */}
        <Flex mt={6} gap={120} flexWrap="wrap" justify="center">
            <Button
                colorScheme="blackAlpha"
                bg="black"
                _hover={{ bg: "gray.700" }}
                borderRadius="0"
                px={6} // Extra horizontale padding
                py={4} // Extra verticale padding
            >
                Tips op maat
            </Button>
            <Button
                colorScheme="blackAlpha"
                bg="black"
                _hover={{ bg: "gray.700" }}
                borderRadius="0"
                px={6}
                py={4}
            >
                Snelle reactie
            </Button>
            <Button
                colorScheme="blackAlpha"
                bg="black"
                _hover={{ bg: "gray.700" }}
                borderRadius="0"
                px={6}
                py={4}
            >
                Goedkope prijs
            </Button>
            </Flex>
      </Box>
    </Box>
  );
};

export default AboutSection;
