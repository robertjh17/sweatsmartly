import { Box, Text, VStack, Heading, Flex } from "@chakra-ui/react";

export default function FeaturesSection() {
  return (
    <Box
      minH="100vh"
      bgImage="url('/feature-bg.png')"
      bgSize="cover"
      bgPosition="center"
      py={{ base: 20, md: 32 }}
      px={{ base: 4, md: 16 }}
      color="white"
    >
      <Heading
        as="h2"
        fontSize={{ base: "3xl", md: "5xl" }}
        fontWeight="bold"
        color="red.400"
        mb={12}
      >
        De features
        die<br /> wij bieden
      </Heading>

      <VStack align="end" spacing={10} maxW="xl" ml={{ base: 0, md: 600 }}>
        <FeatureBlock
          title="Gecertificeerde personal trainers"
          description="Wij bieden gecertificeerde personal trainers die jou de perfecte tips kunnen geven waar nodig"
        />
        <FeatureBlock
          title="Een gemotiveerde community"
          description="Wij bieden gecertificeerde personal trainers die jou de perfecte tips kunnen geven waar nodig"
        />
        <FeatureBlock
          title="Een gemotiveerde community"
          description="Wij bieden gecertificeerde personal trainers die jou de perfecte tips kunnen geven waar nodig"
        />
      </VStack>
    </Box>
  );
}

function FeatureBlock({ title, description }) {
  return (
    <Flex direction="column">
      <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color="red.400">
        {title}
      </Text>
      <Text maxW="md" fontSize={{ base: "md", md: "lg" }}>
        {description}
      </Text>
    </Flex>
  );
}