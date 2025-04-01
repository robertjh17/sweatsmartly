import { Box, Text, VStack, Heading, Flex } from "@chakra-ui/react";

export default function FeaturesSection() {
  return (
    <Box
      minH="100vh"
      bgImage="url('/feature-bg.png')"
      bgSize="cover"
      bgPosition="center"
      px={{ base: 4, md: 20 }}
      pt={{ base: 16, md: 24 }}
      pb={12}
      color="white"
    >
      <Heading
        as="h2"
        fontSize={{ base: "3xl", md: "6xl" }}
        fontWeight="extrabold"
        color="red.400"
        mb={{ base: 12, md: 20 }}
        maxW="2xl"
        textAlign={{ base: "center", md: "left" }}
        mx={{ base: "auto", md: 0 }}
      >
        De features die<br />
        wij bieden
      </Heading>

      <VStack
        align="start"
        spacing={16}
        ml={{ base: 0, md: "50%" }}
        px={{ base: 2, md: 0 }}
      >
        <FeatureBlock
          title="Gecertificeerde personal trainers"
          description="Wij bieden gecertificeerde personal trainers die jou de perfecte tips kunnen geven waar nodig"
        />

        <FeatureBlock
          title="Een snelle reactietijd"
          description="Onze trainers zijn altijd bereikbaar via de app, zodat je nooit lang hoeft te wachten op een antwoord."
        />

        <FeatureBlock
          title="Slimme tools & tips"
          description="We helpen je met handige tools en slimme inzichten om jouw doelen écht te bereiken."
        />
      </VStack>
    </Box>
  );
}

function FeatureBlock({ title, description }) {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align={{ base: "center", md: "flex-start" }}
      gap={4}
      textAlign={{ base: "center", md: "left" }}
    >
      <Heading
        as="h3"
        color="red.400"
        fontSize={{ base: "lg", md: "2xl" }}
        fontWeight="bold"
        maxW={{ base: "100%", md: "250px" }}
      >
        {title}
      </Heading>
      <Text
        fontSize={{ base: "sm", md: "md" }}
        color="white"
        maxW={{ base: "100%", md: "400px" }}
      >
        {description}
      </Text>
    </Flex>
  );
}
